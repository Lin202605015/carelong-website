export type Lang = 'en' | 'es';

export const langNames: Record<Lang, string> = {
  en: 'English',
  es: 'Español',
};

export const langFlags: Record<Lang, string> = {
  en: '🇬🇧',
  es: '🇪🇸',
};

export interface NavItem {
  label: Record<Lang, string>;
  href: string;
  children?: NavItem[];
}

export const navigation: NavItem[] = [
  {
    label: { en: 'Home', es: 'Inicio' },
    href: '/',
  },
  {
    label: { en: 'About Us', es: 'Nosotros' },
    href: '/about',
  },
  {
    label: { en: 'Products', es: 'Productos' },
    href: '/products',
    children: [
      {
        label: { en: 'Bolts and Nuts', es: 'Pernos y Tuercas' },
        href: '/products/bolts-and-nuts',
        children: [
          {
            label: { en: 'Hub Bolts', es: 'Pernos de Rueda' },
            href: '/products/bolts-and-nuts/hub-bolts',
          },
          {
            label: { en: 'Plow Bolts', es: 'Pernos de Arado' },
            href: '/products/bolts-and-nuts/plow-bolts',
          },
          {
            label: { en: 'Track Bolts', es: 'Pernos de Oruga' },
            href: '/products/bolts-and-nuts/track-bolts',
          },
          {
            label: { en: 'Segment Bolts', es: 'Pernos de Segmento' },
            href: '/products/bolts-and-nuts/segment-bolts',
          },
          {
            label: { en: 'Hex Nuts', es: 'Tuercas Hexagonales' },
            href: '/products/bolts-and-nuts/hex-nuts',
          },
          {
            label: { en: 'Flange Nuts', es: 'Tuercas de Brida' },
            href: '/products/bolts-and-nuts/flange-nuts',
          },
          {
            label: { en: 'Nylon Nuts', es: 'Tuercas de Nylon' },
            href: '/products/bolts-and-nuts/nylon-nuts',
          },
          {
            label: { en: 'Wheel Nuts', es: 'Tuercas de Rueda' },
            href: '/products/bolts-and-nuts/wheel-nuts',
          },
          {
            label: { en: 'Slotted Nuts', es: 'Tuercas Ranuradas' },
            href: '/products/bolts-and-nuts/slotted-nuts',
          },
        ],
      },
      {
        label: { en: 'Display Fixture', es: 'Exhibidores' },
        href: '/products/display-rack',
        children: [
          { label: { en: 'Supermarket Display Racks', es: 'Exhibidores para Supermercados' }, href: '/products/display-rack/supermarket-display-racks' },
          { label: { en: 'Pegboard & Slatwall Display', es: 'Exhibidores de Pegboard y Slatwall' }, href: '/products/display-rack/wall-mounted-storage-racks' },
          { label: { en: 'Clothing Display Racks', es: 'Exhibidores de Ropa' }, href: '/products/display-rack/clothing-display-racks' },
          { label: { en: 'Wooden Display Racks', es: 'Exhibidores de Madera' }, href: '/products/display-rack/wooden-display-racks' },
          { label: { en: 'Display Tables & Stands', es: 'Mesas y Soportes de Exhibición' }, href: '/products/display-rack/newspaper-magazine-racks' },
        ],
      },
      {
        label: { en: 'Stamping Parts', es: 'Piezas Estampadas' },
        href: '/products/stamping-parts',
      },
      {
        label: { en: 'Die Casting Parts', es: 'Piezas de Fundición' },
        href: '/products/die-casting-parts',
      },
      {
        label: { en: 'Forging Parts', es: 'Piezas Forjadas' },
        href: '/products/forging-parts',
      },
      {
        label: { en: 'Machining Parts', es: 'Piezas Mecanizadas' },
        href: '/products/machining-parts',
      },
      {
        label: { en: 'Welding Parts', es: 'Piezas Soldadas' },
        href: '/products/welding-parts',
      },
      {
        label: { en: 'Plastic and Rubber Parts', es: 'Piezas de Plástico y Caucho' },
        href: '/products/plastic-rubber-parts',
      },
      {
        label: { en: 'Tooling and Moulds', es: 'Herramientas y Moldes' },
        href: '/products/tooling-and-moulds',
      },
      {
        label: { en: 'Heavy Equipment Parts', es: 'Piezas para Maquinaria Pesada' },
        href: '/products/heavy-equipment-parts',
      },
      {
        label: { en: 'Auto Parts', es: 'Autopartes' },
        href: '/products/auto-parts',
      },
      {
        label: { en: 'Other Parts', es: 'Otras Piezas' },
        href: '/products/other-parts',
      },
    ],
  },
  {
    label: { en: 'Capabilities', es: 'Capacidades' },
    href: '/capabilities',
  },
  {
    label: { en: 'Factory', es: 'Fábrica' },
    href: '/factory',
  },
  {
    label: { en: 'Quality Control', es: 'Calidad' },
    href: '/quality',
  },
  {
    label: { en: 'News', es: 'Noticias' },
    href: '/news',
  },
  {
    label: { en: 'FAQ', es: 'Preguntas Frecuentes' },
    href: '/faq',
  },
  {
    label: { en: 'Contact Us', es: 'Contáctenos' },
    href: '/contact',
  },
];