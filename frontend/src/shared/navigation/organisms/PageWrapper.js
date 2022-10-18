import { MainSection } from '../atoms';
import { TopNavigation } from './TopNavigation';

export function PageWrapper({ children, maxW = '30rem', ...restProps }) {
  return (
    <>
      <TopNavigation />
      <MainSection maxW={maxW} {...restProps}>
        {children}
      </MainSection>
    </>
  );
}
