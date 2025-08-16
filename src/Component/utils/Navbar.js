'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/shop', label: 'Shop' },
  { href: '/categories', label: 'Categories' },
  { href: '/product/slug', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu on route change
    setOpen(false);
  }, [pathname]);

  const isActive = (href) =>
    href === '/' ? pathname === '/' : pathname?.startsWith(href);

  return (
    <header className={`sticky top-0 z-50 transition-shadow bg-white ${scrolled ? 'shadow-md' : ''}`}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:py-4">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center text-orange-600 gap-2">
          <span className="inline-block h-8 w-8 rounded bg-orange-600" aria-hidden />
          <span className="text-lg font-semibold">ShopBrand</span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`text-sm text-orange-600 transition-colors hover:text-black ${
                  isActive(link.href) ? 'text-black font-medium' : 'text-gray-600'
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right: CTA */}
        <div className="hidden md:flex text-gray-700 items-center gap-3">
          <Link
            href="/cart"
            className="rounded-md border border-orange-300 px-3 py-1.5 text-sm hover:bg-gray-50"
            aria-label="View cart"
          >
            Cart
          </Link>
          <Link
            href="/account"
            className="rounded-md bg-orange-600 px-3 py-1.5 text-sm text-white hover:bg-gray-900"
          >
            Sign in
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="md:hidden inline-flex items-center justify-center rounded-md p-2 hover:bg-gray-100"
        >
          <svg
            className="h-6 w-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            {open ? (
              <path strokeWidth="2" strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeWidth="2" strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden border-t border-gray-200 bg-white transition-[max-height] duration-300 overflow-hidden ${
          open ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <ul className="px-4 py-2">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`block px-2 py-3 text-sm transition-colors hover:bg-gray-50 rounded ${
                  isActive(link.href) ? 'text-black font-medium' : 'text-gray-700'
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li className="mt-2 flex gap-2">
            <Link
              href="/cart"
              className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm text-center hover:bg-gray-50"
            >
              Cart
            </Link>
            <Link
              href="/account"
              className="flex-1 rounded-md bg-black px-3 py-2 text-sm text-white text-center hover:bg-gray-900"
            >
              Sign in
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
