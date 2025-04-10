import type { Metadata } from "next";
import "./globals.css";
import { BaseLayout } from "./components";

export const metadata: Metadata = {
  title: "Next.js + Tailwind + Prisma + TypeGraphQL",
  description:
    "A modern full-stack boilerplate with Next.js, Tailwind CSS, Prisma, and TypeGraphQL",
  keywords: [
    "next.js",
    "tailwind",
    "prisma",
    "typegraphql",
    "graphql",
    "typescript",
  ],
  authors: [{ name: "Wajahat Banday" }],
  creator: "Wajahat Banday",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-poppinsRegular antialiased">
        <BaseLayout>{children}</BaseLayout>
      </body>
    </html>
  );
}
