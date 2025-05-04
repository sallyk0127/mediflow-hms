'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UsersIcon } from '@/components/ui/icons';
import Image from 'next/image';

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: UsersIcon },
  { name: 'Appointments', href: '/appointments', icon: UsersIcon },
  { name: 'EMR', href: '/emr', icon: UsersIcon },
  { name: 'Staff Management', href: '/staff-management', icon: UsersIcon },
  { name: 'Education Content', href: '/education-content', icon: UsersIcon },
  { name: 'Bed Management', href: '/bed-management', icon: UsersIcon },
  { name: 'Medicine Inventory', href: '/medicine-inventory', icon: UsersIcon },
];

export default function NavigationBar() {
  const pathname = usePathname();

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
    </nav>
  );
}
