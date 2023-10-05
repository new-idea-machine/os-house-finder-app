import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { PropsWithChildren } from 'react';
import store from './app/store';

export default function ContextWrapper({ children }: PropsWithChildren) {
  return (
    <Provider store={store}>
      <BrowserRouter>{children}</BrowserRouter>
    </Provider>
  );
}
