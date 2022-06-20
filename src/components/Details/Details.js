import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import DetailsCard from "./DetailsCard";

const Details = ({ isModal, char, setIsModal }) => {
  const ref = useRef();

  function handleClickOutside(event) {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsModal(false);
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <Wrapper isModal={isModal}>
      <DetailsCard char={char} isModal={isModal} ref={ref} />
    </Wrapper>
  );
};

export default Details;

const Wrapper = styled.div`
  display: flex;
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.2);
  /* -webkit-backdrop-filter: blur(20px) saturate(100%); */
  backdrop-filter: blur(20px) saturate(100%);
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  z-index: 10;
  padding-top: 0px;
  padding-right: 20px;

  opacity: ${(props) => (props.isModal ? 1 : 0)};
  visibility: ${(props) => (props.isModal ? "visible" : "hidden")};
  /* animation: 2s ease 0s 1 normal forwards running bDTdTe; */
  transition: all 0.3s ease-in-out;
`;
