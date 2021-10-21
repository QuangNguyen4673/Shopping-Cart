import React, { useState } from "react";
import { useShopContext } from "../context/ShopContext";

export default function PaymentForm({ submitHandler, total }) {
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const { currentUser } = useShopContext();
  if (!currentUser)
    return (
      <div className="alert-info">Please login your account to purchase</div>
    );
  const userEmail = currentUser.email;
  return (
    <div className="payment-form">
      <h3>Billing Address</h3>
      <form
        onSubmit={(e) =>
          submitHandler(e, { fullName, userEmail, address, phoneNumber, total })
        }
      >
        <div>
          <h4>Full Name</h4>
          <input
            type="text"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div>
          <h4>Email</h4>
          <input type="text" readOnly value={userEmail} />
        </div>
        <div>
          <h4>Address</h4>
          <input
            type="text"
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div>
          <h4>Phone Number</h4>
          <input
            type="number"
            required
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <h4>Total: {total} $</h4>
        <button type="submit">Purchase</button>
      </form>
    </div>
  );
}
