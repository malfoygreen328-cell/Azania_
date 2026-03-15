import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Providers from "./Providers";
import VendorDashboard from "./components/VendorDashboard";

const AppRouter = () => {
  return (
    <Providers>
      <Router>
        <Routes>
          <Route path="/vendor" element={<VendorDashboard />} />
          {/* Add more routes as needed */}
        </Routes>
      </Router>
    </Providers>
  );
};

export default AppRouter;