import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Scan from "./pages/Scan";
import Identity from "./pages/Identity";
import ZKProofs from "./pages/ZKProofs";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import BottomNavigation from "./components/BottomNavigation";
import RelyingParty from "./pages/RelyingParty";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const location = useLocation();
  
  // Check if we're on a path that should show the bottom navigation
  const showBottomNav = !["/scan"].includes(location.pathname);
  
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/scan" element={<Scan />} />
        <Route path="/identity" element={<Identity />} />
        <Route path="/zkproofs" element={<ZKProofs />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/rp" element={<RelyingParty />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      
      {showBottomNav && <BottomNavigation />}
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
