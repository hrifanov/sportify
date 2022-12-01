import { FormField } from 'src/shared/hook-form';

export const TimeInput = ({ name }) => {
  return (
    <FormField
      name={name}
      label={'Time'}
      type={'time'}
      step={1}
      bg={'brand.boxBackground'}
      color={'white'}
      borderColor={'white'}
      border={'1px'}
      sx={{ colorScheme: 'dark' }}
    />
  );
};
