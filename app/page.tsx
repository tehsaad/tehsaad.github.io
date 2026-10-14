import { Builds } from "@/sections/Builds";
import { Footer } from "@/sections/Footer";
import { Hero } from "@/sections/Hero";
import { Materials } from "@/sections/Materials";
import { Operator } from "@/sections/Operator";
import { Scratch } from "@/sections/Scratch";
import { Signal } from "@/sections/Signal";
import { Vision } from "@/sections/Vision";

export default function Home() {
  return (
    <>
      <main id="main">
        <Hero />
        <Operator />
        <Builds />
        <Vision />
        <Materials />
        <Scratch />
        <Signal />
      </main>
      <Footer />
    </>
  );
}
