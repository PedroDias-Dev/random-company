"use client";

import { Button } from "@/components/ui/button";
import { ChartGantt } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex gap-1 items-center justify-center w-full h-full">
      <div className="p-10 border-zinc-700 border shadow-sm rounded-sm flex flex-col items-center gap-4">
        <div className="flex items-center gap-2">
          <ChartGantt size={40} color="white" />
          <h1 className="text-4xl font-bold text-white">random-company</h1>
        </div>

        <span className="text-sm text-zinc-300 max-w-60 text-center mb-10">
          we create a <b>random company</b> dashboard for you, just to make you
          feel like you own something
        </span>

        <Button
          variant="secondary"
          onClick={() => {
            router.push("/unauthorized/login");
          }}
        >
          Create a company
        </Button>
      </div>
    </div>
  );
}
