import { Link } from "wouter";
import { ArrowLeft, Upload, Save } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export default function RestaurantProfile() {
  const [restaurantData, setRestaurantData] = useState({
    id: 0,
    name: "",
    description: "",
    phone: "",
    email: "",
    image: "🍽️",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(restaurantData);
  const [isLoading, setIsLoading] = useState(true);

  // Obtener datos del restaurante
  useEffect(() => {
    const loadRestaurantData = async () => {
      try {
        setIsLoading(true);
        const userStr = localStorage.getItem("user");
        if (!userStr) {
          toast.error("Usuario no autenticado");
          return;
        }

        const user = JSON.parse(userStr);

      } catch (error) {
        console.error("Error loading restaurant:", error);
        toast.error("Error al cargar datos del restaurante");
      } finally {
        setIsLoading(false);
      }
    };

    loadRestaurantData();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          image: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      if (!formData.name.trim()) {
        toast.error("El nombre del restaurante es requerido");
        return;
      }

      setRestaurantData(formData);
      setIsEditing(false);
      toast.success("Restaurante actualizado exitosamente");
    } catch (error) {
      console.error("Error saving restaurant:", error);
      toast.error("Error al guardar los cambios");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando perfil...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/restaurant-dashboard">
            <button className="flex items-center gap-2 text-gray-700 hover:text-green-600">
              <ArrowLeft size={24} />
            </button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Perfil del Restaurante</h1>
            <p className="text-sm text-gray-600">Edita la información de tu negocio</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 py-8">
        {/* Profile Section */}
        <div className="bg-white rounded-lg shadow p-8 mb-8">
          <div className="flex items-start justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">Información General</h2>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors"
              >
                Editar
              </button>
            )}
          </div>

          {isEditing ? (
            <form className="space-y-6">
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Foto del Restaurante
                </label>
                <div className="flex items-center gap-4">
                  <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center text-5xl border-2 border-dashed border-gray-300">
                    {typeof formData.image === "string" && formData.image.startsWith("data:")
                      ? "✓"
                      : formData.image}
                  </div>
                  <div>
                    <label className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg cursor-pointer transition-colors">
                      <Upload size={18} />
                      Subir imagen
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                    <p className="text-xs text-gray-500 mt-2">JPG, PNG o GIF</p>
                  </div>
                </div>
              </div>

              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nombre del Restaurante
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  placeholder="Nombre de tu restaurante"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Descripción
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  placeholder="Describe tu restaurante, especialidades, horario, etc."
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Teléfono
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  placeholder="+57 300 123 4567"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  placeholder="restaurante@correo.com"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleSave}
                  className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition-colors"
                >
                  <Save size={18} />
                  Guardar Cambios
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setFormData(restaurantData);
                    setIsEditing(false);
                  }}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 rounded-lg transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              {/* Image Display */}
              <div className="flex items-center gap-6">
                <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center text-6xl border-2 border-gray-200">
                  {typeof restaurantData.image === "string" && restaurantData.image.startsWith("data:")
                    ? "📷"
                    : restaurantData.image}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {restaurantData.name || "Sin nombre"}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {restaurantData.description || "Sin descripción"}
                  </p>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>
                      <strong>Teléfono:</strong> {restaurantData.phone || "No especificado"}
                    </p>
                    <p>
                      <strong>Email:</strong> {restaurantData.email || "No especificado"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Products Section */}
        <div className="bg-white rounded-lg shadow p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">Gestionar Productos</h2>
            <Link href="/restaurant-products">
              <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors">
                Ver Productos
              </button>
            </Link>
          </div>
          <p className="text-gray-600">
            Administra los productos y menús de tu restaurante desde la sección de productos.
          </p>
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