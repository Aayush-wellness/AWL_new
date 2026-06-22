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
        consumerNeed: "Modern lifestyles, stress, and increased screen exposure have contributed to poor sleep quality and irregular sleep routines. Consumers are increasingly seeking convenient wellness solutions that support better rest and recovery.",
        ingredientsList: [
          { name: "Brahmi Leaf Extract", image: "" },
          { name: "Tagar Extract", image: "" },
          { name: "L-Tryptophan", image: "" },
          { name: "Chamomile Extract", image: "" },
          { name: "Melatonin", image: "" },
          { name: "Vitamin B6", image: "" }
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
        consumerNeed: "Consumers today are looking for simple, daily solutions that support skin, hair, and nail wellness from within - reflecting the growing convergence of beauty and nutrition.",
        ingredientsList: [
          { name: "Glutathione", image: "" },
          { name: "Sea Buckthorn", image: "" },
          { name: "Gotu Kola", image: "" },
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
          "Supports memory & learning ability",
          "Reduces mental fatigue & brain fog",
          "Promotes calmness & stress balance",
          "Improves mental clarity & alertness",
        ],
        consumerNeed: "As modern lifestyles become more demanding, consumers are seeking solutions that support focus, mental clarity, energy, and overall cognitive performance.",
        ingredientsList: [
          { name: "Brahmi (Bacopa Monnieri)", image: "" },
          { name: "Ashwagandha", image: "" },
          { name: "Curcumin (Turmeric Extract)", image: "" },
          { name: "Ginkgo Biloba", image: "" },
          { name: "Gotu Kola", image: "" }
        ],
        thumbnails: ["/assets/images/products/suppliments/Brain_Fuel_listing1.webp",
          "/assets/images/products/suppliments/Brain_Fuel_listing2.webp",
          "/assets/images/products/suppliments/Brain_Fuel_listing3.webp"]
      },
      {
        id: "gut-fuel-capsules",
        subLabel: "GUT HEALTH",
        title: "Gut Fuel Capsules",
        image: "assets/images/products/suppliments/supp_2.png",
        keyBenefits: [
          "Relieves bloating & gas discomfort",
          "Promotes smooth & regular digestion",
          "Strengthens immunity from within",
          "Helps your body absorb nutrients better",
        ],
        consumerNeed: "Digestive discomfort and poor gut health have become increasingly common, driving demand for products that support digestion, gut balance, and everyday wellness.",
        ingredientsList: [
          { name: "Probiotics", image: "" },
          { name: "Prebiotics", image: "" },
          { name: "Cranberry Extract", image: "" },
          { name: "Vitamin C", image: "" },
          { name: "Zinc", image: "" }
        ],
        thumbnails: ["/assets/images/products/suppliments/Gut_Fuel_listing1.webp",
          "/assets/images/products/suppliments/Gut_Fuel_listing2.webp",
          "/assets/images/products/suppliments/Gut_Fuel_listing3.webp"]
      },
      {
        id: "liver-detox-tablets",
        subLabel: "LIVER & DETOX",
        title: "Liver Detox Tablets",
        image: "assets/images/products/suppliments/supp_3.png",
        keyBenefits: [
          "Supports healthy liver function daily",
          "Reduces heaviness, acidity & sluggish feeling",
          "Helps your body clear out everyday toxins naturally",
          "Boosts energy & overall metabolic balance",
        ],
        consumerNeed: "Busy lifestyles, dietary habits, and environmental factors have increased consumer interest in wellness solutions that support liver function and overall metabolic health.",
        ingredientsList: [
          { name: "Milk Thistle (Silymarin)", image: "" },
          { name: "N-Acetyl L-Cysteine", image: "" },
          { name: "Turmeric Extract", image: "" },
          { name: "Alpha Lipoic Acid (ALA)", image: "" },
          { name: "L-Glutamine", image: "" },
          { name: "L-Carnitine", image: "" }
        ],
        thumbnails: ["/assets/images/products/suppliments/Liver_Detox_listing1.webp",
          "/assets/images/products/suppliments/Liver_Detox_listing2.webp",
          "/assets/images/products/suppliments/Liver_Detox_listing3.webp"]
      },
      {
        id: "respiratory-health",
        subLabel: "Respiratory Health",
        title: "Lung Care Tablets",
        image: "assets/images/products/suppliments/supp_4.png",
        keyBenefits: [
          "Supports clear & open airways daily",
          "Reduces chest heaviness & irritation",
          "Helps clear mucus & airway buildup",
          "Supports energy & daily stamina",
        ],
        consumerNeed: "Increasing exposure to pollution, environmental stressors, and lifestyle factors has led to growing awareness around respiratory wellness and proactive lung health support.",
        ingredientsList: [
          { name: "Stinging Nettle Root Extract", image: "" },
          { name: "Shatavari Root Extract", image: "" },
          { name: "Licorice", image: "" },
          { name: "Vasaka", image: "" },
          { name: "NAC (N-Acetyl Cysteine)", image: "" },
          { name: "Quercetin", image: "" },
          { name: "Vitamin C", image: "" },
          { name: "Zinc", image: "" }
        ],
        thumbnails: ["/assets/images/products/suppliments/Lung_Care_listing1.webp",
          "/assets/images/products/suppliments/Lung_Care_listing2.webp",
          "/assets/images/products/suppliments/Lung_Care_listing3.webp"]
      },
      {
        id: "immune-care-tablets",
        subLabel: "IMMUNITY",
        title: "Immune Care Tablets",
        image: "assets/images/products/suppliments/supp_5.png",
        keyBenefits: [
          "Supports your body’s natural immune defense",
          "Helps protect against seasonal infections & daily exposure",
          "Strengthens immunity with antioxidant-rich ingredients",
          "Supports faster recovery & overall resilience",
        ],
        consumerNeed: "Health-conscious consumers are prioritizing preventive wellness and looking for everyday solutions that support immune resilience and overall well-being.",
        ingredientsList: [
          { name: "Cone Flower", image: "" },
          { name: "Elderberry", image: "" },
          { name: "Rose Hip", image: "" },
          { name: "Vitamin C", image: "" },
          { name: "Mulethi", image: "" },
          { name: "Ginger", image: "" },
          { name: "Amla", image: "" }
        ],
        thumbnails: ["/assets/images/products/suppliments/immune_care_listing1.webp",
          "/assets/images/products/suppliments/immune_care_listing2.webp",
          "/assets/images/products/suppliments/immune_care_listing3.webp"]
      },
      {
        id: "dia-shield-tablets",
        subLabel: "BLOOD SUGAR SUPPORT",
        title: "Dia Shield Tablets",
        image: "assets/images/products/suppliments/supp_6.png",
        keyBenefits: [
          "Helps manage healthy blood sugar levels",
          "Reduces sugar cravings & energy crashes",
          "Supports metabolism & daily energy",
          "Provides antioxidant support for overall balance",
        ],
        consumerNeed: "The rising prevalence of lifestyle-related health concerns has increased awareness around proactive blood sugar management. Consumers are increasingly seeking wellness solutions that support healthier daily habits and metabolic well-being.",
        ingredientsList: [
          { name: "Karela", image: "" },
          { name: "Jamun Seeds", image: "" },
          { name: "Gurmar", image: "" },
          { name: "Vijaysar", image: "" }
        ],
        thumbnails: ["/assets/images/products/suppliments/Dia_Shield_listing1.webp",
          "/assets/images/products/suppliments/Dia_Shield_listing2.webp",
          "/assets/images/products/suppliments/Dia_Shield_listing3.webp"]
      },
      {
        id: "calcium-vitamins-tablets",
        subLabel: "BONE & JOINT HEALTH",
        title: "Calcium+ Vitamins Tablets",
        image: "assets/images/products/suppliments/supp_7.png",
        keyBenefits: [
          "Supports strong bones & teeth",
          "Improves calcium absorption & bone density",
          "Supports joint strength & mobility",
          "Helps reduce weakness & supports daily energy",
        ],
        consumerNeed: "Modern dietary habits, sedentary lifestyles, and limited sun exposure have contributed to growing concerns around bone health and nutritional deficiencies. Consumers are increasingly prioritizing everyday nutritional support for long-term wellness.",
        ingredientsList: [
          { name: "Calcium Citrate", image: "" },
          { name: "Zinc Sulphate", image: "" },
          { name: "Magnesium", image: "" },
          { name: "Vitamin B", image: "" }
        ],
        thumbnails: ["/assets/images/products/suppliments/CalciumVitamin_listing1.webp",
          "/assets/images/products/suppliments/CalciumVitamin_listing2.webp",
          "/assets/images/products/suppliments/CalciumVitamin_listing3.webp"]
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
    sectionTitle: "Ancient Vitality. Modern Convenience.",
    sectionSubtitle: "A purified Himalayan Shilajit formulation designed to support daily energy, stamina, and overall vitality. A convenient liquid format rooted in traditional wellness and adapted for modern lifestyles.",
    products: [
      {
        id: "himalayan-shilajit-drops",
        subLabel: "ENERGY & STAMINA",
        title: "Himalayan Shilajit Drops",
        description: "Supports natural energy, endurance, and daily wellness with purified Himalayan Shilajit in an easy-to-use liquid format.",
        image: "/assets/images/products/shilajit_1.png",
        keyBenefits: [
          "Supports natural energy, endurance, and daily wellness",
          "Purified Himalayan Shilajit formulation",
          "Convenient liquid format rooted in traditional wellness",
          "Lab-tested for safety, purity, and potency"
        ],
        consumerNeed: "Modern life demands sustained energy and mental clarity. Our Shilajit Drops offer a convenient, highly bioavailable way to integrate this legendary Ayurvedic adaptogen into your daily routine, without the mess of traditional resins.",
        ingredientsList: [
          { name: "Purified Himalayan Shilajit", image: "" },
          { name: "Fulvic Compounds", image: "" }
        ],
        thumbnails: [
          "/assets/images/products/shilajit_1.png"
        ]
      }
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
