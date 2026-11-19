// 产品主图集中映射 (Single Source of Truth)
// 换图时只改这里一处，所有主页/产品分类页/详情页/Schema 自动同步。
// 注意：换图必须换文件名(版本号 +1)，否则浏览器/CDN 缓存会导致看不到变化。
export const productImages = {
  hubBolt: '/images/products/bolts-and-nuts/hub-bolts/hub-bolt-01-v2.webp',
  plowBolt: '/images/products/bolts-and-nuts/plow-bolts/plow-bolt-01-v2.webp',
  trackBolt: '/images/products/bolts-and-nuts/track-bolts/track-bolt-01-v2.webp',
  segmentBolt: '/images/products/bolts-and-nuts/segment-bolts/segment-bolt-01-v2.webp',
  hexNut: '/images/products/bolts-and-nuts/hex-nuts/hex-nuts-01-v2.webp',
  flangeNut: '/images/products/bolts-and-nuts/flange-nuts/flange-nuts-01-v2.webp',
  nylonNut: '/images/products/bolts-and-nuts/nylon-nuts/nylon-nuts-01-v2.webp',
  wheelNut: '/images/products/bolts-and-nuts/wheel-nuts/wheel-nuts-01-v2.webp',
  slottedNut: '/images/products/bolts-and-nuts/slotted-nuts/slotted-nuts-01-v2.webp',
  supermarketRack: '/images/products/display-rack/supermarket-display-racks-01-v2.webp',
  pegboardRack: '/images/products/display-rack/pegboard-slatwall-01-v2.webp',
  clothingRack: '/images/products/display-rack/clothing-racks-01-v2.webp',
  woodenRack: '/images/products/display-rack/wooden-racks-01-v2.webp',
  newspaperRack: '/images/products/display-rack/newspaper-racks-01-v2.webp',
  wallMountedRack: '/images/products/display-rack/wall-mounted-racks-01-v2.webp',
  stainlessStamp: '/images/products/stamping-parts/stainless-steel-stamping/stainless-01.webp',
  carbonStamp: '/images/products/stamping-parts/carbon-steel-stamping/carbon-01.webp',
  alumStamp: '/images/products/stamping-parts/aluminum-alloy-stamping/alum-01.webp',
  copperStamp: '/images/products/stamping-parts/copper-brass-stamping/copper-01.webp',
  galvStamp: '/images/products/stamping-parts/galvanized-aluzinc-stamping/galv-01.webp',
  stamping: '/images/products/stamping-parts/stamping-parts-01-v2.webp',
  dieCasting: '/images/products/die-casting-parts/die-casting-parts-01-v2.webp',
  forging: '/images/products/forging-parts/forging-parts-01-v3.webp',
  machining: '/images/products/machining-parts/machining-parts-01-v2.webp',
  welding: '/images/products/welding-parts/welding-parts-01-v2.webp',
  plasticRubber: '/images/products/plastic-rubber-parts/plastic-rubber-parts-01-v2.webp',
  tooling: '/images/products/tooling-and-moulds/tooling-and-moulds-01-v2.webp',
  heavyEquipment: '/images/products/heavy-equipment-parts/heavy-equipment-parts-01-v2.webp',
  autoParts: '/images/products/auto-parts/auto-parts-1-v2.webp',
  otherParts: '/images/products/other-parts/other-parts-01-v2.webp',
  trackBushing: '/images/products/track-bushing-and-track-pin/track-bushing-and-track-pin-main.webp',
} as const;

export type ProductImageKey = keyof typeof productImages;

export function productImg(key: ProductImageKey): string {
  return productImages[key];
}
