import { Destination, TravelPackage, Testimonial } from "./types";

export const FEATURED_DESTINATIONS: Destination[] = [
  {
    id: "dest-1",
    name: "Pulau Padar",
    location: "Taman Nasional Komodo, NTT",
    enLocation: "Komodo National Park, NTT",
    image: "/assets/padar_island.png",
    price: "Mulai Rp 1.350.000",
    rating: 5.0,
    reviewsCount: 1420,
    tag: "Terpopuler",
    enTag: "Most Popular",
    duration: "Satu Hari",
    enDuration: "One Day",
    description: "Trekking legendaris menuju puncak bukit untuk menyaksikan panorama spektakuler tiga lekukan teluk laut raksasa dengan gradasi warna pasir berbeda.",
    enDescription: "Legendary trek to the hilltop to witness a spectacular panorama of three giant sea bays with different sand colors."
  },
  {
    id: "dest-2",
    name: "Pink Beach",
    location: "Taman Nasional Komodo, NTT",
    enLocation: "Komodo National Park, NTT",
    image: "/assets/pink_beach.png",
    price: "Mulai Rp 1.350.000",
    rating: 4.9,
    reviewsCount: 980,
    tag: "Eksotis",
    enTag: "Exotic",
    duration: "Satu Hari",
    enDuration: "One Day",
    description: "Nikmati keindahan pantai berpasir merah muda yang sangat langka di dunia, berpadu selaras dengan air toska jernih serta terumbu karang yang menawan.",
    enDescription: "Enjoy the beauty of a very rare pink sandy beach, blending perfectly with clear turquoise waters and stunning coral reefs."
  },
  {
    id: "dest-3",
    name: "Pulau Komodo",
    location: "Taman Nasional Komodo, NTT",
    enLocation: "Komodo National Park, NTT",
    image: "/assets/komodo_dragon.png",
    price: "Mulai Rp 1.350.000",
    rating: 4.9,
    reviewsCount: 1650,
    tag: "Situs Warisan Dunia",
    enTag: "World Heritage Site",
    duration: "Satu Hari",
    enDuration: "One Day",
    description: "Petualangan menakjubkan menyusuri jalur safari rimba untuk berjumpa langsung dengan kadal purba terbesar di dunia didampingi ranger profesional.",
    enDescription: "An amazing adventure along the jungle safari trail to meet the world's largest living lizards face-to-face, guided by a professional ranger."
  },
  {
    id: "dest-4",
    name: "Pulau Rinca",
    location: "Taman Nasional Komodo, NTT",
    enLocation: "Komodo National Park, NTT",
    image: "/assets/rinca_island.png",
    price: "Mulai Rp 1.350.000",
    rating: 4.8,
    reviewsCount: 810,
    tag: "Edukasi & Alam",
    enTag: "Educational & Nature",
    duration: "Satu Hari",
    enDuration: "One Day",
    description: "Saksikan habitat alami naga purba Komodo di tengah bentangan sabana kuning eksotis dengan kontur trekking santai berpemandangan menakjubkan.",
    enDescription: "Witness the natural habitat of prehistoric Komodo dragons amidst exotic yellow savannas with a light trekking path and amazing views."
  },
  {
    id: "dest-5",
    name: "Taka Makassar",
    location: "Taman Nasional Komodo, NTT",
    enLocation: "Komodo National Park, NTT",
    image: "/assets/taka_makassar.png",
    price: "Mulai Rp 1.350.000",
    rating: 4.9,
    reviewsCount: 740,
    tag: "Unik",
    enTag: "Unique",
    duration: "Satu Hari",
    enDuration: "One Day",
    description: "Gundukan pasir kecil nan menawan berbentuk bulan sabit di tengah lautan biru dangkal yang jernih, bagai oase tropis pribadi di Labuan Bajo.",
    enDescription: "A charming crescent-shaped sandbar in the middle of clear shallow blue waters, like a private tropical oasis in Labuan Bajo."
  },
  {
    id: "dest-6",
    name: "Manta Point",
    location: "Taman Nasional Komodo, NTT",
    enLocation: "Komodo National Park, NTT",
    image: "/assets/manta_point.png",
    price: "Mulai Rp 1.350.000",
    rating: 5.0,
    reviewsCount: 910,
    tag: "Bawah Laut",
    enTag: "Underwater",
    duration: "Satu Hari",
    enDuration: "One Day",
    description: "Sensasi snorkeling luar biasa berenang bersama gerombolan ikan pari raksasa Manta Ray yang ramah dan menakjubkan di arus air laut jernih.",
    enDescription: "An extraordinary snorkeling experience swimming alongside schools of giant, friendly Manta Rays in clear sea currents."
  },
  {
    id: "dest-7",
    name: "Kanawa Island",
    location: "Labuan Bajo, NTT",
    enLocation: "Labuan Bajo, NTT",
    image: "/assets/kanawa_island.png",
    price: "Mulai Rp 1.350.000",
    rating: 4.8,
    reviewsCount: 630,
    tag: "Snorkeling",
    enTag: "Snorkeling",
    duration: "Satu Hari",
    enDuration: "One Day",
    description: "Pulau resor eksotis berpantai pasir putih lembut yang dikelilingi taman laut penuh ikan hias tropis warna-warni dan bintang laut indah.",
    enDescription: "An exotic resort island with powdery white sand beaches surrounded by a marine garden filled with colorful tropical fish and starfish."
  },
  {
    id: "dest-8",
    name: "Goa Rangko",
    location: "Labuan Bajo, NTT",
    enLocation: "Labuan Bajo, NTT",
    image: "/assets/goa_rangko.png",
    price: "Mulai Rp 700.000",
    rating: 4.7,
    reviewsCount: 520,
    tag: "Hidden Gem",
    enTag: "Hidden Gem",
    duration: "Setengah Hari",
    enDuration: "Half Day",
    description: "Gua batu stalaktit magis dengan kolam renang air asin alami bergradasi biru kristal gelap yang sejuk, layaknya pemandian rahasia para raja.",
    enDescription: "A magical stalactite cave with a cool, natural saltwater pool of dark crystal blue gradients, like a secret bath of royalty."
  },
  {
    id: "dest-9",
    name: "Bukit Amelia",
    location: "Labuan Bajo, NTT",
    enLocation: "Labuan Bajo, NTT",
    image: "/assets/bukit_amelia.png",
    price: "Mulai Rp 700.000",
    rating: 4.8,
    reviewsCount: 450,
    tag: "Pemandangan Sunset",
    enTag: "Sunset View",
    duration: "Setengah Hari",
    enDuration: "Half Day",
    description: "Bukit estetik terbaik dengan trek ringan untuk menyaksikan lanskap perbukitan berundak berlatarkan matahari terbenam emas yang magis.",
    enDescription: "An aesthetic hill with a light trek to witness a terraced hill landscape set against a magical golden sunset."
  }
];

export const POPULAR_PACKAGES: TravelPackage[] = [
  {
    id: "pkg-1",
    title: "Sailing Komodo 6 Destinasi (Sharing/Private)",
    enTitle: "Sailing Komodo 6 Destinations (Sharing/Private)",
    destination: "Taman Nasional Komodo",
    enDestination: "Komodo National Park",
    duration: "1 Hari / Full Day Speedboat",
    enDuration: "1 Day / Full Day Speedboat",
    price: "Rp 1.350.000",
    oldPrice: "Rp 1.650.000",
    image: "/assets/padar_island.png",
    rating: 5.0,
    badge: "Terlaris",
    enBadge: "Best Seller",
    description: "Jelajahi 6 destinasi unggulan TN Komodo dalam 1 hari: Pulau Padar, Pink Beach, Pulau Komodo, Taka Makassar, Manta Point, dan Turtle Point/Siaba Bay dengan speedboat modern.",
    enDescription: "Explore 6 top destinations in Komodo National Park in 1 day: Padar Island, Pink Beach, Komodo Island, Taka Makassar, Manta Point, and Turtle Point/Siaba Bay by modern speedboat.",
    inclusions: [
      "Speedboat Modern AC PP",
      "Makan Siang Box Istimewa & Buah Segar",
      "Perlengkapan Snorkeling Lengkap & Pelampung",
      "Tiket Masuk TN Komodo & Ranger",
      "Air Mineral & Soft Drinks Dingin",
      "Pemandu Lokal Berlisensi Resmi"
    ],
    enInclusions: [
      "AC Modern Speedboat Roundtrip",
      "Special Lunch Box & Fresh Fruits",
      "Full Snorkeling Gear & Life Jacket",
      "Komodo National Park Entry & Ranger",
      "Cold Mineral Water & Soft Drinks",
      "Official Licensed Local Guide"
    ]
  },
  {
    id: "pkg-2",
    title: "Sewa Kapal Phinisi Labuan Bajo Luxury",
    enTitle: "Labuan Bajo Luxury Phinisi Yacht Charter",
    destination: "Labuan Bajo & Komodo",
    enDestination: "Labuan Bajo & Komodo",
    duration: "3 Hari 2 Malam (Live on Board)",
    enDuration: "3 Days 2 Nights (Live on Board)",
    price: "Rp 3.000.000",
    oldPrice: "Rp 3.500.000",
    image: "/assets/phinisi_boat.jpg",
    rating: 4.9,
    badge: "Premium Trip",
    enBadge: "Premium Trip",
    description: "Merasakan sensasi eksklusif menginap di atas kapal Phinisi mewah modern (Live on Board) untuk menjelajahi keindahan perairan Komodo secara privat dan elegan.",
    enDescription: "Experience the exclusive sensation of staying on board a modern luxury Phinisi yacht (Live on Board) to explore the beauty of Komodo in private elegance.",
    inclusions: [
      "Menginap di Kamar Cabin Full AC Mewah",
      "Chef di Kapal (Makan 3x sehari fresh)",
      "Snack Sore, Buah, Teh & Kopi Flores",
      "Penjemputan Airport Transfer PP",
      "Dokumentasi Premium (Drone & GoPro)",
      "Kru Kapal Siaga & Friendly Guide"
    ],
    enInclusions: [
      "Stay in Luxury Full AC Cabin Rooms",
      "Onboard Chef (3x fresh meals daily)",
      "Afternoon Snacks, Fruits, Tea & Flores Coffee",
      "Airport Transfer Roundtrip",
      "Premium Documentation (Drone & GoPro)",
      "Alert Crew & Friendly Guide"
    ]
  },
  {
    id: "pkg-3",
    title: "Paket Wisata Kampung Adat Wae Rebo",
    enTitle: "Wae Rebo Traditional Village Tour Package",
    destination: "Flores Daratan",
    enDestination: "Flores Mainland",
    duration: "2 Hari 1 Malam",
    enDuration: "2 Days 1 Night",
    price: "Rp 2.250.000",
    oldPrice: "Rp 2.600.000",
    image: "/assets/wae_rebo.png",
    rating: 4.9,
    badge: "Kultural",
    enBadge: "Cultural",
    description: "Perjalanan spiritual dan budaya luar biasa menuju desa tradisional di atas awan Wae Rebo. Rasakan keramahan warga lokal dan bermalam di Mbaru Niang yang magis.",
    enDescription: "An extraordinary spiritual and cultural journey to the traditional village above the clouds, Wae Rebo. Experience local hospitality and spend the night in the magical Mbaru Niang.",
    inclusions: [
      "Transportasi Mobil AC (Labuan Bajo - Denge PP)",
      "Menginap di Rumah Adat Mbaru Niang",
      "Makan Sesuai Rute & Kuliner Lokal",
      "Upacara Penyambutan Adat Waelu",
      "Pemandu Lokal Berlisensi",
      "Air Mineral & Porter Trekking"
    ],
    enInclusions: [
      "AC Car Transport (Labuan Bajo - Denge Roundtrip)",
      "Stay in Traditional Mbaru Niang House",
      "Meals on Route & Local Culinary",
      "Waelu Traditional Welcome Ceremony",
      "Licensed Local Guide",
      "Mineral Water & Trekking Porter"
    ]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "test-1",
    name: "Rizky Pratama",
    role: "Keluarga Traveler",
    enRole: "Family Traveler",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
    content: "Luar biasa pelayanan KOMODO KAMU! Kami sekeluarga memesan Private Trip Phinisi 3H2M kemarin. Sammy dan tim menyiapkan kapal yang sangat bersih, makanannya enak luar biasa dimasak fresh oleh chef kapal. Driver jemput tepat waktu dan guide sangat telaten memandu anak-anak tracking Pulau Padar.",
    enContent: "Incredible service from KOMODO KAMU! Our family booked a 3D2N Private Phinisi Trip recently. Sammy and the team prepared a very clean boat, and the food was amazing, cooked fresh by the boat chef. The driver picked us up on time, and the guide was very patient in helping our children trek Padar Island.",
    rating: 5,
    destination: "Sailing Phinisi Luxury",
    enDestination: "Sailing Phinisi Luxury"
  },
  {
    id: "test-2",
    name: "Amanda Syahputri",
    role: "Solo Traveler",
    enRole: "Solo Traveler",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
    content: "Pertama kali ke Labuan Bajo sendirian, saya memilih Sharing Trip 6 Destinasi dari KOMODO KAMU. Harganya sangat jujur, kru kapalnya ramah dan lucu, dokumentasi drone dan GoPro-nya bagus banget buat diunggah ke sosmed! Sangat direkomendasikan!",
    enContent: "First time in Labuan Bajo alone, I chose the 6 Destinations Sharing Trip from KOMODO KAMU. The price was very transparent, the crew was friendly and funny, and the drone and GoPro documentation was great for sharing on social media! Highly recommended!",
    rating: 5,
    destination: "Sharing Trip 6 Destinasi",
    enDestination: "Sharing Trip 6 Destinations"
  },
  {
    id: "test-3",
    name: "dr. Albertus Nugroho",
    role: "Dokter Gigi",
    enRole: "Dentist",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200",
    content: "Saya menyewa mobil Innova Reborn + Driver dari KOMODO KAMU untuk trip Flores darat ke Wae Rebo. Mobilnya wangi, sangat bersih, suspensinya nyaman, dan Mas Driver sangat jago melintasi kelokan tajam Flores dengan aman. Komunikasi fast response via WhatsApp.",
    enContent: "I rented an Innova Reborn + Driver from KOMODO KAMU for a Flores overland trip to Wae Rebo. The car was fresh and clean, the suspension was comfortable, and the driver was very skilled at navigating the sharp Flores turns safely. Great, fast communication via WhatsApp.",
    rating: 5,
    destination: "Rental Mobil & Wae Rebo",
    enDestination: "Car Rental & Wae Rebo"
  }
];

export const FAQS = [
  {
    id: "faq-1",
    question: "Apa saja rute 6 destinasi dalam satu hari trip?",
    enQuestion: "What are the 6 destinations visited in the one-day trip?",
    answer: "Rute 6 destinasi unggulan kami mencakup: 1. Pulau Padar (tracking view), 2. Pink Beach (snorkeling & relax), 3. Pulau Komodo (melihat komodo didampingi ranger), 4. Taka Makassar (pulau pasir putih), 5. Manta Point (snorkeling pari Manta), dan 6. Turtle Point / Siaba Bay (snorkeling penyu).",
    enAnswer: "Our 6 featured destinations include: 1. Padar Island (panoramic views), 2. Pink Beach (snorkeling & relaxation), 3. Komodo Island (dragon sighting with a ranger), 4. Taka Makassar (white sandbar island), 5. Manta Point (snorkeling with Manta Rays), and 6. Turtle Point / Siaba Bay (snorkeling with sea turtles)."
  },
  {
    id: "faq-2",
    question: "Bagaimana cara menyewa kapal Phinisi atau armada mobil?",
    enQuestion: "How do I book a Phinisi boat or rent a car?",
    answer: "Sangat mudah! Anda dapat mengisi formulir inquiry pemesanan di website ini atau langsung menekan tombol 'Hubungi Concierge via WhatsApp' untuk berkomunikasi dengan PIC kami Sammy di 082144428975. Kami akan mengirimkan katalog kapal Phinisi atau mobil terbaik sesuai kebutuhan Anda.",
    enAnswer: "It's simple! You can fill out the booking inquiry form on this website or directly click the 'Contact Concierge via WhatsApp' button to chat with our PIC Sammy at 082144428975. We will send you our best selection catalog for Phinisi yachts or cars."
  },
  {
    id: "faq-3",
    question: "Apakah harga sewa mobil sudah termasuk BBM dan Driver?",
    enQuestion: "Does the car rental price include fuel and a driver?",
    answer: "Ya, betul. Seluruh sewa mobil di KOMODO KAMU (Avanza, Calya, Toyota Rush, Innova Reborn, Hiace Premio, Bus 35 seat) sudah include dengan BBM dan Driver berpengalaman, start dari Rp 700.000 per hari, menjamin perjalanan Anda di Labuan Bajo aman dan nyaman.",
    enAnswer: "Yes, indeed. All car rentals at KOMODO KAMU (Avanza, Calya, Toyota Rush, Innova Reborn, Hiace Premio, 35-seat Bus) include fuel and an experienced driver, starting from IDR 700,000 per day, ensuring a safe and comfortable trip in Labuan Bajo."
  },
  {
    id: "faq-4",
    question: "Apakah tersedia paket wisata Flores daratan lainnya selain Wae Rebo?",
    enQuestion: "Are there other Flores overland packages besides Wae Rebo?",
    answer: "Ya, kami menyediakan paket wisata Flores lengkap yang bisa dicustomize, mencakup: Kampung Adat Todo, Kota Ruteng, Danau Ranamese, Kampung Adat Belaraghi, Blue Stone, Air Panas Malanage, Gunung Inerie, 17 Pulau Riung, Danau Kelimutu Tiga Warna, hingga Pantai Koka di Maumere.",
    enAnswer: "Yes! We provide complete customizable Flores overland tour packages, including: Todo Traditional Village, Ruteng Town, Lake Ranamese, Belaraghi Traditional Village, Blue Stone Beach, Malanage Hot Spring, Mount Inerie, 17 Islands of Riung, Three-Colored Lake Kelimutu, to Koka Beach in Maumere."
  }
];

