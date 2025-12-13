import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2 sm:space-x-4">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {item.href ? (
              <Link href={item.href} className="text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 whitespace-nowrap overflow-hidden text-ellipsis max-w-[100px] sm:max-w-none">
                {item.label}
              </Link>
            ) : (
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap overflow-hidden text-ellipsis max-w-[100px] sm:max-w-none" aria-current="page">
                {item.label}
              </span>
            )}
            {index < items.length - 1 && (
              <ChevronRight className="h-4 w-4 text-gray-400 ml-2 sm:ml-4" />
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
