/* ============================================================
   BLUE LOU STUDIOS — shop.js
   Product data, cart CRUD, drawer rendering, filter system.
   Loaded on shop.html and index.html (for featured grid).
   ============================================================ */

'use strict';

/* ============================================================
   PRODUCT DATA
   ============================================================ */
const PRODUCTS = [

  // ── HANDMADE POTTERY ──────────────────────────────────────

  {
    id: 'pottery-001',
    category: 'pottery',
    name: 'Waterfall Blue Natla (Hand Washing Cup)',
    description: 'A hand-thrown washing cup in a rich waterfall blue glaze — a meaningful, beautiful piece for the ritual of netilat yadayim. This one has sold, but a similar cup can be commissioned. Contact us to order.',
    price: 65.00,
    img: 'assets/images/IMG_1125.jpeg',
    badge: 'Judaica',
    featured: true,
    soldOut: true
  },
  {
    id: 'pottery-002',
    category: 'pottery',
    name: 'Carved Flower Mug',
    description: 'Each petal is hand-carved into the clay before glazing, so the teal pools beautifully in every groove. Truly one of a kind.',
    price: 60.00,
    img: 'assets/images/IMG_3178.jpeg',
    badge: 'Fan Favorite',
    featured: true,
    soldOut: true
  },
  {
    id: 'pottery-003',
    category: 'pottery',
    name: 'Plum Ribbed Mug',
    description: 'A deep plum-to-magenta glaze with a ribbed texture that feels wonderful in the hand. Rich, dramatic, and beautiful.',
    price: 45.00,
    img: 'assets/images/IMG_3984.jpeg',
    badge: null,
    featured: false,
    soldOut: false
  },
  {
    id: 'pottery-004',
    category: 'pottery',
    name: 'Happy Hanukkah Mug',
    description: 'Hand-lettered in navy blue glaze on a cream and blue stoneware mug. A sweet and personal holiday gift.',
    price: 45.00,
    img: 'assets/images/D341F537-40F7-4143-8BF4-3815FD11B814.jpg',
    badge: 'Judaica',
    featured: false,
    soldOut: false
  },
  {
    id: 'pottery-005',
    category: 'pottery',
    name: 'Kiddush Cup',
    description: 'A hand-thrown kiddush cup with the Hebrew words of the blessing over wine carved into the clay — a meaningful, personal piece for the Shabbat table.',
    price: 55.00,
    img: 'assets/images/IMG_3982.jpeg',
    badge: 'Judaica',
    featured: false,
    soldOut: false
  },
  {
    id: 'pottery-006',
    category: 'pottery',
    name: 'Spiral Galaxy Bowl',
    description: 'Deep blues and golds swirl outward from a painted center spiral. As much a piece of art as it is a serving bowl.',
    price: 55.00,
    img: 'assets/images/IMG_5235.jpeg',
    badge: null,
    featured: true,
    soldOut: true
  },
  {
    id: 'pottery-007',
    category: 'pottery',
    name: 'Blue Feather Bowl',
    description: 'Creamy white with bold blue teardrop brushstrokes radiating outward — every stroke placed by hand. This exact bowl has sold, but a similar piece can be commissioned. Contact us to inquire.',
    price: 55.00,
    img: 'assets/images/126131DC-3B9D-4934-A365-D9BC07F9DCD8.jpg',
    badge: null,
    featured: false,
    soldOut: true
  },
  {
    id: 'pottery-009',
    category: 'pottery',
    name: 'Blue Cobblestone Serving Bowl',
    description: 'A deep, richly glazed blue bowl with a cobblestone texture — equally at home with bread and olive oil or as a centerpiece. This one has sold, but a similar bowl can be commissioned.',
    price: 85.00,
    img: 'assets/images/Photoroom_20260321_223307.jpg',
    badge: null,
    featured: false,
    soldOut: true
  },
  {
    id: 'pottery-010',
    category: 'pottery',
    name: 'Octopus Plate',
    description: 'A hand-sculpted octopus in lavender blue swims across this cream stoneware plate, surrounded by raised green seaweed. A total showstopper.',
    price: 60.00,
    img: 'assets/images/IMG_3827.jpeg',
    badge: 'One of a Kind',
    featured: false,
    soldOut: false
  },
  {
    id: 'pottery-011',
    category: 'pottery',
    name: 'Blue and Pink Swirl Tray',
    description: 'Three mandala impressions pressed into a long, scallop-edged tray with a beautiful blue and pink swirl glaze. Perfect for a dresser or coffee table.',
    price: 85.00,
    img: 'assets/images/IMG_5225.JPG',
    badge: null,
    featured: false,
    soldOut: false
  },
  {
    id: 'pottery-012',
    category: 'pottery',
    name: 'Havdallah Set',
    description: 'A hand-thrown Havdallah set in soft blue and cream: a besamim (spice) box with cork lid, a wine cup, and a candle holder — made to bring beauty to the end of Shabbat. This exact set has sold, but similar sets are available. Contact us to order.',
    price: 95.00,
    img: 'assets/images/IMG_2291.jpeg',
    badge: 'Judaica',
    featured: false,
    soldOut: false
  },
  {
    id: 'pottery-013',
    category: 'pottery',
    name: 'Pink Kiddush Cup',
    description: 'A hand-thrown kiddush cup in a deep rosy-pink glaze with a natural clay base. Can be personalized with a name, date, or blessing — contact us to customize yours.',
    price: 65.00,
    img: 'assets/images/0e83c626-6cc6-4de1-ab0e-fc291d4df348.jpg',
    badge: 'Custom Order',
    featured: true,
    soldOut: false
  },
  {
    id: 'pottery-014',
    category: 'pottery',
    name: 'Natla — Washing Cup & Bowl Set',
    description: 'A traditional two-handled washing cup (natla) paired with a matching bowl, both in a soft blue glaze. This set has sold, but it can be commissioned — contact us and we\'ll make one for you.',
    price: 75.00,
    img: 'assets/images/IMG_2625.jpeg',
    badge: 'Judaica',
    featured: false,
    soldOut: true
  },
  {
    id: 'pottery-015',
    category: 'pottery',
    name: 'Hanukkah Decorative Trays',
    description: 'Two hand-made trays with raised Hanukkah imagery pressed into the clay — one in navy, one in soft blue. This set has sold, but similar pieces can be commissioned. Contact us to inquire.',
    price: 100.00,
    img: 'assets/images/IMG_3186.jpeg',
    badge: 'Judaica',
    featured: false,
    soldOut: true
  },
  {
    id: 'pottery-016',
    category: 'pottery',
    name: 'Hamsa Wall Hanging — Dark Floral',
    description: 'A large hamsa (8.25" × 7") with intricate raised floral relief in dark navy clay, finished with a leather hanging cord. A stunning piece for any wall.',
    price: 45.00,
    img: 'assets/images/Photoroom_20260324_084907.jpg',
    badge: null,
    featured: true,
    soldOut: false
  },
  {
    id: 'pottery-017',
    category: 'pottery',
    name: 'Hamsa Wall Hanging — Mandala',
    description: 'Two mandala-patterned hamsas (8.25" × 7" each) in complementary blue glazes, each with a leather hanging cord. Sold individually.',
    price: 45.00,
    img: 'assets/images/IMG_3978.jpeg',
    badge: null,
    featured: false,
    soldOut: false
  },
  {
    id: 'pottery-018',
    category: 'pottery',
    name: 'Raindrop Wall Installation',
    description: 'Hundreds of individually hand-made ceramic teardrops in blues and whites, strung from a piece of driftwood. A breathtaking statement piece. Each one is made to order — reach out to commission yours.',
    price: 350.00,
    img: 'assets/images/IMG_4742.jpeg',
    badge: 'Commission',
    featured: true,
    soldOut: false,
    contactOnly: true
  },
  {
    id: 'pottery-019',
    category: 'pottery',
    name: 'Pomegranate Wall Art',
    description: 'A large ceramic pomegranate wall sculpture (8.25" × 6.25") in a vivid raspberry glaze — a symbol of abundance and new beginnings. Stunning on its own or as part of a gallery wall.',
    price: 45.00,
    img: 'assets/images/IMG_5181.jpeg',
    badge: null,
    featured: false,
    soldOut: false
  },
  {
    id: 'pottery-019b',
    category: 'pottery',
    name: 'Ceramic Birdbath',
    description: 'A large hand-thrown birdbath in a deep teal glaze — a real centerpiece for any garden. This one has sold, but contact us to commission one.',
    price: 175.00,
    img: 'assets/images/IMG_4169.jpeg',
    badge: 'Commission',
    featured: false,
    soldOut: true
  },
  {
    id: 'pottery-020',
    category: 'pottery',
    name: 'Ceramic Flower Garden Stakes — Set of 3',
    description: 'Hand-made ceramic flowers on iron stakes — colorful, playful, and made to live outdoors. Always in stock and easy to make more of. Each set of 3 is unique.',
    price: 55.00,
    img: 'assets/images/IMG_3959.jpeg',
    badge: null,
    featured: false,
    soldOut: false
  },
  {
    id: 'pottery-021',
    category: 'pottery',
    name: 'Red Poppy Garden Stakes',
    description: 'Vivid red ceramic poppies on iron stakes. Bold color that holds up beautifully outdoors. Set of 3.',
    price: 55.00,
    img: 'assets/images/IMG_5191.jpeg',
    badge: null,
    featured: false,
    soldOut: false
  },
  {
    id: 'pottery-022',
    category: 'pottery',
    name: 'Mini Raindrop Wall Installation',
    description: 'A smaller version of the beloved Raindrop Wall Installation — hand-made ceramic teardrops in blues and whites, strung from driftwood. A striking piece for any wall.',
    price: 118.00,
    img: 'assets/images/IMG_1607.jpeg',
    badge: null,
    featured: false,
    soldOut: false
  },
  {
    id: 'pottery-023',
    category: 'pottery',
    name: 'Snowflake Ornament',
    description: 'A hand-made ceramic snowflake ornament with carved detail and a navy blue glaze. Photographed in the snow, where it belongs.',
    price: 22.00,
    img: 'assets/images/IMG_3812.jpeg',
    badge: 'Holiday',
    featured: false,
    soldOut: false
  },
  {
    id: 'pottery-024',
    category: 'pottery',
    name: 'Gingerbread Cottage Ornament',
    description: 'A hand-made ceramic gingerbread house ornament with white snow-glaze detail. Cheerful and charming on any tree.',
    price: 22.00,
    img: 'assets/images/6FDE2024-139E-44C2-A346-3062ACD20DF9.jpg',
    badge: 'Holiday',
    featured: false,
    soldOut: false
  },
  {
    id: 'pottery-025',
    category: 'pottery',
    name: 'Owl Ornament',
    description: 'A hand-made ceramic owl ornament in warm brown tones with hand-painted detail. A nature lover\'s favorite.',
    price: 22.00,
    img: 'assets/images/41DC409A-752D-42F5-9275-90CB49E2E33D.jpg',
    badge: 'Holiday',
    featured: false,
    soldOut: false
  },
  {
    id: 'pottery-026',
    category: 'pottery',
    name: 'Personalized Name Wind Chime',
    description: 'Ceramic leaf-shaped tags on a piece of driftwood, each inscribed with a family member\'s name. A truly personal, lasting keepsake. Reach out to commission yours.',
    price: 95.00,
    img: 'assets/images/IMG_3271.jpeg',
    badge: 'Commission',
    featured: false,
    contactOnly: true,
    soldOut: false
  },
  {
    id: 'pottery-027',
    category: 'pottery',
    name: 'Bud Vase — Small',
    description: 'A small hand-thrown bud vase in a blue and cream speckled glaze. This one has sold, but similar vases are always available — contact us to order.',
    price: 35.00,
    img: 'assets/images/IMG_1683.jpeg',
    badge: null,
    featured: false,
    soldOut: false
  },
  {
    id: 'pottery-028',
    category: 'pottery',
    name: 'Full-Size Vases — Pink & Blue',
    description: 'Two hand-thrown full-size vases — one in rosy pink, one in soft blue. Sold individually at $45 each — let us know which color you\'d like.',
    price: 45.00,
    img: 'assets/images/IMG_8263.jpeg',
    badge: null,
    featured: false,
    soldOut: false
  },
  {
    id: 'pottery-029',
    category: 'pottery',
    name: 'Tall Vase',
    description: 'A tall, elegant vase with a deep blue-to-earthy-brown glaze. Makes a statement with just a few stems. This one has sold, but similar vases are available — contact us to order.',
    price: 65.00,
    img: 'assets/images/IMG_7911.jpeg',
    badge: null,
    featured: false,
    soldOut: false
  },
  {
    id: 'pottery-030',
    category: 'pottery',
    name: 'Mezzuzot',
    description: 'Handmade ceramic mezzuzot. Klaf not included. Sold separately.',
    price: 45.00,
    img: 'assets/images/IMG_1358.jpeg',
    badge: 'Judaica',
    featured: false,
    soldOut: false
  },
  {
    id: 'pottery-031',
    category: 'pottery',
    name: 'Persum HaNes Menorah',
    description: '"Publicizing the miracle" — five hand-made ceramic rowhouses, each with windows that let the Hanukkah light shine through. A one-of-a-kind menorah that tells the story of the holiday in the most personal way.',
    price: 75.00,
    img: 'assets/images/Photoroom_20260327_181320.jpg',
    img2: 'assets/images/Photoroom_20260327_181441.jpg',
    badge: 'Judaica',
    featured: false,
    soldOut: false
  },
  {
    id: 'pottery-032',
    category: 'pottery',
    name: 'Custom Name Mugs — Teacher & Gift Sets',
    description: 'Each mug is hand-thrown and hand-lettered with the recipient\'s name. Shown here as a set made for a school — perfect for teacher appreciation, holidays, or any milestone. Contact us to order.',
    price: 65.00,
    img: 'assets/images/IMG_1366.jpeg',
    badge: 'Custom Order',
    featured: false,
    soldOut: false
  },
  {
    id: 'pottery-033',
    category: 'pottery',
    name: 'Custom Branded Mugs',
    description: 'Hand-thrown mugs with your business logo or text on each piece. Shown here for Soma Grove Wellness — a beautiful and memorable gift for clients, staff, or events. Contact us to commission.',
    price: 75.00,
    img: 'assets/images/3E9425B8-C65A-4B7C-9949-2F55AE7A04C5.jpg',
    badge: 'Custom Order',
    featured: false,
    soldOut: false
  },
  {
    id: 'pottery-034',
    category: 'pottery',
    name: 'Seder Plate — Blue & White',
    description: 'Six hand-thrown compartments arranged in a ring, each labeled in Hebrew with the name of its Seder element — Zeroa, Beitzah, Maror, Charoset, Chazeret, and Karpas. A rich blue glaze with cream centers and hand-painted Hebrew text. This one has sold, but a similar plate can be commissioned — contact us to order.',
    price: 120.00,
    img: 'assets/images/A28F6715-FEDD-45F6-A243-4B30807A04B2.jpg',
    badge: 'Judaica',
    featured: false,
    soldOut: true
  },
  {
    id: 'pottery-035',
    category: 'pottery',
    name: 'Seder Plate — Ivory',
    description: 'Six hand-shaped petal compartments in a soft ivory glaze, each inscribed with a Seder element in blue Hebrew text. Elegant and understated — a piece you\'ll pass down.',
    price: 110.00,
    img: 'assets/images/IMG_5788.jpeg',
    badge: 'Judaica',
    featured: false,
    soldOut: false
  },
  {
    id: 'pottery-036',
    category: 'pottery',
    name: 'Basketweave Mezuzah',
    description: 'A hand-made ceramic mezuzah with a raised basketweave texture — available in soft blue or creamy white glaze. Sized to hold a standard mezuzah scroll (not included). Sold individually — contact us if you\'d like a matched pair.',
    price: 38.00,
    img: 'assets/images/IMG_1609 2.jpeg',
    badge: 'Judaica',
    featured: false,
    soldOut: false
  },
  {
    id: 'pottery-037',
    category: 'pottery',
    name: 'Kiddush Cup — Goblet Style',
    description: 'A hand-thrown goblet-style kiddush cup in a beautiful blue and white glaze. An elegant, classic form for the Shabbat table.',
    price: 45.00,
    img: 'assets/images/IMG_7897.jpeg',
    badge: 'Judaica',
    featured: false,
    soldOut: false
  },

  // ── 3D PRINTS ─────────────────────────────────────────────

  {
    id: 'prints-001',
    category: 'prints',
    name: 'Spiral Star Fidget',
    description: 'A satisfying, precision-printed spiral star fidget — smooth to spin, great for focus and relaxation. Perfect for all ages.',
    price: 15.00,
    img: 'assets/images/spiral star fidget.jpg',
    badge: null,
    featured: false,
    soldOut: false
  },
  {
    id: 'prints-002',
    category: 'prints',
    name: '5 Star Fidget Spinner',
    description: 'A five-petal star fidget spinner, precision 3D printed for a smooth, satisfying spin. Great for the desk or on the go.',
    price: 10.00,
    img: 'assets/images/Fidget Spinner 5 petal.jpg',
    badge: null,
    featured: false,
    soldOut: false
  },
  {
    id: 'prints-003',
    category: 'prints',
    name: 'Articulated Crystal Dragon',
    description: 'A fully articulated crystal dragon — every joint moves independently. Printed in a single piece with no assembly required. An instant conversation starter.',
    price: 12.00,
    img: 'assets/images/Articulated crystal dragon.jpg',
    badge: 'Fan Favorite',
    featured: false,
    soldOut: false
  },
  {
    id: 'prints-004',
    category: 'prints',
    name: 'Custom 3D Design',
    description: 'Have something specific in mind? We can print custom designs — gifts, organizers, replacement parts, and more. Reach out with your idea and we\'ll give you a quote.',
    price: 0,
    img: 'assets/images/placeholder-supplies.svg',
    badge: 'Price on Request',
    featured: false,
    soldOut: false,
    priceOnRequest: true
  },

  // ── RITUAL SUPPORT ────────────────────────────────────────

  {
    id: 'ritual-001',
    category: 'ritual',
    name: 'Baby-Naming Certificate',
    description: 'A beautiful, personalized certificate for a Jewish baby-naming ceremony. Each design is a digital file ($10) — you will receive a personalized PDF to print yourself or take to a print shop. Available in six designs. Choose your favorite from the dropdown below.',
    price: 10.00,
    img: 'assets/images/circles.png',
    badge: 'Digital File',
    featured: false,
    soldOut: false,
    variants: [
      { label: 'Blue & Gray Circles', price: 10, img: 'assets/images/blue & gray circles.png' },
      { label: 'Circles',             price: 10, img: 'assets/images/circles.png' },
      { label: 'Flowers',             price: 10, img: 'assets/images/flowers.png' },
      { label: 'Gold',                price: 10, img: 'assets/images/gold.png' },
      { label: 'Hearts',              price: 10, img: 'assets/images/hearts.png' },
      { label: 'Oval with Ribbons',   price: 10, img: 'assets/images/oval with ribbons.png' },
    ]
  },
  {
    id: 'ritual-002',
    category: 'ritual',
    name: 'Shabbat & Holiday Honors Cards',
    description: 'Beautifully designed cards for distributing synagogue honors at Shabbat morning services, Rosh Hashanah, and Yom Kippur. <strong>Standard versions</strong> are ready-to-print files delivered immediately. <strong>Customized versions</strong> include your community\'s name, logo, and preferred page numbers — allow up to one week for delivery. All cards are digital files; you will need to print them yourself or through your community\'s print shop. The <em>Aliyot cards</em> include 7 aliyot and maftir. The <em>Shabbat morning honors cards</em> include ark openings/closings, 7 aliyot, maftir, hagbah &amp; glilah for 2 Torahs, Prayer for the State of Israel, Prayer for Our Country, Anim Zemirot, and 5 honors of your choice.',
    price: 15.00,
    img: 'assets/images/Shabbat Honor Cards - standard - first aliyah.jpeg',
    img2: 'assets/images/Shabbat Honor Cards - standard - aliyah blessings.jpeg',
    badge: 'Digital File',
    featured: false,
    soldOut: false,
    variants: [
      { label: 'Aliyot Cards — Standard',                   price: 15 },
      { label: 'Aliyot Cards — Customized',                  price: 55 },
      { label: 'Shabbat Morning Honors — Standard',          price: 25 },
      { label: 'Shabbat Morning Honors — Customized',        price: 75 },
      { label: 'Rosh Hashanah Honors — Standard',            price: 25 },
      { label: 'Rosh Hashanah Honors — Customized',          price: 75 },
      { label: 'Yom Kippur Honors — Standard',               price: 25 },
      { label: 'Yom Kippur Honors — Customized',             price: 75 },
    ]
  },

  // ── POTTERY SUPPLIES ──────────────────────────────────────

  {
    id: 'supplies-001',
    category: 'supplies',
    name: 'Pottery Tracker Journal',
    description: 'A hand-made pottery tracking journal to record your glazes, firing notes, and piece details — so you can recreate the ones you love. Photo and full details coming soon!',
    price: 0,
    img: 'assets/images/placeholder-supplies.svg',
    badge: 'Coming Soon',
    featured: false,
    soldOut: true,
    comingSoon: true
  },

  // ── EXTRAS ────────────────────────────────────────────────

  {
    id: 'extras-001',
    category: 'extras',
    name: 'Real Men Marry Rabbis T-Shirt',
    description: 'Show the world what you know. Available in a range of styles, colors, and sizes through our Spreadshop.',
    price: null,
    img: 'assets/images/real-men-marry-rabbis.jpg',
    badge: null,
    featured: false,
    soldOut: false,
    externalLink: 'https://realmenmarryrabbis.myspreadshop.com/'
  },
  {
    id: 'extras-002',
    category: 'extras',
    name: 'Rabbis ♥ Cheshvan T-Shirt',
    description: 'For the rabbi who truly loves the quiet month. Available in a range of styles, colors, and sizes through our Spreadshop.',
    price: null,
    img: 'assets/images/I_Heart_Cheshvan.jpeg',
    badge: null,
    featured: false,
    soldOut: false,
    externalLink: 'https://realmenmarryrabbis.myspreadshop.com/'
  },
  {
    id: 'extras-003',
    category: 'extras',
    name: 'Phone Bracelet',
    description: 'Handmade beaded phone bracelets — keeps your phone close while your hands stay free. Available in multiple color combinations, with or without a tassel or charm. Select your style below.',
    price: 10.00,
    img: 'assets/images/rainbow phone bracelet.jpg',
    badge: null,
    featured: false,
    soldOut: false,
    variants: [
      { label: 'Rainbow — No tassel/charm',                  price: 10, img: 'assets/images/rainbow phone bracelet.jpg' },
      { label: 'Purple & Turquoise — No tassel/charm',       price: 10, img: 'assets/images/purple & turquoise phone bracelet.jpg' },
      { label: 'Purple & Turquoise — With tassel',           price: 12, img: 'assets/images/purple & turquise phone bracelet with tassel.jpg' },
    ]
  },
  {
    id: 'extras-004',
    category: 'extras',
    name: 'Blue Lou Tote Bag',
    description: 'A sturdy canvas tote with the Blue Lou Studios bunny stamp. Big enough for the farmers market, a sketchbook, or everything. Details coming soon!',
    price: 24.00,
    img: 'assets/images/placeholder-swag.svg',
    badge: 'Coming Soon',
    featured: false,
    soldOut: true,
    comingSoon: true
  },
  {
    id: 'extras-005',
    category: 'extras',
    name: 'Blue Lou Sticker Pack',
    description: 'Weatherproof vinyl stickers featuring the Blue Lou Studios bunny stamp — for water bottles, laptops, and anywhere you want a little Blue Lou. Details coming soon!',
    price: 8.00,
    img: 'assets/images/placeholder-swag.svg',
    badge: 'Coming Soon',
    featured: false,
    soldOut: true,
    comingSoon: true
  }
];

/* ============================================================
   CART CRUD
   ============================================================ */
function getCart() {
  try {
    return JSON.parse(localStorage.getItem('bluelou_cart') || '[]');
  } catch (e) {
    return [];
  }
}

function saveCart(cart) {
  try {
    localStorage.setItem('bluelou_cart', JSON.stringify(cart));
  } catch (e) { /* private browsing — degrade gracefully */ }
}

function addToCart(productId, variantLabel, variantPrice) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product || product.soldOut) return;

  const name  = variantLabel ? `${product.name} — ${variantLabel}` : product.name;
  const price = (variantPrice !== undefined && variantPrice !== null) ? variantPrice : product.price;
  const cartId = variantLabel ? `${productId}__${variantLabel}` : productId;

  let cart = getCart();
  const existing = cart.find(i => i.id === cartId);
  if (existing) {
    cart = cart.map(i => i.id === cartId ? { ...i, qty: i.qty + 1 } : i);
  } else {
    cart.push({ id: cartId, name, price, qty: 1, category: product.category, img: product.img });
  }
  saveCart(cart);
  if (window.updateCartBadgeGlobal) window.updateCartBadgeGlobal();
}

// Exposed globally for main.js cart drawer buttons
window.cartAction = function(action, id) {
  let cart = getCart();
  if (action === 'remove') {
    cart = cart.filter(i => i.id !== id);
  } else if (action === 'inc') {
    cart = cart.map(i => i.id === id ? { ...i, qty: i.qty + 1 } : i);
  } else if (action === 'dec') {
    cart = cart.map(i => i.id === id ? { ...i, qty: i.qty - 1 } : i).filter(i => i.qty > 0);
  }
  saveCart(cart);
  if (window.renderCartDrawerGlobal) window.renderCartDrawerGlobal();
  if (window.updateCartBadgeGlobal)  window.updateCartBadgeGlobal();
};

/* ============================================================
   PRODUCT CARD RENDERER
   ============================================================ */
function createProductCard(product) {
  const article = document.createElement('article');
  article.className = 'product-card' + (product.soldOut ? ' product-card--sold-out' : '');
  article.dataset.category = product.category;
  if (product.badge === 'Judaica') article.dataset.judaica = 'true';

  const categoryLabels = {
    pottery:  'Handmade Pottery',
    prints:   '3D Prints',
    ritual:   'Ritual Support',
    supplies: 'Pottery Supplies',
    extras:   'Extras',
    swag:     'Extras'
  };

  // Badge colour variants
  const badgeClass =
    product.badge === 'Custom Order' || product.badge === 'Commission'
      ? 'product-badge product-badge--custom'
    : product.badge === 'Coming Soon'
      ? 'product-badge product-badge--soon'
    : product.badge === 'Judaica'
      ? 'product-badge product-badge--judaica'
    : product.badge === 'Holiday'
      ? 'product-badge product-badge--holiday'
    : product.badge === 'Digital File'
      ? 'product-badge product-badge--digital'
    : product.badge === 'Price on Request'
      ? 'product-badge product-badge--soon'
    : 'product-badge';

  // Price display
  let priceHTML;
  if (product.comingSoon) {
    priceHTML = `<span class="product-price product-price--soon">Coming Soon</span>`;
  } else if (product.contactOnly) {
    priceHTML = `<span class="product-price product-price--request">Commission</span>`;
  } else if (product.priceOnRequest) {
    priceHTML = `<span class="product-price product-price--request">Price on Request</span>`;
  } else if (product.externalLink) {
    priceHTML = `<span class="product-price product-price--request">See Spreadshop</span>`;
  } else if (product.variants && product.variants.length) {
    priceHTML = `<span class="product-price product-variant-price">$${product.variants[0].price.toFixed(2)}</span>`;
  } else {
    priceHTML = `<span class="product-price">$${product.price.toFixed(2)}</span>`;
  }

  // Button
  let btnHTML;
  if (product.comingSoon) {
    btnHTML = `<button class="add-to-cart-btn add-to-cart-btn--soon" disabled>Notify Me</button>`;
  } else if (product.contactOnly) {
    btnHTML = `<a href="mailto:blueloustudios@gmail.com" class="add-to-cart-btn add-to-cart-btn--commission">Reach Out to Artist</a>`;
  } else if (product.priceOnRequest) {
    btnHTML = `<a href="contact.html" class="add-to-cart-btn add-to-cart-btn--commission">Contact Us</a>`;
  } else if (product.externalLink) {
    btnHTML = `<a href="${product.externalLink}" target="_blank" rel="noopener noreferrer" class="add-to-cart-btn add-to-cart-btn--external">Shop Now →</a>`;
  } else if (product.soldOut) {
    btnHTML = `<a href="contact.html" class="add-to-cart-btn add-to-cart-btn--commission">Request to Commission</a>`;
  } else {
    btnHTML = `
      <button class="add-to-cart-btn" data-product-id="${product.id}" aria-label="Add ${product.name} to cart">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
        </svg>
        Add to Cart
      </button>`;
  }

  // Variant dropdown (if applicable)
  let variantHTML = '';
  if (product.variants && product.variants.length && !product.soldOut && !product.comingSoon) {
    const options = product.variants.map((v, i) =>
      `<option value="${i}">${v.label}${v.price !== product.variants[0].price ? ' — $' + v.price.toFixed(2) : ''}</option>`
    ).join('');
    variantHTML = `<select class="product-variant-select" aria-label="Select option">${options}</select>`;
  }

  article.innerHTML = `
    <div class="product-img-wrap">
      <img src="${product.img}" alt="${product.name}" loading="lazy">
      ${product.badge ? `<span class="${badgeClass}">${product.badge}</span>` : ''}
      ${product.soldOut && !product.comingSoon ? `<div class="product-sold-out-overlay"><span>Sold Out</span></div>` : ''}
    </div>
    <div class="product-body">
      <span class="product-category">${categoryLabels[product.category] || product.category}</span>
      <h3 class="product-name">${product.name}</h3>
      <p class="product-desc">${product.description}</p>
      ${variantHTML}
      <div class="product-footer">
        ${priceHTML}
        ${btnHTML}
      </div>
    </div>`;

  // Image hover swap (products with img2)
  if (product.img2) {
    const imgEl = article.querySelector('.product-img-wrap img');
    imgEl.addEventListener('mouseover', () => { imgEl.src = product.img2; });
    imgEl.addEventListener('mouseout',  () => { imgEl.src = product.img;  });
  }

  // Variant change: update image + price
  if (product.variants && product.variants.length) {
    const select = article.querySelector('.product-variant-select');
    const imgEl  = article.querySelector('.product-img-wrap img');
    const priceEl = article.querySelector('.product-variant-price');

    if (select) {
      select.addEventListener('change', () => {
        const v = product.variants[parseInt(select.value, 10)];
        if (v.img && imgEl) imgEl.src = v.img;
        if (priceEl) priceEl.textContent = `$${v.price.toFixed(2)}`;
      });
    }
  }

  // Add to cart interaction (only for available, non-variant products)
  if (!product.soldOut && !product.comingSoon && !product.priceOnRequest && !product.externalLink) {
    const btn = article.querySelector('.add-to-cart-btn[data-product-id]');
    if (btn) {
      btn.addEventListener('click', () => {
        // Determine variant if applicable
        const select = article.querySelector('.product-variant-select');
        let variantLabel = null;
        let variantPrice = null;
        if (select && product.variants) {
          const v = product.variants[parseInt(select.value, 10)];
          variantLabel = v.label;
          variantPrice = v.price;
        }

        addToCart(product.id, variantLabel, variantPrice);
        btn.classList.add('added');
        btn.innerHTML = `
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          Added!`;
        setTimeout(() => {
          btn.classList.remove('added');
          btn.innerHTML = `
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Add to Cart`;
        }, 1200);
      });
    }
  }

  return article;
}

/* ============================================================
   FEATURED PRODUCTS (home page)
   ============================================================ */
function renderFeaturedProducts() {
  const grid = document.getElementById('featured-products-grid');
  if (!grid) return;

  const featured = PRODUCTS.filter(p => p.featured && !p.comingSoon).slice(0, 4);
  featured.forEach(p => grid.appendChild(createProductCard(p)));
}

/* ============================================================
   SHOP GRID + FILTER (shop.html)
   ============================================================ */
function renderShopGrid() {
  const grid = document.getElementById('shop-products-grid');
  if (!grid) return;

  PRODUCTS.forEach(p => grid.appendChild(createProductCard(p)));
}

function initShopFilters() {
  const grid = document.getElementById('shop-products-grid');
  if (!grid) return;

  const filterBtns = document.querySelectorAll('.filter-btn');
  const validFilters = ['pottery', 'prints', 'judaica', 'ritual', 'supplies', 'extras'];

  // Apply filter from URL param on load
  const params = new URLSearchParams(window.location.search);
  const paramFilter = params.get('filter');
  if (paramFilter && validFilters.includes(paramFilter)) {
    grid.dataset.filter = paramFilter;
    filterBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.filter === paramFilter);
    });
  } else {
    filterBtns[0]?.classList.add('active');
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;
      grid.dataset.filter = filter || '';
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
}

/* ============================================================
   INIT
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  renderFeaturedProducts();
  renderShopGrid();
  initShopFilters();
});
