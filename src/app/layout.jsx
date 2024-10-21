import localFont from "next/font/local";
import "./globals.css";
import Sidebar from "./components/sidebar";
import Navbar from "./components/navbar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "XAM",
  description: "XAM",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="">
          {/* Sidebar */}
          <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
            <Sidebar></Sidebar>
          </div>

          {/* Main Container */}
          <div className="flex flex-col md:pl-64">
            {/* Navbar */}
            <Navbar></Navbar>

            {/* Main Content */}
            <main className="flex-1">
              <div className="py-6">{children}</div>
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
