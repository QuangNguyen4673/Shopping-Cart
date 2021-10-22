import { Link } from "react-router-dom";
import PaymentForm from "../components/PaymentForm";
import ProductCard from "../components/ProductCard";
import { useShopContext } from "../context/ShopContext";
import { serverTimestamp } from "firebase/firestore";
export default function Cart() {
  const { cart, removeProduct, updateProduct, checkOut, currentUser } =
    useShopContext();

  const isItemInCart = cart.length > 0;
  const total = cart
    .reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0)
    .toFixed(2);

  const submitHandler = (e, paymentInfo) => {
    console.log(e);
    e.preventDefault();

    for (let i = 0; i < cart.length; i++) {
      if (!cart[i].quantity) {
        return alert("please dont leave quantity blank");
      }
    }
    const modifiedCart = cart.map((item) => {
      delete item.description;
      delete item.rating;
      return item;
    });
    const userId = currentUser.uid;
    checkOut({
      ...paymentInfo,
      userId,
      cart: modifiedCart,
      created: serverTimestamp(),
    });
  };
  if (!isItemInCart) {
    return (
      <div className="alert-info">
        Your cart has no item. <Link to="/">Shop now</Link>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="cart">
        <h2 className="header">Cart</h2>
        <div className="flex-wrapper">
          <div className="shopping-cart">
            {cart.map((item) => {
              return (
                <ProductCard
                  key={item.id}
                  item={item}
                  removeProduct={removeProduct}
                  updateProduct={updateProduct}
                />
              );
            })}
          </div>
          <PaymentForm submitHandler={submitHandler} total={total} />
        </div>
      </div>
    </div>
  );
}
