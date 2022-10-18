import { Global } from '@emotion/react';

import { useToken } from '../hooks';

export function BodyBackground({ bg }) {
  const [bodyBackground] = useToken('colors', [bg]);

  return (
    <Global
      styles={{
        body: { background: bodyBackground },
      }}
    />
  );
}
