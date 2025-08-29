'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home, LucideIcon } from 'lucide-react';

export default function Breadcrumb() {
  const pathname = usePathname();

  const generateBreadcrumbs = () => {
    const paths = pathname.split('/').filter(Boolean);
    const breadcrumbs: Array<{ name: string; href: string; icon: LucideIcon | null }> = [
      { name: 'Início', href: '/', icon: Home }
    ];

    if (paths.length === 0) return breadcrumbs;

    let currentPath = '';
    paths.forEach((path, index) => {
      currentPath += `/${path}`;
      
      let name = path;
      if (path === 'dashboard') name = 'Dashboard';
      if (path === 'visualizations') name = 'Visualizações';
      
      breadcrumbs.push({
        name,
        href: currentPath,
        icon: null
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
      {breadcrumbs.map((breadcrumb, index) => (
        <div key={breadcrumb.href} className="flex items-center space-x-2">
          {index > 0 && (
            <ChevronRight className="w-4 h-4 text-gray-400 dark:text-gray-500" />
          )}
          
          {index === breadcrumbs.length - 1 ? (
            <span className="text-gray-900 dark:text-white font-medium">
              {breadcrumb.icon && <breadcrumb.icon className="w-4 h-4 inline mr-1" />}
              {breadcrumb.name}
            </span>
          ) : (
            <Link
              href={breadcrumb.href}
              className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200 flex items-center"
            >
              {breadcrumb.icon && <breadcrumb.icon className="w-4 h-4 mr-1" />}
              {breadcrumb.name}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
}
