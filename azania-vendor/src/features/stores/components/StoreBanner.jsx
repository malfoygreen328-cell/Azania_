import React from "react";

const StoreBanner = ({ store }) => {
  return (
    <div style={styles.container}>
      
      {/* Banner Image */}
      <div style={styles.banner}>
        <img
          src={store.banner || "/assets/default-banner.jpg"}
          alt="Store banner"
          style={styles.bannerImage}
        />
      </div>

      {/* Store Info Section */}
      <div style={styles.storeInfo}>

        {/* Store Logo */}
        <div style={styles.logoContainer}>
          <img
            src={store.logo || "/assets/default-store.png"}
            alt="Store logo"
            style={styles.logo}
          />
        </div>

        {/* Store Details */}
        <div style={styles.details}>
          <h2 style={styles.storeName}>{store.name}</h2>

          <p style={styles.description}>
            {store.description || "No store description provided."}
          </p>

          <div style={styles.meta}>
            <span>Products: {store.productCount || 0}</span>
            <span>Followers: {store.followers || 0}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={styles.actions}>
          <button style={styles.primaryButton}>
            Edit Store
          </button>

          <button style={styles.secondaryButton}>
            View Store
          </button>
        </div>

      </div>
    </div>
  );
};

const styles = {
  container: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 8,
    overflow: "hidden",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    marginBottom: 20
  },

  banner: {
    width: "100%",
    height: 180,
    overflow: "hidden"
  },

  bannerImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover"
  },

  storeInfo: {
    display: "flex",
    alignItems: "center",
    padding: 20,
    gap: 20
  },

  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: "50%",
    overflow: "hidden",
    border: "3px solid white",
    marginTop: -60,
    backgroundColor: "#f5f5f5"
  },

  logo: {
    width: "100%",
    height: "100%",
    objectFit: "cover"
  },

  details: {
    flex: 1
  },

  storeName: {
    margin: 0,
    fontSize: 22,
    fontWeight: 600
  },

  description: {
    marginTop: 6,
    color: "#555",
    fontSize: 14
  },

  meta: {
    marginTop: 10,
    display: "flex",
    gap: 15,
    fontSize: 13,
    color: "#777"
  },

  actions: {
    display: "flex",
    gap: 10
  },

  primaryButton: {
    backgroundColor: "#0F3D2E",
    color: "white",
    border: "none",
    padding: "8px 16px",
    borderRadius: 5,
    cursor: "pointer",
    fontWeight: 500
  },

  secondaryButton: {
    backgroundColor: "transparent",
    border: "1px solid #0F3D2E",
    color: "#0F3D2E",
    padding: "8px 16px",
    borderRadius: 5,
    cursor: "pointer",
    fontWeight: 500
  }
};

export default StoreBanner;