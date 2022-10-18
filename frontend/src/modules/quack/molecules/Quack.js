import { AvatarPhoto, Box, Stack } from 'src/shared/design-system';
import { RouterLink } from 'src/shared/navigation';

import { formatDate } from 'src/utils/date';
import { route } from 'src/Routes';

import { UsersName, UsersUserName } from '../atoms';

export function Quack({ quack }) {
  const {
    user: { name, userName, profileImageUrl },
    text,
    createdAt,
  } = quack;

  const linkToUser = route.userDetail(userName);

  return (
    <Stack
      as="article"
      direction="row"
      spacing="4"
      width="100%"
      pb="2"
      mt="2"
      borderBottom="1px"
      borderColor="gray.200"
    >
      <Box width="16">
        <RouterLink to={linkToUser}>
          <AvatarPhoto size="16" src={profileImageUrl} alt={name} />
        </RouterLink>
      </Box>
      <Stack spacing="0">
        <Box>
          <RouterLink to={linkToUser} color="inherit">
            <UsersName name={name} /> <UsersUserName userName={userName} />
          </RouterLink>
          {' - '}
          <Box as="span" fontSize="sm" color="gray.500">
            {formatDate(createdAt)}
          </Box>
        </Box>
        <Box wordBreak="break-word" whiteSpace="pre-line">
          {text}
        </Box>
      </Stack>
    </Stack>
  );
}
