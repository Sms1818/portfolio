import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sahil Shitole — Software Engineer",
  description: "Software Engineer — Backend Systems × Applied AI. Projects, professional experience, open source and engineering evidence.",
  metadataBase: new URL("https://example.com"),
};

export default function RootLayout({children}:{children:React.ReactNode}) {
  return <html lang="en" suppressHydrationWarning><body>{children}</body></html>;
}
