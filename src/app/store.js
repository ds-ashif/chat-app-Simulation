import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from '../features/auth/authSlice';
import chatReducer from '../features/chat/chatSlice';
import preferencesReducer from '../features/preferences/preferencesSlice';

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['user', 'token', 'status'], // Make sure status is included
};

const chatPersistConfig = {
  key: 'chat',
  storage,
  whitelist: ['messages'],
};

const preferencesPersistConfig = {
  key: 'preferences',
  storage,
  whitelist: ['theme', 'accessibility'],
};

export const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authReducer),
    chat: persistReducer(chatPersistConfig, chatReducer),
    preferences: persistReducer(preferencesPersistConfig, preferencesReducer),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);