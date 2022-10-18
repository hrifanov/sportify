import { chakra } from 'src/shared/design-system';

export function UsersUserName({ userName, ...restProps }) {
  return (
    <chakra.span color="gray.500" fontSize="sm" {...restProps}>
      @{userName}
    </chakra.span>
  );
}
