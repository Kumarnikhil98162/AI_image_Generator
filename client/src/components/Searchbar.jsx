import React from "react";
import { SearchOutlined } from "@mui/icons-material";
import styled from "styled-components";

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
`;

const Searchbar = ({search,setSearch}) => {
  return (
    <SearchBarContainer>
      <SearchOutlined />
      <input
        placeholder="Search with promt or name. . ."
        style={{
          border: "none",
          outline:"none",
          width:"100%",
          color: "inherit",
         fontSize: "16px",
          background: "transparent"
        }}
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
      />
    </SearchBarContainer>
  );
};

export default Searchbar;
