import { Link as ReactRouterLink } from 'react-router-dom';

import { Link, forwardRef } from 'src/shared/design-system';

export const RouterLink = forwardRef(function RouterLink({ ...props }, ref) {
  return <Link as={ReactRouterLink} ref={ref} {...props} />;
});
