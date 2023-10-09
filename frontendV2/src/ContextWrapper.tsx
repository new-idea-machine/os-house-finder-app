import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Toaster } from '@/components/ui/toaster';
import { PropsWithChildren } from 'react';
import store from './app/store';

export default function ContextWrapper({ children }: PropsWithChildren) {
  return (
    <Provider store={store}>
      <BrowserRouter>{children}</BrowserRouter>
      <Toaster />
    </Provider>
  );
}
