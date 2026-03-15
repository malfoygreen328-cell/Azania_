import React, { useState } from "react";

const StoreCustomizer = () => {

  const [store, setStore] = useState({
    name: "",
    description: "",
    logo: null,
    banner: null,
    primaryColor: "#0F3D2E"
  });

  const handleChange = (e) => {
    setStore({
      ...store,
      [e.target.name]: e.target.value
    });
  };

  const handleFile = (e) => {
    setStore({
      ...store,
      [e.target.name]: e.target.files[0]
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Store settings:", store);

    // send to API
  };

  return (
    <div style={styles.container}>

      <h2>Customize Your Store</h2>

      <form onSubmit={handleSubmit} style={styles.form}>

        <label>Store Name</label>
        <input name="name" onChange={handleChange} />

        <label>Description</label>
        <textarea name="description" onChange={handleChange} />

        <label>Logo</label>
        <input
          type="file"
          name="logo"
          onChange={handleFile}
        />

        <label>Banner Image</label>
        <input
          type="file"
          name="banner"
          onChange={handleFile}
        />

        <label>Primary Color</label>
        <input
          type="color"
          name="primaryColor"
          onChange={handleChange}
        />

        <button style={styles.button}>
          Save Changes
        </button>

      </form>

    </div>
  );
};

const styles = {
  container: {
    background: "white",
    padding: 30,
    borderRadius: 8
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    maxWidth: 400
  },

  button: {
    marginTop: 15,
    padding: "10px",
    background: "#0F3D2E",
    color: "white",
    border: "none",
    borderRadius: 4
  }
};

export default StoreCustomizer;