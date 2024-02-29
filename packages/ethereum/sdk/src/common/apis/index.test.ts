import { createE2eWallet } from "@rarible/ethereum-sdk-test-common"
import { toBn } from "@rarible/utils"
import { Response } from "node-fetch"
import { ethereumNetworks } from "../../types"
import { getTestAPIKey } from "../test/test-credentials"
import { createE2EProviderEmpty } from "../test/provider"
import { createTestWeb3Adapter } from "../test/provider-adapters"
import { ApiService } from "./index"

describe("ApiService", () => {
	const wallet = createE2eWallet()

	test.each(ethereumNetworks)("should get balance on %s network", async (network) => {
		// We might expect unexpected error in some cases (during high load of some networks)
		jest.retryTimes(3)

		const service = new ApiService(undefined, network, {
			apiKey: getTestAPIKey(network),
		})
		const balance = await service.apis.balances.getEthBalance({
			owner: wallet.getAddressString(),
		})
		expect(toBn(balance.balance).eq(0)).toEqual(true)
	})

	test("should throw error with 403 status in case of no api key", async () => {
		const service = new ApiService(undefined, "mainnet", {})
		try {
			await service.apis.balances.getEthBalance({
				owner: wallet.getAddressString(),
			})
		} catch (error) {
			if (error instanceof Response) {
				expect(error.status).toEqual(403)
			} else {
				throw new Error("Unexpected response")
			}
		}
	})

	describe("byCurrentWallet", () => {
		const e2eProvider = createE2EProviderEmpty("polygon")
		const web3Ethereum = createTestWeb3Adapter(e2eProvider.provider)

		test("should depend on provider's wallet in case", async () => {
			const service = new ApiService(web3Ethereum, "mainnet", {})
			const apisByWallet = await service.byCurrentWallet()
			expect(apisByWallet.network).toEqual("polygon")
		})
	})
})
