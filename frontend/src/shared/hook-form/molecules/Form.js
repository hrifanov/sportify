import { FormProvider, useForm } from 'react-hook-form';

export function Form({ children, onSubmit, resetOnSubmit = false, ...rest }) {
  const methods = useForm(rest);
  const innerOnSubmit = methods.handleSubmit((data) => {
    onSubmit(data);

    console.log({ data, resetOnSubmit });

    if (resetOnSubmit) {
      methods.reset();
    }
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={innerOnSubmit} methods={methods}>
        {children}
      </form>
    </FormProvider>
  );
}
