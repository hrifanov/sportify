import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from 'src/shared/design-system';
import { ScrollToTop } from 'src/shared/navigation';
import { EnhancedApolloProvider } from 'src/utils/apollo';
import { Routes } from 'src/Routes';
import { theme } from 'src/theme';
import 'src/style/style.css';
import { DevSupport } from '@react-buddy/ide-toolbox';
import { ComponentPreviews, useInitial } from 'src/dev';

export function App() {
  return (
    <DevSupport ComponentPreviews={ComponentPreviews} useInitial={useInitial()}>
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <EnhancedApolloProvider>
            <ScrollToTop />
            <Routes />
          </EnhancedApolloProvider>
        </BrowserRouter>
      </ChakraProvider>
    </DevSupport>
  );
}
