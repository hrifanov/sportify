import { Heading, ReloadButton } from 'src/shared/design-system';
import { MainSection, TopNavigation } from 'src/shared/navigation';

import { QuackForm } from '../molecules';
import { QuackList } from '../organisms';

export function HomeTemplate({
  data,
  loading,
  error,
  refetchQuacks,
  quackFormState,
  currentUser,
}) {
  return (
    <>
      <TopNavigation />
      <MainSection maxW="30rem">
        <Heading pb="2">Home</Heading>

        {currentUser && <QuackForm {...quackFormState} />}

        {data && (
          <ReloadButton
            isLoading={loading}
            onClick={() => refetchQuacks()}
            float="right"
          />
        )}

        <QuackList
          quacks={data && data.quacks}
          isLoading={loading}
          error={error}
          refetch={refetchQuacks}
        />
      </MainSection>
    </>
  );
}
