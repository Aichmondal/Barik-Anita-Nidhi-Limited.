/**
 * Our Projects - Resort & Homestay Portfolio Data
 * Extensible data structure supporting multi-property expansion
 */

export interface PropertyMealPlan {
  name: string;
  description: string;
  iconName: 'sun' | 'coffee' | 'utensils' | 'moon';
}

export interface PropertyContact {
  label: string;
  displayNumber: string;
  telUri: string;
  ariaLabel: string;
}

export interface PropertyImage {
  id: string;
  src: string;
  fallbackSrc: string;
  alt: string;
  title: string;
}

export interface ProjectProperty {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  category: string;
  location: {
    landmark: string;
    area: string;
    district: string;
    state: string;
    country: string;
    displayShort: string;
    displayFull: string;
  };
  pricing: {
    advertisedRate: string;
    amount: number;
    currency: string;
    periodDisplay: string;
    ratePeriodNotice: string;
    rateClarification: string;
  };
  booking: {
    isOpen: boolean;
    statusLabel: string;
    flexibility: string;
    notice: string;
  };
  hospitality: {
    lodgingType: string;
    diningSummary: string;
    meals: PropertyMealPlan[];
  };
  description: {
    headline: string;
    paragraphs: string[];
    secondaryHeadline: string;
    secondaryParagraphs: string[];
    closingLine: string;
  };
  contacts: {
    contact1: PropertyContact;
    contact2: PropertyContact;
    whatsappEnquiry: {
      number: string;
      displayNumber: string;
      prefilledMessage: string;
      url: string;
      disclaimer: string;
    };
  };
  cardImage: PropertyImage;
  heroImage: PropertyImage;
  gallery: PropertyImage[];
  sources: {
    projectListingUrl: string;
    propertyDetailUrl: string;
  };
}

export interface OurProjectsSectionData {
  badge: string;
  heading: string;
  subheading: string;
  description: string;
  properties: ProjectProperty[];
}

export const ourProjectsData: OurProjectsSectionData = {
  badge: 'Community Initiatives & Hospitality',
  heading: 'Our Projects',
  subheading: 'Nature Retreats & Eco Homestays',
  description:
    'Promoting sustainable eco-tourism, local community empowerment, and authentic hospitality across North Bengal.',
  properties: [
    {
      id: 'property-riverview-homestay',
      slug: 'riverview-homestay',
      name: 'Riverview Homestay, Darjeeling',
      tagline: 'Where Nature Feels Like Home',
      category: 'Riverside Eco Retreat & Homestay',
      location: {
        landmark: 'Near Jogighat Bridge',
        area: 'Sittong Jogighat',
        district: 'Darjeeling',
        state: 'West Bengal',
        country: 'India',
        displayShort: 'Sittong Jogighat, Darjeeling, West Bengal',
        displayFull: 'Sittong Jogighat, Darjeeling, West Bengal, India'
      },
      pricing: {
        advertisedRate: '₹1,400',
        amount: 1400,
        currency: '₹',
        periodDisplay: 'per night',
        ratePeriodNotice: '₹1,400 per night (parent listing notes ₹1,400/day — rate period to be confirmed upon enquiry)',
        rateClarification: 'Subject to confirmation of the rate period (night/day). Rate does not assume per-person or per-room classification until confirmed by property desk.'
      },
      booking: {
        isOpen: true,
        statusLabel: 'Booking is open',
        flexibility: 'Adjustable bookings available',
        notice: 'Direct booking enquiry via verified property desk numbers. Subject to seasonal room availability.'
      },
      hospitality: {
        lodgingType: 'Lodging with Home-Style Food',
        diningSummary: 'Authentic local home-cooked Himalayan meals prepared fresh daily with warm hospitality.',
        meals: [
          {
            name: 'Breakfast',
            description: 'Energizing morning tea with freshly prepared hot breakfast.',
            iconName: 'coffee'
          },
          {
            name: 'Lunch',
            description: 'Traditional wholesome home-style lunch featuring regional flavors.',
            iconName: 'utensils'
          },
          {
            name: 'Evening Tiffin',
            description: 'Warm evening snacks and mountain tea as dusk sets over the hills.',
            iconName: 'sun'
          },
          {
            name: 'Dinner',
            description: 'Satisfying home-cooked dinner served in a cozy family atmosphere.',
            iconName: 'moon'
          }
        ]
      },
      description: {
        headline: 'Where Nature Feels Like Home',
        paragraphs: [
          'Escape the noise of everyday life and discover the perfect blend of comfort, nature, and warm hospitality at Riverview Homestay. Nestled amidst lush green hills and overlooking the serene riverside, our homestay is a peaceful retreat for families, couples, friends, and nature lovers.',
          'Wake up to the soothing sounds of birds, enjoy breathtaking mountain views, breathe in the fresh air, and unwind in our spacious, cozy rooms designed to make you feel right at home.',
          'Whether you’re planning a relaxing weekend, a family vacation, or simply looking for a quiet place to reconnect with nature, Riverview Homestay offers an unforgettable experience filled with comfort, scenic beauty, and genuine hospitality.'
        ],
        secondaryHeadline: 'Experience Nature. Experience Comfort.',
        secondaryParagraphs: [
          'Whether you’re enjoying your morning tea with breathtaking views, relaxing under the open sky, or spending quality time with your loved ones, every moment at Riverview Homestay is designed to create memories you’ll cherish forever.',
          'Your perfect getaway starts here. Book your stay today and make every moment memorable.'
        ],
        closingLine: 'Come as our guest, leave as family.'
      },
      contacts: {
        contact1: {
          label: 'Call Booking Contact 1',
          displayNumber: '+91 70632 93171',
          telUri: 'tel:+917063293171',
          ariaLabel: 'Call Booking Contact 1 at +91 70632 93171'
        },
        contact2: {
          label: 'Call Booking Contact 2',
          displayNumber: '+91 62966 63717',
          telUri: 'tel:+916296663717',
          ariaLabel: 'Call Booking Contact 2 at +91 62966 63717'
        },
        whatsappEnquiry: {
          number: '+91 70632 93171',
          displayNumber: '+91 70632 93171',
          prefilledMessage:
            'Hello, I would like to enquire about booking RiverView Homestay at Sittong Jogighat, Darjeeling. Please share the current rates, room availability, and booking details.',
          url:
            'https://wa.me/917063293171?text=Hello,%20I%20would%20like%20to%20enquire%20about%20booking%20RiverView%20Homestay%20at%20Sittong%20Jogighat,%20Darjeeling.%20Please%20share%20the%20current%20rates,%20room%20availability,%20and%20booking%20details.',
          disclaimer: 'This opens a direct enquiry chat. Booking is completed upon confirmation from the homestay host.'
        }
      },
      cardImage: {
        id: 'img-card',
        src: '/assets/images/projects/riverview-card.webp',
        fallbackSrc: '/assets/images/projects/riverview-card.jpg',
        alt: 'RiverView Homestay prominent promotional poster at Sittong Jogighat, Darjeeling',
        title: 'RiverView Homestay - Sittong Jogighat'
      },
      heroImage: {
        id: 'img-hero',
        src: '/assets/images/projects/riverview-5.webp',
        fallbackSrc: '/assets/images/projects/riverview-5.jpg',
        alt: 'Panoramic mountain and riverside view of RiverView Homestay in Sittong Jogighat, Darjeeling',
        title: 'RiverView Homestay Scenic Valley'
      },
      gallery: [
        {
          id: 'gal-1',
          src: '/assets/images/projects/riverview-5.webp',
          fallbackSrc: '/assets/images/projects/riverview-5.jpg',
          alt: 'Lush green mountain slopes and riverside surroundings at Sittong Jogighat',
          title: 'Valley & River Vista'
        },
        {
          id: 'gal-2',
          src: '/assets/images/projects/riverview-1.webp',
          fallbackSrc: '/assets/images/projects/riverview-1.jpg',
          alt: 'RiverView Homestay property exterior set against Darjeeling hills',
          title: 'Homestay Exterior'
        },
        {
          id: 'gal-3',
          src: '/assets/images/projects/riverview-2.webp',
          fallbackSrc: '/assets/images/projects/riverview-2.jpg',
          alt: 'Serene riverside landscapes and natural environment at Sittong Jogighat',
          title: 'Riverside Scenery'
        },
        {
          id: 'gal-4',
          src: '/assets/images/projects/riverview-4.webp',
          fallbackSrc: '/assets/images/projects/riverview-4.jpg',
          alt: 'Comfortable, cozy guest room accommodations at RiverView Homestay',
          title: 'Cozy Guest Accommodation'
        },
        {
          id: 'gal-5',
          src: '/assets/images/projects/riverview-6.webp',
          fallbackSrc: '/assets/images/projects/riverview-6.jpg',
          alt: 'Warm home-style dining area and kitchen hospitality at RiverView Homestay',
          title: 'Home-Style Hospitality'
        },
        {
          id: 'gal-6',
          src: '/assets/images/projects/riverview-7.webp',
          fallbackSrc: '/assets/images/projects/riverview-7.jpg',
          alt: 'Riverside nature path and peaceful retreat environment',
          title: 'Nature Walk & Riverside'
        },
        {
          id: 'gal-7',
          src: '/assets/images/projects/riverview-9.webp',
          fallbackSrc: '/assets/images/projects/riverview-9.jpg',
          alt: 'Evening tranquility and mountain ambiance at RiverView Homestay',
          title: 'Peaceful Mountain Evening'
        },
        {
          id: 'gal-8',
          src: '/assets/images/projects/riverview-10.webp',
          fallbackSrc: '/assets/images/projects/riverview-10.jpg',
          alt: 'Picturesque terraced hillsides and orange groves typical of Sittong',
          title: 'Sittong Hillscapes'
        },
        {
          id: 'gal-9',
          src: '/assets/images/projects/riverview-11.webp',
          fallbackSrc: '/assets/images/projects/riverview-11.jpg',
          alt: 'Open air relaxation area with mountain vistas at the homestay',
          title: 'Open Sky Sit-Out'
        },
        {
          id: 'gal-10',
          src: '/assets/images/projects/riverview-12.webp',
          fallbackSrc: '/assets/images/projects/riverview-12.jpg',
          alt: 'Neat, comfortable bedding and restful rooms for family stays',
          title: 'Restful Guest Rooms'
        },
        {
          id: 'gal-11',
          src: '/assets/images/projects/riverview-3.webp',
          fallbackSrc: '/assets/images/projects/riverview-3.jpg',
          alt: 'Balcony viewpoint overlooking riverside landscape',
          title: 'Riverside Balcony'
        },
        {
          id: 'gal-12',
          src: '/assets/images/projects/riverview-13.webp',
          fallbackSrc: '/assets/images/projects/riverview-13.jpg',
          alt: 'Jogighat wooden bridge and river crab stream near Sittong',
          title: 'Historic Jogighat Spot'
        }
      ],
      sources: {
        projectListingUrl: 'https://sites.google.com/view/barikanitanidhilimited/our-projects',
        propertyDetailUrl: 'https://sites.google.com/view/barikanitanidhilimited/our-projects/riverview-homestay'
      }
    },
    {
      id: 'property-hotel-newa-gangtok',
      slug: 'hotel-newa-gangtok',
      name: 'Hotel Newa, Gangtok',
      tagline: 'MG Market, Gangtok, Sikkim',
      category: 'Hospitality / Hotel',
      location: {
        landmark: 'MG Market & Baluwakhani Road (NH 10)',
        area: 'MG Market Area',
        district: 'Gangtok',
        state: 'Sikkim',
        country: 'India',
        displayShort: 'MG Market, Gangtok, Sikkim',
        displayFull: 'MG Market, Gangtok, Sikkim, India'
      },
      pricing: {
        advertisedRate: '₹1,500',
        amount: 1500,
        currency: '₹',
        periodDisplay: 'per night',
        ratePeriodNotice: '₹1,500 per night for guest room accommodations',
        rateClarification: 'Advertised rate is ₹1,500 per night. Direct booking tariffs available for Double, Twin, and Triple-bed family configurations.'
      },
      booking: {
        isOpen: true,
        statusLabel: 'Booking is open',
        flexibility: 'Advance & Adjustable Bookings Available',
        notice: 'Official booking desk for Hotel Newa coordinated directly at +91 62966 63717.'
      },
      hospitality: {
        lodgingType: 'Hotel Accommodation & In-House Dining',
        diningSummary: 'Spacious in-house dining hall and modern commercial kitchen serving fresh meals and regional specialties.',
        meals: [
          {
            name: 'Breakfast',
            description: 'Hot morning tea, coffee, and freshly prepared breakfast.',
            iconName: 'coffee'
          },
          {
            name: 'Lunch',
            description: 'Delicious regional Sikkimese and Indian dishes served in the dining hall.',
            iconName: 'utensils'
          },
          {
            name: 'Evening Tiffin',
            description: 'Warm evening snacks and tea after touring Gangtok and MG Marg.',
            iconName: 'sun'
          },
          {
            name: 'Dinner',
            description: 'Wholesome home-style dinner prepared fresh in the commercial kitchen.',
            iconName: 'moon'
          }
        ]
      },
      description: {
        headline: 'Experience Warm Himalayan Hospitality at Hotel Newa',
        paragraphs: [
          'Discover Hotel Newa, a hospitality property located in the heart of Gangtok’s MG Market area. Combining welcoming Sikkimese hospitality with convenient city access, Hotel Newa offers travelers, couples, and families a comfortable haven in Sikkim’s vibrant capital.',
          'Positioned along Baluwakhani and Vajra World Road (NH 10), the hotel features bright, thoughtfully appointed guest rooms finished with warm wood paneling, comfortable bedding, and expansive picture windows that capture mountain air and scenic valley views.',
          'Guests enjoy dedicated on-site amenities including a modern commercial kitchen, an airy mint-green dining room, clean reception lobby, and attentive direct host coordination throughout their stay.'
        ],
        secondaryHeadline: 'Your Gateway to Sikkim’s Scenic Charm',
        secondaryParagraphs: [
          'From crisp mornings overlooking alpine hills and colorful prayer flags to relaxed evenings exploring MG Marg’s pedestrian promenades, every moment at Hotel Newa is crafted for peace of mind.',
          'Direct host management guarantees personalized care, transparent coordination, and memorable Himalayan travel.'
        ],
        closingLine: 'Discover Gangtok in comfort. A warm Himalayan welcome awaits you.'
      },
      contacts: {
        contact1: {
          label: 'Call Hotel Newa Booking',
          displayNumber: '+91 62966 63717',
          telUri: 'tel:+916296663717',
          ariaLabel: 'Call Hotel Newa official booking coordinator at +91 62966 63717'
        },
        contact2: {
          label: 'Call Booking Contact 2',
          displayNumber: '+91 70632 93171',
          telUri: 'tel:+917063293171',
          ariaLabel: 'Call alternate booking desk at +91 70632 93171'
        },
        whatsappEnquiry: {
          number: '+91 62966 63717',
          displayNumber: '+91 62966 63717',
          prefilledMessage:
            'Hello, I would like to enquire about room availability and rates at Hotel Newa, Gangtok, MG Market. Please share booking details.',
          url:
            'https://wa.me/916296663717?text=Hello,%20I%20would%20like%20to%20enquire%20about%20room%20availability%20and%20rates%20at%20Hotel%20Newa,%20Gangtok,%20MG%20Market.%20Please%20share%20booking%20details.',
          disclaimer: 'This opens a direct enquiry chat for Hotel Newa. Room availability and final tariffs are confirmed directly by the hotel desk.'
        }
      },
      cardImage: {
        id: 'newa-card-img',
        src: '/assets/images/projects/hotel-newa/hotel-newa-property.webp',
        fallbackSrc: '/assets/images/projects/hotel-newa/hotel-newa-property.jpg',
        alt: 'Hotel Newa, Gangtok property view at MG Market',
        title: 'Hotel Newa, Gangtok - MG Market Property View'
      },
      heroImage: {
        id: 'newa-hero-img',
        src: '/assets/images/projects/hotel-newa/hotel-newa-property.webp',
        fallbackSrc: '/assets/images/projects/hotel-newa/hotel-newa-property.jpg',
        alt: 'Hotel Newa Gangtok authentic property photography overlooking mountain hills',
        title: 'Hotel Newa, Gangtok'
      },
      gallery: [
        {
          id: 'newa-gal-facade',
          src: '/assets/images/projects/hotel-newa/facade.webp',
          fallbackSrc: '/assets/images/projects/hotel-newa/facade.png',
          alt: 'Vivid green townhouse hotel facade at Hotel Newa, Gangtok MG Market',
          title: 'Vivid Green Hotel Facade'
        },
        {
          id: 'newa-gal-property',
          src: '/assets/images/projects/hotel-newa/hotel-newa-property.webp',
          fallbackSrc: '/assets/images/projects/hotel-newa/hotel-newa-property.jpg',
          alt: 'Hotel Newa Gangtok property exterior and Himalayan mountain setting',
          title: 'Property View & Mountain Setting'
        },
        {
          id: 'newa-gal-lobby',
          src: '/assets/images/projects/hotel-newa/lobby.webp',
          fallbackSrc: '/assets/images/projects/hotel-newa/lobby.png',
          alt: 'Warm modern reception lobby with room direction sign at Hotel Newa',
          title: 'Warm Modern Reception Lobby'
        },
        {
          id: 'newa-gal-room-double',
          src: '/assets/images/projects/hotel-newa/room-double.webp',
          fallbackSrc: '/assets/images/projects/hotel-newa/room-double.png',
          alt: 'Bright teal guest room with picture window overlooking mountain view',
          title: 'Bright Teal Guest Room with Window View'
        },
        {
          id: 'newa-gal-room-twin',
          src: '/assets/images/projects/hotel-newa/room-twin.webp',
          fallbackSrc: '/assets/images/projects/hotel-newa/room-twin.png',
          alt: 'Bright teal guestroom with patterned beds and natural lighting',
          title: 'Bright Teal Guestroom with Patterned Beds'
        },
        {
          id: 'newa-gal-room-triple',
          src: '/assets/images/projects/hotel-newa/room-triple.webp',
          fallbackSrc: '/assets/images/projects/hotel-newa/room-triple.png',
          alt: 'Cozy teal guestroom with three comfortable beds for families and groups',
          title: 'Cozy Teal Room with Three Beds'
        },
        {
          id: 'newa-gal-room-minimal',
          src: '/assets/images/projects/hotel-newa/room-minimal.webp',
          fallbackSrc: '/assets/images/projects/hotel-newa/room-minimal.png',
          alt: 'Bright minimal guest room with seating bench and warm wooden tones',
          title: 'Bright Minimal Guest Room'
        },
        {
          id: 'newa-gal-dining',
          src: '/assets/images/projects/hotel-newa/dining.webp',
          fallbackSrc: '/assets/images/projects/hotel-newa/dining.png',
          alt: 'Bright mint-green guesthouse dining room with tables and chairs for meals',
          title: 'Bright Mint-Green Dining Room'
        },
        {
          id: 'newa-gal-kitchen',
          src: '/assets/images/projects/hotel-newa/kitchen.webp',
          fallbackSrc: '/assets/images/projects/hotel-newa/kitchen.png',
          alt: 'Modern commercial kitchen with warm lighting and stainless steel prep stations',
          title: 'Modern Commercial Kitchen'
        },
        {
          id: 'newa-gal-mountain',
          src: '/assets/images/projects/hotel-newa/mountain-view.webp',
          fallbackSrc: '/assets/images/projects/hotel-newa/mountain-view.png',
          alt: 'Colorful prayer flags flying over scenic Gangtok mountain valley view',
          title: 'Prayer Flags Over Mountain Valley'
        },
        {
          id: 'newa-gal-showcase-view',
          src: '/assets/images/projects/hotel-newa/hotel-newa-brochure.webp',
          fallbackSrc: '/assets/images/projects/hotel-newa/hotel-newa-brochure.jpg',
          alt: 'Hotel Newa Gangtok authentic property photograph',
          title: 'Hotel Newa Property & Guest Experience'
        },
        {
          id: 'newa-gal-official-banner',
          src: '/assets/images/projects/hotel-newa/hotel-newa-banner-photo.webp',
          fallbackSrc: '/assets/images/projects/hotel-newa/hotel-newa-banner-photo.jpg',
          alt: 'Hotel Newa Gangtok official banner - Your Stay Our Priority, MG Market, Proprietor Rajib Daga',
          title: 'Official Hotel Newa Brochure Banner'
        }
      ],
      sources: {
        projectListingUrl: 'https://sites.google.com/view/barikanitanidhilimited/our-projects',
        propertyDetailUrl: 'https://sites.google.com/view/barikanitanidhilimited/our-projects/hotel-newa-gangtok'
      }
    }
  ]
};
