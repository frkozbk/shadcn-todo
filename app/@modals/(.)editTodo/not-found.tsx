import Link from "next/link";
import React from "react";

const notFound = () => {
  return (
    <div className="w-[450px] mx-auto pt-16 space-y-6">
      <h2 className="text-lg font-semibold leading-none tracking-tight">
        Not Found
      </h2>
      <p>
        Could not find requested resource.Click{" "}
        <Link className="text-blue-800" href="/">
          here
        </Link>{" "}
        to see your all todos.
      </p>
    </div>
  );
};

export default notFound;
