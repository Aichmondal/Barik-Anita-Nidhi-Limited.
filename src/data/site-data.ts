/**
 * Official Site Data for BARIK ANITA NIDHI LIMITED
 * Clean data separation from presentation layer
 */

export interface NavItem {
  id: string;
  label: string;
  href: string;
}

export interface CompanyStat {
  id: string;
  label: string;
  value: string;
  description: string;
  iconName: string;
}

export interface FinanceService {
  id: string;
  title: string;
  frequency: string;
  description: string;
  features: string[];
  image: string;
  icon: string;
}

export interface BankingService {
  id: string;
  title: string;
  code: string;
  description: string;
  benefits: string[];
  icon: string;
}

export interface Director {
  id: string;
  name: string;
  role: string;
  appointmentDate: string;
  image: string;
  initials: string;
}

export interface ContactInfo {
  headOffice: {
    line1: string;
    line2: string;
    area: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
    formatted: string;
  };
  phone: string;
  phoneDisplay: string;
  email: string;
  whatsappUrl: string;
  facebookUrl: string;
  mapsUrl: string;
  businessHours: string;
}

export interface SiteData {
  company: {
    name: string;
    bengaliName?: string;
    tagline: string;
    bengaliTagline?: string;
    logoUrl: string;
    established: string;
    status: string;
    cin: string;
    registrationNo: string;
    roc: string;
    type: string;
    category: string;
  };
  navigation: NavItem[];
  hero: {
    mainHeading: string;
    secondaryHeading: string;
    description: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
    trustBadges: string[];
  };
  companyStats: CompanyStat[];
  financeServices: FinanceService[];
  bankingServices: BankingService[];
  goldLoan: {
    badge: string;
    heading: string;
    subheading: string;
    description: string;
    cta: { label: string; href: string };
    highlights: Array<{ title: string; desc: string }>;
    image: string;
  };
  directors: Director[];
  directorsHeader: {
    heading: string;
    subheading: string;
    description: string;
  };
  contact: ContactInfo;
  footer: {
    copyright: string;
    notice: string;
  };
}

export const siteData: SiteData = {
  company: {
    name: 'BARIK ANITA NIDHI LIMITED',
    bengaliName: 'বারিক অনিতা নিধি লিমিটেড',
    tagline: 'Growing Together, Prospering Together',
    bengaliTagline: 'একসাথে বৃদ্ধি, একসাথে সমৃদ্ধি',
    logoUrl: '/logo.png',
    established: '6th April, 2022',
    status: 'Approved by Indian Government',
    cin: 'U65990WB2022PLN252823',
    registrationNo: '252823',
    roc: 'ROC Kolkata',
    type: 'Public Limited Company (Nidhi)',
    category: 'Non-Banking Financial Company (Nidhi)'
  },
  navigation: [
    { id: 'nav-home', label: 'Home', href: '#home' },
    { id: 'nav-about', label: 'About', href: '#company' },
    { id: 'nav-services', label: 'Services', href: '#finance-services' },
    { id: 'nav-banking', label: 'Banking', href: '#banking-services' },
    { id: 'nav-gold-loan', label: 'Gold Loan', href: '#gold-loan' },
    { id: 'nav-directors', label: 'Directors', href: '#directors' },
    { id: 'nav-contact', label: 'Contact', href: '#contact' }
  ],
  hero: {
    mainHeading: 'Empowering Communities',
    secondaryHeading: 'Building a Better Tomorrow',
    description: 'Financial support, trust and togetherness for a stronger and self-reliant community.',
    primaryCta: { label: 'Explore Services', href: '#finance-services' },
    secondaryCta: { label: 'Contact Us', href: '#contact' },
    trustBadges: [
      'Govt. Approved Nidhi Company',
      'CIN: U65990WB2022PLN252823',
      'Serving Rural & Semi-Urban Bengal'
    ]
  },
  companyStats: [
    {
      id: 'stat-since',
      label: 'Since',
      value: '6th April, 2022',
      description: 'Serving members with integrity and transparency',
      iconName: 'calendar'
    },
    {
      id: 'stat-approval',
      label: 'Government Approval',
      value: 'Approved by Indian Government',
      description: 'Incorporated under the Companies Act, 2013',
      iconName: 'shield-check'
    },
    {
      id: 'stat-cin',
      label: 'CIN Number',
      value: 'U65990WB2022PLN252823',
      description: 'Verified Corporate Identity with Ministry of Corporate Affairs',
      iconName: 'file-text'
    },
    {
      id: 'stat-reg',
      label: 'Registration No.',
      value: '252823',
      description: 'Official Registrar of Companies (ROC Kolkata) Record',
      iconName: 'award'
    }
  ],
  financeServices: [
    {
      id: 'group-loan',
      title: 'Group Loan',
      frequency: 'Yearly 3 Times Loan',
      description: 'Specialized financial assistance fostering peer-support and collective community enterprise through flexible group credit.',
      features: ['Yearly 3 Cycles', 'No Complex Collateral', 'Doorstep Facilitation'],
      image: '/assets/images/finance/group-loan.svg',
      icon: 'users'
    },
    {
      id: 'micro-business-loan',
      title: 'Micro Business Loan',
      frequency: 'Yearly 4 Times Loan',
      description: 'Working capital and inventory support tailored for local grocery owners, artisans, retail merchants and micro-entrepreneurs.',
      features: ['Yearly 4 Cycles', 'Fast Verification', 'Growth Support'],
      image: '/assets/images/finance/micro-business.svg',
      icon: 'briefcase'
    },
    {
      id: 'product-loan',
      title: 'Product Loan',
      frequency: 'Yearly 4 Times Loan',
      description: 'Hassle-free financing for productive home goods, electrical equipment, and essential tools that improve quality of life.',
      features: ['Yearly 4 Cycles', 'Flexible Terms', 'Affordable Repayments'],
      image: '/assets/images/finance/product-loan.svg',
      icon: 'package'
    }
  ],
  bankingServices: [
    {
      id: 'rd',
      title: 'Recurring Deposit (RD)',
      code: 'RD Scheme',
      description: 'Build your savings gradually by depositing a fixed amount every month and achieve your future financial goals with assured returns.',
      benefits: ['Disciplined monthly saving habit', 'Guaranteed high interest rates', 'Flexible tenure choices'],
      icon: 'trending-up'
    },
    {
      id: 'fd',
      title: 'Fixed Deposit (FD)',
      code: 'FD Scheme',
      description: 'Invest your funds securely for a fixed tenure and earn attractive returns with our reliable Fixed Deposit schemes.',
      benefits: ['Lump-sum wealth growth', 'Maximum capital safety', 'Compounding interest options'],
      icon: 'vault'
    },
    {
      id: 'mis',
      title: 'Monthly Income Scheme (MIS)',
      code: 'MIS Scheme',
      description: 'Enjoy a steady monthly income from your investment while keeping your principal amount safe and secure.',
      benefits: ['Reliable monthly payout', 'Ideal for retirees & families', 'Zero principal risk'],
      icon: 'wallet'
    },
    {
      id: 'savings',
      title: 'Savings Account',
      code: 'Regular Savings',
      description: 'Secure your money with our Savings Account and enjoy safe, convenient and flexible banking services.',
      benefits: ['Anytime liquidity', 'Nomination facility available', 'Friendly personalized service'],
      icon: 'piggy-bank'
    }
  ],
  goldLoan: {
    badge: 'UPCOMING',
    heading: 'Gold Loan',
    subheading: 'Instant Liquidity with Guaranteed Asset Safety',
    description: 'Access instant funds without selling your valuable assets. Our Gold Loan offers fast processing, transparent terms, secure gold custody and flexible repayment plans.',
    cta: { label: 'Enquire Now', href: '#contact' },
    highlights: [
      { title: 'Secure Vault Storage', desc: 'Insured high-security vaults protect your valuables 24/7.' },
      { title: 'Instant Valuation', desc: 'Fast appraisal with honest, maximum permissible gold value.' },
      { title: 'Transparent Terms', desc: 'Zero hidden charges and member-friendly flexible repayments.' },
      { title: 'Minimal Paperwork', desc: 'Quick KYC approval to disburse funds in minutes.' }
    ],
    image: '/assets/images/gold-loan/gold-loan-feature.svg'
  },
  directorsHeader: {
    heading: 'Our Keynote 2025 Members',
    subheading: 'Directors',
    description: 'Guiding BARIK ANITA NIDHI LIMITED with steadfast commitment, ethical governance, and deep community roots.'
  },
  directors: [
    {
      id: 'director-1',
      name: 'SUBHANKAR DAS',
      role: 'Director',
      appointmentDate: '1st February, 2025',
      image: '/assets/images/directors/director-subhankar-das.svg',
      initials: 'SD'
    },
    {
      id: 'director-2',
      name: 'RAJIB DAGA',
      role: 'Director',
      appointmentDate: '1st February, 2025',
      image: '/assets/images/directors/director-rajib-daga.svg',
      initials: 'RD'
    },
    {
      id: 'director-3',
      name: 'PAPIYA HALDAR',
      role: 'Director',
      appointmentDate: '1st February, 2025',
      image: '/assets/images/directors/director-papiya-haldar.svg',
      initials: 'PH'
    }
  ],
  contact: {
    headOffice: {
      line1: 'C/o, Rajib Daga',
      line2: 'Kachupukur, B.B.C, Bulbulchadi',
      area: 'Bulbulchandi',
      city: 'Malda',
      state: 'West Bengal',
      country: 'India',
      pincode: '732122',
      formatted: 'C/o, Rajib Daga, Kachupukur, B.B.C, Bulbulchadi, Malda, West Bengal, India - 732122'
    },
    phone: '+91 963-522-4678',
    phoneDisplay: '+91 963-522-4678',
    email: 'office.barikanitanidhiltd@gmail.com',
    whatsappUrl: 'https://wa.me/919635224678?text=Hello%20Barik%20Anita%20Nidhi%20Limited,%20I%20would%20like%20to%20enquire%20about%20your%20services.',
    facebookUrl: 'https://www.facebook.com/search/top?q=BARIK%20ANITA%20NIDHI%20LIMITED',
    mapsUrl: 'https://maps.google.com/?q=Kachupukur,+Bulbulchandi,+Malda,+West+Bengal+732122',
    businessHours: 'Monday to Saturday: 10:00 AM – 5:00 PM (Closed on Sundays & Bank Holidays)'
  },
  footer: {
    copyright: '© 2026 BARIK ANITA NIDHI LIMITED. All Rights Reserved.',
    notice: 'A Nidhi Company registered under Section 406 of the Companies Act, 2013 and governed by Nidhi Rules, 2014. Financial services are provided exclusively to its bona fide members.'
  }
};
