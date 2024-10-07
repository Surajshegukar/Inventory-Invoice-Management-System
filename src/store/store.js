import {combineReducers, configureStore} from '@reduxjs/toolkit';
import productReducer from '../features/product/productReducer';
import customerReducer from '../features/customer/customerReducer';
import invoiceReducer from '../features/invoice/invoiceReducer';
import serviceReducer from '../features/service/serviceReducer';
import authReducer from '../features/auth/authReducer';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 
import { getDefaultMiddleware } from '@reduxjs/toolkit';
import sellerReducer from '../features/seller/sellerReducer';




const rootReducers = combineReducers({
    product: productReducer,
    customer: customerReducer,
    invoice: invoiceReducer,
    service: serviceReducer,
    auth: authReducer,
    seller: sellerReducer
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth']
};

const persistedReducer = persistReducer(persistConfig, rootReducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export default store;