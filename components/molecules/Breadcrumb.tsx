
"use client"; 

import Link from 'next/link';
import { usePathname } from 'next/navigation'; 
import { createBreadcrumbItems, BreadcrumbItem } from '@/lib/breadcrumbUtils';
import React from 'react';

const Breadcrumb: React.FC = () => {
  const pathname = usePathname(); 
  
  const breadcrumbItems: BreadcrumbItem[] = createBreadcrumbItems(pathname);

  if (breadcrumbItems.length === 0) {
      return null;
  }

  return (
    <nav aria-label="Breadcrumb" className="bg-gray-100 p-1 rounded-md shadow-sm w-full ">
      <ol className="flex items-center  whitespace-nowrap">
        {breadcrumbItems.map((item) => {
          const isCurrent = item.isCurrent;
          const isFirst = item.href === '/';

          return (
            <li
              key={item.href}
              className={`
                relative flex items-center h-7 text-sm pl-2 transition duration-100 
                
                ${isFirst ? 'bg-gray-300' : 'bg-gray-200'}
                
                
                ${
                  isCurrent
                    ? 'bg-transparent pr-4 shadow-none'
                    : 'custom-breadcrumb-item pr-6 shadow-md'
                }
              `}
            >
              {isCurrent ? (
                <span className="font-bold text-blue-600">
                  {item.label}
                </span>
              ) : (
                <Link href={item.href} className="text-gray-700 hover:text-blue-700">
                    {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;