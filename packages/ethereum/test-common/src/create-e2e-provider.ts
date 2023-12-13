import Web3 from "web3"
import Wallet from "ethereumjs-wallet"
import { TestSubprovider } from "@rarible/test-provider"
import HDWalletProvider from "@truffle/hdwallet-provider"
import { randomWord } from "@rarible/types"
import { delay } from "@rarible/protocol-ethereum-sdk/src/common/retry"


export function createE2eWallet(pk: string = randomWord()): Wallet {
	return new Wallet(Buffer.from(fixPK(pk), "hex"))
}

export type E2EProviderConfig = {
	networkId: number
	chainId: number
	rpcUrl: string
	pollingInterval: number
}

export class E2EProvider {
	// readonly provider: Web3ProviderEngine
	readonly provider: any
	readonly config: E2EProviderConfig
	readonly wallet: Wallet
	readonly web3: Web3

	constructor(
		pk: string = randomWord(),
		configOverride: Partial<E2EProviderConfig> = {},
	) {
		this.config = this.createConfig(configOverride)
		this.wallet = createE2eWallet(pk)

		const origInit = (HDWalletProvider.prototype as any).initialize;
		(HDWalletProvider.prototype as any).initialize = async function () {
			while (true) {
				try {
					return await origInit.call(this)
				} catch (e) {
					console.log("origInit failed")
					console.log(e)
				}
				await delay(1000)
			}
		}
		const provider = new HDWalletProvider({
			privateKeys: [pk],
			providerOrUrl: this.config.rpcUrl,
			// pollingInterval: 100000,
			chainId: configOverride.chainId,
			// addressIndex: 0,
		});

		(provider.engine as any)._blockTracker.on("error", function () {
			console.log("BlockTracker error")
			console.log(arguments)
		})
		provider.engine.on("error", function () {
			console.log("Web3ProviderEngine error")
			console.log(arguments)
		} as any)

		this.provider = provider
		this.web3 = new Web3(provider as any)
	}

	private createConfig(override: Partial<E2EProviderConfig>) {
		const networkId = override.networkId || 300500
		return {
			networkId: networkId,
			chainId: override.chainId || networkId,
			rpcUrl: "https://dev-ethereum-node.rarible.com",
			pollingInterval: 3000,
			...override,
		}
	}

	private createWalletProvider() {
		return new TestSubprovider(this.wallet, {
			networkId: this.config.networkId,
			chainId: this.config.chainId,
		})
	}

	start = () => this.provider.engine.start()

	stop = () => this.provider.engine.stop()
}

function fixPK(pk: string) {
	return pk.startsWith("0x") ? pk.substring(2) : pk
}

export function createE2eProvider(pk?: string, config?: Partial<E2EProviderConfig>) {
	const provider = new E2EProvider(pk, config)

	provider.start()
	beforeAll(() => provider.start())
	afterAll(() => provider.stop())

	return {
		provider: provider.provider as any,
		wallet: provider.wallet,
	}
}
