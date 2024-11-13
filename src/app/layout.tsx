import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";

// export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Image Gallery",
  description: "Imag galley application ",
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        
        <main className="max-w-7xl mx-auto">
          {children}
          {modal}
        </main>

      </body>
    </html>
  );
}
