import React from "react";

export default function ProductCard({
  item,
  addProduct,
  removeProduct,
  updateProduct,
}) {
  const { image, price, title, description, quantity } = item;

  const updateHandler = (e) => {
    const newValue = e.target.value;
    if (newValue > 999) return;
    if (newValue === "" || newValue > 0) {
      updateProduct({ ...item, quantity: e.target.value });
    }
  };

  return (
    <div className="product-card">
      <img src={image} alt="product" />
      <div className="product-info">
        <h3 className="line-clamp-2">{title}</h3>
        {addProduct && (
          <p className="description line-clamp-3">{description}</p>
        )}

        <div className="price-and-quantity">
          {addProduct ? (
            <strong className="price">{price}$</strong>
          ) : (
            <strong className="price">{(price * quantity).toFixed(2)}$</strong>
          )}

          {!addProduct && (
            <input
              className="quantity"
              type="number"
              onChange={(e) => updateHandler(e)}
              value={quantity}
            />
          )}
        </div>

        {addProduct && (
          <button type="button" onClick={() => addProduct(item)}>
            Add to cart
          </button>
        )}
        {!addProduct && (
          <button type="button" onClick={() => removeProduct(item)}>
            Remove
          </button>
        )}
      </div>
    </div>
  );
}
