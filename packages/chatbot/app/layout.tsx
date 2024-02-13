"use client";

import React from "react";
import "./globals.css";
import Header from "./header";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="w-full">
          <Header />
          <div className="w-full md:px-6 xl:px-12">
            <div
              className="items-center bg-white p-6 flex flex-col pt-16 mt-8"
              style={{ height: "calc(100vh - 120px)" }}
            >
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
