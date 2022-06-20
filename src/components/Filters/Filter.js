import React, { useEffect } from "react";
import styled from "styled-components";

const Filter = ({ filter, handleChange, handleFilterClick, options }) => {
  return (
    <Wrapper>
      <Title>{filter.name}:</Title>
      {filter.options ? (
        filter.options.map((o) => (
          <Option
            key={o}
            active={options.some(
              (e) => e.name === filter.name.toLowerCase() && e.value === o
            )}
            onClick={() => handleFilterClick(o, filter.name)}
          >
            {o}
          </Option>
        ))
      ) : (
        <Input type="text" onChange={(e) => handleChange(e, filter.name)} />
      )}
    </Wrapper>
  );
};

export default Filter;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
`;

const Title = styled.div`
  width: 80px;
`;

const Option = styled.div`
  background: ${(props) => (props.active ? "#e2b714" : "#2c2e31")};
  color: ${(props) => (props.active ? "#2c2e31" : "inherit")};
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  :hover {
    background: #d1d0c5;
    color: #2c2e31;
  }
  transition: 0.15s ease-in-out;
`;

const Input = styled.input`
  border: none;
  outline: none;
  padding: 8px 16px;
  color: #d1d0c5;
  font-size: 18px;
  background: #2c2e31;
  border-radius: 8px;
`;
