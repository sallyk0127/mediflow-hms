'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { UsersIcon, SettingsIcon } from '@/components/ui/icons';

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: UsersIcon },
  { name: 'Appointments', href: '/appointments', icon: UsersIcon },
  { name: 'EMR', href: '/emr', icon: UsersIcon },
  { name: 'Staff Roster', href: '/staff-roster', icon: UsersIcon },
  { name: 'Education Content', href: '/education-content', icon: UsersIcon },
  { name: 'Rooms', href: '/rooms', icon: UsersIcon },
  { name: 'Medicine Inventory', href: '/medicine-inventory', icon: UsersIcon },
  { name: 'Settings', href: '/settings', icon: SettingsIcon },
];

export default function NavigationBar() {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <nav className="h-screen w-64 bg-gray-900 text-white flex flex-col p-4">
      <div className="flex items-center justify-between pb-4 border-b border-gray-700">
        <h1 className="text-xl font-semibold">MediFlow HMS</h1>
        <button onClick={() => setIsExpanded(!isExpanded)} className="text-gray-400 hover:text-white">
          ☰
        </button>
      </div>
      <ul className="mt-4 space-y-2">
        {navItems.map((item) => (
          <li key={item.href}>
            <Link href={item.href}>
              <div
                className={`flex items-center p-2 rounded-md transition-all cursor-pointer ${
                  pathname === item.href ? 'bg-blue-500' : 'hover:bg-gray-700'
                }`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                <span className={isExpanded ? 'block' : 'hidden'}>{item.name}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
