'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';

function formatPrice(value, currency = 'USD', locale = 'en-US') {
  try {
    return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(value);
  } catch {
    return `$${Number(value || 0).toFixed(2)}`;
  }
}

// Demo fetch — replace with real data fetching
async function getProduct(slug) {
  // In real app, call your API here
  return {
    id: 'p123',
    slug,
    name: 'Wireless Noise-Cancelling Headphones',
    price: 149.99,
    currency: 'USD',
    rating: 4.5,
    reviews: 214,
    inStock: true,
    sku: 'WH-900N',
    brand: 'ShopBrand',
    images: [
      './Jordan KI.avif',
      './jordan OG.avif',
      './video.mp4',
      './JordanHJ.avif',
      './jordanOK.avif',
      './box.avif'
    ],
    colors: ['Black', 'Silver', 'Blue'],
    sizes: ['Standard'],
    highlights: [
      'Active noise cancellation with transparency mode',
      'Up to 30 hours of battery life',
      'Bluetooth 5.3, AAC/aptX support',
      'Foldable design with carry case',
    ],
    description:
      'Experience immersive sound with premium noise cancellation and crystal-clear audio. Designed for comfort, travel, and all-day listening.',
    specs: {
      Weight: '240g',
      Connectivity: 'Bluetooth 5.3, USB‑C',
      Codecs: 'SBC, AAC, aptX',
      Drivers: '40mm dynamic',
      Warranty: '1 year limited',
    },
    shipping: 'Free standard shipping on orders over $50. 7–10 business days.',
    related: [
      { id: 'r1', name: 'Bluetooth Speaker', href: '/product/bluetooth-speaker', price: 59.99, image: '/images/products/speaker.jpg' },
      { id: 'r2', name: 'True Wireless Earbuds', href: '/product/tws-earbuds', price: 79.0, image: '/images/products/earbuds.jpg' },
      { id: 'r3', name: 'Protective Carry Case', href: '/product/headphone-case', price: 19.99, image: '/images/products/case.jpg' },
    ],
  };
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
            <linearGradient id="halfStar">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="transparent" />
            </linearGradient>
          </defs>
          <path
            fill="url(#halfStar)"
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

function Quantity({ value, onChange }) {
  return (
    <div className="inline-flex items-center rounded-md border border-gray-300">
      <button
        className="px-3 py-2 text-gray-700 hover:bg-gray-50"
        onClick={() => onChange(Math.max(1, value - 1))}
        aria-label="Decrease quantity"
      >
        −
      </button>
      <div className="w-10 text-center text-sm">{value}</div>
      <button
        className="px-3 py-2 text-gray-700 hover:bg-gray-50"
        onClick={() => onChange(value + 1)}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}

export default function ProductPage({ params }) {
  const { slug } = params;
  const [selectedImage, setSelectedImage] = useState(0);
  const [color, setColor] = useState(null);
  const [size, setSize] = useState(null);
  const [qty, setQty] = useState(1);

  // Load product data (could be moved to server component + passed down)
  const [product] = useState(() => null);
  const data = useMemo(() => product, [product]); // placeholder if fetching client-side

  // For demo, call local mock
  const [loaded, setLoaded] = useState(false);
  const [p, setP] = useState(null);
  useState(() => {
    getProduct(slug).then((d) => {
      setP(d);
      setColor(d.colors?.[0] || null);
      setSize(d.sizes?.[0] || null);
      setLoaded(true);
    });
  }, []);

  if (!loaded || !p) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="h-6 w-40 animate-pulse rounded bg-gray-200" />
        <div className="mt-6 grid gap-8 lg:grid-cols-2">
          <div className="aspect-square w-full rounded-lg bg-gray-100" />
          <div className="space-y-3">
            <div className="h-6 w-72 animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-56 animate-pulse rounded bg-gray-200" />
            <div className="h-10 w-48 animate-pulse rounded bg-gray-200" />
          </div>
        </div>
      </section>
    );
  }

  const priceText = formatPrice(p.price, p.currency);
  const stockBadge = p.inStock ? (
    <span className="rounded bg-green-100 px-2 py-1 text-xs font-medium text-green-800">In stock</span>
  ) : (
    <span className="rounded bg-red-100 px-2 py-1 text-xs font-medium text-red-800">Out of stock</span>
  );

  const addToCart = () => {
    // Replace with real cart logic (Zustand/Redux/Context/Server Actions)
    console.log('Add to cart', { id: p.id, qty, color, size });
    alert('Added to cart');
  };

  const buyNow = () => {
    // Implement immediate checkout
    console.log('Buy now', { id: p.id, qty, color, size });
    alert('Proceeding to checkout');
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      {/* Breadcrumbs */}
      <nav className="mb-4 text-sm text-gray-600" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2">
          <li><Link href="/" className="hover:text-gray-900">Home</Link></li>
          <li>/</li>
          <li><Link href="/shop" className="hover:text-gray-900">Shop</Link></li>
          <li>/</li>
          <li aria-current="page" className="text-gray-900">{p.name}</li>
        </ol>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Gallery */}
        <div>
          <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-50">
            <Image
              src={p.images[selectedImage]}
              alt={`${p.name} image ${selectedImage + 1}`}
              fill
              sizes="(max-width: 1024px) 100vw, 600px"
              className="object-cover"
              priority
            />
          </div>

          <div className="mt-3 grid grid-cols-4 gap-3 sm:grid-cols-6">
            {p.images.map((src, i) => (
              <button
                key={src}
                onClick={() => setSelectedImage(i)}
                className={`relative aspect-square overflow-hidden rounded border ${i === selectedImage ? 'border-black' : 'border-gray-200'}`}
                aria-label={`View image ${i + 1}`}
              >
                <Image src={src} alt="" fill className="object-cover" sizes="120px" />
              </button>
            ))}
          </div>
        </div>

        {/* Details */}
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">{p.name}</h1>

          <div className="mt-2 flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Stars value={p.rating} />
              <span className="text-sm text-gray-600">({p.reviews} reviews)</span>
            </div>
            {stockBadge}
          </div>

          <p className="mt-4 text-2xl font-bold">{priceText}</p>
          <p className="mt-1 text-sm text-gray-500">SKU: {p.sku} • Brand: {p.brand}</p>

          {/* Variants */}
          {p.colors?.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-medium">Color</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {p.colors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setColor(c)}
                    className={`rounded-md border px-3 py-1.5 text-sm ${color === c ? 'border-black' : 'border-gray-300 hover:bg-gray-50'}`}
                    aria-pressed={color === c}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}

          {p.sizes?.length > 0 && (
            <div className="mt-4">
              <h3 className="text-sm font-medium">Size</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {p.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`rounded-md border px-3 py-1.5 text-sm ${size === s ? 'border-black' : 'border-gray-300 hover:bg-gray-50'}`}
                    aria-pressed={size === s}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity and actions */}
          <div className="mt-6 flex items-center gap-4">
            <Quantity value={qty} onChange={setQty} />
            <button
              onClick={addToCart}
              disabled={!p.inStock}
              className="rounded-md bg-black px-5 py-3 text-sm font-medium text-white hover:bg-gray-900 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Add to Cart
            </button>
            <button
              onClick={buyNow}
              disabled={!p.inStock}
              className="rounded-md border border-gray-300 px-5 py-3 text-sm font-medium hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Buy Now
            </button>
          </div>

          {/* Highlights */}
          {p.highlights?.length > 0 && (
            <ul className="mt-6 list-disc pl-5 text-sm text-gray-700">
              {p.highlights.map((h) => <li key={h}>{h}</li>)}
            </ul>
          )}

          {/* Tabs */}
          <div className="mt-8">
            <details className="group rounded-md border border-gray-200 p-4">
              <summary className="cursor-pointer list-none font-medium">Details</summary>
              <p className="mt-2 text-sm text-gray-700">{p.description}</p>
            </details>

            <details className="group mt-3 rounded-md border border-gray-200 p-4">
              <summary className="cursor-pointer list-none font-medium">Specifications</summary>
              <div className="mt-2 grid grid-cols-1 gap-2 text-sm text-gray-700 sm:grid-cols-2">
                {Object.entries(p.specs).map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4">
                    <span className="text-gray-500">{k}</span>
                    <span className="font-medium">{v}</span>
                  </div>
                ))}
              </div>
            </details>

            <details className="group mt-3 rounded-md border border-gray-200 p-4">
              <summary className="cursor-pointer list-none font-medium">Shipping & Returns</summary>
              <p className="mt-2 text-sm text-gray-700">{p.shipping}</p>
            </details>
          </div>
        </div>
      </div>

      {/* Related products */}
      {p.related?.length > 0 && (
        <div className="mt-12">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">You may also like</h2>
            <Link href="/shop" className="text-sm text-gray-700 hover:text-gray-900">View all →</Link>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {p.related.map((r) => (
              <Link key={r.id} href={r.href} className="group rounded-lg border border-gray-200 p-3 hover:shadow">
                <div className="relative aspect-square w-full overflow-hidden rounded bg-gray-50">
                  <Image src={r.image} alt={r.name} fill sizes="200px" className="object-cover transition-transform duration-300 group-hover:scale-105" />
                </div>
                <div className="mt-2 text-sm font-medium text-gray-900 line-clamp-2">{r.name}</div>
                <div className="text-sm text-gray-700">{formatPrice(r.price)}</div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
