import styled from "styled-components";
import React, { useCallback, useEffect, useState, useRef } from "react";
import Card from "./components/Card";
import search from "./assets/search.svg";
import { useDebounce } from "./hooks/useDebounce";
import Filters from "./components/Filters/Filters";
import Details from "./components/Details/Details";
import ReactPaginate from "react-paginate";

function App() {
  const [chars, setChars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const [error, setError] = useState(null);
  const [isModal, setIsModal] = useState(false);
  const [selectedChar, setSelectedChar] = useState(null);
  const [options, setOptions] = useState([
    { name: "name", value: "" },
    { name: "status", value: "" },
    { name: "species", value: "" },
    { name: "type", value: "" },
    { name: "gender", value: "" },
    { name: "page", value: "1" },
  ]);
  const paginateRef = useRef();

  const url = new URL(`https://rickandmortyapi.com/api/character`);

  const fetchData = async () => {
    setLoading(true);

    const params = new URLSearchParams();
    options.forEach((e) => e.value.length && params.append(e.name, e.value));
    url.search = params;

    try {
      const res = await fetch(url);
      const response = await res.json();

      setData(response);
      setChars(response.results);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  const fetchDebounce = useDebounce(fetchData, 500);

  const handleChange = useCallback(async (e, category) => {
    const newOptions = options.map((o) =>
      o.name === category.toLocaleLowerCase()
        ? { ...o, value: e.target.value }
        : o.name === "page"
        ? { ...o, value: "1" }
        : o
    );
    paginateRef.current.handlePageChange(0);
    setOptions(newOptions);
  });

  const handleFilterClick = (value, category) => {
    const newOptions = options.map((o) => {
      if (o.name === "page") {
        return { ...o, value: "1" };
      } else if (o.name === category.toLowerCase()) {
        if (o.value === value) {
          return { ...o, value: "" };
        } else {
          return { ...o, value: value + "" };
        }
      } else {
        return o;
      }
    });
    paginateRef.current.handlePageChange(0);
    setOptions(newOptions);
  };

  const handlePageClick = (v) => {
    const newOptions = options.map((o) =>
      o.name === "page" ? { ...o, value: v + "" } : o
    );
    setOptions(newOptions);
  };

  useEffect(() => {
    fetchDebounce();
  }, [options]);

  return (
    <Wrapper>
      <InputWrapper>
        <img src={search} />
        <Input
          type="text"
          placeholder="search"
          value={options[0].value}
          onChange={(e) => handleChange(e, "name")}
        />
      </InputWrapper>
      <Filters
        handleChange={handleChange}
        handleFilterClick={handleFilterClick}
        options={options}
      />
      <ReactPaginate
        pageRangeDisplayed={1}
        marginPagesDisplayed={2}
        onPageChange={(e) => handlePageClick(e.selected + 1)}
        breakLabel=".."
        nextLabel=">"
        previousLabel="<"
        pageCount={data?.info?.pages}
        containerClassName={"pagination-container"}
        previousLinkClassName={"pagination-link"}
        nextLinkClassName={"pagination-link"}
        activeClassName={"pagination-link-active"}
        pageClassName={"pagination-buttons"}
        ref={paginateRef}
      />
      <Cards>
        {loading && <div>Loading data...</div>}
        {data.error && <div>{data.error}</div>}
        {error && <div>{error}Error</div>}
        {chars &&
          chars.map((c) => (
            <div
              key={c.id}
              onClick={() => {
                setIsModal(true);
                setSelectedChar(c);
              }}
            >
              <Card char={c} />
            </div>
          ))}
      </Cards>
      <Details isModal={isModal} char={selectedChar} setIsModal={setIsModal} />
    </Wrapper>
  );
}

export default App;

const Wrapper = styled.div`
  max-width: 1200px;
  margin: 100px auto;
  position: relative;
`;

const Cards = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  margin: auto;
  @media screen and (max-width: 800px) {
    justify-content: center;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  margin: 8px auto;
  align-items: center;
  img {
    height: 18px;
    width: 18px;
  }
  @media screen and (max-width: 800px) {
    margin: 16px;
  }
`;
const Input = styled.input`
  border: none;
  outline: none;
  padding: 8px 16px;
  color: #d1d0c5;
  font-size: 18px;
  background: #323437;
`;
