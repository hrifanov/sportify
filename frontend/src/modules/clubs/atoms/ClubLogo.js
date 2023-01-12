import { beAsset } from 'src/utils/assets';
import { Image } from '@chakra-ui/react';

export const ClubLogo = ({ club, size = 80, ...props }) => {
  const onImgError = (e) => {
    e.target.src =
      'https://icons.iconarchive.com/icons/icons8/windows-8/512/Sports-Trophy-icon.png';
  };

  return (
    <Image
      {...props}
      src={
        beAsset(club.imageURL) ??
        'https://icons.iconarchive.com/icons/icons8/windows-8/512/Sports-Trophy-icon.png'
      }
      boxSize={`${size}px`}
      onError={onImgError}
    />
  );
};
