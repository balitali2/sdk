import type { Maybe } from "@rarible/types"
import type { Link } from "@imtbl/imx-sdk"
import { Configuration } from "@rarible/ethereum-api-client"
import type { ImxEnv } from "@rarible/immutable-wallet"
import { convertFees } from "../common/convert-fees"
import { IMX_ENV_CONFIG } from "../config/env"
import { ImxTradesControllerApi } from "../apis/trades"
import type { Erc721AssetRequest } from "../nft/domain"
import { retry } from "../common/utils"
import type {
	BuyRequest,
	BuyResponse,
	CancelOrderRequest,
	CancelOrderResponse,
	SellRequest,
	SellResponse,
	SellResponseRaw,
} from "./domain"

export async function sell(
	link: Maybe<Link>,
	request: SellRequest,
): Promise<SellResponse> {
	if (link === undefined) {
		throw new Error("Wallet undefined")
	}
	const { makeAssetType: { tokenId, contract }, takeAssetType, amount, payouts, originFees } = request
	const currencyContract = takeAssetType.assetClass === "ERC20" ? takeAssetType.contract : undefined
	const orderId = await link.sell({
		tokenId,
		tokenAddress: contract,
		fees: convertFees([...payouts, ...originFees]),
		amount,
		...currencyContract ? { currencyAddress: currencyContract } : {},
	}) as unknown as number

	return {
		orderId,
	} as SellResponse
}

export async function buy(
	env: ImxEnv,
	link: Maybe<Link>,
	request: BuyRequest,
	token: Erc721AssetRequest
): Promise<BuyResponse> {
	if (link === undefined) {
		throw new Error("Wallet undefined")
	}
	const { orderId, fee } = request
	const buyResult = await link.buy({
		orderIds: [orderId],
		fees: convertFees(fee),
	})

	const tradeResult = buyResult.result?.[orderId]
	if (tradeResult.status === "error") {
		throw new Error("Trade unsuccessful: " + tradeResult.message)
	}

	let txId = undefined
	try {
		txId = await retry(20, 2000, async () => {
			const { apiAddressV1 } = IMX_ENV_CONFIG[env]
			const balanceApiConfig = new Configuration({ basePath: apiAddressV1 })
			const api = new ImxTradesControllerApi(balanceApiConfig)
			const { result } = await api.getTrades({
				tokenType: token.assetClass,
				tokenAddress: token.contract,
				tokenId: token.tokenId,
			})
			const trade = result.find((trade) => trade.b.order_id.toString() === orderId)
			if (!trade) {
				throw new Error("Can't find trade with orderid " + orderId)
			}
			if (tradeResult.status === "success") {
				return trade.transaction_id
			}
		})
	} catch (e: any) {
		console.error("Error while fetching trade", e)
	}

	return {
		txId,
	}
}

export async function cancel(
	link: Maybe<Link>,
	request: CancelOrderRequest,
): Promise<CancelOrderResponse> {
	if (link === undefined) {
		throw new Error("Wallet undefined")
	}
	const { orderId } = request
	const result = await link.cancel({
		orderId,
	})
	return {
		orderId: (result as unknown as SellResponseRaw).order_id.toString(),
	}
}
