import React, { useContext, useReducer, useEffect, useState } from "react";
import axios from "axios";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  getAuth,
} from "firebase/auth";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

import {
  shopReducer,
  UPDATE_PRODUCT,
  ADD_PRODUCT,
  REMOVE_PRODUCT,
  REMOVE_WHOLE_CART,
} from "./reducer";
import { useHistory } from "react-router";

const Context = React.createContext();
export const useShopContext = () => useContext(Context);

export default function ShopContext({ children }) {
  const [cart, dispatch] = useReducer(shopReducer, []);
  const [product, setProduct] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const auth = getAuth();
  const history = useHistory();
  useEffect(() => {
    axios.get("https://fakestoreapi.com/products").then((result) => {
      const data = result.data;
      setProduct(data);
    });
  }, []);
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      removeWholeCart();
      setLoading(false);
    });
    return unsub;
  }, [auth]);

  const addProduct = (item) => {
    dispatch({ type: ADD_PRODUCT, payload: { ...item, quantity: 1 } });
  };
  const removeProduct = (item) => {
    dispatch({ type: REMOVE_PRODUCT, payload: item });
  };
  const removeWholeCart = () => {
    dispatch({ type: REMOVE_WHOLE_CART });
  };
  const updateProduct = (item) => {
    dispatch({ type: UPDATE_PRODUCT, payload: item });
  };

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        return alert("Registration successful!");
      })
      .catch(() => {
        return alert("Registration fail! Please try again");
      });
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        history.push("/shop");
        return alert("Login successful!");
      })
      .catch(() => {
        return alert("Your email or password is not correct!");
      });
  };
  const logOut = () => {
    return signOut(auth)
      .then(() => {
        return console.log("Sign out");
      })
      .catch((error) => {
        return console.log(error.message);
      });
  };

  const checkOut = async (checkOutInfo) => {
    try {
      const docRef = await addDoc(collection(db, "PurchaseInfo"), checkOutInfo);
      if (docRef.id) return alert("Your purchase was successful!");
    } catch (err) {
      console.error("Error adding document: ", err);
    }
  };

  const value = {
    cart,
    product,
    currentUser,
    addProduct,
    removeProduct,
    updateProduct,
    signup,
    login,
    logOut,
    checkOut,
  };
  return (
    <Context.Provider value={value}>{!loading && children}</Context.Provider>
  );
}
