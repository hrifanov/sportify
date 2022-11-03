import { FormProvider, useForm } from 'react-hook-form';

export function Form({ children, onSubmit, ...rest }) {
  const methods = useForm(rest);
  const localOnSubmit = (variables) => onSubmit({ variables, methods });
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(localOnSubmit)}>{children}</form>
    </FormProvider>
  );
}
