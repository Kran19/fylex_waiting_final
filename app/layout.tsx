import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Spotlight } from "@/components/ui/spotlight";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fylex",
  description: "It's your time. Coming soon.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      /* FIXED: Changed h-full to min-h-screen to lock the HTML boundary tightly to the device window size */
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} min-h-screen antialiased dark`}
    >
      {/* FIXED: 
          1. Removed flex-col which was breaking the absolute tracking coordinates.
          2. Added w-full and min-h-screen to force the mouse listeners to read the entire screen.
      */}
      <body className="w-full min-h-screen relative overflow-x-clip m-0 p-0 text-white bg-black/[0.96]">
        {/* Meta Pixel Code */}
        <Script id="fb-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1035472045697724');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1035472045697724&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {/* End Meta Pixel Code */}
        
        {/* GLOBAL LAYER: Now accurately maps your full monitor space */}
        <Spotlight className="z-0" size={550} />
        
        {/* Content Layer floating smoothly on top */}
        <main className="relative z-10 w-full min-h-screen">
          {children}
        </main>
        
      </body>
    </html>
  );
}