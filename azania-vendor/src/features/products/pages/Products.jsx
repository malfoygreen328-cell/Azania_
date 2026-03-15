import { Link } from "react-router-dom";
import ProductTable from "../components/ProductTable";

function Products() {
  return (
    <div>

      <div style={{display:"flex", justifyContent:"space-between"}}>

        <h1>Products</h1>

        <Link to="/dashboard/products/add">
          <button>Add Product</button>
        </Link>

      </div>

      <ProductTable />

    </div>
  );
}

export default Products;