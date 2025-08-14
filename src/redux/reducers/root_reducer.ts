import { combineReducers } from "@reduxjs/toolkit";
import CartReducer from './cart_reducer'
import SettingsReducer from './settings_reducer'

const rootReducer = combineReducers({
  cart: CartReducer,
  settings: SettingsReducer
});

export default rootReducer