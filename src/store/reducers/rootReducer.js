import { combineReducers } from "redux";
import userReducer from "../reducers/userReducer";
import cartreducer from "../reducers/cartReducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import bookReducer from "./bookReducer";
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart", "user"],
};
const rootReducer = combineReducers({
  user: userReducer,
  cart: cartreducer,
  books: bookReducer,
});
export default persistReducer(persistConfig, rootReducer);
