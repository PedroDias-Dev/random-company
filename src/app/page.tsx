"use client";

import { Button } from "@/components/ui/button";
import { ChartGantt } from "lucide-react";
import { useLoading } from "./contexts/loading";

export default function Home() {
  const { setLoading } = useLoading();

  return (
    <div className="flex gap-1 items-center justify-center w-full h-full">
      <div className="p-4 bg-zinc-700 shadow-sm rounded-sm flex flex-col items-start gap-4">
        <div className="flex items-center gap-2">
          <ChartGantt size={40} color="white" />
          <h1 className="text-4xl font-bold text-white">random-company</h1>
        </div>

        <span className="text-sm text-zinc-300 max-w-60">
          we create a random company dashboard for you, just to make you feel
          like you own something
        </span>

        <Button
          onClick={() =>
            setLoading({
              loading: true,
              text: "please wait, as we set everything up for you",
              showTimer: true,
            })
          }
        >
          Create a company
        </Button>
      </div>
    </div>
  );
}
