import styled from "styled-components";

export const Button = styled.button`
  min-width: 100px;
  margin: 5px;
  padding: 5px 20px;
  color: #ffffff;
  background-color: #2EA44F;
  border: 1px solid lightgrey;
  border-radius: 5px;
  outline: none;
  cursor: pointer;
  
  &:hover {
    background-color: #2b8444;
  }
  &:active {
    background-color: #2EA44F;
  }
`