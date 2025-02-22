import type { Metadata } from "next";
import { Inconsolata } from "next/font/google";
import "./globals.css";
import Provider from "./_trpc/Provider";
import Transition from "@/components/animations/transition";
import { LoadingProvider } from "@/app/contexts/loading";

const inconsolata = Inconsolata({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "random-company",
  description: "giving you the ownership",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Provider>
        <body className={inconsolata.className}>
          <Transition>
            <div className="w-screen h-screen bg-zinc-900 relative overflow-hidden">
              {children}
            </div>
          </Transition>
        </body>
      </Provider>
    </html>
  );
}
