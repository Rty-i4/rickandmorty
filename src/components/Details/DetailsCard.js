import React from "react";
import { forwardRef } from "react";
import styled from "styled-components";
import { H2 } from "../../layout/TextStyles";

const DetailsCard = forwardRef(({ char, isModal }, ref) => {
  return (
    <Wrapper isModal={isModal} ref={ref}>
      <Img src={char?.image} />
      <Info>
        <H2>{char?.name}</H2>
        <Status status={char?.status}>
          <span>{char?.status}</span> - {char?.species}
        </Status>
        <p>Origin: {char?.origin.name}</p>
        <p>Gender: {char?.gender}</p>
        <p>Location: {char?.location.name}</p>
        {char?.type !== "" && <p>Type: {char?.type}</p>}
      </Info>
    </Wrapper>
  );
});

export default DetailsCard;

const Wrapper = styled.div`
  background-color: #646669;
  padding: 24px;
  border-radius: 8px;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  margin: 20px;

  transform: ${(props) => (props.isModal ? "scale(1)" : "scale(0.8)")};

  transition: 0.2s ease-in-out;
`;

const Info = styled.div`
  display: flex;
  gap: 16px;
  flex-direction: column;
`;

const Img = styled.img`
  width: 180px;
  height: 180px;
  border-radius: 8px;
  transition: 0.2s ease-in-out;

  @media screen and (max-width: 500px) {
    margin: auto;
    width: 100%;
    height: 100%;
  }
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
