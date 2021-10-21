export const ADD_PRODUCT = "ADD_PRODUCT";
export const REMOVE_PRODUCT = "REMOVE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const REMOVE_WHOLE_CART = "REMOVE_WHOLE_CART";

const findItemInCart = (cart, item) => cart.findIndex((t) => t.id === item.id);

const addProductToCart = (state, action) => {
  const index = findItemInCart(state, action.payload);
  let updatedState = [...state];
  let updatedItem = state[index];
  if (index > -1) {
    updatedItem = { ...updatedItem, quantity: updatedItem.quantity * 1 + 1 };
    updatedState[index] = updatedItem;
  } else {
    updatedState.push(action.payload);
  }
  return updatedState;
};

const removeProductFromCart = (state, action) => {
  const index = findItemInCart(state, action.payload);
  let updatedState = [...state];
  updatedState.splice(index, 1);
  return updatedState;
};
const removeWholeCart = () => [];

const updateProductFromCart = (state, action) => {
  const index = findItemInCart(state, action.payload);
  let updatedState = [...state];
  let updatedItem = state[index];
  const newQuantity = action.payload.quantity;
  updatedItem = {
    ...updatedItem,
    quantity: newQuantity,
  };
  updatedState[index] = updatedItem;
  return updatedState;
};

export const shopReducer = (state, action) => {
  switch (action.type) {
    case ADD_PRODUCT:
      return addProductToCart(state, action);
    case REMOVE_PRODUCT:
      return removeProductFromCart(state, action);
    case REMOVE_WHOLE_CART:
      return removeWholeCart();
    case UPDATE_PRODUCT:
      return updateProductFromCart(state, action);
    default:
      return state;
  }
};
