import { Action } from "@rarible/action"
import type { OrderDataRequest, TezosNetwork, TezosProvider } from "@rarible/tezos-sdk"
// eslint-disable-next-line camelcase
import { fill_order, get_address } from "@rarible/tezos-sdk"
import type { BigNumber as RaribleBigNumber } from "@rarible/types"
import { toBigNumber as toRaribleBigNumber } from "@rarible/types"
import { BlockchainTezosTransaction } from "@rarible/sdk-transaction"
import BigNumber from "bignumber.js"
import type { Order } from "@rarible/api-client"
import { Blockchain } from "@rarible/api-client"
import type { BuyRequest } from "@rarible/tezos-sdk/dist/sales/buy"
import { buyV2, isExistsSaleOrder } from "@rarible/tezos-sdk/dist/sales/buy"
import type { FillRequest, PrepareFillRequest, PrepareFillResponse } from "../../types/order/fill/domain"
import { OriginFeeSupport, PayoutsSupport } from "../../types/order/fill/domain"
import type { IApisSdk } from "../../domain"
import type { MaybeProvider } from "./common"
import {
	convertFromContractAddress,
	convertOrderToFillOrder, convertUnionParts,
	getRequiredProvider,
	getTezosAddress, getTezosAssetTypeV2,
} from "./common"

export class TezosFill {
	constructor(
		private provider: MaybeProvider<TezosProvider>,
		private unionAPI: IApisSdk,
		private network: TezosNetwork,
	) {
		this.fill = this.fill.bind(this)
	}

	async getPreparedOrder(request: PrepareFillRequest): Promise<Order> {
		if ("order" in request) {
			return request.order
		} else if ("orderId" in request) {
			const [domain] = request.orderId.split(":")
			if (domain !== Blockchain.TEZOS) {
				throw new Error("Not an tezos order")
			}
			return this.unionAPI.order.getOrderById({
				id: request.orderId,
			})
		} else {
			throw new Error("Request error")
		}
	}

	async getMaxAmount(order: Order): Promise<RaribleBigNumber> {
		const provider = getRequiredProvider(this.provider)
		if (order.take.type["@type"] === "TEZOS_MT" || order.take.type["@type"] === "TEZOS_NFT") {
			const { contract, tokenId } = order.take.type
			const ownershipId = `${contract}:${tokenId.toString()}:${await get_address(provider)}`
			const response = await this.unionAPI.ownership.getOwnershipById({
				ownershipId,
			})
			return toRaribleBigNumber(response.value)
		} else {
			return toRaribleBigNumber(order.makeStock)
		}
	}

	isMultiple(order: Order): boolean {
		return order.take.type["@type"] === "TEZOS_MT" || order.make.type["@type"] === "TEZOS_MT"
	}

	private async buyV2(order: Order, data: OrderDataRequest, fillRequest: FillRequest) {
		const provider = getRequiredProvider(this.provider)
		const amount = (order.take.value !== undefined) ? new BigNumber(order.take.value) : new BigNumber(0)
		const currency = await getTezosAssetTypeV2(this.provider.config, order.take.type)
		if (!data.make_contract || !data.make_token_id) {
			throw new Error("Make data for buyV2 should exist")
		}
		const buyRequest: BuyRequest = {
			asset_contract: data.make_contract,
			asset_token_id: new BigNumber(data.make_token_id),
			asset_seller: getTezosAddress(order.maker),
			sale_type: currency.type,
			sale_asset_contract: currency.asset_contract,
			sale_asset_token_id: currency.asset_token_id,
			sale_amount: amount,
			sale_qty: new BigNumber(fillRequest.amount),
			sale_payouts: convertUnionParts(fillRequest.payouts),
			sale_origin_fees: convertUnionParts(fillRequest.originFees),
			use_all: false,
		}
		const isOrderExists = await isExistsSaleOrder(provider, buyRequest)
		if (isOrderExists) {
			const op = await buyV2(provider, buyRequest)
			return new BlockchainTezosTransaction(op, this.network)
		} else {
			throw new Error("Error order does not exist")
		}

	}

	async fill(request: PrepareFillRequest): Promise<PrepareFillResponse> {
		let preparedOrder = await this.getPreparedOrder(request)

		const submit = Action.create({
			id: "send-tx" as const,
			run: async (fillRequest: FillRequest) => {
				const { make, take } = preparedOrder
				if (make.type["@type"] === "TEZOS_NFT" || make.type["@type"] === "TEZOS_MT") {
					const request: OrderDataRequest = {
						make_contract: convertFromContractAddress(make.type.contract),
						make_token_id: new BigNumber(make.type.tokenId),
						maker: getTezosAddress(preparedOrder.maker),
						take_contract: "contract" in take.type ? convertFromContractAddress(take.type.contract) : undefined,
					}
					if (take.type["@type"] === "TEZOS_FT" && take.type.tokenId) {
						request.take_token_id = new BigNumber(take.type.tokenId.toString())
					}
					if (preparedOrder.data["@type"] === "TEZOS_RARIBLE_V3") {
						return this.buyV2(preparedOrder, request, fillRequest)
					}
				}
				return this.fillV1Order(fillRequest, preparedOrder)
			},
		})

		return {
			multiple: this.isMultiple(preparedOrder),
			maxAmount: await this.getMaxAmount(preparedOrder),
			baseFee: parseInt(this.provider.config.fees.toString()),
			originFeeSupport: OriginFeeSupport.FULL,
			payoutsSupport: PayoutsSupport.MULTIPLE,
			supportsPartialFill: true,
			submit,
		}
	}

	private async fillV1Order(fillRequest: FillRequest, order: Order) {
		const provider = getRequiredProvider(this.provider)
		const request = {
			amount: new BigNumber(fillRequest.amount),
			payouts: convertUnionParts(fillRequest.payouts),
			origin_fees: convertUnionParts(fillRequest.originFees),
			infinite: fillRequest.infiniteApproval,
			use_all: true,
		}
		const preparedOrder = convertOrderToFillOrder(order)
		const fillResponse = await fill_order(
			provider,
			preparedOrder,
			request,
			fillRequest.unwrap
		)
		return new BlockchainTezosTransaction(fillResponse, this.network)
	}
}
