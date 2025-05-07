'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  CalendarDays,
  FilePlus,
  Users,
  BookOpen,
  BedDouble,
  Pill,
  LogOut,
  UserCircle,
} from 'lucide-react';
import Image from 'next/image';

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Appointments', href: '/appointments', icon: CalendarDays },
  { name: 'EMR', href: '/emr', icon: FilePlus },
  { name: 'Staff Management', href: '/staff-management', icon: Users },
  { name: 'Education Content', href: '/education-content', icon: BookOpen },
  { name: 'Bed Management', href: '/bed-management', icon: BedDouble },
  { name: 'Medicine Inventory', href: '/medicine-inventory', icon: Pill },
];

export default function NavigationBar() {
  const pathname = usePathname();

  // Don't show navbar on auth pages
  if (pathname === '/auth') {
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
        {navItems.map((item) => (
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
      
      {/* Login/Auth Link - Added here */}
      <div className="mt-6 border-t border-gray-200 pt-4">
        <Link href="/auth">
          <div
            className={`flex items-center p-2 rounded-md transition-all cursor-pointer ${
              pathname === '/auth' ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'
            }`}
          >
            <UserCircle className="w-5 h-5 mr-3" />
            <span>Login / Register</span>
          </div>
        </Link>
      </div>
      
      <div className="mt-auto pt-4 border-t border-gray-200">
        <button
          onClick={() => {
            // Replace with your logout logic
            console.log("Logging out...");
          }}
          className="flex items-center p-2 w-full text-left rounded-md transition-all hover:bg-gray-100"
        >
          <LogOut className="w-5 h-5 mr-3" />
          <span>Logout</span>
        </button>
      </div>
    </nav>
  );
}