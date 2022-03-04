import type { Ethereum } from "@rarible/ethereum-provider"
import type { Fcl } from "@rarible/fcl-types"
import { Blockchain } from "@rarible/api-client"
import type { TezosProvider } from "@rarible/tezos-sdk"
import { sign } from "@rarible/tezos-sdk"
import type { SolanaWalletProvider } from "@rarible/solana-wallet"
import type { AbstractWallet, UserSignature } from "./domain"

export class EthereumWallet<K extends Blockchain.ETHEREUM | Blockchain.POLYGON,
	T extends Ethereum = Ethereum> implements AbstractWallet {
	constructor(
		public readonly ethereum: T,
		public readonly blockchain: K
	) {
	}

	async signPersonalMessage(message: string): Promise<UserSignature> {
		const address = await this.ethereum.getFrom()
		if (!address) {
			throw new Error("Not connected to Ethereum blockchain")
		}
		return {
			signature: await this.ethereum.personalSign(message),
			publicKey: address,
		}
	}
}

export class FlowWallet implements AbstractWallet {
	readonly blockchain = Blockchain.FLOW

	constructor(public readonly fcl: Fcl) {
	}

	async signPersonalMessage(message: string): Promise<UserSignature> {
		if (!message.length) {
			throw new Error("Message can't be empty")
		}
		const messageHex = Buffer.from(message).toString("hex")
		const currentUser = this.fcl.currentUser()
		const user = await this.fcl.currentUser().snapshot()
		const address = user.addr
		if (!address) {
			throw new Error("Not connected to Flow blockchain")
		}
		const account = await this.fcl.account(address)

		const signatures = await currentUser.signUserMessage(messageHex)
		if (typeof signatures === "string") {
			throw new Error(signatures)
		}

		const signature = signatures.find(s => {
			return s.addr.toLowerCase() === address.toLowerCase()
		})
		if (signature) {
			const pubKey = account.keys.find(k => k.index === signature.keyId)
			if (!pubKey) {
				throw new Error(`Key with index "${signature.keyId}" not found on account with address ${address}`)
			}
			return {
				signature: signature.signature,
				publicKey: pubKey.publicKey,
			}
		}
		throw new Error(`Signature of user address "${address}" not found`)
	}
}

export class TezosWallet implements AbstractWallet {
	readonly blockchain = Blockchain.TEZOS

	constructor(public readonly provider: TezosProvider) {
	}

	async signPersonalMessage(message: string): Promise<UserSignature> {
		const publicKey = await this.provider.public_key()
		if (publicKey === undefined) {
			throw new Error("Public key undefined")
		}
		const result = await sign(this.provider, message, "message")
		return {
			signature: result.signature,
			publicKey: `${result.edpk}_${result.prefix}`,
		}
	}
}

export class SolanaWallet implements AbstractWallet {
	readonly blockchain = Blockchain.SOLANA

	constructor(public readonly provider: SolanaWalletProvider) {
	}

	async signPersonalMessage(message: string): Promise<UserSignature> {
		const data = new TextEncoder().encode(message)
		const res = await this.provider.signMessage(data)
		return {
			signature: new TextDecoder().decode(res.signature),
			publicKey: this.provider.publicKey!.toString(), //todo remove '!'
		}
	}
}

export type BlockchainWallet =
	EthereumWallet<Blockchain.ETHEREUM> |
	EthereumWallet<Blockchain.POLYGON> |
	FlowWallet |
	TezosWallet |
	SolanaWallet

export type WalletByBlockchain = {
	"FLOW": FlowWallet
	"ETHEREUM": EthereumWallet<Blockchain.ETHEREUM>,
	"POLYGON": EthereumWallet<Blockchain.POLYGON>,
	"TEZOS": TezosWallet
	"SOLANA": SolanaWallet
}
