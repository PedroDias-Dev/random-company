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

import {
  ChevronLeft,
  ChevronRight,
  Fingerprint,
  Key,
  LogIn,
  User,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { PasswordInput } from "@/components/ui/password-input";
import UserInfos from "./_components/user-infos";
import Password from "./_components/password";
import Privacy from "./_components/privacy";

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

  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);

  const [data, setData] = useState({});

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

  const formSteps = [
    {
      icon: User,
      title: "Tell us about you",
      description: "We need to know who you are.",
      component: UserInfos,
    },
    {
      icon: Key,
      title: "Set your password",
      description: "Choose a strong password to protect your account.",
      component: Password,
    },
    {
      icon: Fingerprint,
      title: "Privacy",
      description: "We take your privacy seriously.",
      component: Privacy,
    },
  ];

  const getComponent = () => {
    if (started) {
      const Icon = formSteps[step].icon;

      return (
        <motion.div
          key="started"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ease: "easeInOut", duration: 0.5 }}
          className=" flex flex-col items-start gap-4"
        >
          <div className="w-full flex items-center justify-between">
            <div
              className="w-full flex gap-2"
              onClick={() => setStarted(false)}
            >
              <ChevronLeft size={24} color="white" className="cursor-pointer" />
              <span className="text-accent text-sm flex items-center gap-2 hover:underline cursor-pointer">
                Back
              </span>
            </div>

            <span className="text-accent text-sm font-bold">
              {step + 1}/{formSteps.length}
            </span>
          </div>
          <div className="flex w-full gap-3">
            <Icon size={50} color="white" />

            <div className="flex flex-col gap-1">
              <h1 className="text-xl font-bold text-white">
                {formSteps[step].title}
              </h1>
              <h1 className="text-sm text-zinc-300">
                {formSteps[step].description}
              </h1>
            </div>
          </div>
        </motion.div>
      );
    }

    return (
      <motion.div
        key="start"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ ease: "easeInOut", duration: 0.5 }}
        className=" flex flex-col items-start gap-4"
      >
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
              onClick={() => setStarted(true)}
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
      </motion.div>
    );
  };

  return (
    <div className="flex gap-1 items-center justify-center w-full h-full">
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="p-4 bg-zinc-700 shadow-sm rounded-sm max-w-[350px]"
      >
        {getComponent()}
      </motion.div>
    </div>
  );
}
