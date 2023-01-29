import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

import AddNewModal from "../AddNewModal/AddNewModal";
import UpdateModal from "../UpdateModal/UpdateModal";
import "./DataTable.css";

const DataTable = () => {
  // const [dataTable, setDataTable] = useState([]);
  const [addModal, setAddModal] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(0);
  const pages = Math.ceil(count / 10);
  // const navigation = useNavigation();

  const { data: tableData = [], refetch } = useQuery({
    queryKey: ["tableData", page],
    queryFn: async () => {
      const res = await fetch(
        `https://power-hack-server-chi.vercel.app/billing-list?page=${page}`
      );
      const data = await res.json();
      setCount(data.count);
      // setDataTable(data.data);

      return data;
    },
  });
  // console.log(tableData);

  const handleUpdate = (id, name, email, phone, paidAmount) => {
    const update = {
      billingDate: new Date(),
      name,
      email,
      phone,
      paidAmount,
    };
    fetch(`https://power-hack-server-chi.vercel.app/update-billing/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(update),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  const handleUpdateModal = (data) => {
    const name = data.name;
    const email = data.email;
    const phone = data.phone;
    const paidAmount = data.paidAmount;
    handleUpdate(name, email, phone, paidAmount);
  };

  const handleDelete = (id) => {
    const proceed = window.confirm(
      "Are you sure, you want to delete the Bill?"
    );
    if (proceed) {
      fetch(`https://power-hack-server-chi.vercel.app/delete-billing/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.deletedCount > 0) {
            toast.success("Item Deleted Successfully");
            refetch();
          }
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <div>
      {addModal && (
        <AddNewModal
          refetch={refetch}
          addModal={addModal}
          setAddModal={setAddModal}
        ></AddNewModal>
      )}

      {addModal && (
        <UpdateModal
          refetch={refetch}
          addModal={addModal}
          setAddModal={setAddModal}
          handleUpdateModal={handleUpdateModal}
        ></UpdateModal>
      )}
      <div>
        <table className="table sm:w-full table-zebra">
          <thead>
            <tr>
              <th></th>
              <th>Billing ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Paid Amount</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {tableData?.data?.map((data, idx) => (
              <tr key={data._id}>
                <th>{idx + 1}</th>
                <td>{data._id}</td>
                <td>{data.name}</td>
                <td>{data.email}</td>
                <td>{data.paidAmount}</td>
                <td>
                  {/* <button
                    onClick={() => handleEdit(data._id)}
                    className="btn btn-sm"
                  >
                    Edit
                  </button> */}
                  <label
                    htmlFor="my-modal"
                    onClick={() => handleUpdate(data._id)}
                    className="btn btn-sm"
                  >
                    update
                  </label>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(data._id)}
                    className="btn btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination mt-5">
          {[...Array(pages).keys()].map((number) => (
            <button
              key={number}
              onClick={() => setPage(number)}
              className={page === number && "selected"}
            >
              {number}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
export default DataTable;
