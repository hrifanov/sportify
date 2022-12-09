import { Box, Text, Show, Flex, Button, Spacer } from '@chakra-ui/react';
import { BsCheckLg, BsX, BsXLg } from 'react-icons/bs';
import { FaIcicles } from 'react-icons/fa';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { route } from 'src/Routes';
export default function RequestsComp({ applications, handleApplication }) {
  // console.log('applications: ' + JSON.stringify(applications[0]?.club?.id));
  const navigate = useNavigate();
  return (
    <Show above="md">
      <Box w="full" h="full" bg="brand.boxBackground" borderRadius="base" py={4} px={5}>
        <Text fontWeight="bold" color="brand.title" fontSize="xl">
          Join requests
        </Text>
        {applications.map((application) => {
          // console.log('application.state: ' + JSON.stringify(application.state));
          if (application?.state !== 'pending') {
            return null;
          }
          return (
            <>
              <Flex key={application.id} align={'center'} mt={2}>
                {/* <Text>{application.user.name}</Text> */}
                {/* <Button
                  onClick={() => {
                    navigate(route.clubDetail(applications[0]?.club?.id));
                  }}
                  variant="ghost"
                >
                  {application.user.name}
                </Button> */}
                <Link as={Text} to={route.clubDetail(applications[0]?.club?.id)}>
                  {application.user.name}
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
    </Show>
  );
}
