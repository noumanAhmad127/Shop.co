import e from "cors";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBox = () => {
  const [keyword, setKeyword] = useState("");

  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate("/");
    }
  };
  return (
    <form onSubmit={submitHandler} className="flex flex-row">
      <input
        type="text"
        placeholder="Enter Keyword"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="w-64 px-2 py-3 rounded-md border-[1px] border-black"
      ></input>
      <button
        type="submit"
        className="px-3 py-4 text-black  border-[1px] border-black rounded-lg hover:text-white hover:bg-black"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBox;
