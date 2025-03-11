import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-black">
      <Navbar />
      <main className="mt-16 flex-1 flex flex-col justify-center">{children}</main>
      <Footer />
    </div>
  );
}
