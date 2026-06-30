// =============================================================================
//  SITE / BUSINESS CONFIG  —  EDIT YOUR CONTACT DETAILS HERE
// =============================================================================
//  Change the values below and they update everywhere on the site
//  (header, footer, floating WhatsApp button, contact section, enquiry links).
//
//  PHONE / WHATSAPP NUMBER FORMAT:
//   - `*Display` fields : how the number looks on screen, e.g. "+91 90477 12786"
//   - `*Dial` / `whatsapp` fields : digits only WITH country code, e.g. "919047712786"
//     (NO "+", NO spaces, NO dashes — just country code + number)
// =============================================================================

export const site = {
  name: 'Zyrah Properties',
  tagline: 'Building dreams, creating homes.',
  shortPitch:
    'Verified residential, agricultural and commercial land — transparent pricing, clear titles, and end-to-end support across Chennai.',

  logo: '/logo.jpg',

  // ---- PRIMARY contact (used by the global Call + WhatsApp buttons) ----
  // This is N. Mohamed Gani — the hero buttons, floating WhatsApp button, and
  // every "Enquire on WhatsApp" / "Call Now" button use these.
  phoneDisplay: '+91 90477 12786',
  phoneDial: '919047712786',
  whatsappDisplay: '+91 90477 12786',
  whatsappNumber: '919047712786',

  email: 'propertieszyrah@gmail.com',
  address: '33, 1st Floor, Ranganathan St, C. Pallavaram, Chennai - 600043',

  // OPTIONAL — email backup of contact-form submissions.
  // The form ALWAYS opens WhatsApp. If you also want an emailed copy of each
  // enquiry, get a FREE access key at https://web3forms.com (enter
  // propertieszyrah@gmail.com there), then paste the key below between the quotes.
  // Leave it '' to keep WhatsApp-only.
  web3formsKey: '9ee817fb-89b3-4c2f-8f20-64a1553e860f',

  // Google Maps directions link to the office (opens the Maps app / site).
  mapUrl:
    'https://www.google.com/maps?gs_lcrp=EgZjaHJvbWUqBggCEEUYOzIGCAAQRRg5Mg8IARAuGA0YrwEYxwEYgAQyBggCEEUYOzIICAMQABgWGB4yDQgEEAAYhgMYgAQYigUyBwgFEAAY7wUyCggGEAAYgAQYogQyCggHEAAYgAQYogTSAQg4OTQxajBqN6gCALACAA&um=1&ie=UTF-8&fb=1&gl=in&sa=X&geocode=KT9xV274X1I6MaIX0cFKyNn6&daddr=Pallavarm,+32,+Ranganathan+St,+Pallavaram,+Chennai,+Tamil+Nadu+600043',
  // Used for the small embedded office map in the Contact section.
  mapQuery: '33 Ranganathan St, Pallavaram, Chennai, Tamil Nadu 600043',

  // ---- Instagram ----
  instagram:
    'https://www.instagram.com/zyrah_properties?igsh=MW53bTI5MzAxM2E5eQ==',
  instagramHandle: 'zyrah_properties',

  // ---- Team / agents (shown in the Contact section, each with Call + WhatsApp) ----
  agents: [
    {
      name: 'N. Mohamed Gani',
      role: 'Proprietor',
      phoneDisplay: '+91 90477 12786',
      phoneDial: '919047712786',
      whatsapp: '919047712786',
    },
    {
      name: 'AR. Mohamed Saleem',
      role: 'Architect',
      phoneDisplay: '+91 90477 15786',
      phoneDial: '919047715786',
      whatsapp: '919047715786',
    },
  ],

  // ---- About copy ----
  about: {
    heading: 'Land you can buy with confidence',
    body: [
      'Zyrah Properties helps families and investors buy land without the usual guesswork. Every plot we list is title-verified, measured, and documented — so what you see is exactly what you get.',
      'From your first enquiry to registration, our team walks you through approvals, paperwork, and site visits. No hidden charges, no surprises.',
    ],
    highlights: [
      'Title-verified plots with clear documentation',
      'Transparent, all-inclusive pricing',
      'On-site visits & guided registration support',
    ],
  },

  // ---- Stats shown in the animated counter strip ----
  stats: [
    { label: 'Plots Sold', value: 120, suffix: '+' },
    { label: 'Locations', value: 15, suffix: '+' },
    { label: 'Happy Buyers', value: 350, suffix: '+' },
    { label: 'Years Experience', value: 20, suffix: '+' },
  ],
}

export default site
