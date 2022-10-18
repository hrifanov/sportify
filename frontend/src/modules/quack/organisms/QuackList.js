import { Button, ErrorBanner, Loading } from 'src/shared/design-system';

import { Quack } from '../molecules';

export function QuackList({ quacks, isLoading, error, refetch }) {
  return (
    <>
      {isLoading && !quacks && <Loading />}
      {error && (
        <ErrorBanner mt="4" title={error.message}>
          <Button colorScheme="red" onClick={() => refetch()}>
            Reload
          </Button>
        </ErrorBanner>
      )}
      {quacks && quacks.map((quack) => <Quack key={quack.id} quack={quack} />)}
    </>
  );
}
