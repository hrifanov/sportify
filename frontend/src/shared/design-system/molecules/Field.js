import { FormControl, FormErrorMessage, FormLabel, Input, Select } from '../atoms';
import { forwardRef } from '../system';

export const Field = forwardRef(function Field({ id, label, error, InputType, ...props }, ref) {
  InputType = InputType ? InputType : Input;
  return (
    <FormControl id={id} isInvalid={!!error}>
      <FormLabel>{label}</FormLabel>
      <InputType ref={ref} {...props} />
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
});
