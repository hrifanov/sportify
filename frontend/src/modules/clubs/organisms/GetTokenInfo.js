import { INVITATION_DETAIL_QUERY } from 'src/modules/clubs/apollo/queries';
import { useQuery } from '@apollo/client';

export function GetTokenInfo(token) {
  const { data } = useQuery(INVITATION_DETAIL_QUERY, {
    variables: { token: token },
  });
  return {
    email: data?.invitationDetail.email,
    club: data?.invitationDetail.club,
    doesUserExist: data?.invitationDetail.doesUserExist,
  };
}
