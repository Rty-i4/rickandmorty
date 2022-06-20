import React from "react";
import styled from "styled-components";
import Filter from "./Filter";

const Filters = ({ handleChange, handleFilterClick, options }) => {
  const FilterData = [
    { name: "Status", options: ["Alive", "Dead", "unknown"] },
    { name: "Gender", options: ["female", "male", "genderless", "unknown"] },
    { name: "Type", options: null },
    { name: "Species", options: null },
  ];
  return (
    <Wrapper>
      {FilterData.map((filter) => (
        <Filter
          key={filter.name}
          options={options}
          filter={filter}
          handleChange={handleChange}
          handleFilterClick={handleFilterClick}
        />
      ))}
    </Wrapper>
  );
};

export default Filters;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  gap: 16px;

  @media screen and (max-width: 800px) {
    grid-template-columns: auto;
    justify-content: center;
    margin: 24px 16px;
  }
`;
