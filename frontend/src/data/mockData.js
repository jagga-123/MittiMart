export const stateData = [
  {
    name: "Bihar",
    desc: "Madhubani Painting, Sikki Craft, Sujani Embroidery",
    crafts: ["Madhubani Painting", "Sikki Craft", "Sujani Embroidery"],
  },
  {
    name: "Rajasthan",
    desc: "Blue Pottery, Handmade Jewellery, Bandhani",
    crafts: ["Blue Pottery", "Handmade Jewellery", "Bandhani"],
  },
  {
    name: "Kashmir",
    desc: "Pashmina Shawls, Walnut Wood Carving, Papier-mâché",
    crafts: ["Pashmina Shawls", "Walnut Wood Carving", "Papier-mâché"],
  },
  {
    name: "West Bengal",
    desc: "Kantha Stitch, Dokra Metal Craft, Terracotta",
    crafts: ["Kantha Stitch", "Dokra Metal Craft", "Terracotta"],
  },
  {
    name: "Gujarat",
    desc: "Patola Silk, Rogan Art, Kutch Embroidery",
    crafts: ["Patola Silk", "Rogan Art", "Kutch Embroidery"],
  },
  {
    name: "Uttar Pradesh",
    desc: "Chikankari, Zari-Zardozi, Brassware",
    crafts: ["Chikankari", "Zari-Zardozi", "Brassware"],
  },
  {
    name: "Odisha",
    desc: "Pattachitra, Silver Filigree, Ikat Weave",
    crafts: ["Pattachitra", "Silver Filigree", "Ikat Weave"],
  },
  {
    name: "Tamil Nadu",
    desc: "Tanjore Painting, Kondapalli Toys, Bronze Casting",
    crafts: ["Tanjore Painting", "Kondapalli Toys", "Bronze Casting"],
  },
];

export const artists = [
  {
    slug: "sunita-devi-madhubani",
    name: "Sunita Devi",
    location: "Madhubani, Bihar",
    exp: 28,
    bio: "A mother, teacher, and keeper of a 100-year-old family tradition.",
    story:
      "Keeping a 100-year-old family art alive, one painting at a time. Sunita paints by hand with natural pigments, then narrates each motif like a chapter from her village memory.",
    crafts: ["Madhubani Painting", "Natural Colors", "Wall Murals"],
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80",
    products: ["madhubani-painting-lord-ganesha", "madhubani-elephant-panel"],
  },
  {
    slug: "ramesh-kumbhar-kutch",
    name: "Ramesh Kumbhar",
    location: "Kutch, Gujarat",
    exp: 40,
    bio: "Clay remembers the rhythm of his hands.",
    story:
      "My hands remember what my grandfather taught me - the clay never forgets. Ramesh shapes each vase slowly, letting the wheel and the earth decide the final curve.",
    crafts: ["Pottery", "Blue Pottery", "Clay Toys"],
    image: "https://images.unsplash.com/photo-1560008581-ecb4f0d7fb1d?auto=format&fit=crop&w=900&q=80",
    products: ["blue-pottery-peacock-vase"],
  },
  {
    slug: "laxmi-ben-bandhani",
    name: "Laxmi Ben",
    location: "Bhuj, Gujarat",
    exp: 18,
    bio: "Bandhani color stories for homes and celebrations.",
    story:
      "Every knot in Bandhani is a wish. Laxmi and her women-led self-help group dye, fold, and tie fabric with patient hands and bright optimism.",
    crafts: ["Bandhani", "Textile", "Women-led SHG"],
    image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80",
    products: ["bandhani-dupatta-sunrise"],
  },
  {
    slug: "noor-jahan-kashmir",
    name: "Noor Jahan",
    location: "Srinagar, Kashmir",
    exp: 24,
    bio: "Soft wool, patient looms, winter stories.",
    story:
      "Noor turns the hush of winter into warmth. Her shawls are woven slowly, with patterns inspired by valleys, saffron fields, and the quiet of morning snow.",
    crafts: ["Pashmina", "Shawls", "Weaving"],
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80",
    products: ["pashmina-shawl-kashmir-mist"],
  },
  {
    slug: "priya-das-kolkata",
    name: "Priya Das",
    location: "Shantiniketan, West Bengal",
    exp: 15,
    bio: "Kantha stitches that feel like handwritten letters.",
    story:
      "Priya stitches stories from old saris into new lives. Her Kantha work is calm, bright, and detailed, like a song you only notice after it ends.",
    crafts: ["Kantha Stitch", "Terracotta", "Textile"],
    image: "https://images.unsplash.com/photo-1515191107209-c28698631303?auto=format&fit=crop&w=900&q=80",
    products: ["kantha-table-runner-garden"],
  },
  {
    slug: "imran-ansari-lucknow",
    name: "Imran Ansari",
    location: "Lucknow, Uttar Pradesh",
    exp: 12,
    bio: "A modern hand for a centuries-old needle art.",
    story:
      "Chikankari is patience made visible. Imran works with family tailors to keep embroidery elegant, airy, and wearable in modern homes and wardrobes.",
    crafts: ["Chikankari", "Zari-Zardozi", "Brassware"],
    image: "https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?auto=format&fit=crop&w=900&q=80",
    products: ["chikankari-kurta-pearl"],
  },
  {
    slug: "kavitha-rao-thanjavur",
    name: "Kavitha Rao",
    location: "Thanjavur, Tamil Nadu",
    exp: 22,
    bio: "Bright temple art with a contemporary soul.",
    story:
      "Kavitha gives Tanjore painting its glow using gesso, foil, and patient detail. Each piece feels ceremonial, like a memory framed in light.",
    crafts: ["Tanjore Painting", "Bronze Casting", "Temple Art"],
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=80",
    products: ["tanjore-ganesha-panel"],
  },
];

export const products = [
  {
    slug: "madhubani-painting-lord-ganesha",
    name: "Madhubani Wall Painting - Lord Ganesha",
    artist: "Sunita Devi",
    artistSlug: "sunita-devi-madhubani",
    location: "Madhubani, Bihar",
    state: "Bihar",
    craft: "Painting",
    price: 999,
    rating: 4.8,
    reviews: 124,
    makingDays: "5 Days",
    timeBucket: "3-7 days",
    sellerType: "Women Entrepreneur",
    description:
      "A vibrant wall painting hand-drawn with natural pigments and devotional detail, made to bring warmth and blessings to your entrance or living room.",
    shortStory:
      "The painting carries the rhythm of village festivals and the soft, patient pace of hand-drawn linework.",
    image:
      "https://images.unsplash.com/photo-1588445247658-29f2b9f3d3f7?auto=format&fit=crop&w=1400&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1588445247658-29f2b9f3d3f7?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1496065187959-7f07b8353c55?auto=format&fit=crop&w=1400&q=80",
    ],
    timeline: [
      "Day 1 - Raw material collected from local market",
      "Day 3 - Artist began hand-crafting",
      "Day 4 - Second layer of natural colours applied",
      "Day 5 - Quality check done",
      "Day 5 - Packed with eco-friendly material",
      "Day 6 - Ready for delivery",
    ],
    date: "06 June 2026",
    reviewBreakdown: { 5: 78, 4: 16, 3: 4, 2: 1, 1: 1 },
    reviewsList: [
      { name: "Ananya", rating: 5, text: "It feels alive on the wall. The colors are even richer in person." },
      { name: "Rohit", rating: 5, text: "Beautiful packaging and a lovely handwritten note from the artist." },
      { name: "Meera", rating: 4, text: "Came right on time and the craftsmanship is excellent." },
    ],
  },
  {
    slug: "madhubani-elephant-panel",
    name: "Madhubani Elephant Story Panel",
    artist: "Sunita Devi",
    artistSlug: "sunita-devi-madhubani",
    location: "Madhubani, Bihar",
    state: "Bihar",
    craft: "Painting",
    price: 1399,
    rating: 4.9,
    reviews: 88,
    makingDays: "7 Days",
    timeBucket: "7+ days",
    sellerType: "Women Entrepreneur",
    description:
      "A larger framed story panel featuring elephants, birds, and the sacred tree of life in the classic Madhubani style.",
    shortStory: "A centerpiece that turns a wall into a story about celebration, animals, and ancestral memory.",
    image:
      "https://images.unsplash.com/photo-1487700160041-babef9c3cb55?auto=format&fit=crop&w=1400&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1487700160041-babef9c3cb55?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=1400&q=80",
    ],
    timeline: [
      "Day 1 - Base frame prepared",
      "Day 3 - Outline sketched by hand",
      "Day 5 - Colours layered and shaded",
      "Day 7 - Sealed and quality checked",
    ],
    date: "05 June 2026",
    reviewBreakdown: { 5: 83, 4: 11, 3: 4, 2: 1, 1: 1 },
    reviewsList: [
      { name: "Tanvi", rating: 5, text: "The detailing is incredible. We bought this for our new home." },
      { name: "Arjun", rating: 5, text: "This is not just decor, it feels personal." },
    ],
  },
  {
    slug: "blue-pottery-peacock-vase",
    name: "Blue Pottery Peacock Vase",
    artist: "Ramesh Kumbhar",
    artistSlug: "ramesh-kumbhar-kutch",
    location: "Kutch, Gujarat",
    state: "Gujarat",
    craft: "Pottery",
    price: 1499,
    rating: 4.7,
    reviews: 67,
    makingDays: "3 Days",
    timeBucket: "1-3 days",
    sellerType: "Village Artist",
    description:
      "A cool-toned decorative vase with delicate peacock motifs and a hand-finished glaze.",
    shortStory: "The clay and the glaze are tuned like instruments, bringing calm to a shelf or side table.",
    image:
      "https://images.unsplash.com/photo-1515517211541-0eb4c0e8c1d2?auto=format&fit=crop&w=1400&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1515517211541-0eb4c0e8c1d2?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1509017174183-0b7a57c7b6c2?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1531913764164-5c4d5b587bdd?auto=format&fit=crop&w=1400&q=80",
    ],
    timeline: [
      "Day 1 - Clay sourced from nearby kiln",
      "Day 2 - Wheel shaping and drying",
      "Day 3 - Glaze and motif finishing",
    ],
    date: "03 June 2026",
    reviewBreakdown: { 5: 69, 4: 22, 3: 7, 2: 1, 1: 1 },
    reviewsList: [
      { name: "Karan", rating: 5, text: "The finish is so elegant. It sits beautifully on our console." },
      { name: "Priyanka", rating: 4, text: "Lovely craft, exactly what I wanted for a gift." },
    ],
  },
  {
    slug: "bandhani-dupatta-sunrise",
    name: "Bandhani Dupatta - Sunrise Bloom",
    artist: "Laxmi Ben",
    artistSlug: "laxmi-ben-bandhani",
    location: "Bhuj, Gujarat",
    state: "Gujarat",
    craft: "Textile",
    price: 2199,
    rating: 4.9,
    reviews: 93,
    makingDays: "7 Days",
    timeBucket: "7+ days",
    sellerType: "Women Entrepreneur",
    description:
      "A bright Bandhani dupatta that moves like a festival, tied and dyed in precise dots and joyful color.",
    shortStory: "Every dot is a promise made by a women's collective with strong hands and a shared future.",
    image:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1400&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1400&q=80",
    ],
    timeline: [
      "Day 1 - Fabric washed and prepared",
      "Day 3 - Resist tying completed",
      "Day 5 - Colour baths layered",
      "Day 7 - Drying and finishing",
    ],
    date: "02 June 2026",
    reviewBreakdown: { 5: 86, 4: 10, 3: 2, 2: 1, 1: 1 },
    reviewsList: [
      { name: "Nida", rating: 5, text: "The colors are stunning and it feels handmade in the best way." },
      { name: "Sana", rating: 5, text: "Perfect festive gift. So soft and beautiful." },
    ],
  },
  {
    slug: "pashmina-shawl-kashmir-mist",
    name: "Pashmina Shawl - Kashmir Mist",
    artist: "Noor Jahan",
    artistSlug: "noor-jahan-kashmir",
    location: "Srinagar, Kashmir",
    state: "Kashmir",
    craft: "Weaving",
    price: 4999,
    rating: 4.8,
    reviews: 58,
    makingDays: "7 Days",
    timeBucket: "7+ days",
    sellerType: "Self-Help Group",
    description:
      "An elegant pashmina shawl that drapes lightly, woven to feel like a winter morning in the valley.",
    shortStory: "Soft, warm, and quietly luxurious - crafted for gifting or cherished everyday wear.",
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1400&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1400&q=80",
    ],
    timeline: [
      "Day 1 - Wool selected and cleaned",
      "Day 4 - Loom weaving started",
      "Day 7 - Final wash and finishing",
    ],
    date: "01 June 2026",
    reviewBreakdown: { 5: 80, 4: 15, 3: 4, 2: 1, 1: 0 },
    reviewsList: [
      { name: "Aisha", rating: 5, text: "Feels premium and the packaging was beautiful." },
      { name: "Dev", rating: 4, text: "Warm, elegant, and worth the price." },
    ],
  },
  {
    slug: "kantha-table-runner-garden",
    name: "Kantha Table Runner - Garden Song",
    artist: "Priya Das",
    artistSlug: "priya-das-kolkata",
    location: "Shantiniketan, West Bengal",
    state: "West Bengal",
    craft: "Textile",
    price: 1299,
    rating: 4.9,
    reviews: 104,
    makingDays: "5 Days",
    timeBucket: "3-7 days",
    sellerType: "Women Entrepreneur",
    description:
      "A hand-stitched table runner that turns everyday meals into a softer, slower ritual.",
    shortStory: "Each stitch is tiny and precise, like a handwritten note tucked into your dining space.",
    image:
      "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=1400&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1531913764164-5c4d5b587bdd?auto=format&fit=crop&w=1400&q=80",
    ],
    timeline: [
      "Day 1 - Fabric cut and washed",
      "Day 2 - Motif outline stitched",
      "Day 5 - Finished and packed",
    ],
    date: "31 May 2026",
    reviewBreakdown: { 5: 88, 4: 9, 3: 2, 2: 1, 1: 0 },
    reviewsList: [
      { name: "Rhea", rating: 5, text: "It adds such warmth to the dining table." },
      { name: "Kabir", rating: 5, text: "Stitching is immaculate and full of character." },
    ],
  },
  {
    slug: "chikankari-kurta-pearl",
    name: "Chikankari Kurta - Pearl Mist",
    artist: "Imran Ansari",
    artistSlug: "imran-ansari-lucknow",
    location: "Lucknow, Uttar Pradesh",
    state: "Uttar Pradesh",
    craft: "Textile",
    price: 2499,
    rating: 4.7,
    reviews: 79,
    makingDays: "7 Days",
    timeBucket: "7+ days",
    sellerType: "Village Artist",
    description:
      "A breathable hand-embroidered kurta with delicate shadow work and elegant everyday wearability.",
    shortStory: "A modern silhouette stitched with the patience of an old craft and a very human touch.",
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1400&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1400&q=80",
    ],
    timeline: [
      "Day 1 - Fabric prepped and marked",
      "Day 4 - Embroidery in progress",
      "Day 7 - Final press and inspection",
    ],
    date: "30 May 2026",
    reviewBreakdown: { 5: 71, 4: 19, 3: 7, 2: 2, 1: 1 },
    reviewsList: [
      { name: "Farah", rating: 5, text: "Comfortable, elegant, and made with care." },
      { name: "Imtiaz", rating: 4, text: "The embroidery is delicate and nicely finished." },
    ],
  },
  {
    slug: "tanjore-ganesha-panel",
    name: "Tanjore Ganesha Panel",
    artist: "Kavitha Rao",
    artistSlug: "kavitha-rao-thanjavur",
    location: "Thanjavur, Tamil Nadu",
    state: "Tamil Nadu",
    craft: "Painting",
    price: 3499,
    rating: 4.9,
    reviews: 42,
    makingDays: "7 Days",
    timeBucket: "7+ days",
    sellerType: "Women Entrepreneur",
    description:
      "A luminous Tanjore panel with temple-inspired gold accents and ceremonial detail.",
    shortStory: "An artwork that feels like a shrine for your home - bright, devotional, and deeply handcrafted.",
    image:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1400&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1487700160041-babef9c3cb55?auto=format&fit=crop&w=1400&q=80",
    ],
    timeline: [
      "Day 1 - Board preparation",
      "Day 3 - Gesso detailing",
      "Day 5 - Gold foil application",
      "Day 7 - Final sealing",
    ],
    date: "29 May 2026",
    reviewBreakdown: { 5: 90, 4: 8, 3: 1, 2: 1, 1: 0 },
    reviewsList: [
      { name: "Siddhi", rating: 5, text: "Feels regal and carefully made." },
      { name: "Mahesh", rating: 5, text: "A centerpiece for our prayer room." },
    ],
  },
];

export const reels = [
  {
    slug: "making-madhubani",
    productSlug: "madhubani-painting-lord-ganesha",
    artist: "Sunita Devi",
    craft: "Madhubani Painting",
    location: "Madhubani, Bihar",
    likes: "18.4K",
    views: "212K",
    image: "https://images.unsplash.com/photo-1497040579140-7d898aa1b4f2?auto=format&fit=crop&w=900&q=80",
  },
  {
    slug: "wheel-pottery",
    productSlug: "blue-pottery-peacock-vase",
    artist: "Ramesh Kumbhar",
    craft: "Pottery",
    location: "Kutch, Gujarat",
    likes: "9.2K",
    views: "88K",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=900&q=80",
  },
  {
    slug: "bandhani-tie-dye",
    productSlug: "bandhani-dupatta-sunrise",
    artist: "Laxmi Ben",
    craft: "Bandhani",
    location: "Bhuj, Gujarat",
    likes: "13.8K",
    views: "145K",
    image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80",
  },
  {
    slug: "kantha-stitch",
    productSlug: "kantha-table-runner-garden",
    artist: "Priya Das",
    craft: "Kantha Stitch",
    location: "Shantiniketan, West Bengal",
    likes: "7.9K",
    views: "66K",
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80",
  },
];

export const initialOrders = [
  {
    id: "MM-1209",
    productSlug: "madhubani-painting-lord-ganesha",
    buyerCity: "Mumbai",
    amount: 850,
    status: "orange",
  },
  {
    id: "MM-1210",
    productSlug: "kantha-table-runner-garden",
    buyerCity: "Delhi",
    amount: 1299,
    status: "blue",
  },
  {
    id: "MM-1211",
    productSlug: "blue-pottery-peacock-vase",
    buyerCity: "Pune",
    amount: 1499,
    status: "green",
  },
];

export const notificationsFeed = [
  {
    type: "orange",
    title: "New order received",
    body: "Sunita Ji, a new order of ₹850 has arrived from Mumbai.",
    time: "2 min ago",
  },
  {
    type: "green",
    title: "Payment received",
    body: "₹1,499 has been credited to your UPI wallet.",
    time: "19 min ago",
  },
  {
    type: "blue",
    title: "New message from buyer",
    body: "A customer asked if the painting can be delivered before Friday.",
    time: "1 hour ago",
  },
  {
    type: "orange",
    title: "Wishlist price drop",
    body: "A follower's favorite Bandhani dupatta is now 10% off.",
    time: "Today",
  },
];

export const chatThreads = [
  {
    name: "Ananya Sharma",
    city: "Mumbai",
    lastSeen: "2 min ago",
    responseTime: "Usually replies in 15 min",
    messages: [
      { sender: "buyer", text: "Namaste, mujhe 2 paintings chahiye.", time: "10:21" },
      { sender: "seller", text: "Ji, kal tak ready ho jayegi.", time: "10:24", read: true },
      { sender: "buyer", text: "Can you share a close-up photo?", time: "10:25" },
    ],
  },
  {
    name: "Rohit Mehra",
    city: "Delhi",
    lastSeen: "12 min ago",
    responseTime: "Usually replies in 30 min",
    messages: [
      { sender: "buyer", text: "I want it as a wedding gift.", time: "09:40" },
      { sender: "seller", text: "Aapko gift wrap aur certificate dono milega.", time: "09:43", read: true },
    ],
  },
];

export const whatsappCommands = [
  { command: "Product photo + voice note", reply: "Creates a product listing draft and sends a preview." },
  { command: "Mera order dikhao", reply: "Sends the list of pending orders." },
  { command: "Kitna paisa aaya", reply: "Replies with earnings summary." },
  { command: "Order ready hai", reply: "Updates the order status to shipped." },
  { command: "Help", reply: "Sends an audio guide in the seller's language." },
];

export const analyticsBars = [
  { month: "Jan", value: 36 },
  { month: "Feb", value: 48 },
  { month: "Mar", value: 32 },
  { month: "Apr", value: 60 },
  { month: "May", value: 72 },
  { month: "Jun", value: 88 },
];
