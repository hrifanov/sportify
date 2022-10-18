import { NavLink as ReactRouterNavLink } from 'react-router-dom';

import { NavLink } from 'src/shared/design-system';

export function RouterNavLink(props) {
  return <NavLink {...props} as={ReactRouterNavLink} />;
}
