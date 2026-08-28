export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export const navigation: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { 
    label: 'Products', 
    href: '/products',
    children: [
      { 
        label: 'Bolts and Nuts', 
        href: '/products/bolts-and-nuts',
        children: [
          { label: 'Hub Bolts', href: '/products/bolts-and-nuts/hub-bolts' },
          { label: 'Plow Bolts', href: '/products/bolts-and-nuts/plow-bolts' },
          { label: 'Track Bolts', href: '/products/bolts-and-nuts/track-bolts' },
          { label: 'Segment Bolts', href: '/products/bolts-and-nuts/segment-bolts' },
          { label: 'Hex Nuts', href: '/products/bolts-and-nuts/hex-nuts' },
          { label: 'Flange Nuts', href: '/products/bolts-and-nuts/flange-nuts' },
          { label: 'Nylon Nuts', href: '/products/bolts-and-nuts/nylon-nuts' },
          { label: 'Wheel Nuts', href: '/products/bolts-and-nuts/wheel-nuts' },
          { label: 'Slotted Nuts', href: '/products/bolts-and-nuts/slotted-nuts' },
        ],
      },
      { 
        label: 'Display Fixture', 
        href: '/products/display-rack',
        children: [
          { label: 'Supermarket Display Racks', href: '/products/display-rack/supermarket-display-racks' },
          { label: 'Pegboard & Slatwall Display', href: '/products/display-rack/wall-mounted-storage-racks' },
          { label: 'Clothing Display Racks', href: '/products/display-rack/clothing-display-racks' },
          { label: 'Wooden Display Racks', href: '/products/display-rack/wooden-display-racks' },
          { label: 'Display Tables & Stands', href: '/products/display-rack/newspaper-magazine-racks' },
        ],
      },
      { label: 'Stamping Parts', href: '/products/stamping-parts' },
      { label: 'Die Casting Parts', href: '/products/die-casting-parts' },
      { label: 'Forging Parts', href: '/products/forging-parts' },
      { label: 'Machining Parts', href: '/products/machining-parts' },
      { label: 'Welding Parts', href: '/products/welding-parts' },
      { label: 'Plastic and Rubber Parts', href: '/products/plastic-rubber-parts' },
      { label: 'Tooling and Moulds', href: '/products/tooling-and-moulds' },
      { label: 'Heavy Equipment Parts', href: '/products/heavy-equipment-parts' },
      { label: 'Auto Parts', href: '/products/auto-parts' },
      { label: 'Other Parts', href: '/products/other-parts' },
    ],
  },
  { label: 'Capabilities', href: '/capabilities' },
  { label: 'Factory', href: '/factory' },
  { label: 'Quality Control', href: '/quality' },
  { label: 'News', href: '/news' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Banking', href: '/banking' },
  { label: 'Contact Us', href: '/contact' },
];
