import type { Metadata } from "next";
import { cn } from "@/lib/utils";

import { ReactQueryProvider } from "@/lib/react-query/provider";
import { AuthProvider } from "@/providers/auth-provider";

import { Inter, Geist } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-ui",
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-canvas",
});

export const metadata: Metadata = {
  title: "ArchFlow",
  description: "Collaborative System Design Tool",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full antialiased font-sans",
        inter.variable,
        geist.variable,
      )}
    >
      <body className="min-h-full flex flex-col">
        <ReactQueryProvider>
          <AuthProvider>{children}</AuthProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
