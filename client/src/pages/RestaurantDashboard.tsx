import { Link, useLocation } from "wouter";
import { ArrowLeft, CheckCircle, Clock, DollarSign, User } from "lucide-react";
import { useState } from "react";

interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  items: string[];
  total: number;
  paymentMethod: "online" | "campus";
  status: "pending" | "ready" | "completed";
  time: string;
}

export default function RestaurantDashboard() {
  const [, navigate] = useLocation();
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "1",
      orderNumber: "0001",
      customerName: "Juan Pérez",
      items: ["Pasta Carbonara", "Agua"],
      total: 16200,
      paymentMethod: "online",
      status: "pending",
      time: "11:30 AM",
    },
    {
      id: "2",
      orderNumber: "0002",
      customerName: "María García",
      items: ["Sushi Roll x2", "Gaseosa"],
      total: 37600,
      paymentMethod: "campus",
      status: "pending",
      time: "11:35 AM",
    },
    {
      id: "3",
      orderNumber: "0003",
      customerName: "Carlos López",
      items: ["Hamburguesa Clásica"],
      total: 12000,
      paymentMethod: "online",
      status: "ready",
      time: "11:25 AM",
    },
    {
      id: "4",
      orderNumber: "0004",
      customerName: "Ana Martínez",
      items: ["Sandwich", "Papas", "Bebida"],
      total: 28500,
      paymentMethod: "campus",
      status: "completed",
      time: "11:15 AM",
    },
  ]);

  const markAsReady = (id: string) => {
    setOrders(
      orders.map((order) =>
        order.id === id ? { ...order, status: "ready" } : order
      )
    );
  };

  const markAsCompleted = (id: string) => {
    setOrders(
      orders.map((order) =>
        order.id === id ? { ...order, status: "completed" } : order
      )
    );
  };

  const pendingOrders = orders.filter((o) => o.status === "pending");
  const readyOrders = orders.filter((o) => o.status === "ready");
  const completedOrders = orders.filter((o) => o.status === "completed");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-50 border-yellow-200";
      case "ready":
        return "bg-green-50 border-green-200";
      case "completed":
        return "bg-gray-50 border-gray-200";
      default:
        return "bg-white border-gray-200";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full">
            <Clock size={14} />
            En preparación
          </span>
        );
      case "ready":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
            <CheckCircle size={14} />
            Listo para recoger
          </span>
        );
      case "completed":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-800 text-xs font-semibold rounded-full">
            <CheckCircle size={14} />
            Recogido
          </span>
        );
      default:
        return null;
    }
  };

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
              <h1 className="text-2xl font-bold text-gray-800">Panel del Restaurante</h1>
              <p className="text-sm text-gray-600">Gestiona tus pedidos</p>
            </div>
          </div>
          <Link href="/restaurant-profile">
            <button className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors">
              <User size={20} />
              Mi Perfil
            </button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Pendientes</p>
                <p className="text-3xl font-bold text-yellow-600">
                  {pendingOrders.length}
                </p>
              </div>
              <Clock className="text-yellow-500" size={32} />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Listos</p>
                <p className="text-3xl font-bold text-green-600">
                  {readyOrders.length}
                </p>
              </div>
              <CheckCircle className="text-green-500" size={32} />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Recogidos</p>
                <p className="text-3xl font-bold text-gray-600">
                  {completedOrders.length}
                </p>
              </div>
              <CheckCircle className="text-gray-500" size={32} />
            </div>
          </div>
        </div>

        {/* Orders by Status */}
        <div className="space-y-8">
          {/* Pending Orders */}
          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Clock className="text-yellow-500" size={24} />
              En Preparación ({pendingOrders.length})
            </h2>
            <div className="space-y-4">
              {pendingOrders.length === 0 ? (
                <div className="bg-white rounded-lg p-8 text-center text-gray-500">
                  No hay pedidos en preparación
                </div>
              ) : (
                pendingOrders.map((order) => (
                  <div
                    key={order.id}
                    className={`bg-white rounded-lg shadow p-6 border-l-4 border-yellow-500`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-3xl font-bold text-yellow-600">
                            #{order.orderNumber}
                          </span>
                          {getStatusBadge(order.status)}
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <User size={16} />
                          <span>{order.customerName}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-gray-800">
                          ${order.total.toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-500">{order.time}</p>
                      </div>
                    </div>

                    <div className="mb-4 p-3 bg-gray-50 rounded">
                      <p className="text-sm font-semibold text-gray-700 mb-2">
                        Items:
                      </p>
                      <ul className="space-y-1">
                        {order.items.map((item, idx) => (
                          <li key={idx} className="text-sm text-gray-600">
                            • {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 rounded">
                        <DollarSign size={16} className="text-blue-600" />
                        <span className="text-sm font-semibold text-blue-600">
                          {order.paymentMethod === "online"
                            ? "Pago en línea"
                            : "Pago en campus"}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => markAsReady(order.id)}
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded-lg transition-colors"
                    >
                      Marcar como Listo
                    </button>
                  </div>
                ))
              )}
            </div>
          </section>

          {/* Ready Orders */}
          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <CheckCircle className="text-green-500" size={24} />
              Listos para Recoger ({readyOrders.length})
            </h2>
            <div className="space-y-4">
              {readyOrders.length === 0 ? (
                <div className="bg-white rounded-lg p-8 text-center text-gray-500">
                  No hay pedidos listos
                </div>
              ) : (
                readyOrders.map((order) => (
                  <div
                    key={order.id}
                    className={`bg-white rounded-lg shadow p-6 border-l-4 border-green-500`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-3xl font-bold text-green-600">
                            #{order.orderNumber}
                          </span>
                          {getStatusBadge(order.status)}
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <User size={16} />
                          <span>{order.customerName}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-gray-800">
                          ${order.total.toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-500">{order.time}</p>
                      </div>
                    </div>

                    <div className="mb-4 p-3 bg-gray-50 rounded">
                      <p className="text-sm font-semibold text-gray-700 mb-2">
                        Items:
                      </p>
                      <ul className="space-y-1">
                        {order.items.map((item, idx) => (
                          <li key={idx} className="text-sm text-gray-600">
                            • {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 rounded">
                        <DollarSign size={16} className="text-blue-600" />
                        <span className="text-sm font-semibold text-blue-600">
                          {order.paymentMethod === "online"
                            ? "Pago en línea"
                            : "Pago en campus"}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => markAsCompleted(order.id)}
                      className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 rounded-lg transition-colors"
                    >
                      Marcar como Recogido
                    </button>
                  </div>
                ))
              )}
            </div>
          </section>

          {/* Completed Orders */}
          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <CheckCircle className="text-gray-500" size={24} />
              Recogidos ({completedOrders.length})
            </h2>
            <div className="space-y-4">
              {completedOrders.length === 0 ? (
                <div className="bg-white rounded-lg p-8 text-center text-gray-500">
                  No hay pedidos recogidos
                </div>
              ) : (
                completedOrders.map((order) => (
                  <div
                    key={order.id}
                    className={`bg-white rounded-lg shadow p-6 border-l-4 border-gray-300 opacity-75`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-3xl font-bold text-gray-400">
                            #{order.orderNumber}
                          </span>
                          {getStatusBadge(order.status)}
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <User size={16} />
                          <span>{order.customerName}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-gray-800">
                          ${order.total.toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-500">{order.time}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
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
