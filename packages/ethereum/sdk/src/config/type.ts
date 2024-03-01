import type { Address } from "@rarible/ethereum-api-client"
import type { Word } from "@rarible/types"
import type { EVMBlockchain } from "@rarible/sdk-common"
import type { EthereumNetwork, EthereumSdkEnvironment } from "../types"

export type ExchangeAddresses = {
	v1: Address
	v2: Address
	openseaV1: Address
	wrapper: Address
	looksrare?: Address
	looksrareV2?: Address
	x2y2: Address
}

export type TransferProxies = {
	nft: Address
	erc20: Address
	erc721Lazy: Address
	erc1155Lazy: Address
	openseaV1: Address
	cryptoPunks: Address
}

export type OpenSeaConfig = {
	metadata: Word
	proxyRegistry: Address
	merkleValidator?: Address
}

export type FactoriesAddresses = {
	erc721: Address
	erc1155: Address
}

export type CryptoPunksConfig = {
	marketContract: Address
	wrapperContract: Address
}

export type SudoswapConfig = {
	pairFactory: Address
	pairRouter: Address
}

export type RariblePublicCollections = {
	erc721: { v2: Address, v3: Address }
	erc1155: { v2: Address }
}

export type EthereumConfig<T extends EthereumNetwork = EthereumNetwork> = {
	network: T
	// @todo once typescript 5 will be done it should be inferred
	// from dictionary mapping
	blockchain: EVMBlockchain
	basePath: string
	environment: EthereumSdkEnvironment
	chainId: number
	exchange: ExchangeAddresses
	transferProxies: TransferProxies
	// @todo get rid of it in favor of BaseFeeService
	feeConfigUrl: string
	openSea: OpenSeaConfig
	factories: FactoriesAddresses
	weth: Address
	auction: Address
	cryptoPunks: CryptoPunksConfig
	sudoswap: SudoswapConfig
	publicCollections: RariblePublicCollections
	looksrareOrderValidatorV2?: Address
}
