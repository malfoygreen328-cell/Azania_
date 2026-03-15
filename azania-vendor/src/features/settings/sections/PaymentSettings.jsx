function PaymentSettings() {
  return (
    <div className="settings-card">

      <h2>Payment Methods</h2>

      <label>
        <input type="checkbox" />
        Accept Card Payments
      </label>

      <label>
        <input type="checkbox" />
        Accept Bank Transfer
      </label>

      <label>
        <input type="checkbox" />
        Accept Cash on Delivery
      </label>

      <button>Save Payment Settings</button>

    </div>
  );
}

export default PaymentSettings;