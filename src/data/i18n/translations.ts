import type { Lang } from './navigation';

// ─── Shared UI ───────────────────────────────────────────────────────────────
export const ui = {
  nav: {
    home:           { en: 'Home',           es: 'Inicio' },
    aboutUs:        { en: 'About Us',       es: 'Nosotros' },
    products:       { en: 'Products',       es: 'Productos' },
    capabilities:   { en: 'Capabilities',   es: 'Capacidades' },
    factory:        { en: 'Factory',        es: 'Fábrica' },
    quality:        { en: 'Quality Control', es: 'Calidad' },
    news:           { en: 'News',           es: 'Noticias' },
    faq:            { en: 'FAQ',            es: 'Preguntas Frecuentes' },
    banking:        { en: 'Banking',        es: 'Datos Bancarios' },
    contactUs:      { en: 'Contact Us',     es: 'Contáctenos' },
    viewAllProducts:{ en: 'View All Products', es: 'Ver Todos los Productos' },
    // sub-nav
    boltsAndNuts:   { en: 'Bolts and Nuts',         es: 'Pernos y Tuercas' },
    hubBolts:       { en: 'Hub Bolts',               es: 'Pernos de Rueda' },
    plowBolts:      { en: 'Plow Bolts',              es: 'Pernos de Arado' },
    trackBolts:     { en: 'Track Bolts',             es: 'Pernos de Oruga' },
    segmentBolts:   { en: 'Segment Bolts',           es: 'Pernos de Segmento' },
    nuts:           { en: 'Nuts',                     es: 'Tuercas' },
    hexNuts:        { en: 'Hex Nuts',                 es: 'Tuercas Hexagonales' },
    flangeNuts:     { en: 'Flange Nuts',              es: 'Tuercas de Brida' },
    nylonNuts:      { en: 'Nylon Insert Lock Nuts',  es: 'Tuercas Autoblocantes' },
    bpwNuts:        { en: 'BPW Nuts',                 es: 'Tuercas BPW' },
    stampingParts:  { en: 'Stamping Parts',           es: 'Piezas Estampadas' },
    dieCasting:     { en: 'Die Casting Parts',       es: 'Piezas de Fundición' },
    forgingParts:   { en: 'Forging Parts',            es: 'Piezas Forjadas' },
    machiningParts: { en: 'Machining Parts',          es: 'Piezas Mecanizadas' },
    weldingParts:   { en: 'Welding Parts',            es: 'Piezas Soldadas' },
    plasticRubber:   { en: 'Plastic and Rubber Parts', es: 'Piezas de Plástico y Caucho' },
    tooling:        { en: 'Tooling and Moulds',       es: 'Herramientas y Moldes' },
    heavyEquipment: { en: 'Heavy Equipment Parts',   es: 'Piezas para Maquinaria Pesada' },
    autoParts:      { en: 'Auto Parts',              es: 'Autopartes' },
    otherParts:     { en: 'Other Parts',             es: 'Otras Piezas' },
    displayRack:    { en: 'Display Fixture',           es: 'Exhibidores' },
  },
  common: {
    learnMore:    { en: 'Learn More',           es: 'Más Información' },
    viewProducts: { en: 'View Products',        es: 'Ver Productos' },
    getQuote:     { en: 'Get a Quote',           es: 'Solicitar Cotización' },
    requestQuote: { en: 'Request a Quote',      es: 'Solicitar Cotización' },
    browseProducts:{ en: 'Browse Products',     es: 'Explorar Productos' },
    viewAll:      { en: 'View All',              es: 'Ver Todo' },
    readMore:     { en: 'Read More',             es: 'Leer Más' },
    submit:       { en: 'Submit',                es: 'Enviar' },
    send:         { en: 'Send',                 es: 'Enviar' },
    download:     { en: 'Download',              es: 'Descargar' },
    yes:          { en: 'Yes',                  es: 'Sí' },
    no:           { en: 'No',                   es: 'No' },
    phone:        { en: 'Phone',                es: 'Teléfono' },
    email:        { en: 'Email',                es: 'Correo Electrónico' },
    address:      { en: 'Address',              es: 'Dirección' },
    loading:      { en: 'Loading...',           es: 'Cargando...' },
    thankYou:     { en: 'Thank You!',           es: '¡Gracias!' },
    backToHome:   { en: 'Back to Home',         es: 'Volver al Inicio' },
  },
  footer: {
    quickLinks: { en: 'Quick Links',    es: 'Enlaces Rápidos' },
    products:   { en: 'Products',      es: 'Productos' },
    contactUs:  { en: 'Contact Us',     es: 'Contáctenos' },
    allRights:  { en: 'All rights reserved.', es: 'Todos los derechos reservados.' },
    madeIn:     { en: 'Xiamen, China',  es: 'Xiamen, China' },
  },
  // SEO / meta
  siteName: {
    en: 'Xiamen Carelong Co., Ltd.',
    es: 'Xiamen Carelong Co., Ltd.',
  },
};

// ─── Homepage ─────────────────────────────────────────────────────────────────
export const home = {
  hero: {
    label:        { en: 'Manufacturer & Exporter — Xiamen, China', es: 'Fabricante y Exportador — Xiamen, China' },
    title:        { en: 'High Tensile Fasteners & Auto Parts Manufacturer', es: 'Fabricante de Pernos de Alta Resistencia y Autopartes' },
    description:  { en: 'Xiamen Carelong Co., Ltd. is a manufacturer of bolts, nuts, forging parts, stamping parts, die casting parts, machining parts, and more. <strong class="iso-cert">ISO 9001</strong> certified, exporting worldwide.', es: 'Xiamen Carelong Co., Ltd. es un fabricante de pernos, tuercas, piezas forjadas, piezas estampadas, piezas de fundición, piezas mecanizadas y más. Certificado <strong class="iso-cert">ISO 9001</strong>, exportando a todo el mundo.' },
    ctaProducts:  { en: 'View Products',     es: 'Ver Productos' },
    ctaQuote:     { en: 'Get a Quote',        es: 'Solicitar Cotización' },
  },
  about: {
    eyebrow:   { en: 'About Carelong',       es: 'Sobre Carelong' },
    title:     { en: 'Your Trusted Partner in Auto Parts Manufacturing', es: 'Su Socio Confiable en la Fabricación de Autopartes' },
    p1:        { en: 'Xiamen Carelong Co., Ltd. is a manufacturer and exporter of quality forging parts and high tensile auto fasteners. Our undercarriage spare parts are widely used on construction machinery, such as Caterpillar and Komatsu loaders.', es: 'Xiamen Carelong Co., Ltd. es un fabricante y exportador de piezas forjadas de calidad y sujetadores automáticos de alta resistencia. Nuestras piezas de tren de rodamiento se utilizan ampliamente en maquinaria de construcción, como cargadoras Caterpillar y Komatsu.' },
    p2:        { en: 'Our wheel bolts are used by Hino, Mitsubishi Fuso, Benz, Volvo, Nissan and Suzuki. We also source and assemble machinery parts, stamping parts, die casting parts and welding parts on demand. Products are exported to North America, Europe, Southeast Asia, and Taiwan.', es: 'Nuestros pernos de rueda son utilizados por Hino, Mitsubishi Fuso, Benz, Volvo, Nissan y Suzuki. También trabajamos bajo demanda para suministrar y ensamblar piezas de maquinaria, piezas estampadas, piezas de fundición y piezas soldadas. Los productos se exportan a Norteamérica, Europa, Sudeste Asiático y Taiwán.' },
    yearsLabel: { en: 'Years Experience',   es: 'Años de Experiencia' },
    countriesLabel:{ en: 'Countries Served',  es: 'Países Atendidos' },
    clientsLabel:  { en: 'Happy Clients',      es: 'Clientes Satisfechos' },
    cta:        { en: 'Learn More About Us',  es: 'Conózcanos Más' },
  },
  products: {
    eyebrow:  { en: 'Our Products',    es: 'Nuestros Productos' },
    title:    { en: 'What We Manufacture', es: 'Lo Que Fabricamos' },
    subtitle: { en: 'We specialize in precision-engineered auto parts with advanced manufacturing capabilities including cold heading and hot forging.', es: 'Nos especializamos en autopartes de precisión con capacidades avanzadas de fabricación, incluyendo embutición en frío y forjado en caliente.' },
  },
  capabilities: {
    eyebrow:   { en: 'Our Strength',           es: 'Nuestra Fuerza' },
    title:     { en: 'Manufacturing Excellence', es: 'Excelencia en Fabricación' },
    subtitle:  { en: 'State-of-the-art facilities and rigorous quality control ensure every part meets international standards.', es: 'Instalaciones de vanguardia y un riguroso control de calidad aseguran que cada pieza cumpla con los estándares internacionales.' },
    coldHeading: {
      title: { en: 'Cold Heading',    es: 'Embutición en Frío' },
      desc:  { en: 'Advanced cold forming technology for precision fasteners with superior mechanical properties.', es: 'Tecnología avanzada de formado en frío para sujetadores de precisión con propiedades mecánicas superiores.' },
    },
    hotForging: {
      title: { en: 'Hot Forging',     es: 'Forjado en Caliente' },
      desc:  { en: 'High-temperature forging for heavy-duty components with exceptional strength.', es: 'Forjado a alta temperatura para componentes de servicio pesado con resistencia excepcional.' },
    },
    machining: {
      title: { en: 'Machining',        es: 'Mecanizado' },
      desc:  { en: 'Precision CNC machining for secondary operations and custom part modifications.', es: 'Mecanizado CNC de precisión para operaciones secundarias y modificaciones de piezas personalizadas.' },
    },
    quality: {
      title: { en: 'Quality Control',   es: 'Control de Calidad' },
      desc:  { en: 'Multi-stage inspection process ensuring every product meets strict specifications.', es: 'Proceso de inspección multifásico que asegura que cada producto cumpla con especificaciones estrictas.' },
    },
    cta:     { en: 'Explore Our Capabilities', es: 'Explorar Nuestras Capacidades' },
  },
  cta: {
    title:    { en: 'Ready to Get Started?', es: '¿Listo para Comenzar?' },
    body:     { en: 'Contact us today for a free quote, product samples, or to discuss your custom manufacturing needs.', es: 'Contáctenos hoy para una cotización gratuita, muestras de productos o para discutir sus necesidades de fabricación personalizada.' },
    quoteBtn: { en: 'Request a Quote',       es: 'Solicitar Cotización' },
    browseBtn:{ en: 'Browse Products',        es: 'Explorar Productos' },
    orCall:   { en: 'Or call us directly:',   es: 'O llámenos directamente:' },
    contactPerson: { en: 'Jason Lin, Export Manager', es: 'Jason Lin, Gerente de Exportación' },
  },
  stats: {
    years:    { en: '20+', es: '20+' },
    countries: { en: '30+', es: '30+' },
    clients:   { en: '100+', es: '100+' },
  },
};

// ─── About ───────────────────────────────────────────────────────────────────
export const about = {
  pageTitle:  { en: 'About Xiamen Carelong - Professional Auto Parts Manufacturer Since 2005', es: 'Sobre Xiamen Carelong - Fabricante Profesional de Autopartes Desde 2005' },
  pageDesc:   { en: 'Learn about Xiamen Carelong Co., Ltd., a professional auto parts manufacturer established in 2005.', es: 'Conozca Xiamen Carelong Co., Ltd., un fabricante profesional de autopartes establecido en 2005.' },
  header: {
    h1:      { en: 'About Xiamen Carelong Co., Ltd.', es: 'Sobre Xiamen Carelong Co., Ltd.' },
    subtitle:{ en: 'Serving quality customers worldwide since 2005', es: 'Sirviendo a clientes de calidad en todo el mundo desde 2005' },
  },
  story: {
    eyebrow: { en: 'Our Story',               es: 'Nuestra Historia' },
    title:   { en: 'From Xiamen to the World', es: 'De Xiamen al Mundo' },
    p1:      { en: 'Xiamen Carelong Co., Ltd. is a professional manufacturer and exporter of quality forging parts and high tensile auto fasteners since 2005. Our products are widely used on construction machinery (Caterpillar, Komatsu) and automobiles (Hino, Mitsubishi Fuso, Benz, Volvo, Nissan, Suzuki).', es: 'Xiamen Carelong Co., Ltd. es un fabricante y exportador profesional de piezas forjadas de calidad y sujetadores automáticos de alta resistencia desde 2005. Nuestros productos se utilizan ampliamente en maquinaria de construcción (Caterpillar, Komatsu) y automóviles (Hino, Mitsubishi Fuso, Benz, Volvo, Nissan, Suzuki).' },
    p2:      { en: 'As an export company under a high-strength bolt and nut fastener manufacturer, in the course of over 20 years of fastener exports, to meet the supply needs of different customers, we have participated in investing in several manufacturing plants with strong competitiveness in injection molding, sheet metal, stamping, welding, machining, and rubber products, in order to ensure quality, competitive pricing, and reliable delivery.', es: 'Como filial de exportación de un fabricante de sujetadores de pernos y tuercas de alta resistencia, durante nuestros más de 20 años de experiencia en exportación de sujetadores, para satisfacer las necesidades de suministro de nuestros clientes, y basándonos en años de adquisiciones de subcontratación, hemos participado en invertir en varias plantas de fabricación con fortes ventajas competitivas en moldeo por inyección, fabricación de chapas, estampado, soldadura, mecanizado y productos de caucho — garantizando calidad, precios competitivos y entrega fiable.' },
    p3:      { en: '', es: '' },
  },
  timeline: {
    eyebrow: { en: 'Milestones',   es: 'Hitos' },
    title:   { en: 'Our Journey',   es: 'Nuestro Recorrido' },
    items: [
      {
        year: '2005',
        titleEn: 'Company Founded',
        titleEs: 'Fundación de la Empresa',
        descEn: 'To satisfy export demands, a high-strength fastener manufacturer founded in 1984 set up Xiamen Carelong Co., Ltd.',
        descEs: 'Para satisfacer las demandas de exportación, un fabricante de sujetadores de alta resistencia fundado en 1984 estableció Xiamen Carelong Co., Ltd.',
      },
      {
        year: '2012',
        titleEn: 'Export Expansion',
        titleEs: 'Expansión de Exportación',
        descEn: 'We set up a second sales department to help customers source metal parts, rubber parts, plastic parts and other components based on their samples or drawings.',
        descEs: 'Establecimos un segundo departamento de ventas para ayudar a los clientes aourcing piezas metálicas, piezas de caucho, piezas de plástico y otros componentes según sus muestras o dibujos.',
      },
      {
        year: '2015',
        titleEn: 'Production Upgrade',
        titleEs: 'Actualización de Producción',
        descEn: 'Invested in new cold heading and hot forging lines to increase capacity and product range.',
        descEs: 'Invertimos en nuevas líneas de embutición en frío y forjado en caliente para aumentar la capacidad y el rango de productos.',
      },
      {
        year: '2018',
        titleEn: 'Quality Certification',
        titleEs: 'Certificación de Calidad',
        descEn: 'Achieved ISO 9001 certification, formalizing our quality management system.',
        descEs: 'Logramos la certificación ISO 9001, formalizando nuestro sistema de gestión de calidad.',
      },
      {
        year: '2024',
        titleEn: 'Global Growth',
        titleEs: 'Crecimiento Global',
        descEn: 'Expanded product offerings to serve 30+ countries across 5 continents.',
        descEs: 'Expandimos nuestra oferta de productos para servir a más de 30 países en 5 continentes.',
      },
    ],
  },
  team: {
    eyebrow: { en: 'Our Team',       es: 'Nuestro Equipo' },
    title:   { en: 'Meet the People Behind Carelong', es: 'Conozca a las Personas Detrás de Carelong' },
    subtitle: { en: 'Our experienced team is dedicated to delivering quality products and excellent service to every customer.', es: 'Nuestro equipo experimentado está dedicado a entregar productos de calidad y excelente servicio a cada cliente.' },
  },
};

// ─── Contact ─────────────────────────────────────────────────────────────────
export const contact = {
  pageTitle: { en: 'Contact Xiamen Carelong - Get a Free Quote', es: 'Contáctenos - Solicite una Cotización Gratuita' },
  pageDesc:  { en: 'Contact Xiamen Carelong Co., Ltd. for product inquiries, quotes, and manufacturing partnership.', es: 'Contáctenos para consultas de productos, cotizaciones y asociación de fabricación.' },
  header: {
    h1:       { en: 'Contact Us',                  es: 'Contáctenos' },
    subtitle:  { en: 'Get in touch for product inquiries and quotes', es: 'Contáctenos para consultas de productos y cotizaciones' },
  },
  form: {
    name:       { en: 'Full Name',              es: 'Nombre Completo' },
    email:      { en: 'Email Address',         es: 'Correo Electrónico' },
    company:    { en: 'Company Name',          es: 'Nombre de la Empresa' },
    country:    { en: 'Country',               es: 'País' },
    phone:      { en: 'Phone Number',          es: 'Número de Teléfono' },
    product:    { en: 'Product Interest',      es: 'Producto de Interés' },
    message:    { en: 'Your Message',          es: 'Su Mensaje' },
    messagePlaceholder: {
      en: 'Please describe your requirements, target quantity, target price, and any other details...',
      es: 'Por favor describa sus requisitos, cantidad objetivo, precio objetivo y cualquier otro detalle...',
    },
    submit:     { en: 'Send Message',          es: 'Enviar Mensaje' },
    sending:    { en: 'Sending...',             es: 'Enviando...' },
    successTitle: { en: 'Message Sent!',       es: '¡Mensaje Enviado!' },
    successBody:  { en: 'Thank you for contacting Xiamen Carelong. We will respond to your inquiry within 24 hours.', es: 'Gracias por contactar a Xiamen Carelong. Responderemos a su consulta en 24 horas.' },
  },
  info: {
    title:      { en: 'Contact Information',    es: 'Información de Contacto' },
    person:     { en: 'Jason Lin',               es: 'Jason Lin' },
    role:       { en: 'Export Manager',          es: 'Gerente de Exportación' },
    tel:        { en: 'Phone',                  es: 'Teléfono' },
    emailLabel: { en: 'Email',                  es: 'Correo Electrónico' },
    addressLabel:{ en: 'Address',               es: 'Dirección' },
    hours:      { en: 'Working Hours',          es: 'Horario de Atención' },
    hoursValue: { en: '9:00 AM - 5:00 PM (GMT+8, Monday to Friday)', es: '9:00 AM - 5:00 PM (GMT+8, Lunes a Viernes)' },
    whatsapp:   { en: 'WhatsApp',               es: 'WhatsApp' },
    wechat:     { en: 'WeChat',                 es: 'WeChat' },
    linkedin:   { en: 'LinkedIn',               es: 'LinkedIn' },
  },
};

// ─── Products ─────────────────────────────────────────────────────────────────
export const products = {
  pageTitle: { en: 'Our Products - High Tensile Fasteners & Auto Parts', es: 'Nuestros Productos - Pernos de Alta Resistencia y Autopartes' },
  pageDesc:  { en: 'Browse our complete range of high tensile fasteners and auto parts.', es: 'Explore nuestra gama completa de sujetadores de alta resistencia y autopartes.' },
  header: {
    h1:       { en: 'Our Products',                es: 'Nuestros Productos' },
    subtitle:  { en: 'Precision-engineered parts for every application', es: 'Piezas de ingeniería de precisión para cada aplicación' },
  },
};

// ─── Capabilities ────────────────────────────────────────────────────────────
export const capabilities = {
  pageTitle: { en: 'Our Manufacturing Capabilities | Xiamen Carelong', es: 'Nuestras Capacidades de Fabricación | Xiamen Carelong' },
  pageDesc:  { en: 'State-of-the-art manufacturing equipment and processes.', es: 'Equipos y procesos de fabricación de vanguardia.' },
  header: {
    h1:       { en: 'Manufacturing Capabilities', es: 'Capacidades de Fabricación' },
    subtitle:  { en: 'Advanced equipment, rigorous standards', es: 'Equipos avanzados, estándares rigurosos' },
  },
};

// ─── Factory ─────────────────────────────────────────────────────────────────
export const factory = {
  pageTitle: { en: 'Our Factory | Xiamen Carelong', es: 'Nuestra Fábrica | Xiamen Carelong' },
  pageDesc:  { en: 'Take a virtual tour of our production facilities in Xiamen.', es: 'Haga una visita virtual a nuestras instalaciones de producción en Xiamen.' },
  header: {
    h1:       { en: 'Our Factory',            es: 'Nuestra Fábrica' },
    subtitle:  { en: 'Where quality is made', es: 'Donde se fabrica la calidad' },
  },
};

// ─── Quality ─────────────────────────────────────────────────────────────────
export const quality = {
  pageTitle: { en: 'Quality Control | Xiamen Carelong', es: 'Control de Calidad | Xiamen Carelong' },
  pageDesc:  { en: 'ISO 9001 certified quality management system.', es: 'Sistema de gestión de calidad certificado ISO 9001.' },
  header: {
    h1:       { en: 'Quality Control',      es: 'Control de Calidad' },
    subtitle:  { en: 'Every part, every standard', es: 'Cada pieza, cada estándar' },
  },
};

// ─── News ─────────────────────────────────────────────────────────────────────
export const news = {
  pageTitle: { en: 'Company News | Xiamen Carelong', es: 'Noticias de la Empresa | Xiamen Carelong' },
  pageDesc:  { en: 'Latest updates from Xiamen Carelong.', es: 'Últimas noticias de Xiamen Carelong.' },
  header: {
    h1:       { en: 'Company News',      es: 'Noticias de la Empresa' },
    subtitle:  { en: 'Latest updates',  es: 'Últimas actualizaciones' },
  },
};

// ─── FAQ ─────────────────────────────────────────────────────────────────────
export const faq = {
  pageTitle: { en: 'FAQ - Frequently Asked Questions | Xiamen Carelong', es: 'Preguntas Frecuentes | Xiamen Carelong' },
  pageDesc:  { en: 'Common questions about our products and services.', es: 'Preguntas comunes sobre nuestros productos y servicios.' },
  header: {
    h1:       { en: 'Frequently Asked Questions', es: 'Preguntas Frecuentes' },
    subtitle:  { en: 'Everything you need to know', es: 'Todo lo que necesita saber' },
  },
};

// ─── Banking ─────────────────────────────────────────────────────────────────
export const banking = {
  pageTitle: { en: 'Banking Information | Xiamen Carelong', es: 'Información Bancaria | Xiamen Carelong' },
  pageDesc:  { en: 'Bank details for wire transfers.', es: 'Datos bancarios para transferencias.' },
  header: {
    h1:       { en: 'Banking Information',  es: 'Información Bancaria' },
    subtitle:  { en: 'Wire transfer details', es: 'Detalles para transferencia bancaria' },
  },
};

// ─── 404 ─────────────────────────────────────────────────────────────────────
export const notFound = {
  title:   { en: 'Page Not Found',        es: 'Página No Encontrada' },
  body:    { en: 'The page you are looking for does not exist.', es: 'La página que busca no existe.' },
  homeLink:{ en: 'Go to Homepage',        es: 'Ir al Inicio' },
};
