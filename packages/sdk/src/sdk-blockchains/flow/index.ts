import type { FlowWallet } from "@rarible/sdk-wallet"
import { createFlowSdk as createFlowSdkInstance } from "@rarible/flow-sdk"
import type { AuthWithPrivateKey } from "@rarible/flow-sdk/build/types"
import { Maybe } from "@rarible/protocol-ethereum-sdk/build/common/maybe"
import type { IApisSdk, IRaribleInternalSdk } from "../../domain"
import { notImplemented } from "../../common/not-implemented"
import { FlowMint } from "./mint"
import { FlowSell } from "./sell"
import { FlowBuy } from "./buy"
import { FlowTransfer } from "./transfer"
import { FlowBurn } from "./burn"
import { FlowCancel } from "./cancel"
import { FlowBalance } from "./balance"
import { FlowNetwork } from "./domain"

export function createFlowSdk(
	wallet: Maybe<FlowWallet>,
	apis: IApisSdk,
	network: FlowNetwork,
	auth?: AuthWithPrivateKey
): IRaribleInternalSdk {
	const sdk = createFlowSdkInstance(wallet?.fcl!, network, auth) //todo allow to create flow sdk instance without fcl
	const sellService = new FlowSell(sdk, apis)

	return {
		nft: {
			mint: new FlowMint(sdk, apis).prepare,
			burn: new FlowBurn(sdk).burn,
			transfer: new FlowTransfer(sdk).transfer,
		},
		order: {
			sell: sellService.sell,
			sellUpdate: sellService.update,
			fill: new FlowBuy(sdk, apis).buy,
			bid: notImplemented,
			bidUpdate: notImplemented,
			cancel: new FlowCancel(sdk, apis).cancel,
		},
		balances: {
			getBalance: new FlowBalance(sdk).getBalance,
		},
	}
}
