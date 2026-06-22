export interface Ingredient {
  name: string;
  image: string; // Keep as empty string "" for now
}

export interface Product {
  id: string;
  title: string;
  subLabel?: string; // Optional: e.g. "SLEEP & RECOVERY"
  description?: string; // Optional: description paragraph
  image: string; // Keeps empty string "" as requested, user will add paths later
  // Detailed modal information
  keyBenefits?: string[];
  consumerNeed?: string;
  ingredientsList?: Ingredient[];
  thumbnails?: string[]; // Empty strings for thumbnails
}

export interface ProductTab {
  id: string;
  name: string;
  sectionTitle: string;
  sectionSubtitle?: string;
  products: Product[];
}

export const PRODUCTS_DATA: ProductTab[] = [
  {
    id: "wellness-gummies",
    name: "Wellness Gummies",
    sectionTitle: "Premium botanicals. Delicious format.",
    products: [
      {
        id: "dreamy-sleep-gummies",
        subLabel: "SLEEP & RECOVERY",
        title: "Dreamy Sleep Gummies",
        description: "A daily wellness supplement designed to support healthier sleep patterns, relaxation, and nighttime recovery through a convenient gummy format.",
        image: "/assets/images/products/gummies_1.png",
        keyBenefits: [
          "Supports restful and uninterrupted sleep",
          "Helps promote relaxation before bedtime",
          "Supports healthy sleep routines",
          "Convenient and enjoyable daily gummy format"
        ],
        consumerNeed: "Poor sleep quality has become a growing concern due to stress, screen exposure, demanding schedules, and changing lifestyles. Sleep Gummies are designed to help consumers build healthier nighttime routines and prioritize recovery as part of their overall wellness journey.",
        ingredientsList: [
          { name: "Melatonin", image: "" },
          { name: "Chamomile", image: "" },
          { name: "L-Theanine", image: "" },
          { name: "Lemon Balm", image: "" }
        ],
        thumbnails: [
          "/assets/images/products/p_11.png",
          "/assets/images/products/p_12.png",
          "/assets/images/products/p_13.png"]
      },
      {
        id: "skin-hair-nail-gummies",
        subLabel: "BEAUTY & SKIN",
        title: "Skin, Hair & Nail Gummies",
        description: "A daily wellness supplement formulated to support healthier skin, hair, and nails through a convenient and enjoyable gummy format.",
        image: "/assets/images/products/gummies_2.png",
        keyBenefits: [
          "Supports skin health and radiance",
          "Promotes stronger hair and healthier nails",
          "Provides essential beauty-focused nutrients",
          "Easy-to-consume daily gummy format"
        ],
        consumerNeed: "Beauty and wellness are increasingly converging as consumers seek convenient solutions that support appearance, confidence, and overall well-being. Beauty Gummies address this growing demand through a simple daily routine.",
        ingredientsList: [
          { name: "Vitamin E", image: "" },
          { name: "Zinc ", image: "" },
          { name: "Silica ", image: "" },
          { name: "Hyaluronic Acid", image: "" },
          { name: "Biotin", image: "" },
          { name: "Vitamin C", image: "" },
        ],
        thumbnails: [
          "/assets/images/products/gummies_thumb_1.png",
          "/assets/images/products/gummies_thumb_2.png",
          "/assets/images/products/gummies_thumb_3.png"
        ]
      },
    ],
  },
  {
    id: "health-supplements",
    name: "Health Supplements",
    sectionTitle: "Targeted support for the body's most critical systems.",
    sectionSubtitle: "Our tablet and capsule range is built on a simple principle: address root causes, not symptoms. Each formulation targets a specific physiological system using Ayurvedic actives and nutraceutical science - for preventive, long-term health outcomes.",
    products: [
      {
        id: "brain-fuel-capsules",
        subLabel: "BRAIN & COGNITION",
        title: "Brain Fuel Capsules",
        image: "assets/images/products/suppliments/supp_1.png",
        keyBenefits: [
          "Enhances focus, mental clarity, and memory retention",
          "Supports daily cognitive function and energy",
          "Helps reduce brain fatigue and stress"
        ],
        consumerNeed: "Professionals and students face high cognitive demands daily. Brain Fuel provides natural, stimulant-free support to sustain mental clarity and focus without jitters.",
        ingredientsList: [
          { name: "Bacopa Monnieri", image: "" },
          { name: "Withania Somnifera", image: "" },
          { name: "Curcuma Longa", image: "" },
          { name: "Gotu Kola Extract", image: "" },
          { name: "Ginkgo Biloba Extract", image: "" },
        ],
        thumbnails: ["", "", ""]
      },
      {
        id: "gut-fuel-capsules",
        subLabel: "GUT HEALTH",
        title: "Gut Fuel Capsules",
        image: "assets/images/products/suppliments/supp_2.png",
        keyBenefits: [
          "Supports healthy digestion and nutrient absorption",
          "Helps maintain a balanced gut microbiome",
          "Relieves occasional bloating and indigestion"
        ],
        consumerNeed: "Digestive wellness is the foundation of overall health. Poor diet and stress disrupt gut flora; Gut Fuel provides natural support to restore balance and digestive ease.",
        ingredientsList: [
          { name: "Probiotics", image: "" },
          { name: "Triphala", image: "" },
          { name: "Ginger Extract", image: "" },
          { name: "Fennel Seeds", image: "" }
        ],
        thumbnails: ["", "", ""]
      },
      {
        id: "liver-detox-tablets",
        subLabel: "LIVER & DETOX",
        title: "Liver Detox Tablets",
        image: "assets/images/products/suppliments/supp_3.png",
        keyBenefits: [
          "Promotes natural liver detoxification and cleansing",
          "Supports healthy liver enzyme levels",
          "Protects liver cells from oxidative stress"
        ],
        consumerNeed: "Exposure to toxins, processed foods, and alcohol stresses the liver. Consumers need a natural, daily formula to support detoxification and protect liver health.",
        ingredientsList: [
          { name: "Milk Thistle", image: "" },
          { name: "Bhumi Amla", image: "" },
          { name: "Kalmegh", image: "" },
          { name: "Kutki", image: "" }
        ],
        thumbnails: ["", "", ""]
      },
      {
        id: "respiratory-health",
        subLabel: "LUNG CARE TABLETS",
        title: "Respiratory Health",
        image: "assets/images/products/suppliments/supp_4.png",
        keyBenefits: [
          "Supports lung function and clear breathing",
          "Helps soothe respiratory tracts",
          "Strengthens seasonal respiratory immunity"
        ],
        consumerNeed: "Environmental pollution and seasonal changes often trigger respiratory discomfort. This formula offers botanical defense to strengthen respiratory resilience.",
        ingredientsList: [
          { name: "Vasaka", image: "" },
          { name: "Tulsi", image: "" },
          { name: "Yashtimadhu", image: "" },
          { name: "Pippali", image: "" }
        ],
        thumbnails: ["", "", ""]
      },
      {
        id: "immune-care-tablets",
        subLabel: "IMMUNITY",
        title: "Immune Care Tablets",
        image: "assets/images/products/suppliments/supp_5.png",
        keyBenefits: [
          "Boosts daily immune system defenses",
          "Packed with natural antioxidants",
          "Promotes overall vitality and resilience"
        ],
        consumerNeed: "Daily stress and environmental pathogens challenge the immune system. Immune Care provides proactive, science-backed support to strengthen natural defenses.",
        ingredientsList: [
          { name: "Giloy Extract", image: "" },
          { name: "Amla Extract", image: "" },
          { name: "Ashwagandha", image: "" },
          { name: "Curcumin", image: "" }
        ],
        thumbnails: ["", "", ""]
      },
      {
        id: "dia-shield-tablets",
        subLabel: "BLOOD SUGAR SUPPORT",
        title: "Dia Shield Tablets",
        image: "assets/images/products/suppliments/supp_6.png",
        keyBenefits: [
          "Helps maintain healthy blood sugar levels",
          "Supports healthy insulin function",
          "Promotes healthy carbohydrate metabolism"
        ],
        consumerNeed: "Managing blood sugar is crucial for metabolic health. Dia Shield provides natural, botanical support to complement healthy lifestyle choices.",
        ingredientsList: [
          { name: "Karela", image: "" },
          { name: "Jamun Seeds", image: "" },
          { name: "Gurmar", image: "" },
          { name: "Vijaysar", image: "" }
        ],
        thumbnails: ["", "", ""]
      },
      {
        id: "calcium-vitamins-tablets",
        subLabel: "BONE & JOINT HEALTH",
        title: "Calcium+ Vitamins Tablets",
        image: "assets/images/products/suppliments/supp_7.png",
        keyBenefits: [
          "Supports bone density and joint strength",
          "Enhances calcium absorption with Vitamin D3",
          "Promotes joint mobility and comfort"
        ],
        consumerNeed: "Bone health declines with age and nutritional gaps. Calcium+ delivers highly bioavailable calcium and essential vitamins to support lifelong mobility.",
        ingredientsList: [
          { name: "Calcium Citrate", image: "" },
          { name: "Vitamin D3", image: "" },
          { name: "Magnesium", image: "" },
          { name: "Zinc", image: "" }
        ],
        thumbnails: ["", "", ""]
      },
    ],
  },
  {
    id: "herbal-masala",
    name: "Herbal Masala",
    sectionTitle: "A conscious alternative. Rooted in Ayurveda.",
    sectionSubtitle: "Aayush Herbal Masala is a premium, tobacco-free and supari-free formulation - crafted with Ayurvedic botanicals to deliver an authentic, richly flavoured experience that actively supports oral health, digestion, and overall well-being. A genuinely intelligent alternative for millions choosing to make a mindful switch.",
    products: [
      {
        id: "paan-masala-flavour",
        title: "Paan Masala Flavour",
        description: "The timeless classic - rich, aromatic, and refreshing. The authentic pan masala experience, reimagined with complete herbal purity.",
        image: "/assets/images/products/pan_masala_1.png",
        ingredientsList: [
          { name: "Cardamom Extract: 200mg", image: "" },
          { name: "Fennel Seeds: 150mg", image: "" },
          { name: "Clove Extract: 100mg", image: "" },
          { name: "VLicorice Root: 75mg", image: "" },
          { name: "Mint Leaves: 50mg", image: "" },
          { name: "Areca Nut Substitute (Herbal Blend): 300mg", image: "" }
        ],
        thumbnails: ["", "", ""]
      },
      {
        id: "gutka-flavour",
        title: "Gutka Flavour",
        description: "Bold, familiar intensity - specifically designed for those transitioning away from harmful products. Delivers complete satisfaction with zero compromise on safety or well-being.",
        image: "/assets/images/products/pan_masala_2.png",

      },
      {
        id: "royal-tobacco-flavour",
        title: "Royal Tobacco Flavour",
        description: "A premium, full-bodied blend for the discerning palate. Rich depth and sophisticated character - authentically flavoured, completely tobacco-free.",
        image: "/assets/images/products/pan_masala_3.png",

      },
    ],
  },
  {
    id: "shilajit-drops",
    name: "Shilajit Drops",
    sectionTitle: "The Himalayan Elixir for Peak Vitality.",
    sectionSubtitle: "Aayush Shilajit Drops combine 100% pure, lab-tested Himalayan Shilajit extract with Ayurvedicwellness botanicals in a convenient liquid format. Powered by Fulvic Acid, this premium formulation enhances energy, stamina, cognitive function, and overall vitality—naturally and effectively.",
    products: [
      {
        id: "paan-masala-flavour",
        title: "Paan Masala Flavour",
        description: "The timeless classic - rich, aromatic, and refreshing. The authentic pan masala experience, reimagined with complete herbal purity.",
        image: "/assets/images/products/pan_masala_1.png",

      },
      {
        id: "gutka-flavour",
        title: "Gutka Flavour",
        description: "Bold, familiar intensity - specifically designed for those transitioning away from harmful products. Delivers complete satisfaction with zero compromise on safety or well-being.",
        image: "/assets/images/products/pan_masala_2.png",

      },
      {
        id: "royal-tobacco-flavour",
        title: "Royal Tobacco Flavour",
        description: "A premium, full-bodied blend for the discerning palate. Rich depth and sophisticated character - authentically flavoured, completely tobacco-free.",
        image: "/assets/images/products/pan_masala_3.png",

      },
    ],
  },
];

export const HERBAL_MASALA_FEATURES = [
  "No Tobacco",
  "No Supari",
  "No Chemicals",
  "No Harmful Additives",
  "100% Ayurvedic Botanicals"
];

export const HERBAL_MASALA_INGREDIENTS = [
  { name: "Kaunch Beej", benefit: "supports vitality & stress relief" },
  { name: "Amla", benefit: "antioxidant protection & oral health" },
  { name: "Ashwagandha", benefit: "adaptogen for stress & energy" },
  { name: "Mulethi", benefit: "anti-inflammatory & digestive support" },
  { name: "Kesar", benefit: "mood support & antioxidant" },
  { name: "Cardamom & Tamarind Seeds", benefit: "digestion & natural flavour" }
];
