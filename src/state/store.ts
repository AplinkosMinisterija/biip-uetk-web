import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { TableColumns } from "./columns/reducer";
import { Filters } from "./filters/reducer";
import { Mocks } from "./mocks/reducer";
import { UserReducer } from "./user/reducer";
import { Users } from "./users/reducer";

const persistConfig = {
  key: "speciesConfig",
  storage,
  whitelist: ["filters"]
};

const reducers = combineReducers({
  user: UserReducer.reducer,
  users: Users.reducer,
  filters: Filters.reducer,
  mocks: Mocks.reducer,
  columns: TableColumns.reducer
});

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({ serializableCheck: false })
  ]
});

let persistor = persistStore(store);

export default { store, persistor };

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
