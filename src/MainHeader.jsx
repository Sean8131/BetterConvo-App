import React from "react";

export default function MainHeader({ title }) {
  return (
    <h1 class="font-display text-white text-left text-2xl md:text-3xl mb-6 font-semibold">
        {title}
      </h1>
  );
}
