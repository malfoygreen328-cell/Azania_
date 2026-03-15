function DeliverySettings() {
  return (
    <div className="settings-card">

      <h2>Delivery Settings</h2>

      <input placeholder="Delivery Fee" />

      <input placeholder="Free Delivery Threshold" />

      <select>
        <option>Local Only</option>
        <option>Nationwide</option>
      </select>

      <button>Save Delivery Settings</button>

    </div>
  );
}

export default DeliverySettings;