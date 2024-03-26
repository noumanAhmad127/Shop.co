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
        placeholder="Search for product"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="w-64 px-2 py-1 rounded-[62px] border-[1px] bg-[#F0F0F0] text-black/40 xl:w-full xl:h-[48px] xl:px-8"
      ></input>
      <button type="submit" className="">
        <i className="fa-solid fa-magnifying-glass w-[24px] h-[24px]"></i>
      </button>
    </form>
  );
};

export default SearchBox;
