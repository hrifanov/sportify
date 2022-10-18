import { useController } from 'react-hook-form';

import { Field } from 'src/shared/design-system';

export function FormField({ name, ...props }) {
  const controller = useController({ name });
  const error = controller?.fieldState?.error?.message;

  return <Field error={error} {...props} {...controller.field} />;
}
