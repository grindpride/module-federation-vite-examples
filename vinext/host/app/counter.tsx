"use client";

import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button
      style={{
        border: "2px solid rgb(246, 179, 82)",
        marginTop: "10px",
        backgroundColor: "rgb(246, 179, 82)",
        borderRadius: ".25rem",
        fontWeight: "700",
        padding: ".3rem .75rem",
        fontSize: "14px",
        color: "rgb(24, 24, 24)",
        cursor: "pointer",
      }}
      onClick={() => setCount((currentCount) => currentCount + 1)}
    >
      Host counter: {count}
    </button>
  );
}
