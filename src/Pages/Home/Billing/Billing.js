import React from "react";
import DataTable from "../DataTable/DataTable";

const Billing = () => {
  return (
    <div>
      <div className="flex bg-base-300 justify-evenly my-2 py-3 items-center">
        <div className="">
          <h1 className="text-xl">Billings Data Table</h1>
        </div>
        <div className="">
          <div className="form-control">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered"
            />
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
      <div>{<DataTable></DataTable>}</div>
    </div>
  );
};

export default Billing;
