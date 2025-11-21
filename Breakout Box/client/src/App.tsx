import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Payment from "./pages/Payment";
import Reservation from "./pages/Reservation";
import RestaurantDashboard from "./pages/RestaurantDashboard";
import RestaurantProfile from "./pages/RestaurantProfile";
import RestaurantProducts from "./pages/RestaurantProducts";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/login"} component={Login} />
      <Route path={"/register"} component={Register} />
      <Route path={"/cart"} component={Cart} />
      <Route path={"/payment"} component={Payment} />
      <Route path={"/reservation"} component={Reservation} />
      <Route path={"/restaurant-dashboard"} component={RestaurantDashboard} />
      <Route path={"/restaurant-profile"} component={RestaurantProfile} />
      <Route path={"/restaurant-products"} component={RestaurantProducts} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
