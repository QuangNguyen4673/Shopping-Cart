import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import { useShopContext } from "../context/ShopContext";

export default function PurchaseHistory() {
  const [receipts, setReceipts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useShopContext();

  useEffect(() => {
    const getData = async () => {
      const q = query(
        collection(db, "PurchaseInfo"),
        where("userId", "==", currentUser.uid),
        orderBy("created", "desc")
      );
      const querySnapshot = await getDocs(q);
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
      setReceipts(data);
      setLoading(false);
    };
    getData();
  }, [currentUser.uid]);
  const allCarts = receipts.map((item) => item.cart);

  if (loading) {
    return <div className="alert-info">Loading ...</div>;
  } else if (receipts.length === 0) {
    return (
      <div className="alert-danger">You haven't bought anything yet ...</div>
    );
  }
  return (
    <div className="container">
      <div className="purchase-history">
        <h2 className="header">Purchase History</h2>
        <AllCarts allCarts={allCarts} receipts={receipts} />
      </div>
    </div>
  );
}
const AllCarts = ({ allCarts, receipts }) => {
  return allCarts.map((singleCart, index) => {
    return (
      <SingleBuy
        key={index}
        singleCart={singleCart}
        receipt={receipts[index]}
      />
    );
  });
};

const SingleBuy = ({ singleCart, receipt }) => {
  const { total, created } = receipt;
  const purchaseTime = new Date(created.seconds * 1000).toLocaleString();

  return (
    <div className="single-buy">
      {singleCart.map((item, index) => {
        return <SingleItem key={index} item={item} />;
      })}
      <div className="purchase-time">
        <strong>Purchase at:</strong>
        {purchaseTime}
      </div>
      <h4>Total: {total}$</h4>
    </div>
  );
};

const SingleItem = ({ item }) => {
  const { title, image, price, quantity } = item;
  return (
    <div className="single-item">
      <h4>{title}</h4>
      <div className="img-and-price">
        <div className="img-wrapper">
          <img src={image} alt="\#" />
        </div>
        <strong className="price">{price}$</strong>
      </div>
      <h4 className="quantity">Quantity: {quantity}</h4>
    </div>
  );
};
