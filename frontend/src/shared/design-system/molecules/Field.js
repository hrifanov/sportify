import { FormControl, FormErrorMessage, FormLabel, Input } from '../atoms';
import { forwardRef } from '../system';

export const Field = forwardRef(function Field(
  { id, label, labelDisplay, error, input, ...props },
  ref,
) {
  const InputComponent = input || Input;

  return (
    <FormControl id={id} isInvalid={!!error}>
      <FormLabel display={labelDisplay}>{label}</FormLabel>
      <InputComponent ref={ref} {...props} />
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
});
