import ProductCard from "../components/ProductCard";
import { useShopContext } from "../context/ShopContext";

export default function Shop() {
  const { product, addProduct } = useShopContext();
  return (
    <div className="container">
      <div className="shop">
        <h2 className="header">Shop</h2>
        <div className="shop-row">
          {product.map((item) => {
            return (
              <ProductCard key={item.id} item={item} addProduct={addProduct} />
            );
          })}
        </div>
      </div>
    </div>
  );
}
