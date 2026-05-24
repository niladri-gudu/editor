import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import { ReactQueryProvider } from "@/lib/react-query/provider";

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
    <html lang="en" className={cn("h-full", "antialiased", "font-sans")}>
      <body className="min-h-full flex flex-col">
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
