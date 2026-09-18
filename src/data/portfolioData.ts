export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  role: string;
  period: string;
  image: string;
  summary: string;
  challenge: string;
  solution: string;
  outcomes: string[];
  tools: string[];
}

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
  badge: string;
  credentialUrl?: string;
}

export interface EducationItem {
  school: string;
  graduationYear: string;
  description: string;
}

export interface ExperienceItem {
  role: string;
  organization: string;
  type: string;
  description: string[];
}

export const personalData = {
  name: "Puteri Najma Azzahra",
  shortName: "Puteri",
  title: "Bachelor of Information Systems Student | Business Enthusiast & Data Analyst",
  phone: "0812-9765-8009",
  email: "puterinajma41@gmail.com",
  instagram: "@puteryna_",
  instagramUrl: "https://instagram.com/puteryna_",
  whatsappUrl: "https://wa.me/6281297658009",
  location: "Jakarta, Indonesia",
  bio: "Mahasiswi S1 Sistem Informasi (Bachelor of Information Systems) di Telkom University dan alumni SMAN 14 Jakarta dengan minat kuat pada perpaduan teknologi informasi, analisis proses bisnis, dan kecerdasan buatan (AI). Memiliki sertifikasi profesional Google dalam Business Intelligence, AI, dan Stakeholder Management. Terampil dalam kepemimpinan tim, manajemen pemangku kepentingan, serta mampu mentransformasikan data kompleks menjadi wawasan strategis (actionable insights) untuk mendukung pengambilan keputusan bisnis yang presisi.",
  avatarUrl: "/avatar.jpg",
  typewriterRoles: [
    "Bachelor of Information Systems",
    "Information Systems Student",
    "Business Enthusiast",
    "Aspiring Entrepreneur",
    "Digital Marketing Analyst",
    "Strategic Thinker"
  ],
  stats: [
    { label: "Sertifikasi Profesional Google", value: 3, suffix: " Certs" },
    { label: "Wilayah Sosialisasi Terjangkau", value: 10, suffix: "+ Sekolah" },
    { label: "Tingkat Kepuasan Audiens", value: 98, suffix: "%" },
    { label: "Manajemen Proyek & Stakeholder", value: 100, suffix: "% On-Track" }
  ]
};

export const educationList: EducationItem[] = [
  {
    school: "Telkom University",
    graduationYear: "2025 - Sekarang",
    description: "S1 Sistem Informasi (Bachelor of Information Systems). Mempelajari arsitektur sistem enterprise, integrasi proses bisnis, basis data relasional, dan Business Intelligence."
  },
  {
    school: "SMAN 14 Jakarta",
    graduationYear: "Tahun Lulus: 2025",
    description: "Fokus pada pengembangan akademik, analisis bisnis, dan kepemimpinan organisasi sekolah."
  },
  {
    school: "SMP Al Masoem Bandung",
    graduationYear: "Tahun Lulus: 2022",
    description: "Membangun kedisiplinan diri, fondasi sains, serta kemampuan komunikasi interpersonal."
  },
  {
    school: "SDN Kramat Jati 24 Jakarta",
    graduationYear: "Tahun Lulus: 2019",
    description: "Awal pembentukan karakter teladan, kolaborasi tim, dan ketertarikan pada ilmu pengetahuan."
  }
];

export const experienceList: ExperienceItem[] = [
  {
    role: "Pembawa Acara & Pembicara",
    organization: "Kegiatan Sosialisasi Sekolah",
    type: "Tingkat SMP, Jakarta Timur",
    description: [
      "Memandu jalannya acara dan menyampaikan materi presentasi sosialisasi di berbagai SMP di wilayah Jakarta Timur.",
      "Menerapkan kemampuan komunikasi publik untuk berinteraksi secara efektif dan menarik minat audiens siswa SMP."
    ]
  },
  {
    role: "Sekretaris",
    organization: "Tim Basket Putri",
    type: "Kepengurusan Tim & Operasional",
    description: [
      "Mengelola administrasi, mengurus manajemen perizinan, dan mengatur kebutuhan operasional tim basket.",
      "Melatih kedisiplinan dan manajemen waktu dalam menyeimbangkan kegiatan akademik dan ekstrakurikuler."
    ]
  },
  {
    role: "Peserta & Perwakilan Tim",
    organization: "Kegiatan Kesenian",
    type: "Lomba Paduan Suara",
    description: [
      "Berpartisipasi aktif dalam latihan rutin dan penampilan tim.",
      "Menunjukkan dedikasi tinggi serta kerja sama tim yang harmonis dan terstruktur."
    ]
  }
];

export const certificatesList: CertificateItem[] = [
  {
    id: "cert-1",
    title: "Google Business Intelligence Professional Certificate",
    issuer: "Google / Coursera",
    date: "Juli 2026",
    description: "Kredensial komprehensif mengolah data kompleks menjadi dashboard bisnis interaktif, data modeling, visualisasi metrik bisnis, dan pelaporan eksekutif.",
    badge: "Business Intelligence"
  },
  {
    id: "cert-2",
    title: "Google AI Professional Certificate",
    issuer: "Google / Coursera",
    date: "Juni 2026",
    description: "Penguasaan Artificial Intelligence Fundamentals, AI for Data Analysis, AI Prompt Engineering, dan pemanfaatan AI untuk App Building.",
    badge: "Artificial Intelligence"
  },
  {
    id: "cert-3",
    title: "Google Stakeholder Management Specialization",
    issuer: "Google / Coursera",
    date: "Juni 2026",
    description: "Keahlian strategi pemetaan stakeholder, analisis pemangku kepentingan, matriks RACI Charts, negosiasi bisnis, dan resolusi konflik tim.",
    badge: "Stakeholder Management"
  }
];

export const skillsCategories = [
  {
    category: "Keahlian Bisnis & Data",
    icon: "BarChart3",
    skills: [
      "Business Intelligence (BI)",
      "Data Modeling & Visualization",
      "Pembuatan Dashboard & Laporan Bisnis",
      "Stakeholder Analysis",
      "Penggunaan RACI Charts"
    ]
  },
  {
    category: "Keahlian Teknologi (AI)",
    icon: "Cpu",
    skills: [
      "Artificial Intelligence Fundamentals",
      "AI for Data Analysis",
      "AI Prompting & Engineering",
      "App Building dengan AI"
    ]
  },
  {
    category: "Komunikasi & Interpersonal",
    icon: "MessageSquare",
    skills: [
      "Komunikasi Bisnis",
      "Pembicara Publik (Public Speaking)",
      "Negosiasi Strategis",
      "Manajemen Perizinan"
    ]
  },
  {
    category: "Soft Skills & Kepemimpinan",
    icon: "Users",
    skills: [
      "Kepemimpinan Tim (Team Leadership)",
      "Disiplin Tinggi",
      "Manajemen Waktu Terstruktur",
      "Pemecahan Masalah (Problem Solving)",
      "Adaptabilitas Cepat"
    ]
  },
  {
    category: "Perangkat Lunak / Sistem",
    icon: "Layers",
    skills: [
      "SAP (Systems, Applications, and Products)",
      "Google Workspace & Spreadsheets",
      "Canva & Presentation Design",
      "Notion & Documentation Management"
    ]
  }
];

export const projectsList: ProjectItem[] = [
  {
    id: "proj-1",
    title: "Executive Business Intelligence & Performance Dashboard",
    category: "Business Intelligence & Data Analysis",
    role: "BI & Data Analyst",
    period: "2026",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=700&auto=format&fit=crop",
    summary: "Perancangan arsitektur data modeling dan dashboard visualisasi interaktif untuk memonitor metrik performa bisnis, efisiensi operasional, dan prediksi tren.",
    challenge: "Menghubungkan sumber data terfragmentasi dan menyajikan ringkasan visual yang mudah dipahami oleh pengambil keputusan dalam waktu singkat.",
    solution: "Menerapkan prinsip Google BI Professional: pembersihan data, relasi data model, dan penyusunan KPI dashboard dengan drill-down capabilities.",
    outcomes: [
      "Menyajikan wawasan bisnis yang dapat ditindaklanjuti (actionable insights)",
      "Mempercepat waktu penarikan kesimpulan data hingga 60%",
      "Dashboard teruji dengan skenario pengambilan keputusan strategis"
    ],
    tools: ["Data Modeling", "Business Intelligence", "KPI Dashboards", "Data Visualization"]
  },
  {
    id: "proj-2",
    title: "AI-Powered Data Analysis & Workflow Automation",
    category: "Artificial Intelligence & App Building",
    role: "AI Workflow Specialist",
    period: "2026",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=700&auto=format&fit=crop",
    summary: "Eksperimen otomasi analisis data dan pembuatan prototipe aplikasi mini menggunakan teknik AI Prompting dan modern App Building frameworks.",
    challenge: "Kebutuhan memproses data teks dan kuantitatif dalam volume besar tanpa memakan waktu pemrosesan manual yang panjang.",
    solution: "Memanfaatkan Artificial Intelligence Fundamentals untuk merancang prompt terstruktur dan alur integrasi data analysis otomatis.",
    outcomes: [
      "Otomasi ringkasan data kualitatif dan kuantitatif secara akurat",
      "Peningkatan produktivitas analisa hingga 3x lipat",
      "Rancang bangun prototipe aplikasi berbasis solusi AI modern"
    ],
    tools: ["AI Fundamentals", "AI for Data Analysis", "Prompt Engineering", "App Building"]
  },
  {
    id: "proj-3",
    title: "Stakeholder Management & RACI Operational Governance",
    category: "Strategic Management & Operations",
    role: "Stakeholder Strategist & Coordinator",
    period: "2025 - 2026",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=700&auto=format&fit=crop",
    summary: "Penerapan matriks RACI (Responsible, Accountable, Consulted, Informed) untuk memetakan alur kerja tim, perizinan, dan koordinasi lintas pihak.",
    challenge: "Ambiguitas peran dan potensi miskomunikasi dalam koordinasi kegiatan operasional antar berbagai pemangku kepentingan.",
    solution: "Membangun matriks Stakeholder Analysis, penetapan alur komunikasi transparan, serta sistem manajemen perizinan terintegrasi.",
    outcomes: [
      "Nol insiden miskoordinasi pada alur birokrasi dan perizinan",
      "Peningkatan akuntabilitas tugas masing-masing anggota tim",
      "Struktur koordinasi operasional yang dapat direplikasi untuk kegiatan lain"
    ],
    tools: ["Stakeholder Analysis", "RACI Charts", "Manajemen Perizinan", "Negosiasi Bisnis"]
  },
  {
    id: "proj-4",
    title: "School Outreach & Youth Public Speaking Roadshow",
    category: "Public Speaking & Communication",
    role: "Lead Speaker & Master of Ceremony",
    period: "2024 - 2025",
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=700&auto=format&fit=crop",
    summary: "Memimpin pelaksanaan presentasi dan komunikasi publik pada program sosialisasi sekolah di berbagai SMP wilayah Jakarta Timur.",
    challenge: "Menarik dan mempertahankan atensi ratusan siswa SMP dengan penyampaian materi sosialisasi yang interaktif, edukatif, dan menarik.",
    solution: "Merancang materi presentasi visual storytelling, sesi tanya jawab interaktif, dan teknik komunikasi publik yang berorientasi audiens.",
    outcomes: [
      "Sosialisasi sukses berjalan di berbagai titik SMP Jakarta Timur",
      "Tingkat antusiasme dan keterlibatan audiens mencapai lebih dari 95%",
      "Meningkatkan citra positif sekolah bagi calon peserta didik baru"
    ],
    tools: ["Public Speaking", "Presentasi Bisnis & Edukasi", "Audiens Engagement", "Komunikasi Publik"]
  }
];
