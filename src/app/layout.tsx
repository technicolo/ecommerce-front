// app/layout.tsx
import Navbar from "@/components/NavBar";
import "./globals.css";
import { cookies } from "next/headers";

export const metadata = {
  title: "E-commerce App",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = (await cookies()).get("token")?.value;
  const isLoggedIn = !!token;

  return (
    <html lang="es">
      <body>
        <Navbar isLoggedIn={isLoggedIn} />
        {children}
      </body>
    </html>
  );
}
