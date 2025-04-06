import React from "react";

export default function SubHeader({ copy }) {
  return (
    <h1 class="text-xl md:text-2xl mb-4 font-semibold">
        {copy}
      </h1>
  );
}
