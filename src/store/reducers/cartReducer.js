import { toast } from "react-toastify";
const initState = {
  cart: [],
};
const cartReducer = (state = initState, action) => {
  switch (action.type) {
    case "ADD_TO_CART_SUCCESS":
      let isAdd = true;
      for (let index = 0; index < state.cart.length; index++) {
        if (state.cart[index].bookId === action.item.bookId) {
          isAdd = false;
          break;
        }
      }
      if (isAdd) {
        state.cart.push(action.item);
        toast.success(
          "Thêm thành công! Bạn có thể thay đổi số lượng ở giỏ hàng!"
        );
      } else {
        toast.error("Sản phẩm đã có trong giỏ hàng!");
      }
      return { ...state };
    case "DELETE_ITEM_SUCCESS":
      let cart = state.cart;
      cart = cart.filter((item) => item.bookId !== action.itemDelete.bookId);
      //console.log(state.cart);
      return { ...state, cart };
    case "DELETE_CART":
      state.cart = [];
      return { ...state };
    case "CHANGE_INPUT_ITEM_SUCCESS":
      let newAllItems = action.allItems;
      state.cart = newAllItems;
      return { ...state };
    default:
      return state;
  }
};
export default cartReducer;
