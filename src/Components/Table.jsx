/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import { context } from "./ContextProvider/Provider";
import axios from "axios";
import { toast } from "react-toastify";
const Table = ({ room, index, refetch }) => {
  const { user } = useContext(context);

  const [modalIsOpen, setIsOpen] = useState(false);
  const [modal2IsOpen, setIsOpen2] = useState(false);
  const { register, handleSubmit } = useForm();
  const customStyles = {
    content: {
      background: "#FBD38D",
      content: "center",
      height: "90%",
      width: "90%",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  const customStyles2 = {
    content: {
      content: "center",
      height: "40%",
      width: "50%",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  function openModal2() {
    setIsOpen2(true);
  }
  function closeModal2() {
    setIsOpen2(false);
  }
  const handleUpdateHouse = async (data) => {
    const name = data.name;
    const phoneNumber = data.phoneNumber;
    const photo = data.photo;
    const description = data.description;
    const availabilityDate = data.availabilityDate;
    const address = data.address;
    const rentPerMonth = data.rentPerMonth;
    const city = data.city;
    const bathrooms = data.bathrooms;
    const bedrooms = data.bedrooms;
    const roomSize = data.roomSize;
    const email = user?.email;
    const house = {
      id: room?._id,
      name,
      phoneNumber,
      photo,
      description,
      availabilityDate,
      address,
      rentPerMonth,
      city,
      bathrooms,
      bedrooms,
      roomSize,
      email,
    };
    const res = await axios.put(
      `https://hunterbackend.vercel.app/updateRoom`,
      house
    );
    if (res.data) {
      refetch();
      toast(`Updated successfully !`);
      setIsOpen(false);
    }
  };
  const handleDelete = async () => {
    const res = await axios.put(
      `https://hunterbackend.vercel.app/ownDelete/${room?._id}`
    );
    if (res.data.deletedCount) {
      refetch();
      toast("Deleted Successfully !");
      setIsOpen2(false);
    }
  };
  return (
    <tr key={room?._id}>
      <td className="border border-y-black">{index + 1}</td>
      <td className="border border-y-black">{room?.name}</td>
      <td className="border border-y-black">{room?.address}</td>
      <td className="border border-y-black">{room?.bedrooms}</td>
      <td className="border border-y-black">{room?.bathrooms}</td>
      <td className="border border-y-black">{room?.roomSize}</td>
      <td className="border border-y-black">{room?.rentPerMonth}</td>
      <td className="border border-y-black">{room?.phoneNumber}</td>
      <td className="border border-y-black">{room?.availabilityDate}</td>
      <td className="border border-y-black">
        <button
          onClick={openModal}
          className="btn btn-sm bg-orange-300 border-none"
        >
          Edit
        </button>
      </td>
      <td className="border border-y-black">
        <div onClick={openModal2} className=" btn btn-circle btn-sm btn-error">
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
      </td>
      {/* Delete Confirm Modal */}
      <Modal
        isOpen={modal2IsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal2}
        style={customStyles2}
        s
        contentLabel="Room Modal"
      >
        <div className="card-actions justify-end">
          <div onClick={closeModal2} className=" btn btn-circle btn-outline">
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>
        <div className="text-center my-5">
          <p className="font-bold text-2xl">Are You Sure?</p>
          <p className="text-lg">You will not able to revert this later</p>
        </div>
        <div className="flex justify-evenly">
          <div>
            <button
              className="btn btn-sm  bg-orange-300 border-none"
              onClick={handleDelete}
            >
              Yes Delete!
            </button>
          </div>
          <div>
            <button className="btn btn-sm btn-outline" onClick={closeModal2}>
              Cancel
            </button>
          </div>
        </div>
      </Modal>
      {/* Update Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="add house Modal"
      >
        <div className="card-actions justify-end">
          <div onClick={closeModal} className=" btn btn-circle btn-outline">
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>
        <div>
          <form onSubmit={handleSubmit(handleUpdateHouse)} className="">
            <div className="flex flex-col lg:flex-row  gap-2">
              {/* Name */}
              <div className="form-control  lg:w-1/3">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  defaultValue={room?.name}
                  type="text"
                  placeholder="Name Here..."
                  className="input input-bordered"
                  required
                  {...register("name")}
                />
              </div>
              {/* Phone */}
              <div className="form-control lg:w-1/3">
                <label className="label">
                  <span className="label-text">Phone</span>
                </label>
                <input
                  type="text"
                  defaultValue={room?.phoneNumber}
                  placeholder="Number Here..."
                  className="input input-bordered"
                  required
                  {...register("phoneNumber")}
                />
              </div>
              {/* Photo */}
              <div className="form-control  lg:w-1/3">
                <label className="label">
                  <span className="label-text">Photo</span>
                </label>
                <input
                  type="text"
                  defaultValue={room?.photo}
                  placeholder="Photo Link "
                  className="input input-bordered"
                  {...register("photo")}
                />
              </div>
            </div>
            {/* Description */}
            <div className="form-control  ">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea
                type="text"
                defaultValue={room?.description}
                placeholder="Description"
                className="textarea textarea-bordered md:textarea-lg w-full "
                {...register("description")}
              />
            </div>
            <div className="flex flex-col md:flex-row lg:gap-8 justify-between">
              {/* Availability */}
              <div className="form-control  md:w-1/3">
                <label className="label">
                  <span className="label-text">Available on</span>
                </label>
                <input
                  type="date"
                  defaultValue={room?.availabilityDate}
                  placeholder="available"
                  className="input input-bordered"
                  required
                  {...register("availabilityDate")}
                />
              </div>
              {/* address */}
              <div className="form-control md:w-1/3">
                <label className="label">
                  <span className="label-text">Address</span>
                </label>
                <input
                  type="text"
                  defaultValue={room?.address}
                  placeholder="Address Here..."
                  className="input input-bordered"
                  required
                  {...register("address")}
                />
              </div>
              {/* Rent */}
              <div className="form-control md:w-1/3">
                <label className="label">
                  <span className="label-text">Rent per month</span>
                </label>
                <input
                  type="number"
                  defaultValue={room?.rentPerMonth}
                  placeholder="Rent "
                  className="input input-bordered"
                  required
                  {...register("rentPerMonth")}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4  gap-5">
              {/* City */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">City</span>
                </label>
                <input
                  type="text"
                  defaultValue={room?.city}
                  placeholder="City Here..."
                  className="input input-bordered"
                  required
                  {...register("city")}
                />
              </div>
              {/* Bedroom */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Bedrooms</span>
                </label>
                <input
                  type="number"
                  defaultValue={room?.bedrooms}
                  placeholder="Bedrooms "
                  className="input input-bordered"
                  {...register("bedrooms")}
                />
              </div>
              {/* Bathrooms */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Bathrooms</span>
                </label>
                <input
                  type="number"
                  defaultValue={room?.bathrooms}
                  placeholder="Bathrooms "
                  className="input input-bordered"
                  {...register("bathrooms")}
                />
              </div>
              {/* size */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Size in sqft</span>
                </label>
                <input
                  type="text"
                  defaultValue={room?.roomSize}
                  placeholder="Size "
                  className="input input-bordered"
                  {...register("roomSize")}
                />
              </div>
            </div>

            <div className="form-control mt-12 text-center flex-row justify-evenly">
              <button className="btn bg-orange-300 border-none">Update</button>
              <button className="btn btn-outline" onClick={closeModal}>
                Close
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </tr>
  );
};

export default Table;
