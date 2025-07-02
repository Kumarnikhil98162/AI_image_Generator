// client/components/TextInput.jsx
import React from 'react';
import styled from 'styled-components';

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Label = styled.label`
  font-weight: 500;
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary || "#555"};
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  outline: none;
`;

const TextArea = styled.textarea`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  outline: none;
`;

const TextInput = ({ label, placeholder, name, rows, textArea, value, onChange }) => {
  return (
    <InputWrapper>
      <Label>{label}</Label>
      {textArea ? (
        <TextArea
          placeholder={placeholder}
          name={name}
          rows={rows || 4}
          value={value}
          onChange={onChange}
        />
      ) : (
        <Input
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
        />
      )}
    </InputWrapper>
  );
};

export default TextInput;