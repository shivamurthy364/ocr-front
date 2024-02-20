import React from "react";

const links = [
  { name: 'Home', href: '/' },
  { name: 'How to use out Tools?', href: '/esi' },
  { name: 'About-us', href: '#' },
  { name: 'Contact-us', href: '#' },
];

export default function Header() {
  return (
    <div className="relative bg-gray-900 py-12 sm:py-12 md:py-20 lg:py-7 xl:py-20 2xl:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Extractify</h2>
              <p className="mt-1 text-sm leading-5 text-gray-300">Optical Character Recognition Tool</p>
            </div>
          </div>
          <div className="hidden md:block ml-6">
            <div className="flex space-x-4">
              {links.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-white hover:bg-gray-700 px-3 py-1 rounded-md text-sm font-semibold"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
