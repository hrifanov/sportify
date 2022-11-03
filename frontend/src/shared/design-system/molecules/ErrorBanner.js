import { Alert, AlertDescription, AlertIcon, AlertTitle } from '../atoms';

export function ErrorBanner({ title, children, ...restProps }) {
  return (
    <Alert
      status="error"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      p={[3, 4]}
      borderRadius="md"
      color="gray.700"
      {...restProps}
    >
      <AlertIcon boxSize="6" mr="0" />
      <AlertTitle mt="2" fontWeight="semibold">
        {title || 'Unknown error'}
      </AlertTitle>
      {children && (
        <AlertDescription maxWidth="sm" mt="4">
          {children}
        </AlertDescription>
      )}
    </Alert>
  );
}
