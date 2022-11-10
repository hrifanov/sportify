import { Heading, Input, IconButton, HStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { FiEdit, FiCheck } from 'react-icons/fi';

export default function EditableHeading({ name, onChange, onClick }) {
  const [isEditing, setIsEditing] = useState(false);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      setIsEditing(false);
    }
  };

  const handleClick = () => {
    setIsEditing(true);
  };

  return (
    <>
      {isEditing ? (
        <HStack justifyContent="space-between">
          <Input
            autoFocus
            value={name}
            onChange={onChange}
            onKeyPress={handleKeyPress}
            type="text"
          />
          <IconButton
            bg="brand.title"
            aria-label="Save column name"
            size="md"
            icon={<FiCheck />}
            onClick={() => setIsEditing(false)}
          />
        </HStack>
      ) : (
        <HStack justifyContent="space-between">
          <Heading size="md" align="middle" mb={4}>
            {name}
          </Heading>
          <IconButton
            bg="brand.title"
            aria-label="Edit column name"
            size="md"
            icon={<FiEdit />}
            onClick={() => setIsEditing(true)}
          />
        </HStack>
      )}
    </>
  );
}
