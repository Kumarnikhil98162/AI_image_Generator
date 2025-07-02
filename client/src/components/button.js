// client/components/Button.js
import React from 'react';
import styled from 'styled-components';
import { CircularProgress } from '@mui/material';

const StyledButton = styled.button`
  padding: 10px 16px;
  background-color: ${({ disabled }) => (disabled ? '#aaa' : '#007bff')};
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  display: flex;
  align-items: center;
  gap: 8px;
  opacity: ${({ disabled }) => (disabled ? 0.7 : 1)};

  &:hover {
    background-color: ${({ disabled }) => (disabled ? '#aaa' : '#0056b3')};
  }
`;

const Button = ({ text, leftIcon, onClick, isLoading, isDisabled }) => {
  return (
    <StyledButton onClick={onClick} disabled={isDisabled || isLoading}>
      {isLoading ? (
        <CircularProgress style={{ color: "white", width: 20, height: 20 }} />
      ) : (
        <>
          {leftIcon}
          {text}
        </>
      )}
    </StyledButton>
  );
};

export default Button;
