'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  LayoutDashboard,
  CalendarDays,
  FilePlus,
  Users,
  BookOpen,
  BedDouble,
  Pill,
  UserCircle,
  LogOut,
} from 'lucide-react';
import Image from 'next/image';

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, roles: ['doctor', 'nurse', 'admin'] },
  { name: 'EMR', href: '/emr', icon: FilePlus, roles: ['doctor', 'nurse', 'admin'] },
  { name: 'Appointments', href: '/appointments', icon: CalendarDays, roles: ['doctor', 'nurse', 'admin'] },
  { name: 'Staff Management', href: '/staff-management', icon: Users, roles: ['doctor', 'nurse', 'admin'] },
  { name: 'Bed Management', href: '/bed-management', icon: BedDouble, roles: ['admin', 'nurse'] },
  { name: 'Medicine Inventory', href: '/medicine-inventory', icon: Pill, roles: ['doctor', 'nurse', 'admin'] },
  { name: 'Education Content', href: '/education-content', icon: BookOpen, roles: ['doctor', 'nurse', 'admin'] },
];

export default function NavigationBar() {
  const pathname = usePathname();
  const router = useRouter();
  const [role, setRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Get role from cookies
    const cookieRole = document.cookie
      .split('; ')
      .find(row => row.startsWith('role='))
      ?.split('=')[1];
    setRole(cookieRole || null);
    setIsLoading(false);
  }, []);

  // In your NavigationBar component's useEffect
useEffect(() => {
  if (!isLoading) {
    if (!role && pathname !== '/auth') {
      router.push('/auth');
    } else if (role && pathname === '/auth') {
      router.push('/'); 
    }
  }
}, [isLoading, role, pathname, router]);

  const handleLogout = () => {
    // Clear cookies
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    document.cookie = 'role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    router.push('/auth');
  };

  // Don't show navbar on auth pages
  if (pathname === '/auth') {
    return null;
  }

  // Show nothing while loading or if not authenticated (redirect will happen in useEffect)
  if (isLoading || !role) {
    return null;
  }

  return (
    <nav className="fixed top-0 left-0 h-screen w-64 bg-white text-gray-900 flex flex-col p-4 shadow-md">
      {/* Company Logo */}
      <div className="flex items-center justify-center py-4 border-b border-gray-200">
        <Link href="/">
          <Image src="/logo.png" alt="Company Logo" width={120} height={40} className="cursor-pointer" />
        </Link>
      </div>

      {/* Navigation Links */}
      <ul className="mt-4 space-y-2">
        {navItems
          .filter(item => item.roles.includes(role))
          .map((item) => (
            <li key={item.href}>
              <Link href={item.href}>
                <div
                  className={`flex items-center p-2 rounded-md transition-all cursor-pointer ${
                    pathname === item.href ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  <span>{item.name}</span>
                </div>
              </Link>
            </li>
          ))}
      </ul>
      
      {/* User Info and Logout */}
      <div className="mt-auto pt-4 border-t border-gray-200">
        <div className="flex items-center p-2">
          <UserCircle className="w-5 h-5 mr-3" />
          <span className="capitalize">{role}</span>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center p-2 w-full text-left rounded-md transition-all hover:bg-gray-100"
        >
          <LogOut className="w-5 h-5 mr-3" />
          <span>Logout</span>
        </button>
      </div>
    </nav>
  );
}