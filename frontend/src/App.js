import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { ChakraProvider } from 'src/shared/design-system';
import { ScrollToTop } from 'src/shared/navigation';
import { EnhancedApolloProvider } from 'src/utils/apollo';
import { Routes } from 'src/Routes';
import { theme } from 'src/theme';
import { store, persistor } from './store/store';

export function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <EnhancedApolloProvider>
              <ScrollToTop />
              <Routes />
            </EnhancedApolloProvider>
          </PersistGate>
        </Provider>
      </BrowserRouter>
    </ChakraProvider>
  );
}
