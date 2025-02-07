"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Sidebar from "@/components/layout/sidebar/sidebar";

export default function AuthorizedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full h-full flex flex-col bg-zinc-800 overflow-hidden">
      <div className="w-full bg-zinc-900 p-4 text-white">random-company</div>

      <div className={`flex h-full transition-all`}>
        <Sidebar />

        <div className="w-full h-full flex flex-col bg-zinc-300 transition-all">
          <div className="flex items-center justify-between p-4">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/components">Components</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className="flex flex-col items-center justify-between p-4 w-full bg-zinc-700 overflow-auto h-[calc(100vh_-_108px)]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
