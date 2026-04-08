import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Advanced SEO Metadata for Acadpack
// Note: In a real Next.js project, these fonts would be imported from next/font/google
// and the metadata would be used by Next.js SEO engine.
export const metadata = {
  metadataBase: new URL('https://acadpack.fastwebcm.org/'),
  title: {
    default: "Acadpack | Best School Management System in Cameroon & CEMAC",
    template: "%s | Acadpack"
  },
  description: "Acadpack is the leading school management and automation software in Cameroon. Manage school financial records automate report cards (bulletins), and track student progress easily.",
  keywords: [
    "School Management System Cameroon",
    "Logiciel de gestion scolaire Cameroun",
    "Mobile Money school fees payment",
    "Student Information System Africa",
    "EdTech Cameroon",
    "Automated Report Cards Cameroon",
    "Acadpack"
  ],
  authors: [{ name: "Acadpack Team" }],
  creator: "Acadpack",
  publisher: "Acadpack",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Acadpack | Digitalizing Schools in Africa",
    description: "Automate your school administration, fee collection, and academic records with Cameroon's top-rated SMS.",
    url: 'https://acadpack.fastwebcm.org/',
    siteName: 'Acadpack',
    locale: 'en_CM',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Acadpack School Management Dashboard',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Acadpack | School Automation Software',
    description: 'The all-in-one solution for African schools to manage students, staff, and finances.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en',
      'fr-FR': '/fr',
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }) {
    // Structured Data (JSON-LD) to tell Google this is a Software Application
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Acadpack",
    "operatingSystem": "Web-based",
    "applicationCategory": "EducationalApplication",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "24"
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "XAF"
    },
    "description": "Comprehensive school management system for primary and secondary schools in Cameroon and the CEMAC region."
  };
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <ToastContainer/>
      </body>
    </html>
  );
}
