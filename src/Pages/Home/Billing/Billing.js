import React, { useRef, useState } from "react";
import DataTable from "../DataTable/DataTable";

const Billing = () => {
  const searchRef = useRef();
  const [search, setSearch] = useState("");
  const handleSearch = () => {
    setSearch(searchRef.current.value);
  };
  return (
    <div>
      <div className="flex bg-base-300 justify-evenly my-2 py-3 items-center">
        <div className="">
          <h1 className="text-xl">Billings Data Table</h1>
        </div>
        <div className="form-control ">
          <div className="input-group">
            <input
              ref={searchRef}
              type="text"
              placeholder="Search…"
              className="input input-bordered"
            />
            <button onClick={handleSearch} className="btn btn-square">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </div>
        <div>
          {/* The button to open modal */}
          <label
            htmlFor="add-new-modal"
            className="btn btn-outline btn-primary"
          >
            Add New Bill
          </label>
        </div>
      </div>
      <div>{<DataTable search={search}></DataTable>}</div>
    </div>
  );
};

export default Billing;
