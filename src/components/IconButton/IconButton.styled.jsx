import styled from '@emotion/styled';

export const IconButtonStyled = styled.button`
  margin: 0;
  padding: 10px;
  border: none;
  font: inherit;
  cursor: pointer;
  background-color: transparent;

  display: inline-flex;
  align-items: center;
  justify-content: center;
  opacity: 0.6;
  transition: opacity 250ms cubic-bezier(0.4, 0, 0.2, 1);
  outline: none;

  :hover,
  :focus {
    opacity: 1;
  }
`;
