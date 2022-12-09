import { Box, Text, Show, Flex, Button, Spacer } from '@chakra-ui/react';
import { BsCheckLg, BsXLg } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { route } from 'src/Routes';
export default function RequestsComp({ applications, handleApplication }) {
  return (
    <Show above="md" h="full">
      <Box w="full" h="full" bg="brand.boxBackground" borderRadius="base" py={4} px={5}>
        <Box>
          <Text fontWeight="bold" color="brand.title" fontSize="xl">
            Join requests
          </Text>
        </Box>
        <Box h="100%" overflowY={'scroll'} overflowX={'hidden'}>
          {applications.map((application) => {
            if (application?.state !== 'pending') {
              return null;
            }
            return (
              <>
                <Flex key={application.id} align={'center'} mt={2}>
                  <Link to={route.clubDetail(applications[0]?.club?.id)}>
                    <Text
                      maxW="125px"
                      sx={{
                        '& > span': {
                          minW: 0,
                        },
                      }}
                    >
                      {application.user.name}
                    </Text>
                  </Link>
                  <Spacer />
                  <Button
                    onClick={() => handleApplication(application.id, 'accepted')}
                    p={0}
                    variant={'ghost'}
                  >
                    <BsCheckLg />
                  </Button>
                  <Button
                    onClick={() => handleApplication(application.id, 'declined')}
                    p={0}
                    variant={'ghost'}
                    mr={0}
                  >
                    <BsXLg />
                  </Button>
                </Flex>
              </>
            );
          })}
        </Box>
      </Box>
    </Show>
  );
}
