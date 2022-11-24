import { INVITATION_DETAIL_QUERY } from 'src/modules/clubs/apollo/queries';
import { useQuery } from '@apollo/client';

export function GetTokenInfo(token) {
  const { data } = useQuery(INVITATION_DETAIL_QUERY, {
    variables: { token: token },
  });
  // console.log('data?.invitationDetail.doesUserExist: ' + data?.invitationDetail.doesUserExist);
  return {
    email: data?.invitationDetail.email,
    clubName: data?.invitationDetail.clubName,
    doesUserExist: data?.invitationDetail.doesUserExist,
  };
}
