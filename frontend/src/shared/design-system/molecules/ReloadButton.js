import { SyncIcon } from '../icons';

import { Icon, TransparentButton } from '../atoms';

export function ReloadButton({ isLoading, ...restProps }) {
  return (
    <TransparentButton bg="gray.100" {...restProps}>
      <Icon as={SyncIcon} isSpinning={isLoading} mr="2" fontSize="xs" />
      Reload
    </TransparentButton>
  );
}
