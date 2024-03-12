import React from "react";

const Rating = ({ value }) => {
  return (
    <div>
      <span>
        <i
          className={
            value >= 1
              ? "fa-solid fa-star fa-sm"
              : value >= 0.5
              ? "fa-solid fa-star-half-stroke sm"
              : "fa-regular fa-star fa-sm"
          }
          style={{color: 'gold'}}
        ></i>
      </span>
      <span>
        <i
          className={
            value >= 2
              ? "fa-solid fa-star fa-sm"
              : value >= 1.5
              ? "fa-solid fa-star-half-stroke sm"
              : "fa-regular fa-star fa-sm"
          }
          style={{color: 'gold'}}
        ></i>
      </span>
      <span>
        <i
          className={
            value >= 3
              ? "fa-solid fa-star fa-sm"
              : value >= 2.5
              ? "fa-solid fa-star-half-stroke sm"
              : "fa-regular fa-star fa-sm"
          }
          style={{color: 'gold'}}
        ></i>
      </span>
      <span>
        <i
          className={
            value >= 4
              ? "fa-solid fa-star fa-sm"
              : value >= 3.5
              ? "fa-solid fa-star-half-stroke sm"
              : "fa-regular fa-star fa-sm"
          }
          style={{color: 'gold'}}
        ></i>
      </span>
      <span>
        <i
          className={
            value >= 5
              ? "fa-solid fa-star fa-sm"
              : value >= 4.5
              ? "fa-solid fa-star-half-stroke sm"
              : "fa-regular fa-star fa-sm"
          }
          style={{color: 'gold'}}
        ></i>
      </span>
    </div>
  );
};

export default Rating;
