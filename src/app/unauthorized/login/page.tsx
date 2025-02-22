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

import { ChartGantt, ChevronRight, LogIn } from "lucide-react";
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

  console.log(view);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
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
              Login to your fake company
            </h1>
            <h1 className="text-md text-zinc-300">
              Dont worry about your credentials, anything really works
            </h1>
          </div>

          <AnimatePresence mode="wait">
            <Form {...form}>
              <motion.form
                layout
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full space-y-6 overflow-hidden"
              >
                <AnimatePresence mode="wait">
                  {view === "email" ? (
                    <motion.div
                      key="open"
                      initial={{ y: 3, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -3, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>E-mail</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="email@example.com"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              This is your "corporate" e-mail.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="closed"
                      initial={{ y: 3, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -3, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <PasswordInput placeholder="*******" {...field} />
                            </FormControl>
                            <FormDescription>
                              Type in any password, really.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="w-full justify-end flex gap-2">
                  <AnimatePresence mode="wait">
                    {view === "email" ? (
                      <motion.div
                        key="next"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                      >
                        <Button
                          type="button"
                          onClick={() => setView("password")}
                        >
                          Next <ChevronRight size={16} />
                        </Button>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="login"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{
                          opacity: 0,
                          x: -10,
                          transition: { delay: 0.3 },
                        }} // Exit delay
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                      >
                        <Button variant="secondary" type="submit">
                          Login <LogIn size={16} />
                        </Button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.form>
            </Form>
          </AnimatePresence>
        </div>
      </div>
    </AnimatePresence>
  );
}
