export type SellerRuntimeConfig = {
  readonly appName: string;
  readonly apiBaseUrl: string;
  readonly remotes: {
    readonly productManifest: string;
    readonly inventoryManifest: string;
  };
};

export const defaultRuntimeConfig: Readonly<SellerRuntimeConfig> = {
  appName: "Grab Store",
  apiBaseUrl: "/api",
  remotes: {
    productManifest: "/mfe/product/mf-manifest.json",
    inventoryManifest: "/mfe/inventory/mf-manifest.json",
  },
};
