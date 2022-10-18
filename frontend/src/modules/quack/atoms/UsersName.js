import { chakra } from 'src/shared/design-system';

export function UsersName({ name, ...restProps }) {
  return (
    <chakra.span color="blackAlpha.800" fontWeight="bold" {...restProps}>
      {name}
    </chakra.span>
  );
}
