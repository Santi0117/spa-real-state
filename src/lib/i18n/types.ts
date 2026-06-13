export type LanguageCode = "es" | "en" | "pt";

export type Translations = {
  nav: {
    properties: string;
    condominium: string;
    zones: string;
    services: string;
    about: string;
    contact: string;
  };
  cta: {
    schedule: string;
    scheduleShort: string;
    build: string;
    buildShort: string;
    sell: string;
    sellShort: string;
  };
  hero: {
    imageAlt: string;
    label: string;
    titleLine1: string;
    titleLine2: string;
    description: string;
  };
  search: {
    type: string;
    zone: string;
    operation: string;
    search: string;
    all: string;
    allZones: string;
    sale: string;
    rent: string;
    both: string;
    house: string;
    apartment: string;
    land: string;
    penthouse: string;
  };
  stats: {
    sold: string;
    experience: string;
    satisfied: string;
    zones: string;
  };
  marquee: [string, string, string, string];
  featured: {
    label: string;
    title: string;
    viewCatalog: string;
  };
  catalog: {
    label: string;
    title: string;
    description: string;
    noResults: string;
  };
  areas: {
    label: string;
    title: string;
    description: string;
    propertiesCount: string;
    items: [
      { name: string; description: string },
      { name: string; description: string },
      { name: string; description: string },
      { name: string; description: string },
    ];
  };
  financing: {
    label: string;
    title: string;
    description: string;
    pickerHint: string;
    selectedLabel: string;
    clearSelection: string;
    whatsapp: string;
    schedule: string;
    disclaimer: string;
  };
  financeCard: {
    fixedRate: string;
    downPayment: string;
    minDownPayment: string;
    term: string;
    years: string;
    bankPayment: string;
    insurance: string;
    monthlyPayment: string;
    calculate: string;
  };
  services: {
    label: string;
    title: string;
    description: string;
    cta: string;
    items: [
      { title: string; description: string },
      { title: string; description: string },
      { title: string; description: string },
      { title: string; description: string },
    ];
  };
  about: {
    imageAlt: string;
    badge: string;
    label: string;
    title: string;
    p1: string;
    p2: string;
    features: [string, string, string, string];
  };
  testimonials: {
    label: string;
    title: string;
    items: [
      { quote: string; name: string; role: string },
      { quote: string; name: string; role: string },
      { quote: string; name: string; role: string },
    ];
  };
  contact: {
    label: string;
    title: string;
    description: string;
    phone: string;
    email: string;
    offices: string;
    name: string;
    phoneField: string;
    emailField: string;
    interest: string;
    message: string;
    messagePlaceholder: string;
    submit: string;
    successTitle: string;
    successMessage: string;
    buy: string;
    sell: string;
    rent: string;
    invest: string;
    appraisal: string;
  };
  footer: {
    tagline: string;
    navigation: string;
    contact: string;
    offices: string;
    rights: string;
    terms: string;
    privacy: string;
  };
  property: {
    new: string;
    sale: string;
    rent: string;
    beds: string;
    baths: string;
  };
  propertyPicker: {
    choose: string;
  };
  common: {
    language: string;
    menu: string;
    backToHome: string;
    backToCatalog: string;
    formLabel: string;
    finance: string;
  };
  propertyDetail: {
    zone: string;
    bedrooms: string;
    bathrooms: string;
    area: string;
    description: string;
    features: string;
    tags: string;
    scheduleVisitProperty: string;
  };
  propertyVisit: {
    label: string;
    title: string;
    description: string;
    scheduleVisitProperty: string;
    viewMore: string;
  };
  assistant: {
    label: string;
    title: string;
    description: string;
    virtualAssistant: string;
    onlineNow: string;
    placeholder: string;
    send: string;
    orWriteUs: string;
    sendError: string;
    connectionError: string;
    welcomeMessage: string;
    quickReplies: [string, string, string, string];
  };
  forms: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    termsPrefix: string;
    termsLink: string;
    termsSuffix: string;
    successTitle: string;
    successMessage: string;
    selectPropertyHint: string;
    scheduleVisit: {
      title: string;
      titleWithProperty: string;
      description: string;
      descriptionWithProperty: string;
      confirm: string;
    };
    selectedProperty: {
      label: string;
      chooseOther: string;
    };
    calendar: {
      pickDayTime: string;
      prevMonth: string;
      nextMonth: string;
      availableSlots: string;
      selectDayHint: string;
      weekdays: [string, string, string, string, string, string, string];
      months: [
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
      ];
    };
    buildHouse: {
      title: string;
      description: string;
      hasLotQuestion: string;
      hasLotYes: string;
      hasLotNo: string;
      findLotOptional: string;
      findLotLabel: string;
      budget: string;
      budgetPlaceholder: string;
      submit: string;
    };
    sellProperty: {
      title: string;
      description: string;
      location: string;
      locationPlaceholder: string;
      price: string;
      pricePlaceholder: string;
      negotiable: string;
      negotiablePlaceholder: string;
      submit: string;
    };
  };
  condominium: {
    badge: string;
    available: string;
    from: string;
    zoneLabel: string;
    interactivePlan: string;
    lotMap: string;
    lotMapHint: string;
    propertiesIn: string;
    housesApartments: string;
    lotsAndLand: string;
    availableIn: string;
    lotCardHint: string;
    lots: string;
    houses: string;
    availableShort: string;
    land: string;
    scheduleVisit: string;
    lotLabel: string;
    lot: string;
    lotMapHoverHint: string;
    lotMapAria: string;
    statusAvailable: string;
    statusReserved: string;
    statusSold: string;
  };
  filters: {
    operation: string;
    saleAndRent: string;
    propertyType: string;
    price: string;
    fromPrice: string;
    rooms: string;
    roomsFiltered: string;
    more: string;
    all: string;
    any: string;
    minPrice: string;
    maxPrice: string;
    close: string;
    closeFilters: string;
    results: string;
    clear: string;
    priceRange: string;
    resetPrice: string;
    beds: string;
    baths: string;
    zone: string;
    minArea: string;
    sortBy: string;
    sortNewest: string;
    sortPriceAsc: string;
    sortPriceDesc: string;
    sortAreaDesc: string;
    areaSqm: string;
    allZones: string;
  };
};
