import Image from "next/image";
import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <>
      <Navbar />

      <div className="flex min-h-screen items-center justify-center">
        <h1 className="text-4xl font-bold">
          Buy or Sell your goods.
        </h1>
      </div>
    </>
  );
}
