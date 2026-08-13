import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsApp from "@/components/ui/whatsApp";
import { AuthProvider } from '@/app/contexts/AuthContext';

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Word Skilled | Online Skill-Building Academy",
  description: "Word Skilled offers expertly crafted online courses in digital marketing, web development, design, and more to help you grow your skills and career.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${plusJakartaSans.variable} ${inter.variable} antialiased`}
      >
        <AuthProvider>
      <Header />
      <WhatsApp />
      
        {children}
        
        <Footer />
        </AuthProvider>
        
      </body>
    </html>
  );
}
