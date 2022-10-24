import { Heading, Paragraph } from 'src/shared/design-system';
import { MainSection } from '../../core/atoms/MainSection';

export function PlaceholderTemplate({ title, children }) {
  return (
    <MainSection maxW="30rem">
      <Heading>{title}</Heading>

      {typeof children === 'undefined' ? (
        <Paragraph>This page is empty for now...</Paragraph>
      ) : (
        children
      )}
    </MainSection>
  );
}
