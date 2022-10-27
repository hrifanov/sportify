import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from 'src/shared/design-system';
import { ScrollToTop } from 'src/shared/navigation';
import { EnhancedApolloProvider } from 'src/utils/apollo';
import { Routes } from 'src/Routes';
import { theme } from 'src/theme';

export function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <EnhancedApolloProvider>
          <ScrollToTop />
          <Routes />
        </EnhancedApolloProvider>
      </BrowserRouter>
    </ChakraProvider>
  );
}
