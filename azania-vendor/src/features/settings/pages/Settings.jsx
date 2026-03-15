import { NavLink, Routes, Route, Navigate } from "react-router-dom";

import ProfileSettings from "../sections/ProfileSettings";
import StoreSettings from "../sections/StoreSettings";
import PaymentSettings from "../sections/PaymentSettings";
import DeliverySettings from "../sections/DeliverySettings";
import TeamSettings from "../sections/TeamSettings";
import SecuritySettings from "../sections/SecuritySettings";

function Settings() {
  return (
    <div>

      <h1>Settings</h1>

      {/* SETTINGS NAVBAR */}
      <div className="settings-navbar">

        <NavLink to="profile">Profile</NavLink>

        <NavLink to="store">Store</NavLink>

        <NavLink to="payments">Payments</NavLink>

        <NavLink to="delivery">Delivery</NavLink>

        <NavLink to="team">Team</NavLink>

        <NavLink to="security">Security</NavLink>

      </div>

      {/* SETTINGS CONTENT */}
      <div className="settings-content">

        <Routes>

          <Route path="/" element={<Navigate to="profile" />} />

          <Route path="profile" element={<ProfileSettings />} />

          <Route path="store" element={<StoreSettings />} />

          <Route path="payments" element={<PaymentSettings />} />

          <Route path="delivery" element={<DeliverySettings />} />

          <Route path="team" element={<TeamSettings />} />

          <Route path="security" element={<SecuritySettings />} />

        </Routes>

      </div>

    </div>
  );
}

export default Settings;