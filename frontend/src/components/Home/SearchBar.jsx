import React, { useState, useRef } from "react";
import { useThrottle } from "use-throttle";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const SearchBarWrapper = styled.div`
  border: 2px solid black;
  border-radius: 15px;
  padding: 10px;
  display: flex;
  position: relative;
  margin: auto;
  width: 250px;
  background: white
`;

const IconImage = styled.img`
  height: 20px;
  padding-right: 20px;
`;

const Input = styled.input`
  border: none;
  outline: none;
  flex: 1;
`;

const RightSide = styled.div`
  display: flex;
  flex: 0 0 auto;
  padding-right: 10px;
  curser: "pointer";
`;

const Spinner = styled.div`
  border: 2px solid #f3f3f3;
  border-top: 2px solid #3498db;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  margin-left: 10px;
  animation: spin 2s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const SuggestionBox = styled.div`
  display: ${({ len }) => (len !== 0 ? "flex" : "none")}
  flex-direction: column;
  flex: 0 0 auto;
  max-height: 200px;
  width: 250px;
  margin: auto;
  overflow: auto;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
  
  & * {
      flex: 1;
      padding: 5px;
      text-align: left;
      padding-left: 20px;
     
  }

  & :nth-child(${({ active }) => active}) {
      background: rgba(255, 99, 71, 0.8);
      color: white;
      font-weight: bold;
      cursor: pointer;
  }



`;

export default function SearchBar({
  loading,
  setLoading,
  suggestions,
  value,
  onChange,
}) {
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const scrollRef = useRef();
  const throttledText = useThrottle(q, 500);

  const bookData = useSelector((state) => state.app.bookData) || [];
  const history = useHistory();

  useEffect(
    (e) => {
      onChange(throttledText);
    },
    [throttledText, onChange]
  );
  const handleInputChange = (e) => {
    setQ(e.target.value);
    onChange(e.target.value);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const handleClear = () => {
    setQ("");
    onChange("");
    setLoading(false);
  };
  const handleClick = (name) => {
    console.log("name", name);
    const elem = bookData.find((item) => name === item.name);

    history.push(`/chapters/${elem._id}`);
  };

  const handleChangeActiveSuggestions = (e) => {
    console.log(e.keyCode);
    switch (e.keyCode) {
      case 40: {
        if (active >= suggestions.length) {
          setActive(1);
        } else {
          setActive((prev) => prev + 1);
        }
        if (active > 4) {
          scrollRef.current.scrollTop += 30;
        }
        break;
      }
      case 38: {
        if (active === 1) {
          setActive(1);
        } else if (active <= 0) {
          setActive(suggestions.length);
        } else {
          setActive((prev) => prev - 1);
        }

        break;
      }
      case 13: {
        alert(suggestions[active - 1]);
        break;
      }
      default: {
        return;
      }
    }
  };
  return (
    <>
      <SearchBarWrapper onKeyUp={handleChangeActiveSuggestions}>
        <IconImage
          src="https://www.flaticon.com/svg/static/icons/svg/38/38298.svg"
          alt="icon"
        />
        <Input value={q} onChange={handleInputChange} placeholder="Search book"/>
        <RightSide>
          {q && <div onClick={handleClear}>X</div>}
          {loading && <Spinner />}
        </RightSide>
      </SearchBarWrapper>
      {!loading && (
        <SuggestionBox
          ref={scrollRef}
          limit={5}
          len={suggestions.length}
          active={active}
        >
          {suggestions.map((item, index) => (
            <div
              key={item}
              onMouseOver={() => setActive(index + 1)}
              onClick={() => handleClick(item)}
            >
              {item}
            </div>
          ))}
        </SuggestionBox>
      )}
    </>
  );
}
