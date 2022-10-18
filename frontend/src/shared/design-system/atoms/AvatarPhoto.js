import { Image } from '@chakra-ui/react';

export function AvatarPhoto({ src, alt, size = '16', ...restProps }) {
  return (
    <Image
      src={src}
      alt={alt}
      borderRadius="md"
      border="1px"
      borderColor="gray.100"
      w={size}
      h={size}
      maxW={size}
      {...restProps}
    />
  );
}
