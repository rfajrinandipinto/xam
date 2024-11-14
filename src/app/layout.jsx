"use client";

import localFont from "next/font/local";
import "./globals.css";
import Sidebar from "./components/sidebar";
import Navbar from "./components/navbar";
import { AlertProvider, useAlert } from "./context/AlertContext";
import Alert from "./components/alert";
import { usePathname } from "next/navigation";

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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative`}
      >
        <AlertProvider>
          <AppContent>{children}</AppContent>
        </AlertProvider>
      </body>
    </html>
  );
}

function AppContent({ children }) {
  const { alert, dismissAlert } = useAlert();
  const pathname = usePathname().split("/")[1];
  const isLoginPage = pathname === "login";

  return (
    <div className={`relative ${isLoginPage ? "bg-gray-900 h-screen" : ""} `}>
      {alert && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
          <Alert
            type={alert.type}
            message={alert.message}
            dismiss={dismissAlert}
          />
        </div>
      )}
      <div className="">
        {!isLoginPage && (
          <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
            <Sidebar />
          </div>
        )}
        <div className={`flex flex-col ${!isLoginPage ? "md:pl-64" : ""}`}>
          {!isLoginPage && <Navbar />}
          <main className="flex-1">
            <div className="py-6">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
