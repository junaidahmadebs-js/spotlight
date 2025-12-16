
"use client";

import { Provider } from 'react-redux';
import { store } from '../redux/store';
import ThemeInitializer from '@/components/molecules/ThemeInitializer';


interface ReduxProviderProps {
  children: React.ReactNode;
}

export function ReduxProvider({ children }: ReduxProviderProps) {
  return (
    <Provider store={store}>
      <ThemeInitializer /> 
      {children}
    </Provider>
  );
}