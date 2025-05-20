import "bootstrap/dist/css/bootstrap.css"
import { Metadata } from "next";
import "./globals.css";



export const metadata: Metadata = {
  title: "Carrera App"
  
};

export default function RootLayout({ 
  children,
 }:Readonly<{

  children:React.ReactNode;
 }>) {
  return (
    <html lang="en">
      <body >
        {children}
      </body>
    </html>
  );
}

