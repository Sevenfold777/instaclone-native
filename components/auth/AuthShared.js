import styled from "styled-components/native";

export const TextInput = styled.TextInput`
  background-color: #121212;
  padding: 15px 7px;
  border-radius: 4px;
  color: white;
  margin-bottom: ${(props) => (props.lastOne ? "15" : 8)}px;
`;
