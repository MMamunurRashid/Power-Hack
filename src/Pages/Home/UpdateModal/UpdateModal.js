import React from "react";
import { useForm } from "react-hook-form";

const UpdateModal = ({ handleUpdateModal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div>
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold">
              For Update Item, give below information
            </h3>
            <div className="modal-action">
              <label htmlFor="my-modal" className="btn btn-sm btn-circle">
                ✕
              </label>
            </div>
          </div>
          <form onSubmit={handleSubmit(handleUpdateModal)}>
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

export default UpdateModal;
