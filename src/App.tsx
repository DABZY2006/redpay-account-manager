import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Welcome from "./pages/Welcome";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Withdraw from "./pages/Withdraw";
import BuyRPC from "./pages/BuyRPC";
import Broadcast from "./pages/Broadcast";
import PaymentProcessing from "./pages/PaymentProcessing";
import TransactionFailed from "./pages/TransactionFailed";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/withdraw" element={<Withdraw />} />
          <Route path="/buy-rpc" element={<BuyRPC />} />
          <Route path="/broadcast" element={<Broadcast />} />
          <Route path="/payment-processing" element={<PaymentProcessing />} />
          <Route path="/transaction-failed" element={<TransactionFailed />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
