import Transition from "@/components/animations/transition";
import { LoadingProvider } from "../contexts/loading";

export default function UnauthorizedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Transition>
      <div className="w-screen h-screen bg-zinc-900 relative overflow-hidden">
        <LoadingProvider>{children}</LoadingProvider>
      </div>
    </Transition>
  );
}
