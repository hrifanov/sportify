import { Button, Flex, Stack } from 'src/shared/design-system';
import { Text } from '@chakra-ui/react';
import { Form, FormField, yup, yupResolver } from 'src/shared/hook-form';

const schema = yup.object().shape({
  email: yup.string().required().email().label('email'),
});

export function AddPlayerForm({
  isCompleted,
  setIsCompleted,
  onSubmit,
  isLoading,
  emailFromInvitation,
}) {
  const initialValues = {
    email: '',
  };

  return (
    <>
      {isCompleted && (
        <>
          <Flex mt={3} mb={2} direction="row" align="center">
            <Text>
              E-mail with the invitation has been sent to '
              <b>
                <i>{emailFromInvitation}</i>
              </b>
              '.
            </Text>
            <Button ml={4} variant={'primary'} onClick={() => setIsCompleted(false)}>
              Invite another player
            </Button>
          </Flex>
        </>
      )}
      {!isCompleted && (
        <Stack w={['250px', '300px', '350px']}>
          <Form onSubmit={onSubmit} defaultValues={initialValues} resolver={yupResolver(schema)}>
            <Stack direction="row" spacing="3">
              <FormField
                id="email"
                name="email"
                label="Invite a player"
                placeholder="Email of the player"
                autoFocus="autofocus"
                autoComplete="on"
                autoCorrect="off"
                autoCapitalize="off"
                pr={0}
                mr={0}
              />
              <Flex pt={4}>
                <Button
                  size="md"
                  type="submit"
                  isLoading={isLoading}
                  variant="primary"
                  w={['100%']}
                  mt="4"
                >
                  Invite
                </Button>
              </Flex>
            </Stack>
          </Form>
        </Stack>
      )}
    </>
  );
}
