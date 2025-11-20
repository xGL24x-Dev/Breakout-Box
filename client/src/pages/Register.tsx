import { Link, useLocation } from "wouter";
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { APP_LOGO } from "@/const";
import { toast } from "sonner";

const API_URL = "https://apig.e-posgt.com"; // Cambia esto a tu URL de Laravel

export default function Register() {
  const [, navigate] = useLocation();
  const [userType, setUserType] = useState<"student" | "restaurant">("student");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    cedula: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validaciones
    if (formData.password !== formData.confirmPassword) {
      toast.error("Las contraseñas no coinciden");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    setIsLoading(true);

    try {
      // Convertir tipo de usuario a número (1 = estudiante, 2 = restaurante)
      const roleId = userType === "student" ? 1 : 2;

      // Preparar datos para enviar
      const registerData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.confirmPassword,
        type_user: roleId,
        phone: formData.phone || null,
        cedula: formData.cedula || null,
      };

      // Hacer petición a tu API Laravel
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerData),
      });

      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        throw new Error(data.error || data.message || "Error al registrarse");
      }

      // Guardar token y usuario en localStorage
      if (data.access_token) {
        localStorage.setItem("token", data.access_token);
      }
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      toast.success("¡Registro exitoso!");

      // Redirigir según tipo de usuario
      if (userType === "restaurant") {
        navigate("/restaurant-dashboard");
      } else {
        navigate("/");
      }
    } catch (err: any) {
      const errorMessage = err.message || "Error al registrarse";
      setError(errorMessage);
      toast.error(errorMessage);
      console.error("Register error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/">
            <div className="flex items-center justify-center gap-3 mb-4 cursor-pointer hover:opacity-80">
              <img src={APP_LOGO} alt="Breakout Box" className="h-16 w-16 object-contain" />
              <div className="text-3xl font-bold text-green-700">
                Breakout Box
              </div>
            </div>
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">Crear cuenta</h1>
          <p className="text-gray-600 mt-2">Únete a nuestra comunidad</p>
        </div>

        {/* User Type Selection */}
        <div className="bg-white rounded-lg shadow-lg p-8 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              ¿Qué tipo de cuenta deseas crear?
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setUserType("student")}
                disabled={isLoading}
                className={`p-4 rounded-lg border-2 transition-all ${userType === "student"
                  ? "border-green-600 bg-green-50"
                  : "border-gray-300 bg-white hover:border-gray-400"
                  }`}
              >
                <div className="text-2xl mb-2">👨‍🎓</div>
                <div className="font-semibold text-gray-800">Estudiante</div>
              </button>
              <button
                type="button"
                onClick={() => setUserType("restaurant")}
                disabled={isLoading}
                className={`p-4 rounded-lg border-2 transition-all ${userType === "restaurant"
                  ? "border-green-600 bg-green-50"
                  : "border-gray-300 bg-white hover:border-gray-400"
                  }`}
              >
                <div className="text-2xl mb-2">🍽️</div>
                <div className="font-semibold text-gray-800">Restaurante</div>
              </button>
            </div>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            {/* Name Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {userType === "student" ? "Nombre completo" : "Nombre del restaurante"}
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={userType === "student" ? "Juan Pérez" : "Mi Restaurante"}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Correo electrónico
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="tu@correo.com"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Phone Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Teléfono
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="3001234567"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                disabled={isLoading}
              />
            </div>

            {/* Cedula Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Cédula de ciudadanía
              </label>
              <input
                type="text"
                name="cedula"
                value={formData.cedula}
                onChange={handleChange}
                placeholder="1234567890"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                disabled={isLoading}
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Confirm Password Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Confirmar contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Terms and Conditions */}
            <label className="flex items-start gap-2 text-sm">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-gray-300 mt-1"
                required
                disabled={isLoading}
              />
              <span className="text-gray-600">
                Acepto los{" "}
                <a href="#" className="text-green-600 hover:text-green-700 font-semibold">
                  términos y condiciones
                </a>
              </span>
            </label>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold py-3 rounded-lg transition-colors mt-6"
            >
              {isLoading ? "Creando cuenta..." : "Crear cuenta"}
            </button>
          </form>
        </div>

        {/* Login Link */}
        <p className="text-center text-gray-600 mt-6">
          ¿Ya tienes cuenta?{" "}
          <Link href="/login">
            <span className="text-green-600 hover:text-green-700 font-semibold cursor-pointer">
              Inicia sesión
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
}
