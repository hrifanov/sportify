import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  Spacer,
  Stack,
  Textarea,
} from 'src/shared/design-system';

export function QuackForm({
  error,
  loading,
  text,
  setText,
  onSubmit,
  maxLength = 250,
  ...restProps
}) {
  const length = !text ? 0 : text.length;
  const isLengthValid = length <= maxLength;

  return (
    <Box
      p="2"
      borderRadius="md"
      bg="gray.100"
      boxShadow="md"
      mb="4"
      {...restProps}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit && onSubmit({ text });
        }}
      >
        <FormControl isInvalid={!!error}>
          <Textarea
            bg="white"
            value={text}
            onChange={(e) => {
              setText && setText(e.target.value);
            }}
            name="comment"
            placeholder="Quack something..."
            disabled={loading}
          />
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="flex-end"
            pt="2"
          >
            <FormErrorMessage
              m="0"
              alignSelf="flex-start"
            >{`${error}`}</FormErrorMessage>
            <Spacer />
            <Box
              as="span"
              fontSize="sm"
              color={isLengthValid ? 'gray.500' : 'red.500'}
            >
              {length}/{maxLength}
            </Box>
            <Button
              type="submit"
              size="md"
              isLoading={loading}
              loadingText="Sending"
              colorScheme="green"
            >
              Quack
            </Button>
          </Stack>
        </FormControl>
      </form>
    </Box>
  );
}
