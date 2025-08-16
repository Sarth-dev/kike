'use client';

import Link from 'next/link';

const footerLinks = {
  Shop: [
    { href: '/shop', label: 'All Products' },
    { href: '/categories', label: 'Categories' },
    { href: '/deals', label: 'Deals' },
    { href: '/new', label: 'New Arrivals' },
  ],
  Company: [
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
    { href: '/careers', label: 'Careers' },
    { href: '/blog', label: 'Blog' },
  ],
  Support: [
    { href: '/help', label: 'Help Center' },
    { href: '/shipping', label: 'Shipping' },
    { href: '/returns', label: 'Returns' },
    { href: '/track-order', label: 'Track Order' },
  ],
  Legal: [
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Service' },
    { href: '/cookies', label: 'Cookie Policy' },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12">
        {/* Top: brand + newsletter */}
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-block h-8 w-8 rounded bg-orange-600" aria-hidden />
              <span className="text-lg text-orange-600 font-semibold">ShopBrand</span>
            </div>
            <p className="mt-3 text-sm text-gray-700">
              Quality products, fast delivery, and trusted support.
            </p>
          </div>

          {/* Links */}
          <div className="md:col-span-2 grid gap-8 sm:grid-cols-2 md:grid-cols-4">
            {Object.entries(footerLinks).map(([group, links]) => (
              <nav key={group} aria-label={group}>
                <h3 className="text-sm font-semibold text-orange-800">{group}</h3>
                <ul className="mt-3 space-y-2">
                  {links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="text-sm text-gray-600 hover:text-gray-900"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        {/* Divider */}
        <hr className="my-8 border-gray-200" />

        {/* Bottom: social + payments + copyright */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* Socials (replace with real links/icons as needed) */}
          <div className="flex items-center gap-3">
            <a
              aria-label="Instagram"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 text-gray-700 hover:bg-gray-50"
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
            >
              IG
            </a>
            <a
              aria-label="Twitter"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 text-gray-700 hover:bg-gray-50"
              href="https://x.com"
              target="_blank"
              rel="noreferrer"
            >
              X
            </a>
            <a
              aria-label="Facebook"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 text-gray-700 hover:bg-gray-50"
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
            >
              Fb
            </a>
          </div>

          {/* Payment badges (placeholder) */}
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <span className="rounded border border-gray-300 px-2 py-1">Visa</span>
            <span className="rounded border border-gray-300 px-2 py-1">Mastercard</span>
            <span className="rounded border border-gray-300 px-2 py-1">AmEx</span>
            <span className="rounded border border-gray-300 px-2 py-1">UPI</span>
          </div>

          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} ShopBrand. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
