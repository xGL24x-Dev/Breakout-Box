import { Link, useLocation } from "wouter";
import { ArrowLeft, CreditCard, DollarSign, CheckCircle } from "lucide-react";
import { useState } from "react";

export default function Payment() {
  const [, navigate] = useLocation();
  const [paymentMethod, setPaymentMethod] = useState<"online" | "campus">("online");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  const subtotal = 45000;
  const tax = 3600;
  const total = 48600;

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    // Simular procesamiento de pago
    const randomOrderNumber = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0");
    setOrderNumber(randomOrderNumber);
    setOrderPlaced(true);
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center px-4">
        <div className="w-full max-w-md text-center">
          <div className="bg-white rounded-lg shadow-lg p-12">
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              ¡Pedido confirmado!
            </h1>
            <p className="text-gray-600 mb-6">
              Tu pedido ha sido procesado exitosamente
            </p>

            <div className="bg-green-50 rounded-lg p-6 mb-6">
              <p className="text-sm text-gray-600 mb-2">Número de orden</p>
              <p className="text-4xl font-bold text-green-600">{orderNumber}</p>
            </div>

            {paymentMethod === "online" ? (
              <div className="bg-blue-50 rounded-lg p-6 mb-6">
                <p className="text-sm text-gray-600 mb-2">Método de pago</p>
                <p className="text-lg font-semibold text-gray-800">
                  Tarjeta de crédito
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  Tu comida estará lista en 30-40 minutos
                </p>
              </div>
            ) : (
              <div className="bg-blue-50 rounded-lg p-6 mb-6">
                <p className="text-sm text-gray-600 mb-2">Método de pago</p>
                <p className="text-lg font-semibold text-gray-800">
                  Pago en campus
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  Recibirás una notificación cuando tu comida esté lista
                </p>
              </div>
            )}

            <div className="space-y-3">
              <Link href="/reservation">
                <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition-colors">
                  Hacer otro pedido
                </button>
              </Link>
              <Link href="/">
                <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-3 rounded-lg transition-colors">
                  Volver al inicio
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/cart">
            <button className="flex items-center gap-2 text-gray-700 hover:text-green-600">
              <ArrowLeft size={24} />
            </button>
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">Pago</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handlePayment} className="space-y-6">
              {/* Payment Method Selection */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6">
                  Método de pago
                </h2>

                <div className="space-y-4">
                  {/* Online Payment */}
                  <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all"
                    style={{
                      borderColor: paymentMethod === "online" ? "#f97316" : "#d1d5db",
                      backgroundColor: paymentMethod === "online" ? "#fff7ed" : "#ffffff",
                    }}>
                    <input
                      type="radio"
                      name="payment"
                      value="online"
                      checked={paymentMethod === "online"}
                      onChange={(e) =>
                        setPaymentMethod(e.target.value as "online" | "campus")
                      }
                      className="w-4 h-4"
                    />
                    <div className="ml-4 flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <CreditCard size={20} className="text-green-600" />
                        <span className="font-semibold text-gray-800">
                          Pago en línea
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        Paga ahora con tarjeta de crédito o débito
                      </p>
                    </div>
                  </label>

                  {/* Campus Payment */}
                  <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all"
                    style={{
                      borderColor: paymentMethod === "campus" ? "#f97316" : "#d1d5db",
                      backgroundColor: paymentMethod === "campus" ? "#fff7ed" : "#ffffff",
                    }}>
                    <input
                      type="radio"
                      name="payment"
                      value="campus"
                      checked={paymentMethod === "campus"}
                      onChange={(e) =>
                        setPaymentMethod(e.target.value as "online" | "campus")
                      }
                      className="w-4 h-4"
                    />
                    <div className="ml-4 flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <DollarSign size={20} className="text-green-600" />
                        <span className="font-semibold text-gray-800">
                          Pago en campus
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        Paga cuando recojas tu pedido en el campus
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Card Details (only for online payment) */}
              {paymentMethod === "online" && (
                <div className="bg-white rounded-lg shadow p-6 space-y-4">
                  <h3 className="font-semibold text-gray-800 mb-4">
                    Información de la tarjeta
                  </h3>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Número de tarjeta
                    </label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Vencimiento
                      </label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        CVV
                      </label>
                      <input
                        type="text"
                        placeholder="123"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Nombre del titular
                    </label>
                    <input
                      type="text"
                      placeholder="Juan Pérez"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                      required
                    />
                  </div>
                </div>
              )}

              {/* Recipient Name */}
              <div className="bg-white rounded-lg shadow p-6 space-y-4">
                <h3 className="font-semibold text-gray-800 mb-4">
                  Información de entrega
                </h3>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    placeholder="Juan Pérez"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Instrucciones especiales
                  </label>
                  <textarea
                    placeholder="Ej: Sin cebolla, sin picante, etc."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                    rows={3}
                  ></textarea>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition-colors"
              >
                Confirmar pedido
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-800 mb-6">
                Resumen del pedido
              </h2>

              <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Impuestos (8%)</span>
                  <span>${tax.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Envío</span>
                  <span className="text-green-600 font-semibold">Gratis</span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-gray-800">Total</span>
                <span className="text-2xl font-bold text-green-600">
                  ${total.toLocaleString()}
                </span>
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
