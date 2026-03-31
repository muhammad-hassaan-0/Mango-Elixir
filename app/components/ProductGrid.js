'use client';

const products = [
  {
    name: 'Original Gold',
    subtitle: 'The Flagship',
    description: 'Pure mango nectar with the essence of tropical paradise.',
    brix: '12.5°',
    ph: '3.8',
    origin: 'Philippine',
    badgeColor: 'bg-yellow-400',
    accentColor: 'text-yellow-500',
  },
  {
    name: 'Midnight Mango',
    subtitle: 'Dark Elegance',
    description: 'Blackberry-infused blend with mysterious depth.',
    brix: '13.2°',
    ph: '3.4',
    origin: 'Brazilian',
    badgeColor: 'bg-purple-600',
    accentColor: 'text-purple-400',
  },
  {
    name: 'Habanero Heat',
    subtitle: 'Spicy Kick',
    description: 'Bold mango with habanero pepper for the adventurous.',
    brix: '11.8°',
    ph: '3.2',
    origin: 'Mexican',
    badgeColor: 'bg-red-500',
    accentColor: 'text-red-400',
  },
];

function ProductCard({ product }) {
  return (
    <div className="group bg-gray-900 border border-gray-800 rounded-xl p-8 h-full flex flex-col hover:border-orange-500 hover:bg-gray-800 transition-all duration-300">
      {/* Header with Badge */}
      <div className="flex items-center gap-4 mb-6">
        <div className={`w-16 h-16 rounded-full ${product.badgeColor} flex-shrink-0`} />
        <p className={`text-xs font-bold tracking-widest uppercase ${product.accentColor}`}>
          {product.subtitle}
        </p>
      </div>

      {/* Title */}
      <h3 className="text-2xl font-bold text-white mb-3">{product.name}</h3>

      {/* Description */}
      <p className="text-gray-400 text-sm mb-6 flex-grow">{product.description}</p>

      {/* Divider */}
      <div className="border-t border-gray-700 my-4" />

      {/* Specs */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <p className="text-xs text-gray-500 mb-2">Brix</p>
          <p className={`font-bold text-sm ${product.accentColor}`}>{product.brix}</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500 mb-2">pH</p>
          <p className={`font-bold text-sm ${product.accentColor}`}>{product.ph}</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500 mb-2">Origin</p>
          <p className={`font-bold text-sm ${product.accentColor}`}>{product.origin}</p>
        </div>
      </div>

      {/* Button */}
      <button className="w-full py-3 px-4 bg-gradient-to-r from-orange-400 to-orange-600 text-black font-bold text-sm rounded-lg hover:shadow-lg hover:shadow-orange-500/50 transition-all duration-300 uppercase tracking-wider">
        Discover More
      </button>
    </div>
  );
}

export function ProductGrid() {
  return (
    <section className="w-full bg-black">
      {/* Hero Banner */}
      <div className="w-full bg-gradient-to-r from-orange-600 via-orange-500 to-yellow-550 py-32">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <p className="text-white text-xs tracking-widest font-bold mb-4">PREMIUM COLLECTION</p>
          <h1 className="text-6xl md:text-7xl font-black text-white">Experience Luxury</h1>
        </div>
      </div>

      {/* Products Container */}
      <div className="w-full bg-black px-8 py-20">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <p className="text-orange-500 text-xs tracking-widest font-bold mb-4">PRODUCT BOUTIQUE</p>
            <h2 className="serif text-5xl md:text-6xl font-black text-white mb-6">
              The Elixir Collection
            </h2>
            <p className="text-gray-400 text-base max-w-2xl mx-auto">
              Three distinct expressions of tropical perfection. Each a masterpiece of flavor and craft.
            </p>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {products.map((product, idx) => (
              <ProductCard key={idx} product={product} />
            ))}
          </div>

          {/* CTA Section */}
          <div className="flex justify-center mb-16">
            <button className="px-14 py-4 bg-gradient-to-r from-orange-400 to-orange-600 text-black font-black text-sm rounded-full hover:shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 uppercase tracking-wider">
              Explore Full Catalog
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
