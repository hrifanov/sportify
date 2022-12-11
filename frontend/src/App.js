import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from 'src/shared/design-system';
import { ScrollToTop } from 'src/shared/navigation';
import { EnhancedApolloProvider } from 'src/utils/apollo';
import { Routes } from 'src/Routes';
import { theme } from 'src/theme';
import 'src/style/style.css';
import { ConfirmAlert } from 'src/shared/core/molecules/ConfirmAlert';

export function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <EnhancedApolloProvider>
          <ScrollToTop />
          <Routes />
          <ConfirmAlert />
        </EnhancedApolloProvider>
      </BrowserRouter>
    </ChakraProvider>
  );
}
