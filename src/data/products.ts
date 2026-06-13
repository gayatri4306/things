import { Product } from "../types";
// @ts-ignore
import nebulaSunsetLamp from "../assets/images/nebula_sunset_lamp_1781254532182.jpg";

export const HOSTEL_PRODUCTS: Product[] = [
  {
    id: "prod-1",
    name: "CozyCloud Orthopedic Mattress Topper",
    category: "Bedding & Sleep",
    description: "Transform rock-hard wooden hostel bunks into luxury clouds. Ergonomic multi-zone memory foam distributes body weight evenly, relieving physical strain during exam times.",
    price: 49.99,
    originalPrice: 59.99,
    rating: 4.9,
    reviewsCount: 382,
    imageUrl: "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=600",
    gender: "unisex",
    weekendOffer: true,
    offerPrice: 42.49,
    features: [
      "3-inch breathable memory foam",
      "Removable heat-defying bamboo cover",
      "Sturdy anti-slip corner elastic straps",
      "Hypoallergenic & dust-mite repellent"
    ],
    specifications: {
      "Thickness": "3 Inches",
      "Cover Material": "70% Bamboo Fiber, 30% Polyester",
      "Dorm Safe": "Yes, flame-retardant certified (CFR 1633)"
    },
    trustCert: "CFR 1633 Fire Safety Certified",
    inStock: true
  },
  {
    id: "prod-2",
    name: "AuraSoft Bamboo Bedsheet Bundle",
    category: "Bedding & Sleep",
    description: "Hypoallergenic, ultra-breathable sheets composed of authentic premium bamboo fibers. Keeps cooling in hot summer dorms and carries natural anti-bacterial tags to stay fresh longer.",
    price: 29.99,
    originalPrice: 35.99,
    rating: 4.8,
    reviewsCount: 247,
    imageUrl: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=600",
    gender: "girls",
    weekendOffer: true,
    offerPrice: 24.99,
    features: [
      "100% organic sustainable bamboo viscose",
      "Deep pockets fit up to 12-inch mattresses",
      "Naturally repels static & hair clingage",
      "Odour-resistant under high-humidity hostel seasons"
    ],
    specifications: {
      "Thread Count": "400 TC (equivalent softness to 1000 TC cotton)",
      "Set Includes": "1 Fitted Sheet, 1 Flat Sheet, 2 Pillowcases",
      "Washing Cycle": "Quick-dry compliant (save coins at laundromats)"
    },
    trustCert: "OEKO-TEX Certified Chemical-Free",
    inStock: true
  },
  {
    id: "prod-3",
    name: "Lumos360 Eye-Care LED Desk Lamp",
    category: "Lighting & Study",
    description: "Multi-joint clamp-on study lamp featuring customizable warmth filters. Emits zero flicker to protect your eyes during all-night study sessions without waking up roommates.",
    price: 24.99,
    originalPrice: 29.99,
    rating: 4.7,
    reviewsCount: 512,
    imageUrl: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=600",
    gender: "unisex",
    weekendOffer: true,
    offerPrice: 20.99,
    features: [
      "Dual-pivot 360-degree bendable aluminum arm",
      "Built-in 10W Fast USB-C accessory charging port",
      "5 brightness levels with 3 warmth temperatures",
      "Low wattage compliance (only takes 8 watts total)"
    ],
    specifications: {
      "Power Rating": "8 Watts maximum (extremely dorm compliant)",
      "LED Lifespan": "50,000 hours of peak lumen output",
      "Clamping Range": "Up to 2.5 inches (mounts on headboards or shelves)"
    },
    trustCert: "UL Listed & Dorm Energy-Safe Rated",
    inStock: true
  },
  {
    id: "prod-4",
    name: "Nebula Ambient Sunset & Projection Lamp",
    category: "Lighting & Study",
    description: "The ultimate aesthetic addition to any dorm room. Emits beautiful high-contrast sunset rings to create a peaceful, soothing sanctuary after a stressful day of college classes.",
    price: 21.99,
    originalPrice: 24.99,
    rating: 4.8,
    reviewsCount: 198,
    imageUrl: nebulaSunsetLamp,
    gender: "girls",
    weekendOffer: false,
    offerPrice: 18.69,
    features: [
      "16 millions colors supported via micro remote",
      "Perfect photographic backdrop for hostel memories",
      "Thickened optical crystal lens resists heat damage",
      "Durable non-tip weighted iron stand base"
    ],
    specifications: {
      "Material": "Thickened Optical Crystal & Safe Iron",
      "Connector": "Universal USB power cord with premium inline switch",
      "Power": "5W (safe for legacy power sockets)"
    },
    trustCert: "TUV Heat-Dissipation Compliance",
    inStock: true
  },
  {
    id: "prod-5",
    name: "SecureDorm Fingerprint Personal Vault",
    category: "Safety & Security",
    description: "Never worry about high-traffic roommates or guest visits. Heavy-duty alloy vault equipped with modern fingerprint triggers and a braided steel cable to leash securely to bunk posts.",
    price: 39.99,
    originalPrice: 49.99,
    rating: 4.9,
    reviewsCount: 310,
    imageUrl: "https://images.unsplash.com/photo-1510519138101-570d1dca3d66?auto=format&fit=crop&q=80&w=600",
    gender: "boys",
    weekendOffer: true,
    offerPrice: 33.99,
    features: [
      "Precision 3D fingerprint reader unlocks in 0.2s",
      "Heavy 4.5mm cut-resistant thick steel construction",
      "USB emergency unlock battery connection hub",
      "Fits 14-inch laptops, cash, files, and passports easily"
    ],
    specifications: {
      "Size": "14.2 x 10.5 x 4.1 Inches",
      "Security Leash": "3-foot premium coated steel anchor cable included",
      "Battery Life": "Up to 1 year on 4 AAA alkaline batteries"
    },
    trustCert: "Security Grade Dent-Resistant Certified",
    inStock: true
  },
  {
    id: "prod-6",
    name: "FlexiSpace Heavy-Duty Underbed Organizers",
    category: "Organization & Storage",
    description: "Multiply your room's usable storage. Thick reinforced fabric fits seamlessly inside narrow low-bunk clearances while moisture-shield panels preserve off-season clothes from stale air.",
    price: 19.99,
    originalPrice: 24.99,
    rating: 4.6,
    reviewsCount: 164,
    imageUrl: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=600",
    gender: "unisex",
    weekendOffer: true,
    offerPrice: 16.99,
    features: [
      "Rigid three-layer composite non-woven breathable fabric",
      "Wide transparent vinyl windows for viewing contents",
      "Stitched dual-force side handles resist ripping under pressure",
      "Slim-line alloy zipper glides effortlessly"
    ],
    specifications: {
      "Storage Capacity": "90 Liters per organizer (Pack of 3)",
      "Size Dimension": "39 x 20 x 7 Inches",
      "Protection": "Waterproof backing shield"
    },
    trustCert: "Tear-Test Certified Tough Fabric",
    inStock: true
  },
  {
    id: "prod-7",
    name: "QuickDry Anti-Odor Charcoal Towel Kit",
    category: "Grooming & Hygiene",
    description: "Never suffer from musty bathroom lockers or slow-drying towels again. Activated bamboo-charcoal fibers absorb 4x their weight in water and dry entirely within 20 minutes of hanging.",
    price: 15.99,
    originalPrice: 19.99,
    rating: 4.8,
    reviewsCount: 423,
    imageUrl: "https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&q=80&w=600",
    gender: "boys",
    weekendOffer: false,
    offerPrice: 13.59,
    features: [
      "Infused with natural bamboo charcoal prevents odor-causing spores",
      "Pack folds into a compact mesh carry bag (takes 85% less locker space)",
      "Hypoallergenic surface soft enough for sensitive facial styling",
      "Elastic hanging loop withstands multiple wash cycles"
    ],
    specifications: {
      "Includes": "1 Bath Towel (58\"x30\"), 1 Face Towel (24\"x12\")",
      "Fabric Weight": "Premium 400GSM Microfiber Viscose blend",
      "Drying Rate": "Dries 300% faster than standard cotton bath sheets"
    },
    trustCert: "Standard 100 Anti-Bacterial Bio-Certified",
    inStock: true
  },
  {
    id: "prod-8",
    name: "SilentBreeze Brushless USB Table Fan",
    category: "Grooming & Hygiene",
    description: "Fight stuffy hostel room temperatures silently. Employs advanced aircraft-fin layouts and high-speed brushless turbine magnets to output powerful chills while generating under 20dB noise.",
    price: 14.99,
    originalPrice: 17.99,
    rating: 4.7,
    reviewsCount: 289,
    imageUrl: "https://images.unsplash.com/photo-1618944847023-38aa001235f0?auto=format&fit=crop&q=80&w=600",
    gender: "unisex",
    weekendOffer: true,
    offerPrice: 12.74,
    features: [
      "Sturdy heavy-action spring clamp + flat desk base",
      "Powered by internal 4000mAh lithium cell (runs 12 hours unplugged)",
      "4 rotation speeds with natural-wind simulation algorithm",
      "Easily detachable cover grid for quick cleaning cycles"
    ],
    specifications: {
      "Acoustics": "18dB (whisper quiet, perfect for sleeping or lectures)",
      "Charging": "Fully charges via standard USB-C in 3 hours",
      "Fan Diameter": "6 inches total face area"
    },
    trustCert: "CE & RoHS Eco-Friendly Certified",
    inStock: true
  },
  {
    id: "prod-9",
    name: "DuraHold Over-The-Door Utility Hanger",
    category: "Organization & Storage",
    description: "Premium vertical space-saver. Hang five heavy bags, bulky coats, and shower towels directly on your door without causing scratches or creaks when opening or closing.",
    price: 18.99,
    originalPrice: 22.99,
    rating: 4.6,
    reviewsCount: 121,
    imageUrl: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=600",
    gender: "unisex",
    weekendOffer: false,
    offerPrice: 16.19,
    features: [
      "Forged carbon-plated iron holds up to 45 lbs safely",
      "Felt cushion backings cancel wood scratches and door noise",
      "6 multi-level ergonomic smooth spherical hook nodes",
      "Fits all standard interior hostelry doors"
    ],
    specifications: {
      "Sizing": "15.5 inches width, 9.4 inches vertical reach",
      "Thickness Requirement": "Fits door borders up to 1.75 inches thick",
      "Weight Capacity": "Tested up to 50 lbs under live loads"
    },
    trustCert: "Anti-Scratch Felt Patented Protection",
    inStock: true
  },
  {
    id: "prod-10",
    name: "AquaSafe Quick-Drain Silicone Caddy",
    category: "Grooming & Hygiene",
    description: "The hygienic solution for shared public hostel showers. This flexible premium silicone carrier sports grid drainage slots, preventing musty bacterial pools from collecting in damp spaces.",
    price: 12.99,
    originalPrice: 14.99,
    rating: 4.8,
    reviewsCount: 155,
    imageUrl: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=600",
    gender: "girls",
    weekendOffer: true,
    offerPrice: 11.04,
    features: [
      "100% thick medical-grade anti-mold virgin silicone",
      "Over 22 quick-drain bottom eyelets prevent mold growth",
      "Built-in slot anchors stand-up phone holds to play music",
      "Collapsible pocket flatpack saves travel packing weight"
    ],
    specifications: {
      "Weight": "0.4 lbs lightweight layout",
      "Structure": "8 specialized dividers for shampoo, razors, toothbrushes",
      "Max Hotness Limit": "Up to 240°F (safe for sterilization boils)"
    },
    trustCert: "FDA Approved Food-Grade Platinum Silicone",
    inStock: true
  },
  {
    id: "bundle-1",
    name: "Study Essentials Elite Pack",
    category: "Curated Bundles",
    description: "The ultimate academic starter kit engineered for productive and silent studying in shared hostel spaces. We have compiled our highest-rated eye-care Lumos360 lamp with integrated charging, our quiet-turbine brushless SilentBreeze fan, and the carbon-plated DuraHold hanger to maximize your bedroom workstation efficiency.",
    price: 44.99,
    originalPrice: 54.99,
    rating: 4.9,
    reviewsCount: 114,
    imageUrl: "https://m.media-amazon.com/images/I/81KAVzpzA4L._AC_UF1000%2C1000_QL80_.jpg",
    gender: "unisex",
    weekendOffer: true,
    offerPrice: 38.24,
    isBundle: true,
    itemsIncluded: ["Lumos360 Eye-Care LED Desk Lamp", "SilentBreeze Brushless USB Table Fan", "DuraHold Over-The-Door Utility Hanger"],
    features: [
      "Lumos360 anti-flicker double-pivot desk lamp",
      "SilentBreeze ultra-quiet USB desk fan (below 20dB)",
      "DuraHold heavy-duty multi-hook door organizers",
      "Bonus study planner template download included"
    ],
    specifications: {
      "Bundle Type": "Academic Workstation Setup",
      "Safety Cert": "Compliant with 10W standard hostel room power restrictions",
      "Warranty": "3-Year instant helpline swap guaranteed"
    },
    trustCert: "Academic Dean Recommended Workstation Setup",
    inStock: true,
    customerReviews: [
      {
        username: "Ethan K.",
        rating: 5,
        date: "2 days ago",
        comment: "This pack saved my final exams. The clamp lamp attaches perfectly to my top bunk headboard, and the fan is virtually silent so my roommate never complains!"
      },
      {
        username: "Chloe M.",
        rating: 4,
        date: "3 weeks ago",
        comment: "Outstanding value compared to buying them piece by piece. Extremely glad I chose this for freshman year."
      }
    ]
  },
  {
    id: "bundle-2",
    name: "Golden Sleep Comfort Suite",
    category: "Curated Bundles",
    description: "Turn standard, hard hostel mattresses into premium luxury resort beds instantly. Features our extra-thick memory foam topper to relieve pressure on back muscles and paired beds of authentic organic bamboo fibers that reject high summer bedroom sweats.",
    price: 64.99,
    originalPrice: 79.99,
    rating: 5.0,
    reviewsCount: 228,
    imageUrl: "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=600",
    gender: "unisex",
    weekendOffer: true,
    offerPrice: 55.24,
    isBundle: true,
    itemsIncluded: ["CozyCloud Orthopedic Mattress Topper", "AuraSoft Bamboo Bedsheet Bundle"],
    features: [
      "3-inch breathable memory foam with elastic anti-slip attachments",
      "Premium silky bamboo viscose fiber sheet sets",
      "No-sweat thermodynamic cooling regulation",
      "Tested hypoallergenic and dust-mite shield"
    ],
    specifications: {
      "Mattress Dimensions": "Standard 38\" x 75\" (Twin/Hostel Size)",
      "Sheet Material": "100% visco-bamboo organic fiber",
      "Fire Code": "CFR 1633 certified safe"
    },
    trustCert: "Sleep Trust Association Certified",
    inStock: true,
    customerReviews: [
      {
        username: "Marcus L.",
        rating: 5,
        date: "Yesterday",
        comment: "I went from waking up with terrible lower back soreness to sleeping 8 hours straight. Worth every single cent!"
      },
      {
        username: "Sasha G.",
        rating: 5,
        date: "1 month ago",
        comment: "Best upgrade I've ever bought for dormitory living. Seriously feels like luxury satin beddings!"
      }
    ]
  },
  {
    id: "bundle-3",
    name: "Elite Grooming & Hygiene Pack",
    category: "Curated Bundles",
    description: "Conquer community shared showers with unmatched cleanliness and hygiene. Includes our high-speed QuickDry anti-odor bath towel, the FDA platinum silicone quick-draining caddy, and a dual-force travel organization set to simplify clean living.",
    price: 22.99,
    originalPrice: 29.99,
    rating: 4.8,
    reviewsCount: 96,
    imageUrl: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=600",
    gender: "unisex",
    weekendOffer: true,
    offerPrice: 19.54,
    isBundle: true,
    itemsIncluded: ["QuickDry Anti-Odor Charcoal Towel Kit", "AquaSafe Quick-Drain Silicone Caddy"],
    features: [
      "Bamboo-charcoal infused microfiber towel (dries in 20 minutes)",
      "Silicon split shower pouch with active bottom water-draining grids",
      "Antimicrobial action stays fresh with no musty smell in wet lockboxes",
      "Easy-grip loops for hang rails and shower hooks"
    ],
    specifications: {
      "Pack Weight": "Less than 1 lb",
      "Material Composition": "100% Medical-grade silicone and breathable microfiber",
      "Anti-bacterial certification": "AATC 100 Compliant"
    },
    trustCert: "BioFresh Antimicrobial Certified",
    inStock: true,
    customerReviews: [
      {
        username: "Vikram R.",
        rating: 5,
        date: "5 days ago",
        comment: "Our public showers are always a swamp. This caddy keeps my shampoo neatly drained, and the towel literally dries in 20 minutes. Recommended!"
      },
      {
        username: "Elena P.",
        rating: 4,
        date: "2 weeks ago",
        comment: "Super convenient and compact. Folds up nicely in my limited trunk dresser drawer!"
      }
    ]
  },
  {
    id: "prod-11",
    name: "EcoWash Collapsible Smart Bucket",
    category: "Grooming & Hygiene",
    description: "The ultimate space-saver. A heavy-duty silicone utility bucket that collapses completely flat to fit under bunks, inside wardrobe crevices, or in lockers. Perfect for carrying laundry, dorm cleaning, or private water storage.",
    price: 11.99,
    originalPrice: 14.99,
    rating: 4.7,
    reviewsCount: 142,
    imageUrl: "https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&q=80&w=600",
    gender: "unisex",
    weekendOffer: true,
    offerPrice: 9.99,
    features: [
      "Heavy-duty silicone collapses down to 2 inches",
      "Sturdy triple-reinforced non-slip carrying grip",
      "Special grooved rim for effortless spill-free pouring",
      "Tear-resistant durable medical-grade thermal plastic"
    ],
    specifications: {
      "Capacity": "10 Liters standard volume",
      "Molded Build": "PP + TPR Premium leak-proof compound",
      "Storage Thickness": "1.9 inches flat depth"
    },
    trustCert: "High-Load Capacity Certified",
    inStock: true
  },
  {
    id: "prod-12",
    name: "AuraHydrate Insulated Thermal Jug",
    category: "Lighting & Study",
    description: "Keep your drinks icy cold for 24 hours or steaming hot for 12 hours. Features advanced double-wall copper vacuum insulation and an ergonomic handle designed for easy carrying to early-morning lectures.",
    price: 18.99,
    originalPrice: 22.99,
    rating: 4.8,
    reviewsCount: 205,
    imageUrl: "https://files.catbox.moe/o1t48l.webp",
    gender: "unisex",
    weekendOffer: false,
    offerPrice: 16.99,
    features: [
      "Dual-wall vacuum insulation keeps liquids cold up to 24 hours",
      "Food-grade 18/8 rust-free stainless steel core",
      "Built-in robust flip-lock straw for spill-proof sipping",
      "Sweat-free powder-coated outer grab layer"
    ],
    specifications: {
      "Volume capacity": "1.2 Liters high-capacity",
      "Lid safety": "BPA-free medical sealant gaskets",
      "Weight": "0.85 lbs unfilled"
    },
    trustCert: "FDA Certified BPA-Free Stainless Core",
    inStock: true
  },
  {
    id: "prod-13",
    name: "PureGlow Anti-Acne Moisture Soaps (Pack of 3)",
    category: "Skin Care & Cosmetics",
    description: "Deeply clarifying, dermatologically tested custom hotel soap bars. Formulated with activated charcoal, cooling tea-tree extract, and nourishing organic shea butter to eliminate stress breakouts and oily skin textures.",
    price: 8.99,
    originalPrice: 11.99,
    rating: 4.8,
    reviewsCount: 189,
    imageUrl: "https://files.catbox.moe/nddtyl.webp",
    gender: "unisex",
    weekendOffer: true,
    offerPrice: 7.49,
    features: [
      "Natural activated charcoal pulls out deep campus dirt",
      "Soothing tea-tree oil limits painful hormonal breakouts",
      "Dense organic shea base rehydrates dry skin scales",
      "Does not strip or dry out natural facial oil layers"
    ],
    specifications: {
      "Quantity": "Pack of 3 bars (120g each)",
      "Skin type compatibility": "All skin types (Highly friendly to sensitive skin)",
      "Chemical warnings": "100% paraben-free & sulfate-free"
    },
    trustCert: "Dermatologist Tested Skin-Friendly",
    inStock: true
  },
  {
    id: "prod-14",
    name: "AuraPeriod SafeComfort Organic Bamboo Pads",
    category: "Girls' Essential Hygiene",
    description: "Extremely breathable, organic bamboo-fiber sanitary pads custom engineered for girls. Delivers advanced multi-layer liquid-locking cores, zero-chemical fragrance, and comfortable wing protection. Packaged discreetly.",
    price: 7.99,
    originalPrice: 9.99,
    rating: 4.9,
    reviewsCount: 412,
    imageUrl: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&q=80&w=600",
    gender: "girls",
    weekendOffer: true,
    offerPrice: 6.79,
    features: [
      "Hypoallergenic organic bamboo cover stops rashes completely",
      "Super-absorbent micro-pore core secures heavy nighttime flows",
      "Comfortably thin wings match active campus walking days",
      "Biodegradable natural backing is friendly to plumbing"
    ],
    specifications: {
      "Pack Contents": "15 Premium Heavy-Duty Pads (Wings Included)",
      "Structure": "Extra-Long XL size (320mm coverage)",
      "Chemical certification": "FDA registered, chlorine-free bleached"
    },
    trustCert: "100% Organic Eco-Bio Hygienic Certified",
    inStock: true
  },
  {
    id: "prod-15",
    name: "AuraGlint Anti-Tarnish Minimalist Jewelry Set",
    category: "Girls' Wear & Jewelry",
    description: "Surgical-grade sterling silver minimalist jewelry set. Waterproof, sweat-resistant, and entirely tarnish-proof, making it ideal for active dormitory life, sports, classes, and college hangouts.",
    price: 24.99,
    originalPrice: 29.99,
    rating: 4.9,
    reviewsCount: 177,
    imageUrl: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=600",
    gender: "girls",
    weekendOffer: false,
    offerPrice: 21.99,
    features: [
      "Premium stainless base covered with genuine silver plating",
      "100% tarnish-free (worry-free wear in hostel steam showers)",
      "Hypoallergenic, completely lead and nickel chemical-free",
      "Sturdy lobster safety clasp prevents campus losing accidents"
    ],
    specifications: {
      "Includes": "1 Chain necklace, 1 Adjustable bracelet, 2 Classic stackable rings",
      "Metal Compound": "Premium 316L Surgical steel",
      "Coating Guard": "Anti-scratch vacuum PVD plating layer"
    },
    trustCert: "Sweat & Tarnish-Free Certified Wear",
    inStock: true
  },
  {
    id: "prod-16",
    name: "GlowRush Lip Oil & Dewy Cheek Cheek Tint Duo",
    category: "Skin Care & Cosmetics",
    description: "Dual-purpose blush and hydration tint pack. Infused with vitamin E and nourishing botanical oils to give girls a fresh, dewy, ready-to-go campus flush in under 30 seconds.",
    price: 15.99,
    originalPrice: 19.99,
    rating: 4.8,
    reviewsCount: 236,
    imageUrl: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=600",
    gender: "girls",
    weekendOffer: true,
    offerPrice: 13.59,
    features: [
      "Ultra-nourishing cold-pressed sweet almond base",
      "Blends seamlessly into any skin tone with zero heavy sticky feel",
      "Long-lasting 8H pigment stays put through warm lectures",
      "Antioxidant vitamins defend skin pores from dust pollutants"
    ],
    specifications: {
      "Includes": "1 Tinted Glass Lip Oil, 1 Cream-to-Powder Cheek Tint",
      "Ingredients": "Natural botanical oils + mineral pigments",
      "Safety": "Cruelty-free, vegan certified"
    },
    trustCert: "Vegan & Non-Comedogenic Skin Approved",
    inStock: true
  },
  {
    id: "prod-17",
    name: "DermaChill Hydrating Ceramide Moisturizer & SPF",
    category: "Skin Care & Cosmetics",
    description: "A highly defensive skincare combo for students. Incorporates 3 essential skin-identical ceramides to repair the skin barrier plus broad-spectrum sunscreen protection to block academic dehydration and tan rings.",
    price: 19.99,
    originalPrice: 24.99,
    rating: 4.9,
    reviewsCount: 304,
    imageUrl: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&q=80&w=600",
    gender: "unisex",
    weekendOffer: false,
    offerPrice: 17.49,
    features: [
      "Dries completely matte with zero ugly sticky cast",
      "Rich essential ceramides guard skin from college fatigue",
      "SPF 50 PA++++ blocks harmful sun rays",
      "Fragrance-free formula won't clog pores"
    ],
    specifications: {
      "Set Contents": "1 Hydrating Gel (100ml) + 1 Light SPF Cream (50ml)",
      "Primary Actives": "3 Essential Ceramides, Hyaluronic Acid, Niacinamide",
      "Ph Safety": "Physiological 5.5 balanced ph level"
    },
    trustCert: "Skin Barrier Safety Association Tested",
    inStock: true
  },
  {
    id: "prod-18",
    name: "AlphaHold 6-in-1 Precision Grooming Trimmer",
    category: "Grooming & Hygiene",
    description: "The premium self-grooming toolkit for boys living in high-density hostel blocks. Features stainless titanium-coated blades and long battery backup, meaning you get sharp cuts without queueing at salons.",
    price: 29.99,
    originalPrice: 35.99,
    rating: 4.8,
    reviewsCount: 295,
    imageUrl: "https://images.unsplash.com/photo-1621607512214-68297480165e?auto=format&fit=crop&q=80&w=600",
    gender: "boys",
    weekendOffer: true,
    offerPrice: 24.99,
    features: [
      "Precision self-sharpening titanium alloy blades",
      "6 specialized attachment guards for all beard speeds",
      "Runs for 150 minutes on a single 1.5-hour quick charge",
      "Waterproof styling head allows simple rinse-offs"
    ],
    specifications: {
      "Motor Speed": "7500 RPM Heavy-duty silent motor",
      "Battery type": "Rechargeable heavy-density lithium ion-cell",
      "Charge Port": "Universal USB-C charge cable included"
    },
    trustCert: "Dual-Voltage Safe Grooming Certified",
    inStock: true
  },
  {
    id: "prod-19",
    name: "AeroBarbell Heavy Resistance Gym Cord Kit",
    category: "Organization & Storage",
    description: "Say goodbye to expensive membership fees. Build muscle right inside your cramped hostel room with massive high-elastic resistance cord configurations and secure heavy door protectors.",
    price: 14.99,
    originalPrice: 17.99,
    rating: 4.7,
    reviewsCount: 108,
    imageUrl: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=600",
    gender: "boys",
    weekendOffer: false,
    offerPrice: 12.99,
    features: [
      "Thick premium heavy double-dipped natural latex cords",
      "Up to 150 lbs of stackable compound resistance options",
      "Double steel carabiners reinforce high tension movements",
      "Discreet space-saver canvas storage backpack included"
    ],
    specifications: {
      "Resistance Levels": "5 Elastic Cables (10lbs, 20lbs, 30lbs, 40lbs, 50lbs)",
      "Safety handles": "Comfort padded sponge anti-slip handles",
      "Dorm anchor guard": "Thick foam door bumper stays scratch-free"
    },
    trustCert: "Anti-Snap Heavy Tension Tested",
    inStock: true
  }
];

