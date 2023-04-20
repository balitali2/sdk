import type { Observable } from "rxjs"
import { combineLatest, defer } from "rxjs"
import { map, mergeMap, startWith } from "rxjs/operators"
import { AbstractConnectionProvider } from "../../provider"
import type { Maybe } from "../../common/utils"
import { promiseToObservable } from "../../common/utils"
import type { ConnectionState } from "../../connection-state"
import { getStateConnecting, getStateDisconnected, getStateConnected } from "../../connection-state"
import { ethAccounts, getAddress } from "./common/get-address"
import { getChainId } from "./common/get-chain-id"
import type { EthereumProviderConnectionResult } from "./domain"

export enum DappType {
	Metamask = "Metamask",
	Trust = "Trust",
	GoWallet = "GoWallet",
	AlphaWallet = "AlphaWallet",
	Status = "Status",
	Coinbase = "Coinbase",
	Cipher = "Cipher",
	Mist = "Mist",
	Parity = "Parity",
	ImToken = "ImToken",
	Dapper = "Dapper",
	LedgerConnect = "LedgerConnect",
	AToken = "AToken",
	Binance = "Binance Smart Wallet",
	Bitpie = "Bitpie",
	BlockWallet = "BlockWallet",
	Brave = "Brave",
	CoinbaseBrowser = "Coinbase Browser",
	Dcent = "D'CENT",
	Frame = "Frame",
	HuobiWallet = "Huobi Wallet",
	HyperPay = "HyperPay",
	Liquality = "Liquality",
	MeetOne = "MeetOne",
	MetaMask = "MetaMask",
	MyKey = "MyKey",
	Opera = "Opera Wallet",
	OwnBit = "OwnBit",
	TokenPocket = "TokenPocket",
	TP = "TP Wallet",
	WalletIo = "Wallet.io",
	XDEFI = "XDEFI Wallet",
	OneInch = "1inch Wallet",
	Tokenary = "Tokenary Wallet",
	Tally = "Tally Wallet",
	GameStop = "Game Stop",
	Generic = "Web3",
	Mock = "Mock",
	Unknown = "Unknown",
}

const PROVIDER_ID = "injected" as const

export class InjectedWeb3ConnectionProvider extends
	AbstractConnectionProvider<DappType, EthereumProviderConnectionResult> {
  private readonly connection: Observable<ConnectionState<EthereumProviderConnectionResult>>

  constructor() {
  	super()
  	this.connection = defer(() => {
  		return connect()
  	}).pipe(
  		mergeMap(() => promiseToObservable(getWalletAsync())),
  		map((wallet) => {
  			if (wallet) {
  				const disconnect = () => {
  					if ("close" in wallet.provider) {
  						return wallet.provider.close()
  					}
  					if ("disconnect" in wallet.provider) {
  						return wallet.provider.disconnect()
  					}
  					return Promise.resolve()
  				}
  				return getStateConnected({ connection: wallet, disconnect })
  			} else {
  				return getStateDisconnected()
  			}
  		}),
  		startWith(getStateConnecting({ providerId: PROVIDER_ID })),
  	)
  }

  getId(): string {
  	return PROVIDER_ID
  }

  getConnection(): Observable<ConnectionState<EthereumProviderConnectionResult>> {
  	return this.connection
  }

  getOption(): Promise<Maybe<DappType>> {
  	const provider = getInjectedProvider()
  	return Promise.resolve(getDappType(provider))
  }

  isAutoConnected(): Promise<boolean> {
  	const provider = getInjectedProvider()
  	const dapp = getDappType(provider)
  	return Promise.resolve(isDappSupportAutoConnect(dapp))
  }

  async isConnected(): Promise<boolean> {
  	const provider = getInjectedProvider()
  	if (provider !== undefined) {
  		return ethAccounts(provider)
  			.then(([account]) => account !== undefined)
  	} else {
  		return Promise.resolve(false)
  	}
  }
}

async function connect(): Promise<void> {
	const provider = getInjectedProvider()
	if (!provider) {
		throw new Error("Injected provider not available")
	}
	const accounts = await ethAccounts(provider)
	if (!accounts || accounts.length === 0) {
		await enableProvider(provider)
	}
	provider.on("disconnect", async (rpcError: unknown) => {
		if (detectErrorCode(1013, rpcError)) {
			const [primary] = await provider.request({ method: "eth_accounts" })
			if (primary) return
		}
	})
}

async function getWalletAsync(): Promise<Observable<EthereumProviderConnectionResult | undefined>> {
	const provider = getInjectedProvider()
	return combineLatest([getAddress(provider), getChainId(provider)]).pipe(
		map(([address, chainId]) => {
			if (address) {
				return {
					chainId,
					address,
					provider,
				}
			} else {
				return undefined
			}
		}),
	)
}

async function enableProvider(provider: any) {
	if (typeof provider.request === "function") {
		try {
			await provider.request({
				method: "eth_requestAccounts",
			})
		} catch (e) {
			if (typeof provider.enable === "function") {
				await provider.enable()
			}
		}
	} else {
		if (typeof provider.enable === "function") {
			await provider.enable()
		}
	}
	return provider
}

function getInjectedProvider(): any | undefined {
	let provider: any = undefined

	const global: any = typeof window !== "undefined" ? window : undefined
	if (!global) {
		return provider
	} else if (global.ethereum) {
		provider = Array.isArray(global.ethereum.providers) ? global.ethereum.providers[0] : global.ethereum;
		(provider as any).autoRefreshOnNetworkChange = false
	} else if (global.web3?.currentProvider) {
		provider = global.web3.currentProvider
	}
	return provider
}

function getDappType(provider: any): Maybe<DappType> {
	if (provider !== undefined) {
		if (provider) {
			if (provider.isAlphaWallet) return DappType.AlphaWallet
			if (provider.isAToken) return DappType.AToken
			if (provider.bbcSignTx) return DappType.Binance
			if (provider.isBitpie) return DappType.Bitpie
			if (provider.isBlockWallet) return DappType.BlockWallet
			if (provider.isCoinbaseBrowser) return DappType.CoinbaseBrowser
			if (provider.isCoinbaseWallet) return DappType.Coinbase
			if (provider.isDcentWallet) return DappType.Dcent
			if (provider.isFrame) return DappType.Frame
			if (provider.isHbWallet) return DappType.HuobiWallet
			if (provider.isHyperPay) return DappType.HyperPay
			if (provider.isImToken) return DappType.ImToken
			if (provider.isLiquality) return DappType.Liquality
			if (provider.wallet) return DappType.MeetOne
			if (provider.isMYKEY) return DappType.MyKey
			if (provider.isOwnbit) return DappType.OwnBit
			if (provider.isStatus) return DappType.Status
			if (provider.isTrust) return DappType.Trust
			if (provider.isTokenPocket) return DappType.TokenPocket
			if (provider.isTp) return DappType.TP
			if (provider.isWalletIO) return DappType.WalletIo
			if (provider.isXDEFI) return DappType.XDEFI
			if (provider.isOneInchIOSWallet) return DappType.OneInch
			if (provider.isTokenary) return DappType.Tokenary
			if (provider.isTally) return DappType.Tally
			if (provider.isBraveWallet) return DappType.Brave
			if (provider.isOpera) return DappType.Opera
			if (provider.isLedgerConnect) return DappType.LedgerConnect
			if (provider.isMetaMask) return DappType.MetaMask
			if (provider.isGamestop) return DappType.GameStop
			if (provider.isDapper) return DappType.Dapper
			if (provider.isGoWallet) return DappType.GoWallet
			if (typeof (window as any).__CIPHER__ !== "undefined") return DappType.Cipher
			if (provider.constructor.name === "HDWalletProvider") return DappType.Mock
			if (provider.constructor.name === "EthereumProvider") return DappType.Mist
			if (provider.constructor.name === "Web3FrameProvider") return DappType.Parity
			if (provider.constructor.name === "Web3ProviderEngine") return DappType.Mock
			return DappType.Generic
		}
	}

	return undefined
}

function isDappSupportAutoConnect(dapp: Maybe<DappType>): boolean {
	if (!dapp) {
		return false
	}

	const unsupportedDappTypes: Set<DappType> = new Set([DappType.Dapper])
	const disabledAutoLogin = new Set([DappType.Generic, DappType.Metamask])

	return !(unsupportedDappTypes.has(dapp) || disabledAutoLogin.has(dapp))
}

export function detectErrorCode(code: number, error: unknown) {
	const parsedCode = typeof error === "object" && error !== null && "code" in error ? (error as any).code : undefined
	return parsedCode === code
}
