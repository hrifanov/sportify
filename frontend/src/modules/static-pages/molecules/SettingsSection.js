import {
  Box,
  Button,
  Heading,
  Paragraph,
  Stack,
} from 'src/shared/design-system';

import { Form } from 'src/shared/hook-form';

export function SettingsSection({ formProps, title, description, children }) {
  return (
    <Form {...formProps}>
      <Heading>{title}</Heading>
      {description && <Paragraph>{description}</Paragraph>}
      <Stack p="8" bg="white">
        {children}
        <Box textAlign="right">
          <Button type="submit">Save</Button>
        </Box>
      </Stack>
    </Form>
  );
}
