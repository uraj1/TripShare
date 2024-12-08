import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { Hero } from "./components/home/Hero";
import { PopularDestinations } from "./components/home/PopularDestinations";
import { LoginForm } from "./components/auth/LoginForm";
import { SignupForm } from "./components/auth/SignupForm";
import { ForgotPassword } from "./components/auth/ForgotPassword";
import { TripProvider } from "./context/TripContext";
import { AuthProvider } from "./components/auth/AuthContext";
import { FactComponent } from "./components/home/FactComponent";
import FeatureSection from "./components/home/FeatureSection";
import TripFormDetails from "./components/pages/TripFormDetails";
import { TripForm } from "./components/trip/TripForm";

function App() {
  return (
    <Router>
      <AuthProvider>
        <TripProvider>
          <div className="min-h-screen bg-black">
            <Header />
            <AnimatePresence mode="wait">
              <Routes>
                <Route
                  path="/"
                  element={
                    <>
                      <Hero />
                      <FactComponent />
                        <TripForm />
                      <FeatureSection />
                      <PopularDestinations />
                    </>
                  }
                />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/signup" element={<SignupForm />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/trip-details" element={<TripFormDetails />} />
              </Routes>
            </AnimatePresence>
          </div>
        </TripProvider>
      </AuthProvider>
      <Footer />
    </Router>
  );
}

export default App;
