import { toCollectionId } from "@rarible/types"
import { createRaribleSdk } from "../../index"
import { MintType } from "../../types/nft/mint/domain"
import { LogsLevel } from "../../domain"
import { awaitForItemSupply } from "./test/await-for-item-supply"
import { createTestWallet } from "./test/test-wallet"

describe("burn test", () => {
	const sellerWallet = createTestWallet(
		"edskRqrEPcFetuV7xDMMFXHLMPbsTawXZjH9yrEz4RBqH1" +
    "D6H8CeZTTtjGA3ynjTqD8Sgmksi7p5g3u5KUEVqX2EWrRnq5Bymj")
	const sdk = createRaribleSdk(sellerWallet, "development", { logs: LogsLevel.DISABLED })

	let nftContract: string = "KT1PuABq2ReD789KtKetktvVKJcCMpyDgwUx"
	let mtContract: string = "KT1DqmzJCkUQ8xAqeKzz9L4g4owLiQj87XaC"

	test("burn NFT token test", async () => {
		const mintResponse = await sdk.nft.mint({
			collectionId: toCollectionId(`TEZOS:${nftContract}`),
		})
		const mintResult = await mintResponse.submit({
			uri: "ipfs://bafkreiaz7n5zj2qvtwmqnahz7rwt5h37ywqu7znruiyhwuav3rbbxzert4",
			supply: 1,
			lazyMint: false,
		})
		if (mintResult.type === MintType.ON_CHAIN) {
			await mintResult.transaction.wait()
		}
		await awaitForItemSupply(sdk, mintResult.itemId, "1")

		const transfer = await sdk.nft.burn({ itemId: mintResult.itemId })

		const result = await transfer.submit({ amount: 1 })

		if (result) {
		  await result.wait()
		}

		await awaitForItemSupply(sdk, mintResult.itemId, "0")
	}, 1500000)

	test("burn NFT token with basic function", async () => {
		const mintResult = await sdk.nftBasic.mint({
			collectionId: toCollectionId(`TEZOS:${nftContract}`),
			uri: "ipfs://bafkreiaz7n5zj2qvtwmqnahz7rwt5h37ywqu7znruiyhwuav3rbbxzert4",
		})
		await mintResult.transaction.wait()
		await awaitForItemSupply(sdk, mintResult.itemId, "1")

		const burnTx = await sdk.nftBasic.burn({
			itemId: mintResult.itemId,
			amount: 1,
		})
		if (burnTx) {
		  await burnTx.wait()
		}
		await awaitForItemSupply(sdk, mintResult.itemId, "0")
	}, 1500000)

	test("burn NFT token test with basic function", async () => {
		const mintResult = await sdk.nftBasic.mint({
			collectionId: toCollectionId(`TEZOS:${nftContract}`),
			uri: "ipfs://bafkreiaz7n5zj2qvtwmqnahz7rwt5h37ywqu7znruiyhwuav3rbbxzert4",
			supply: 1,
		})
		await mintResult.transaction.wait()
		await awaitForItemSupply(sdk, mintResult.itemId, "1")

		const transferResult = await sdk.nftBasic.burn({
			itemId: mintResult.itemId,
		})

		if (transferResult) {
		  await transferResult.wait()
		}

		await awaitForItemSupply(sdk, mintResult.itemId, "0")
	}, 1500000)

	test("burn MT token test", async () => {
		const mintResponse = await sdk.nft.mint({
			collectionId: toCollectionId(`TEZOS:${mtContract}`),
		})
		const mintResult = await mintResponse.submit({
			uri: "ipfs://bafkreiaz7n5zj2qvtwmqnahz7rwt5h37ywqu7znruiyhwuav3rbbxzert4",
			supply: 10,
			lazyMint: false,
		})
		if (mintResult.type === MintType.ON_CHAIN) {
			await mintResult.transaction.wait()
		}

		await awaitForItemSupply(sdk, mintResult.itemId, "10")

		const transfer = await sdk.nft.burn({
			itemId: mintResult.itemId,
		})
		const result = await transfer.submit({ amount: 5 })
		if (result) {
		  await result.wait()
		}

		await awaitForItemSupply(sdk, mintResult.itemId, "5")
	}, 1500000)

})
