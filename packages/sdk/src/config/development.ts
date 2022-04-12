import type { RaribleSdkConfig } from "./domain"

export const developmentConfig: RaribleSdkConfig = {
	basePath: "https://dev-api.rarible.org",
	ethereumEnv: "dev-ethereum",
	flowEnv: "dev-testnet",
	tezosNetwork: "hangzhou",
	polygonNetwork: "dev-polygon",
}
