import React from "react";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
const AddNewModal = ({ refetch, setAddModal, addModal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleAddNew = (data) => {
    const name = data.name;
    const email = data.email;
    const phone = data.phone;
    const paidAmount = data.paidAmount;

    const addNew = {
      billingDate: new Date(),
      name,
      email,
      phone,
      paidAmount,
    };
    fetch("http://localhost:5000/add-billing", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(addNew),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.message);
        if (data.acknowledged) {
          toast.success("Successfully Added");
          setAddModal(null);
          refetch();
        } else {
          toast.error("Did not added!! Something is wrong");
          setAddModal(null);
        }
      });
  };
  return (
    <div>
      <input type="checkbox" id="add-new-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <h3 className="text-lg font-bold">
            For Add New Item give below information
          </h3>
          <label
            htmlFor="add-new-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <form onSubmit={handleSubmit(handleAddNew)}>
            <div className="form-control w-full max-w-xs mb-3 mt-5">
              <input
                type="email"
                {...register("email", {
                  required: "Email Address is required",
                })}
                placeholder="Email Address"
                required
                className="input input-bordered w-full max-w-xs"
              />
              {errors.email && (
                <p className="text-red-600">{errors.email?.message}</p>
              )}
            </div>
            <div className="form-control w-full max-w-xs mb-3">
              <input
                type="text"
                {...register("name", {
                  required: "Name is required",
                })}
                placeholder="Full Name"
                className="input input-bordered w-full max-w-xs"
              />
              {errors.name && (
                <p className="text-red-600">{errors.name?.message}</p>
              )}
            </div>
            <div className="form-control w-full max-w-xs mb-3">
              <input
                type="tel"
                {...register("phone", {
                  required: "Phone Number is required",
                  minLength: {
                    value: 11,
                    message: "Phone Number must be 11 digit",
                  },
                  maxLength: {
                    value: 11,
                    message: "Phone Number must be 11 digit",
                  },
                  pattern: {
                    value: /(?=.*[0-9])/,
                    message: "Phone Number must be 11 digit",
                  },
                })}
                placeholder="Phone Number"
                className="input input-bordered w-full max-w-xs"
              />
              {errors.phone && (
                <p className="text-red-600">{errors.phone?.message}</p>
              )}
            </div>
            <div className="form-control w-full max-w-xs mb-3">
              <input
                type="text"
                {...register("paidAmount", {
                  required: "Paid Amount is required",
                  pattern: {
                    value: /(?=.*[0-9])/,
                    message: "Paid Amount must be integer number",
                  },
                })}
                placeholder="Paid Amount"
                className="input input-bordered w-full max-w-xs"
              />
              {errors.paidAmount && (
                <p className="text-red-600">{errors.paidAmount?.message}</p>
              )}
            </div>
            <input
              className="btn btn-accent w-full"
              value="Submit"
              type="submit"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNewModal;
