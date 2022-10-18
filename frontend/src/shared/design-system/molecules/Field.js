import { FormControl, FormErrorMessage, FormLabel, Input } from '../atoms';
import { forwardRef } from '../system';

export const Field = forwardRef(function Field(
  { id, label, error, ...props },
  ref,
) {
  return (
    <FormControl id={id} isInvalid={!!error}>
      <FormLabel>{label}</FormLabel>
      <Input ref={ref} {...props} />
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
});
