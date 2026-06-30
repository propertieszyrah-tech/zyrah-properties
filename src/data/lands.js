// =============================================================================
//  LAND LISTINGS  —  ADD / EDIT / REMOVE YOUR PLOTS HERE
// =============================================================================
//
//  This is the ONLY file you need to touch to manage listings.
//
//  ▸ TO ADD A NEW PLOT:  copy one full { ... } block below (from the opening
//    brace to the closing brace + comma), paste it into the array, and edit
//    the values. Make sure every plot has a UNIQUE `id`.
//
//  ▸ TO REMOVE A PLOT:   delete its entire { ... } block (and the trailing comma).
//
//  ▸ TO MARK AS SOLD:    change  status: 'Available'  to  status: 'Sold'
//                        (allowed: 'Available' | 'Under Offer' | 'Sold')
//
//  ----------------------------------------------------------------------------
//  FIELD GUIDE (every plot supports these fields):
//    id          : unique string, e.g. 'zp-005'           (REQUIRED, unique)
//    title       : listing headline                        (REQUIRED)
//    type        : 'Residential' | 'Agricultural' | 'Commercial'
//    status      : 'Available' | 'Under Offer' | 'Sold'
//    location    : { area, city, district, state }
//    price       : number in rupees, e.g. 4500000          (used for filtering)
//    priceLabel  : optional text shown next to price, e.g. '₹3,200 / sq.ft'
//    size        : { cents, acres, sqft }   (any you know; others can be 0/null)
//    dimensions  : e.g. '40 ft x 60 ft'
//    facing      : 'North' | 'South' | 'East' | 'West' (or 'North-East', etc.)
//    roadAccess  : e.g. '30 ft tar road'
//    surveyNumber: e.g. 'S.No. 142/3B'
//    patta       : e.g. 'Available (Patta No. 1123)'
//    approval    : e.g. 'DTCP Approved' / 'RERA: TN/29/Building/0123/2024'
//    latitude    : number for the Google Map, e.g. 13.0827
//    longitude   : number for the Google Map, e.g. 80.2707
//    nearby      : array of strings (landmarks/amenities)
//    description : full paragraph(s) of description
//    images      : array of image URLs (first one is the cover image)
//  ----------------------------------------------------------------------------
//  TIP: replace the Unsplash placeholder image URLs with your own photos.
//  You can drop photos into the /public folder and reference them as
//  '/my-plot-1.jpg', or paste any hosted image URL.
// =============================================================================

export const lands = [
  {
    id: 'zp-001',
    title: 'Sunrise Residential Plot near OMR',
    type: 'Residential',
    status: 'Available',
    location: {
      area: 'Siruseri',
      city: 'Chennai',
      district: 'Chengalpattu',
      state: 'Tamil Nadu',
    },
    price: 4500000,
    priceLabel: '₹3,200 / sq.ft',
    size: { cents: 5, acres: 0.05, sqft: 2178 },
    dimensions: '40 ft x 54 ft',
    facing: 'East',
    roadAccess: '30 ft tar road',
    surveyNumber: 'S.No. 142/3B',
    patta: 'Available (Patta No. 1123)',
    approval: 'DTCP Approved',
    latitude: 12.8265,
    longitude: 80.2279,
    nearby: [
      'SIPCOT IT Park — 2.5 km',
      'Global Hospital — 4 km',
      'Reputed CBSE School — 1.8 km',
      'OMR (IT Expressway) — 3 km',
    ],
    description:
      'A premium east-facing residential plot in the fast-growing Siruseri belt, minutes from the SIPCOT IT corridor. Ideal for building your dream home or a long-term investment with strong appreciation. Clear title, ready for immediate registration.',
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1592595896551-12b371d546d5?auto=format&fit=crop&w=1200&q=80',
    ],
  },

  {
    id: 'zp-002',
    title: 'Fertile Agricultural Land with Borewell',
    type: 'Agricultural',
    status: 'Available',
    location: {
      area: 'Tiruvallur',
      city: 'Tiruvallur',
      district: 'Tiruvallur',
      state: 'Tamil Nadu',
    },
    price: 7800000,
    priceLabel: '₹13 Lakh / acre',
    size: { cents: 600, acres: 6, sqft: 261360 },
    dimensions: 'Irregular (6 acres)',
    facing: 'North',
    roadAccess: '20 ft mud + panchayat road',
    surveyNumber: 'S.No. 58/2',
    patta: 'Available (Joint Patta)',
    approval: 'Agricultural — conversion possible',
    latitude: 13.1439,
    longitude: 79.9094,
    nearby: [
      'Cooum River canal — 0.5 km',
      'Village market — 2 km',
      'State Highway — 3.5 km',
    ],
    description:
      'Six acres of fertile, well-irrigated agricultural land with an existing borewell and steady water table. Currently under paddy and vegetable cultivation. Excellent for farming, a farmhouse retreat, or future development given the improving connectivity.',
    images: [
      'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=1200&q=80',
    ],
  },

  {
    id: 'zp-003',
    title: 'Commercial Corner Plot on Main Road',
    type: 'Commercial',
    status: 'Under Offer',
    location: {
      area: 'Avinashi Road',
      city: 'Coimbatore',
      district: 'Coimbatore',
      state: 'Tamil Nadu',
    },
    price: 18500000,
    priceLabel: '₹9,500 / sq.ft',
    size: { cents: 9, acres: 0.09, sqft: 3920 },
    dimensions: '56 ft x 70 ft',
    facing: 'North-East',
    roadAccess: '80 ft state highway frontage',
    surveyNumber: 'S.No. 311/1A',
    patta: 'Available (Patta No. 4567)',
    approval: 'DTCP Approved — Commercial',
    latitude: 11.0168,
    longitude: 77.0,
    nearby: [
      'Coimbatore Airport — 6 km',
      'Tech park & malls — 2 km',
      'Highway junction — 0.3 km',
    ],
    description:
      'A high-visibility corner commercial plot with 80 ft road frontage on the busy Avinashi Road. Perfect for a showroom, retail outlet, clinic, or office. Heavy footfall and excellent connectivity make this a rare commercial opportunity.',
    images: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?auto=format&fit=crop&w=1200&q=80',
    ],
  },

  {
    id: 'zp-004',
    title: 'Gated Community Villa Plot',
    type: 'Residential',
    status: 'Sold',
    location: {
      area: 'Sholinganallur',
      city: 'Chennai',
      district: 'Chengalpattu',
      state: 'Tamil Nadu',
    },
    price: 6200000,
    priceLabel: '₹4,100 / sq.ft',
    size: { cents: 3.5, acres: 0.035, sqft: 1524 },
    dimensions: '30 ft x 50 ft',
    facing: 'West',
    roadAccess: '40 ft internal layout road',
    surveyNumber: 'S.No. 89/7C',
    patta: 'Available',
    approval: 'RERA: TN/29/Layout/0456/2023',
    latitude: 12.901,
    longitude: 80.2279,
    nearby: [
      'Clubhouse & park (within layout)',
      'ELCOT SEZ — 3 km',
      'Beach — 5 km',
    ],
    description:
      'A premium villa plot inside a RERA-approved gated community with a clubhouse, park, and 24/7 security. Underground drainage, street lighting, and ready infrastructure. (This plot has been sold — shown here as an example.)',
    images: [
      'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=1200&q=80',
    ],
  },
]

export default lands
