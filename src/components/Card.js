import React from "react";
import styled from "styled-components";
import { H2 } from "../layout/TextStyles";

function Card({ char }) {
  return (
    <Wrapper>
      <Info>
        <H2>{char.name}</H2>
        <Status status={char.status}>
          <span>{char.status}</span> - {char.species}
        </Status>
      </Info>
      <Img src={char.image} />
    </Wrapper>
  );
}

export default Card;

const Wrapper = styled.div`
  background-color: #646669;
  height: 180px;
  width: 340px;
  /* padding: 24px; */
  border-radius: 8px;
  display: grid;
  grid-template-columns: 160px auto;
  /* flex-direction: column; */

  overflow: hidden;
  cursor: pointer;

  :hover {
    H2 {
      color: #e2b714;
    }
  }
`;

const Info = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Img = styled.img`
  width: 180px;
  height: 180px;

  :hover {
    transform: scale(1.1);
  }
  transition: 0.2s ease-in-out;
`;

const Status = styled.div`
  font-size: 14px;
  span {
    color: ${(props) =>
      props.status === "Alive"
        ? "#4cff8f"
        : props.status === "unknown"
        ? "inherit"
        : "red"};
  }
`;
