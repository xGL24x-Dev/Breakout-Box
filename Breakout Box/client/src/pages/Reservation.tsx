import { Link } from "wouter";
import { ArrowLeft, ShoppingCart, Heart, Star } from "lucide-react";
import { useState } from "react";

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  rating: number;
}

export default function Reservation() {
  const [selectedRestaurant] = useState("Tortelli Pasta Italiana");
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const menuItems: MenuItem[] = [
    {
      id: 1,
      name: "Pasta Carbonara",
      description: "Pasta fresca con salsa de huevo, queso y panceta",
      price: 15000,
      image: "🍝",
      rating: 4.8,
    },
    {
      id: 2,
      name: "Ravioles de Ricotta",
      description: "Ravioles caseros rellenos de ricotta y espinaca",
      price: 14000,
      image: "🍝",
      rating: 4.9,
    },
    {
      id: 3,
      name: "Lasaña Bolognesa",
      description: "Lasaña tradicional con carne molida y bechamel",
      price: 16000,
      image: "🍝",
      rating: 4.7,
    },
    {
      id: 4,
      name: "Fettuccine Alfredo",
      description: "Pasta con salsa cremosa de queso parmesano",
      price: 13000,
      image: "🍝",
      rating: 4.6,
    },
    {
      id: 5,
      name: "Spaghetti a la Marinera",
      description: "Spaghetti con camarones, mejillones y almejas",
      price: 18000,
      image: "🍝",
      rating: 4.9,
    },
    {
      id: 6,
      name: "Penne Arrabbiata",
      description: "Penne con salsa de tomate y ajo picante",
      price: 12000,
      image: "🍝",
      rating: 4.5,
    },
  ];

  const toggleItem = (id: number) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const cartTotal = menuItems
    .filter((item) => selectedItems.includes(item.id))
    .reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <button className="flex items-center gap-2 text-gray-700 hover:text-green-600">
                <ArrowLeft size={24} />
              </button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                {selectedRestaurant}
              </h1>
              <p className="text-sm text-gray-600">Pre-orden tu comida</p>
            </div>
          </div>

          <Link href="/cart">
            <button className="relative bg-green-600 hover:bg-green-700 text-white p-3 rounded-full transition-colors">
              <ShoppingCart size={24} />
              {selectedItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                  {selectedItems.length}
                </span>
              )}
            </button>
          </Link>
        </div>
      </header>

      {/* Restaurant Info */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-6xl">🍝</div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-yellow-400">★</span>
                  <span className="font-semibold text-gray-800">4.8</span>
                  <span className="text-gray-600">(245 reseñas)</span>
                </div>
                <p className="text-gray-600">⏱️ 44 min • 📍 A 2.5 km</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Envío gratis</p>
              <p className="text-2xl font-bold text-green-600">Disponible</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Menu Items */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Menú</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {menuItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden"
                >
                  <div className="bg-gray-200 h-40 flex items-center justify-center text-6xl">
                    {item.image}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 text-lg mb-1">
                      {item.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">
                      {item.description}
                    </p>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-1">
                        <Star size={16} className="text-yellow-400 fill-yellow-400" />
                        <span className="text-sm font-semibold text-gray-800">
                          {item.rating}
                        </span>
                      </div>
                      <p className="text-green-600 font-bold">
                        ${item.price.toLocaleString()}
                      </p>
                    </div>

                    <button
                      onClick={() => toggleItem(item.id)}
                      className={`w-full font-bold py-2 rounded-lg transition-colors ${
                        selectedItems.includes(item.id)
                          ? "bg-green-600 text-white hover:bg-green-700"
                          : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                      }`}
                    >
                      {selectedItems.includes(item.id)
                        ? "✓ Agregado"
                        : "Agregar"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-800 mb-6">
                Tu orden
              </h2>

              {selectedItems.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-4xl mb-3">🛒</div>
                  <p className="text-gray-600">
                    Selecciona items para comenzar
                  </p>
                </div>
              ) : (
                <>
                  <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                    {menuItems
                      .filter((item) => selectedItems.includes(item.id))
                      .map((item) => (
                        <div
                          key={item.id}
                          className="flex justify-between items-start"
                        >
                          <div className="flex-1">
                            <p className="font-semibold text-gray-800">
                              {item.name}
                            </p>
                            <p className="text-sm text-gray-600">x1</p>
                          </div>
                          <p className="font-bold text-gray-800">
                            ${item.price.toLocaleString()}
                          </p>
                        </div>
                      ))}
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span>${cartTotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Impuestos (8%)</span>
                      <span>${Math.round(cartTotal * 0.08).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Envío</span>
                      <span className="text-green-600 font-semibold">Gratis</span>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-gray-800">Total</span>
                      <span className="text-2xl font-bold text-green-600">
                        ${Math.round(cartTotal * 1.08).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <Link href="/payment">
                    <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition-colors">
                      Proceder al pago
                    </button>
                  </Link>
                </>
              )}

              {/* Special Instructions */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Instrucciones especiales
                </label>
                <textarea
                  placeholder="Sin cebolla, sin picante, etc."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 text-sm"
                  rows={3}
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-4 mt-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-xs text-gray-500">
          <p>Gustavo Lizarazo, Andres Abella y Juan Jose © 2025</p>
        </div>
      </footer>
    </div>
  );
}
