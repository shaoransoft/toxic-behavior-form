import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "แบบสำรวจพฤติกรรมที่เป็นพิษ (TOXIC Behavior)",
    description: "แบบสำรวจพฤติกรรมที่เป็นพิษ (TOXIC Behavior)",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={'dark text-foreground bg-background ' + inter.className}>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
