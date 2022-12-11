import { FormField } from 'src/shared/hook-form';
import { HStack, NumberInput, NumberInputField, Text } from '@chakra-ui/react';
import { pad } from 'src/utils/date';

export const TimeInput = ({ name }) => {
  const TimeUnitsEnum = {
    HOURS: 'hours',
    MINUTES: 'minutes',
    SECONDS: 'seconds',
  };
  const innerOnChange = ({ onChange, unit, value, timeValue }) => {
    const splitTime = timeValue.split(':');
    const unitIndex = Object.values(TimeUnitsEnum).indexOf(unit);
    splitTime[unitIndex] = pad(value);
    onChange(splitTime.join(':'));
  };

  return (
    <FormField
      name={name}
      label={'Time'}
      type={'time'}
      step={1}
      bg={'brand.boxBackground'}
      color={'white'}
      borderColor={'white'}
      border={'1px'}
      sx={{ colorScheme: 'dark' }}
      input={({ onChange, value: timeValue }) => {
        const splitTime = timeValue.split(':');

        return (
          <HStack spacing={2}>
            <NumberInput
              value={parseInt(splitTime[0])}
              onChange={(valueAsString) =>
                innerOnChange({
                  onChange,
                  unit: TimeUnitsEnum.HOURS,
                  value: valueAsString,
                  timeValue,
                })
              }
              w={10}
              h={10}
              defaultValue={0}
              min={0}
              max={60}
            >
              <NumberInputField p={0} textAlign={'center'} />
            </NumberInput>
            <Text pr={2}>h</Text>
            <NumberInput
              value={parseInt(splitTime[1])}
              onChange={(valueAsString) =>
                innerOnChange({
                  onChange,
                  unit: TimeUnitsEnum.MINUTES,
                  value: valueAsString,
                  timeValue,
                })
              }
              w={10}
              h={10}
              defaultValue={0}
              min={0}
              max={60}
            >
              <NumberInputField p={0} textAlign={'center'} />
            </NumberInput>
            <Text pr={2}>m</Text>
            <NumberInput
              value={parseInt(splitTime[2])}
              onChange={(valueAsString) =>
                innerOnChange({
                  onChange,
                  unit: TimeUnitsEnum.SECONDS,
                  value: valueAsString,
                  timeValue,
                })
              }
              w={10}
              h={10}
              defaultValue={0}
              min={0}
              max={60}
            >
              <NumberInputField p={0} textAlign={'center'} />
            </NumberInput>
            <Text pr={2}>s</Text>
          </HStack>
        );
      }}
    />
  );
};
