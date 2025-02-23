"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useLoading } from "@/app/contexts/loading";

import { ChevronRight, LogIn } from "lucide-react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { PasswordInput } from "@/components/ui/password-input";

const FormSchema = z.object({
  email: z.string().min(2, {
    message: "The e-mail must be at least 2 characters.",
  }),
  password: z.string().min(2, {
    message: "The password must be at least 2 characters.",
  }),
});

export default function Home() {
  const router = useRouter();
  const { setLoading } = useLoading();

  const [view, setView] = useState<"email" | "password">("email");

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit() {
    setLoading({
      loading: true,
      text: "please wait, as we set everything up for you",
      showTimer: true,
    });

    setTimeout(() => {
      setLoading({ loading: false });
      router.push("/authorized/dashboard");
    }, 3000);
  }

  return (
    <AnimatePresence mode="wait">
      <div className="flex gap-1 items-center justify-center w-full h-full">
        <div className="p-4 bg-zinc-700 shadow-sm rounded-sm max-w-[350px] flex flex-col items-start gap-4">
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl font-bold text-white">
              Oh, so you want to create your company? OK.
            </h1>
            <h1 className="text-md text-zinc-300">
              {"Just inform the next infos and we'll get you started."}
            </h1>
          </div>

          <div className="w-full flex flex-col items-center gap-5 py-4">
            <AnimatePresence mode="wait">
              <Button
                className="w-full max-w-full"
                type="button"
                onClick={() => setView("password")}
              >
                Start <ChevronRight size={16} />
              </Button>
            </AnimatePresence>

            <span
              className="text-accent text-sm flex items-center gap-2 hover:underline cursor-pointer"
              onClick={() => router.push("/unauthorized/login")}
            >
              Actually, I want to login
            </span>
          </div>
        </div>
      </div>
    </AnimatePresence>
  );
}
