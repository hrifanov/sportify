import { useForm, FormProvider } from 'react-hook-form';

export function Form({ children, onSubmit, ...rest }) {
  const methods = useForm(rest);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
}
