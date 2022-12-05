import { beAsset } from 'src/utils/assets';
import { Image } from '@chakra-ui/react';

export const ClubLogo = ({ club, size = 80, ...props }) => {
  return (
    <Image
      {...props}
      src={beAsset(club.imageURL) ?? 'https://via.placeholder.com/100'}
      boxSize={`${size}px`}
    />
  );
};
