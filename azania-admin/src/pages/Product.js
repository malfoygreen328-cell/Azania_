import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Replace with your API endpoint
    axios.get('/api/products')
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Products</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Products;