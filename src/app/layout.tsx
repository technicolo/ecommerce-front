

import Navbar from "@/components/NavBar";
import "./globals.css";
import { ReactNode } from "react";
import AuthContextProvider from "./contexts/authContexts";

export const metadata = {
  title: "E-commerce App",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <AuthContextProvider>
          <Navbar />
          {children}
        </AuthContextProvider>
      </body>
    </html>
  );
}
