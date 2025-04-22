import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './app/store';
import { Provider } from 'react-redux';
import Chat from './components/Chat/Chat';
import Login from './features/auth/Login';
import ThemeToggle from './components/ThemeToggle';
import NetworkStatus from './components/NetworkStatus';
import './App.css';

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
};

const App = () => {
  const [isReady, setIsReady] = useState(false);
  const isAuthenticated = useSelector(state => !!state.auth.user);
  const theme = useSelector(state => state.preferences.theme);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  // Wait for state to be rehydrated
  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 500);
    return () => clearTimeout(timer);
  }, []);

  if (!isReady) return <div className={`app ${theme}`}>Loading...</div>;

  return (
    <div className={`app ${theme}`}>
      {/* Theme toggle at top-right */}
      <ThemeToggle />
      
      {/* Network status at bottom-left */}
      <NetworkStatus />
      
      {/* Main content */}
      {isAuthenticated ? <Chat /> : <Login />}
      
      {/* ErrorNotification is now handled within Chat component */}
    </div>
  );
};

export default AppWrapper;