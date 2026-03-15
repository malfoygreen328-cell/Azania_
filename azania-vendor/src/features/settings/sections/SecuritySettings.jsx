function SecuritySettings() {
  return (
    <div className="settings-card">

      <h2>Security</h2>

      <input type="password" placeholder="Current Password" />

      <input type="password" placeholder="New Password" />

      <input type="password" placeholder="Confirm Password" />

      <button>Update Password</button>

    </div>
  );
}

export default SecuritySettings;