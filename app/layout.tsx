import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Sajib Ahmed - Web Developer & Creative Designer",
    description: "Cinematic digital experiences with motion, typography, and storytelling",
    icons: {
        icon: "/favicon-headshot.png",
        apple: "/favicon-headshot.png",
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body className="antialiased">{children}</body>
        </html>
    );
}
