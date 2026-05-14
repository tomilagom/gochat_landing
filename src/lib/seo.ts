import { SITE_URL, absoluteUrl } from './i18n';
import type { Lang } from './i18n';

const SAMEAS = ['https://www.linkedin.com/company/gohyppo'];

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'GoChat',
    url: `${SITE_URL}/`,
    logo: `${SITE_URL}/media/gochat_logo-1-300x134.png`,
    description: 'The AI Chatbot for any business — drag-and-drop automation flows on 12+ social channels.',
    email: 'hello@gochat.ar',
    sameAs: SAMEAS,
    parentOrganization: {
      '@type': 'Organization',
      name: 'Hyppo',
      url: 'https://hyppo.io',
    },
    address: [
      { '@type': 'PostalAddress', addressLocality: 'Barcelona', addressCountry: 'ES' },
      { '@type': 'PostalAddress', addressLocality: 'Buenos Aires', addressCountry: 'AR' },
    ],
  };
}

export function websiteSchema(lang: Lang) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'GoChat',
    url: absoluteUrl('/', lang),
    inLanguage: lang === 'es' ? 'es-ES' : 'en-US',
    publisher: { '@type': 'Organization', name: 'GoChat', url: `${SITE_URL}/` },
  };
}

export function softwareApplicationSchema(lang: Lang) {
  const isES = lang === 'es';
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'GoChat',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web, iOS, Android',
    description: isES
      ? 'Plataforma de chatbots con IA y automatización conversacional sobre 12+ canales sociales.'
      : 'AI chatbot and conversational automation platform across 12+ social channels.',
    offers: {
      '@type': 'Offer',
      price: '299',
      priceCurrency: 'USD',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: '299',
        priceCurrency: 'USD',
        unitText: 'MONTH',
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '125',
    },
    publisher: { '@type': 'Organization', name: 'GoChat', url: `${SITE_URL}/` },
  };
}

export function faqPageSchema(faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

const FAQS_EN = [
  { q: 'How do I get started?', a: 'Book a demo or start a 14-day free trial — no credit card required. You\'ll be in the builder in minutes.' },
  { q: 'Can I connect my WhatsApp with a QR Code?', a: 'You can, for trials and small accounts. For production-grade reliability we recommend the WhatsApp Business API — onboarded in minutes.' },
  { q: 'Can I purchase add-ons for the plans?', a: 'Yes. Add WhatsApp numbers, account members, and extra users à la carte. They\'re billed monthly alongside your plan.' },
  { q: 'Can I connect my WhatsApp Business account?', a: 'Yes. GoChat is a Meta Business Partner — you can connect your verified WhatsApp Business account directly from settings.' },
  { q: 'What is a user and how they count for the billing?', a: 'A user is a unique contact that has interacted with your bot in the billing period. Anonymous webchat visitors count only once they engage.' },
  { q: 'Is there an annual plan?', a: 'Yes. Annual billing saves about 10% versus monthly. Custom plans always include annual commitments.' },
  { q: 'How to pay for a subscription?', a: 'Major credit cards via Stripe, plus wire transfer for Enterprise + Custom plans.' },
  { q: 'What happens after my free trial ends?', a: 'Your workspace stays read-only for 30 days. Upgrade anytime to keep flows running and contact history intact.' },
  { q: 'What is GoChat?', a: 'GoChat is the AI Chatbot for any business — a drag-and-drop platform to build automation flows across 12+ channels, with AI agents on top.' },
  { q: 'Can I cancel my subscription at any time?', a: 'Yes — cancel anytime from settings. We\'ll keep your data on hold for 30 days in case you change your mind.' },
];

const FAQS_ES = [
  { q: '¿Cómo empiezo?', a: 'Solicita una demo o inicia una prueba gratis de 14 días — sin tarjeta de crédito. Estarás en el constructor en minutos.' },
  { q: '¿Puedo conectar mi WhatsApp con un código QR?', a: 'Sí, para pruebas y cuentas pequeñas. Para confiabilidad de producción recomendamos la API de WhatsApp Business — onboarding en minutos.' },
  { q: '¿Puedo comprar add-ons para los planes?', a: 'Sí. Añade números de WhatsApp, miembros de cuenta y usuarios extra a la carta. Se facturan mensualmente junto con tu plan.' },
  { q: '¿Puedo conectar mi cuenta de WhatsApp Business?', a: 'Sí. GoChat es Meta Business Partner — puedes conectar tu cuenta verificada de WhatsApp Business directamente desde la configuración.' },
  { q: '¿Qué es un usuario y cómo cuenta para la facturación?', a: 'Un usuario es un contacto único que interactuó con tu bot en el período de facturación. Los visitantes anónimos del webchat solo cuentan cuando interactúan.' },
  { q: '¿Hay un plan anual?', a: 'Sí. La facturación anual ahorra alrededor de un 10% frente a la mensual. Los planes Custom siempre incluyen compromiso anual.' },
  { q: '¿Cómo pago la suscripción?', a: 'Tarjetas de crédito principales vía Stripe, más transferencia bancaria para planes Enterprise y Custom.' },
  { q: '¿Qué pasa cuando termina mi prueba gratis?', a: 'Tu workspace queda en modo solo lectura por 30 días. Actualiza el plan cuando quieras para mantener los flujos activos y el historial intacto.' },
  { q: '¿Qué es GoChat?', a: 'GoChat es el Chatbot de IA para cualquier negocio — una plataforma drag-and-drop para construir flujos de automatización en 12+ canales, con agentes de IA por encima.' },
  { q: '¿Puedo cancelar mi suscripción cuando quiera?', a: 'Sí — cancela cuando quieras desde la configuración. Conservamos tus datos durante 30 días por si cambias de opinión.' },
];

export function homepageFaqsSchema(lang: Lang) {
  return faqPageSchema(lang === 'es' ? FAQS_ES : FAQS_EN);
}

export type BreadcrumbItem = { name: string; path: string };

export function breadcrumbListSchema(items: BreadcrumbItem[], lang: Lang) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path, lang),
    })),
  };
}
