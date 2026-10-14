import { SectionHead } from "@/components/SectionHead";
import { StackMatrix } from "@/components/StackMatrix";

export function Materials() {
  return (
    <section id="materials" aria-labelledby="materials-title" className="px-gutter py-section mx-auto max-w-[1600px]">
      <SectionHead
        id="materials-title"
        path="~/materials"
        meta="stack × builds · no percentages"
        title={
          <>
            Tools, mapped to
            <br />
            <em className="text-bone-2">what they built.</em>
          </>
        }
      >
        No skill bars here. A dot means the technology carries weight in a real build, and you can open that build and
        check.
      </SectionHead>

      <div className="mt-16 md:mt-20" data-reveal>
        <StackMatrix />
      </div>
    </section>
  );
}
