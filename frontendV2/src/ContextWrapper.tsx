import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PropsWithChildren } from 'react';
import { CookiesProvider } from 'react-cookie';
import { Toaster } from '@/components/ui/toaster';
import store from './app/store';

export default function ContextWrapper({ children }: PropsWithChildren) {
  return (
    <CookiesProvider defaultSetOptions={{ path: '/' }}>
      <Provider store={store}>
        <BrowserRouter>{children}</BrowserRouter>
        <Toaster />
      </Provider>
    </CookiesProvider>
  );
}
