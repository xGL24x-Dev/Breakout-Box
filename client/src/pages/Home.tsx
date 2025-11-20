import { Link } from "wouter";
import { Search, MapPin, User, ShoppingCart, Menu, X } from "lucide-react";
import { useState } from "react";
import { APP_LOGO } from "@/const";

export default function Home() {

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const restaurants = [
    {
      id: 1,
      name: "Tortelli Pasta Italiana",
      time: "44 min",
      rating: "4.8",
      price: "$1.500",
      image: "🍝",
    },
    {
      id: 2,
      name: "Fusion Wok - Sushi & Asian Food",
      time: "29 min",
      rating: "4.9",
      price: "$1.900",
      image: "🍜",
    },
    {
      id: 3,
      name: "Panadería Montecarlo",
      time: "29 min",
      rating: "4.7",
      price: "$1.100",
      image: "🥐",
    },
    {
      id: 4,
      name: "Doña Francia",
      time: "44 min",
      rating: "4.6",
      price: "$2.900",
      image: "🍲",
    },
    {
      id: 5,
      name: "Subway",
      time: "34 min",
      rating: "4.5",
      price: "$1.600",
      image: "🥪",
    },
    {
      id: 6,
      name: "Calathea",
      time: "12 min",
      rating: "4.9",
      price: "$2.500",
      image: "🥤",
    },
  ];

  const brands = [
    { id: 1, name: "McDonald's", image: "🍔" },
    { id: 2, name: "KFC", image: "🍗" },
    { id: 3, name: "El Corral", image: "🍔" },
    { id: 4, name: "Frisby", image: "🍟" },
    { id: 5, name: "Sandwich Qbano", image: "🥙" },
    { id: 6, name: "Papa Johns", image: "🍕" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-4">
            {/* Logo and Menu Button */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden"
              >
                {mobileMenuOpen ? (
                  <X size={24} />
                ) : (
                  <Menu size={24} />
                )}
              </button>
              <div className="flex items-center gap-3">
                <img src={APP_LOGO} alt="Breakout Box" className="h-12 w-12 object-contain" />
                <div className="text-2xl font-bold text-green-700">
                  Breakout Box
                </div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              <Link href="/login">
                <button className="flex items-center gap-2 text-gray-700 hover:text-green-600">
                  <User size={20} />
                  <span>Ingreso</span>
                </button>
              </Link>
              <Link href="/cart">
                <button className="flex items-center gap-2 text-gray-700 hover:text-green-600">
                  <ShoppingCart size={20} />
                  <span>Carrito</span>
                </button>
              </Link>
            </div>

            {/* Mobile Cart Icon */}
            <div className="md:hidden">
              <Link href="/cart">
                <button className="text-gray-700">
                  <ShoppingCart size={20} />
                </button>
              </Link>
            </div>
          </div>

          {/* Location and Search */}
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin size={18} />
              <span>Universidad Santiago De Cali</span>
            </div>
            <div className="flex-1 flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2">
              <Search size={18} className="text-gray-400" />
              <input
                type="text"
                placeholder="Comida, restaurantes, tiendas, productos..."
                className="bg-transparent w-full outline-none text-sm"
              />
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4 px-4 space-y-3">
            <Link href="/login">
              <button className="w-full text-left py-2 text-gray-700 hover:text-green-600">
                Ingreso
              </button>
            </Link>
            <Link href="/register">
              <button className="w-full text-left py-2 text-gray-700 hover:text-green-600">
                Registrarse
              </button>
            </Link>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Promotional Banners */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white">
            <h3 className="text-xl font-bold mb-2">Ahorra tiempo en el campus</h3>
            <p className="text-sm mb-4">Evita filas y recoge tu comida en minutos</p>
            <Link href="/reservation">
              <button className="bg-white text-green-600 font-semibold px-4 py-2 rounded-lg hover:bg-gray-100">
                Ordena ahora
              </button>
            </Link>
          </div>
          <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg p-6 text-white">
            <h3 className="text-xl font-bold mb-2">¡Reserva tu comida sin hacer filas!</h3>
            <p className="text-sm mb-4">Elige tu horario y recógela sin esperar</p>
            <Link href="/reservation">
              <button className="bg-white text-amber-600 font-semibold px-4 py-2 rounded-lg hover:bg-gray-100">
                Reserva ahora
              </button>
            </Link>
          </div>
        </div>

        {/* Top Restaurants Section */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Restaurantes más rápidos en el campus</h2>
            <a href="#" className="text-green-600 text-sm font-semibold hover:underline">
              Ver más
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {restaurants.map((restaurant) => (
              <Link key={restaurant.id} href="/reservation">
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="bg-gray-200 h-40 flex items-center justify-center text-6xl">
                    {restaurant.image}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-2">
                      {restaurant.name}
                    </h3>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>⏱️ {restaurant.time}</span>
                      <span>⭐ {restaurant.rating}</span>
                      <span className="font-semibold">{restaurant.price}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Top Brands Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">¡Los más pedidos por estudiantes!</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {brands.map((brand) => (
              <Link key={brand.id} href="/reservation">
                <div className="bg-white border border-gray-200 rounded-lg p-4 text-center hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="text-5xl mb-2">{brand.image}</div>
                  <p className="text-sm font-semibold text-gray-800">
                    {brand.name}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="bg-gradient-to-r from-green-600 to-green-700 rounded-lg p-8 text-white text-center mb-8">
          <h2 className="text-2xl font-bold mb-4">¡Pide sin filas y recoge al instante!</h2>
          <p className="mb-6">Descubre las mejores opciones de comida en tu campus.</p>
          <Link href="/register">
            <button className="bg-white text-green-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100">
              Registrarse ahora
            </button>
          </Link>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 text-center text-xs text-gray-500">
          <p>Gustavo Lizarazo, Andres Abella y Juan Jose © 2025</p>
        </div>
      </footer>
    </div>
  );
}
