import { useState } from "react";

function Color({ id, r, g, b, borrarColor }) {
  return (
    <>
      <li
        onClick={() => {
          borrarColor(id);
        }}
        style={{ backgroundColor: `rgb(${r},${g},${b})` }}
      >
        {r},{g},{b},
      </li>
    </>
  );
}

export default Color;
