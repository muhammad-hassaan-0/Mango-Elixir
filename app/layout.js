import "./globals.css";
import { SmoothScroll, CustomCursor } from "./components";

export const metadata = {
  title: "Mango Elixir - Premium Tropical Nectar",
  description: "Experience the ultimate scrollytelling journey of Mango Elixir - The Gold Standard of Tropical Nectar",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="min-h-full bg-black text-white antialiased">
        <SmoothScroll>
          <CustomCursor />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
