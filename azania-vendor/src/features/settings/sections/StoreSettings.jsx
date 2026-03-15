function StoreSettings() {
  return (
    <div className="settings-card">

      <h2>Store Details</h2>

      <input placeholder="Store Name" />

      <input placeholder="Store Slug (URL)" />

      <textarea placeholder="Store Description"></textarea>

      <input type="file" />

      <button>Save Store</button>

    </div>
  );
}

export default StoreSettings;