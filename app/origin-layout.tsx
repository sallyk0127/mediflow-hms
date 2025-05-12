'use client';

import NavigationBar from '@/appComponents/ui/NavigationBar';
import { Toaster } from "@/components/ui/toaster"; 
import { usePathname } from 'next/navigation';

export default function OriginLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isAuthPage = pathname === '/auth' || pathname.startsWith('/auth/');
  //check if its a login page
  if (isAuthPage) {
    return <>{children}</>;
  }

  return (
    <>
      <NavigationBar />
      <main className="flex-1 ml-64 p-8 overflow-auto bg-[#F1F8FF] min-h-screen">
        {children}
        <Toaster />
      </main>
    </>
  );
}