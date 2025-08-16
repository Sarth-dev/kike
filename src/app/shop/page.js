'use client';

import Footer from '@/Component/utils/Footer';
import Navbar from '@/Component/utils/Navbar';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

// Example data — replace with real data or pass in as props
const initialProducts = [
  {
    id: 'p1',
    name: 'Jordan',
    href: '/product',
    price: 11129.99,
    currency: 'INR',
    rating: 4.5,
    reviews: 214,
    image: '/images/jordan.avif',
    badge: 'Best Seller',
  },
  {
    id: 'p2',
    name: 'Jordan FE',
    href: '/product/smart-watch-7',
    price: 12239.0,
    currency: 'INR',
    rating: 4.2,
    reviews: 98,
    image: '/images/jordan1.avif',
    badge: 'New',
  },
  {
    id: 'p3',
    name: 'Jordan SE',
    href: '/product/4k-action-cam',
    price: 16179.5,
    currency: 'INR',
    rating: 4.4,
    reviews: 162,
    image: '/images/jordan12.avif',
  },
  {
    id: 'p4',
    name: 'Jordan OG',
    href: '/product/bluetooth-speaker',
    price: 34559.99,
    currency: 'INR',
    rating: 4.1,
    reviews: 305,
    image: '/images/HighOG.avif',
    badge: 'Deal',
  },
  {
    id: 'p1',
    name: 'Jordan',
    href: '/product/wireless-headphones',
    price: 11129.99,
    currency: 'INR',
    rating: 4.5,
    reviews: 214,
    image: '/images/jordan.avif',
    badge: 'Best Seller',
  },
  {
    id: 'p2',
    name: 'Jordan FE',
    href: '/product/smart-watch-7',
    price: 12239.0,
    currency: 'INR',
    rating: 4.2,
    reviews: 98,
    image: '/images/jordan1.avif',
    badge: 'New',
  },
  {
    id: 'p3',
    name: 'Jordan SE',
    href: '/product/4k-action-cam',
    price: 16179.5,
    currency: 'INR',
    rating: 4.4,
    reviews: 162,
    image: '/images/jordan12.avif',
  },
  {
    id: 'p4',
    name: 'Jordan OG',
    href: '/product/bluetooth-speaker',
    price: 34559.99,
    currency: 'INR',
    rating: 4.1,
    reviews: 305,
    image: '/images/HighOG.avif',
    badge: 'Deal',
  },
  {
    id: 'p1',
    name: 'Jordan',
    href: '/product/wireless-headphones',
    price: 11129.99,
    currency: 'INR',
    rating: 4.5,
    reviews: 214,
    image: '/images/jordan.avif',
    badge: 'Best Seller',
  },
  {
    id: 'p2',
    name: 'Jordan FE',
    href: '/product/smart-watch-7',
    price: 12239.0,
    currency: 'INR',
    rating: 4.2,
    reviews: 98,
    image: '/images/jordan1.avif',
    badge: 'New',
  },
  {
    id: 'p3',
    name: 'Jordan SE',
    href: '/product/4k-action-cam',
    price: 16179.5,
    currency: 'INR',
    rating: 4.4,
    reviews: 162,
    image: '/images/jordan12.avif',
  },
  {
    id: 'p4',
    name: 'Jordan OG',
    href: '/product/bluetooth-speaker',
    price: 34559.99,
    currency: 'INR',
    rating: 4.1,
    reviews: 305,
    image: '/images/HighOG.avif',
    badge: 'Deal',
  },
];

function formatPrice(value, currency = 'INR', locale = 'en-US') {
  try {
    return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(value);
  } catch {
    return `$${value.toFixed(2)}`;
  }
}

function Stars({ value = 0 }) {
  const full = Math.floor(value);
  const half = value - full >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);

  return (
    <div className="flex items-center" aria-label={`${value} out of 5 stars`}>
      {Array.from({ length: full }).map((_, i) => (
        <svg key={`f${i}`} className="h-4 w-4 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.802 2.036a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118L10 13.347l-2.985 2.156c-.785.57-1.84-.197-1.54-1.118l1.07-3.292a1 1 0 00-.364-1.118L3.38 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
        </svg>
      ))}
      {half && (
        <svg className="h-4 w-4 text-yellow-500" viewBox="0 0 24 24" aria-hidden="true">
          <defs>
            <linearGradient id="half">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="transparent" />
            </linearGradient>
          </defs>
          <path
            fill="url(#half)"
            d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.788 1.402 8.168L12 18.896l-7.336 3.87 1.402-8.168L.132 9.21l8.2-1.192L12 .587z"
          />
        </svg>
      )}
      {Array.from({ length: empty }).map((_, i) => (
        <svg key={`e${i}`} className="h-4 w-4 text-gray-300" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.802 2.036a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118L10 13.347l-2.985 2.156c-.785.57-1.84-.197-1.54-1.118l1.07-3.292a1 1 0 00-.364-1.118L3.38 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function ProductCard({ product, onAdd }) {
  const { id, name, href, price, currency, rating, reviews, image, badge } = product;

  return (
    <div className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white">
      <div className="relative aspect-square w-full overflow-hidden bg-gray-50">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 300px"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          priority={false}
        />
        {badge ? (
          <span className="absolute left-2 top-2 rounded bg-black px-2 py-1 text-xs font-medium text-white">
            {badge}
          </span>
        ) : null}
      </div>

      <div className="p-4">
        <Link href={href} className="block">
          <h3 className="line-clamp-2 text-sm font-medium text-gray-900">{name}</h3>
        </Link>

        <div className="mt-1 flex items-center justify-between">
          <p className="text-base font-semibold text-gray-900">
            {formatPrice(price, currency)}
          </p>
          <div className="flex items-center gap-1">
            <Stars value={rating} />
            <span className="text-xs text-gray-500">({reviews})</span>
          </div>
        </div>

        <button
          onClick={() => onAdd?.(id)}
          className="mt-3 w-full rounded-md bg-black px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-900"
          aria-label={`Add ${name} to cart`}
        >
          Add to Cart
        </button>
         <button
          onClick={() => onAdd?.(id)}
          className="mt-3 w-full rounded-md bg-black px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-900"
          aria-label={`Add ${name} to cart`}
        >
         Buy Now
        </button>
      </div>
    </div>
  );
}

export default function FeaturedProducts({ title = 'Featured Products', products = initialProducts, onAddToCart }) {
  const [items] = useState(products);

  return (
   <>
   <Navbar/>
     <section className="mx-auto max-w-7xl px-4 py-10">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((p) => (
          <ProductCard key={p.id} product={p} onAdd={onAddToCart} />
        ))}
      </div>
    </section>
    <Footer/>
   </>
  );
}
