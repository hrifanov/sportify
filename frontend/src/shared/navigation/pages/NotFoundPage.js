import { Paragraph } from 'src/shared/design-system';

import { route } from 'src/Routes';

import { RouterLink } from '../atoms';
import { PlaceholderTemplate } from '../templates';

export function NotFoundPage() {
  return (
    <PlaceholderTemplate title="Error 404">
      <Paragraph>
        Page not found, please return to{' '}
        <RouterLink to={route.home()}>Home</RouterLink>.
      </Paragraph>
    </PlaceholderTemplate>
  );
}
