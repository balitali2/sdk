import { toAddress } from "@rarible/types"
import { mintTokensToNewSudoswapPool } from "../amm/test/utils"
import { retry } from "../../../common/retry"
import type { SimpleAmmOrder } from "../../types"
import type { NftAssetType } from "../../check-asset-type"
import type { AmmOrderFillRequest } from "../types"
import { DEV_PK_1, DEV_PK_2 } from "../../../common/test/test-credentials"
import type { EthereumNetwork } from "../../../types"
import { createRaribleSdk } from "../../../index"
import { getEthereumConfig } from "../../../config"
import { getSimpleSendWithInjects } from "../../../common/send-transaction"
import { createE2eTestProvider } from "../../../common/test/create-test-providers"
import { makeAmmOrder, ordersToRequests } from "./test/common/utils"

describe("amm batch buy tests", () => {
	const { web3Ethereum: buyerWeb3 } = createE2eTestProvider(DEV_PK_1)
	const { web3Ethereum: ethereum } = createE2eTestProvider(DEV_PK_2)

	const env: EthereumNetwork = "dev-ethereum"

	const sdkBuyer = createRaribleSdk(buyerWeb3, env)
	const sdkSeller = createRaribleSdk(ethereum, env)

	const config = getEthereumConfig(env)
	const send = getSimpleSendWithInjects()


	test.skip("amm sudoswap few items sell form different pools", async () => {
		const orders = await Promise.all([
			makeAmmOrder(sdkSeller, env, ethereum, send, config),
			makeAmmOrder(sdkSeller, env, ethereum, send, config),
		])

		console.log("order", orders[0])
		const tx = await sdkBuyer.order.buyBatch(ordersToRequests(orders, [{
			account: toAddress("0x0d28e9Bd340e48370475553D21Bd0A95c9a60F92"),
			value: 100,
		}]))
		await tx.wait()
		console.log(tx)
	})

	test("amm sudoswap few items sell from one pool one request", async () => {
		const { poolAddress, items, contract } = await mintTokensToNewSudoswapPool(
			sdkSeller,
			env,
			ethereum,
			send,
			config.sudoswap.pairFactory,
			3
		)
		const orderHash = "0x" + poolAddress.slice(2).padStart(64, "0")
		const order = await retry(20, 2000, async () => {
			return await sdkSeller.apis.order.getValidatedOrderByHash({ hash: orderHash })
		}) as SimpleAmmOrder

		const requests: NftAssetType[] = items.map(item => ({
			contract,
			tokenId: item,
		}))
		console.log("reqs", requests)
		const tx = await sdkBuyer.order.buyBatch([{
			order,
			amount: 1,
			originFees: [{
				account: toAddress("0x0d28e9Bd340e48370475553D21Bd0A95c9a60F92"),
				value: 100,
			}],
			assetType: items.map(item => ({
				contract,
				tokenId: item,
			})),
		} as AmmOrderFillRequest])
		console.log(tx)
		await tx.wait()
	})

})
