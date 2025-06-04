import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ThemeProvider } from "./context/ThemeContext";

export const metadata = {
  title: "GreenSteps",
  description: "Eco Action Tracker",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white text-black dark:bg-gray-900 dark:text-white transition-colors duration-300">
        <ThemeProvider>
          <Navbar />
          <main className="min-h-screen px-4 md:px-8">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}