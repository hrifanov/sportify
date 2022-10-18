import { Heading, Paragraph } from 'src/shared/design-system';

import { MainSection } from '../atoms';
import { TopNavigation } from '../organisms';

export function PlaceholderTemplate({ title, children }) {
  return (
    <>
      <TopNavigation />
      <MainSection maxW="30rem">
        <Heading>{title}</Heading>

        {typeof children === 'undefined' ? (
          <Paragraph>This page is empty for now...</Paragraph>
        ) : (
          children
        )}
      </MainSection>
    </>
  );
}
