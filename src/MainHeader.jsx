import React from "react";

export default function MainHeader({ title }) {
  return (
    <h1 class="text-3xl md:text-4xl font-bold p-4">
        {title}
      </h1>
  );
}
