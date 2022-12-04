import AppHeader from 'src/shared/core/organisms/AppHeader';
import { Box, Container, Flex, Heading, Icon } from '@chakra-ui/react';
import { Button, Stack, ErrorBanner } from 'src/shared/design-system';

import { Form, FormField, yup, yupResolver } from 'src/shared/hook-form';
import { RouterLink } from 'src/shared/navigation';
import { route } from 'src/Routes';
import { FiArrowLeftCircle } from 'react-icons/fi';
import Combobox from 'react-widgets/Combobox';
import { FileInput } from '../atoms/FileInput';

const schema = yup.object().shape({
  name: yup.string().required().label('Club name'),
  locality: yup.string().required().label('Locality'),
  sport: yup.string().required().label('Sport'),
});

export default function NewClubTemplate({ createClubRQ }) {
  // console.log('error: ' + createClubRQ?.error?.message);
  return (
    <Flex direction="column" h={{ md: '100vh' }}>
      <AppHeader title="New club" />
      {createClubRQ?.loading && <p>Loading</p>}

      <Container maxW="container.xl" h="full" minHeight={0} my={5}>
        <Flex gap={6} h="full" direction={'column'} align="center">
          {/* <Flex direction="column" w={{ md: '50%' }} gap={4}> */}
          <Flex direction="column" w={['100%', '', '', '50%']} gap={4}>
            <Box
              w="full"
              h="full"
              bg="brand.boxBackground"
              borderRadius="base"
              pt={4}
              pb={6}
              px={8}
            >
              <Flex
                as={RouterLink}
                mt={1}
                mb={3}
                to={route.dashboard()}
                color="brand.secondary"
                alignItems="center"
                gap={2}
              >
                <Icon as={FiArrowLeftCircle} />
                Back
              </Flex>
              <Heading size={'lg'} mb={3}>
                Describe your club:
              </Heading>
              {createClubRQ?.error?.message && (
                <ErrorBanner mb={2} title={createClubRQ?.error?.message} />
              )}
              <Form onSubmit={createClubRQ.onSubmit} resolver={yupResolver(schema)}>
                <>
                  <Stack spacing="3">
                    <FormField
                      id="name"
                      name="name"
                      label="Club name"
                      placeholder="My amazing club"
                      autoFocus="autofocus"
                      autoComplete="on"
                      autoCorrect="off"
                      autoCapitalize="off"
                    />
                    <FormField
                      id="locality"
                      name="locality"
                      label="Locality"
                      placeholder="Concrete spot on John's yard"
                      autoFocus="autofocus"
                      autoComplete="on"
                      autoCorrect="off"
                      autoCapitalize="off"
                    />

                    <FormField
                      id="sport"
                      name="sport"
                      label="Sport"
                      input={Combobox}
                      data={['Hockey', 'Floorball']}
                      placeholder={'Sport'}
                      input-height="36px"
                    />

                    <FormField
                      id="logo"
                      name="logo"
                      label="Logo"
                      input={FileInput}
                      input-height="36px"
                    ></FormField>

                    <Button size="lg" type="submit" variant="primary" w={['100%']} mt="4">
                      Create club
                    </Button>
                  </Stack>
                </>
              </Form>
            </Box>
          </Flex>
        </Flex>
      </Container>
    </Flex>
  );
}
