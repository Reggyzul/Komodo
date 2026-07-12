import { Destination, TravelPackage, Testimonial } from "./types";

export const FEATURED_DESTINATIONS: Destination[] = [
  {
    id: "dest-1",
    name: "Pulau Padar",
    location: "Taman Nasional Komodo, NTT",
    image: "/assets/padar_island.png",
    price: "Mulai Rp 1.350.000",
    rating: 5.0,
    reviewsCount: 1420,
    tag: "Terpopuler",
    duration: "Satu Hari",
    description: "Trekking legendaris menuju puncak bukit untuk menyaksikan panorama spektakuler tiga lekukan teluk laut raksasa dengan gradasi warna pasir berbeda."
  },
  {
    id: "dest-2",
    name: "Pink Beach",
    location: "Taman Nasional Komodo, NTT",
    image: "/assets/pink_beach.png",
    price: "Mulai Rp 1.350.000",
    rating: 4.9,
    reviewsCount: 980,
    tag: "Eksotis",
    duration: "Satu Hari",
    description: "Nikmati keindahan pantai berpasir merah muda yang sangat langka di dunia, berpadu selaras dengan air toska jernih serta terumbu karang yang menawan."
  },
  {
    id: "dest-3",
    name: "Pulau Komodo",
    location: "Taman Nasional Komodo, NTT",
    image: "/assets/komodo_dragon.png",
    price: "Mulai Rp 1.350.000",
    rating: 4.9,
    reviewsCount: 1650,
    tag: "Situs Warisan Dunia",
    duration: "Satu Hari",
    description: "Petualangan menakjubkan menyusuri jalur safari rimba untuk berjumpa langsung dengan kadal purba terbesar di dunia didampingi ranger profesional."
  },
  {
    id: "dest-4",
    name: "Pulau Rinca",
    location: "Taman Nasional Komodo, NTT",
    image: "/assets/rinca_island.png",
    price: "Mulai Rp 1.350.000",
    rating: 4.8,
    reviewsCount: 810,
    tag: "Edukasi & Alam",
    duration: "Satu Hari",
    description: "Saksikan habitat alami naga purba Komodo di tengah bentangan sabana kuning eksotis dengan kontur trekking santai berpemandangan menakjubkan."
  },
  {
    id: "dest-5",
    name: "Taka Makassar",
    location: "Taman Nasional Komodo, NTT",
    image: "/assets/taka_makassar.png",
    price: "Mulai Rp 1.350.000",
    rating: 4.9,
    reviewsCount: 740,
    tag: "Unik",
    duration: "Satu Hari",
    description: "Gundukan pasir kecil nan menawan berbentuk bulan sabit di tengah lautan biru dangkal yang jernih, bagai oase tropis pribadi di Labuan Bajo."
  },
  {
    id: "dest-6",
    name: "Manta Point",
    location: "Taman Nasional Komodo, NTT",
    image: "/assets/manta_point.png",
    price: "Mulai Rp 1.350.000",
    rating: 5.0,
    reviewsCount: 910,
    tag: "Bawah Laut",
    duration: "Satu Hari",
    description: "Sensasi snorkeling luar biasa berenang bersama gerombolan ikan pari raksasa Manta Ray yang ramah dan menakjubkan di arus air laut jernih."
  },
  {
    id: "dest-7",
    name: "Kanawa Island",
    location: "Labuan Bajo, NTT",
    image: "/assets/kanawa_island.png",
    price: "Mulai Rp 1.350.000",
    rating: 4.8,
    reviewsCount: 630,
    tag: "Snorkeling",
    duration: "Satu Hari",
    description: "Pulau resor eksotis berpantai pasir putih lembut yang dikelilingi taman laut penuh ikan hias tropis warna-warni dan bintang laut indah."
  },
  {
    id: "dest-8",
    name: "Goa Rangko",
    location: "Labuan Bajo, NTT",
    image: "/assets/goa_rangko.png",
    price: "Mulai Rp 700.000",
    rating: 4.7,
    reviewsCount: 520,
    tag: "Hidden Gem",
    duration: "Setengah Hari",
    description: "Gua batu stalaktit magis dengan kolam renang air asin alami bergradasi biru kristal gelap yang sejuk, layaknya pemandian rahasia para raja."
  },
  {
    id: "dest-9",
    name: "Bukit Amelia",
    location: "Labuan Bajo, NTT",
    image: "/assets/bukit_amelia.png",
    price: "Mulai Rp 700.000",
    rating: 4.8,
    reviewsCount: 450,
    tag: "Pemandangan Sunset",
    duration: "Setengah Hari",
    description: "Bukit estetik terbaik dengan trek ringan untuk menyaksikan lanskap perbukitan berundak berlatarkan matahari terbenam emas yang magis."
  }
];

export const POPULAR_PACKAGES: TravelPackage[] = [
  {
    id: "pkg-1",
    title: "Sailing Komodo 6 Destinasi (Sharing/Private)",
    destination: "Taman Nasional Komodo",
    duration: "1 Hari / Full Day Speedboat",
    price: "Rp 1.350.000",
    oldPrice: "Rp 1.650.000",
    image: "/assets/padar_island.png",
    rating: 5.0,
    badge: "Terlaris",
    description: "Jelajahi 6 destinasi unggulan TN Komodo dalam 1 hari: Pulau Padar, Pink Beach, Pulau Komodo, Taka Makassar, Manta Point, dan Turtle Point/Siaba Bay dengan speedboat modern.",
    inclusions: [
      "Speedboat Modern AC PP",
      "Makan Siang Box Istimewa & Buah Segar",
      "Perlengkapan Snorkeling Lengkap & Pelampung",
      "Tiket Masuk TN Komodo & Ranger",
      "Air Mineral & Soft Drinks Dingin",
      "Pemandu Lokal Berlisensi Resmi"
    ]
  },
  {
    id: "pkg-2",
    title: "Sewa Kapal Phinisi Labuan Bajo Luxury",
    destination: "Labuan Bajo & Komodo",
    duration: "3 Hari 2 Malam (Live on Board)",
    price: "Rp 3.000.000",
    oldPrice: "Rp 3.500.000",
    image: "/assets/phinisi_boat.png",
    rating: 4.9,
    badge: "Premium Trip",
    description: "Merasakan sensasi eksklusif menginap di atas kapal Phinisi mewah modern (Live on Board) untuk menjelajahi keindahan perairan Komodo secara privat dan elegan.",
    inclusions: [
      "Menginap di Kamar Cabin Full AC Mewah",
      "Chef di Kapal (Makan 3x sehari fresh)",
      "Snack Sore, Buah, Teh & Kopi Flores",
      "Penjemputan Airport Transfer PP",
      "Dokumentasi Premium (Drone & GoPro)",
      "Kru Kapal Siaga & Friendly Guide"
    ]
  },
  {
    id: "pkg-3",
    title: "Paket Wisata Kampung Adat Wae Rebo",
    destination: "Flores Daratan",
    duration: "2 Hari 1 Malam",
    price: "Rp 2.250.000",
    oldPrice: "Rp 2.600.000",
    image: "/assets/wae_rebo.png",
    rating: 4.9,
    badge: "Kultural",
    description: "Perjalanan spiritual dan budaya luar biasa menuju desa tradisional di atas awan Wae Rebo. Rasakan keramahan warga lokal dan bermalam di Mbaru Niang yang magis.",
    inclusions: [
      "Transportasi Mobil AC (Labuan Bajo - Denge PP)",
      "Menginap di Rumah Adat Mbaru Niang",
      "Makan Sesuai Rute & Kuliner Lokal",
      "Upacara Penyambutan Adat Waelu",
      "Pemandu Lokal Berlisensi",
      "Air Mineral & Porter Trekking"
    ]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "test-1",
    name: "Rizky Pratama",
    role: "Keluarga Traveler",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
    content: "Luar biasa pelayanan KOMODO KAMU! Kami sekeluarga memesan Private Trip Phinisi 3H2M kemarin. Sammy dan tim menyiapkan kapal yang sangat bersih, makanannya enak luar biasa dimasak fresh oleh chef kapal. Driver jemput tepat waktu dan guide sangat telaten memandu anak-anak tracking Pulau Padar.",
    rating: 5,
    destination: "Sailing Phinisi Luxury"
  },
  {
    id: "test-2",
    name: "Amanda Syahputri",
    role: "Solo Traveler",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
    content: "Pertama kali ke Labuan Bajo sendirian, saya memilih Sharing Trip 6 Destinasi dari KOMODO KAMU. Harganya sangat jujur, kru kapalnya ramah dan lucu, dokumentasi drone dan GoPro-nya bagus banget buat diunggah ke sosmed! Sangat direkomendasikan!",
    rating: 5,
    destination: "Sharing Trip 6 Destinasi"
  },
  {
    id: "test-3",
    name: "dr. Albertus Nugroho",
    role: "Dokter Gigi",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200",
    content: "Saya menyewa mobil Innova Reborn + Driver dari KOMODO KAMU untuk trip Flores darat ke Wae Rebo. Mobilnya wangi, sangat bersih, suspensinya nyaman, dan Mas Driver sangat jago melintasi kelokan tajam Flores dengan aman. Komunikasi fast response via WhatsApp.",
    rating: 5,
    destination: "Rental Mobil & Wae Rebo"
  }
];

export const FAQS = [
  {
    id: "faq-1",
    question: "Apa saja rute 6 destinasi dalam satu hari trip?",
    answer: "Rute 6 destinasi unggulan kami mencakup: 1. Pulau Padar (tracking view), 2. Pink Beach (snorkeling & relax), 3. Pulau Komodo (melihat komodo didampingi ranger), 4. Taka Makassar (pulau pasir putih), 5. Manta Point (snorkeling pari Manta), dan 6. Turtle Point / Siaba Bay (snorkeling penyu)."
  },
  {
    id: "faq-2",
    question: "Bagaimana cara menyewa kapal Phinisi atau armada mobil?",
    answer: "Sangat mudah! Anda dapat mengisi formulir inquiry pemesanan di website ini atau langsung menekan tombol 'Hubungi Concierge via WhatsApp' untuk berkomunikasi dengan PIC kami Sammy di 082144428975. Kami akan mengirimkan katalog kapal Phinisi atau mobil terbaik sesuai kebutuhan Anda."
  },
  {
    id: "faq-3",
    question: "Apakah harga sewa mobil sudah termasuk BBM dan Driver?",
    answer: "Ya, betul. Seluruh sewa mobil di KOMODO KAMU (Avanza, Calya, Toyota Rush, Innova Reborn, Hiace Premio, Bus 35 seat) sudah include dengan BBM dan Driver berpengalaman, start dari Rp 700.000 per hari, menjamin perjalanan Anda di Labuan Bajo aman dan nyaman."
  },
  {
    id: "faq-4",
    question: "Apakah tersedia paket wisata Flores daratan lainnya selain Wae Rebo?",
    answer: "Ya, kami menyediakan paket wisata Flores lengkap yang bisa dicustomize, mencakup: Kampung Adat Todo, Kota Ruteng, Danau Ranamese, Kampung Adat Belaraghi, Blue Stone, Air Panas Malanage, Gunung Inerie, 17 Pulau Riung, Danau Kelimutu Tiga Warna, hingga Pantai Koka di Maumere."
  }
];
