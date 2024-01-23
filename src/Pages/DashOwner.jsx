import { useContext, useState } from "react";
import { context } from "../Components/ContextProvider/Provider";
import Header from "../Components/Header";
import OwnedRoom from "../Components/OwnedRoom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import OwnBookedRoom from "../Components/OwnBookedRoom";
// import { toast } from "react-toastify";

const DashOwner = () => {
  const { user } = useContext(context);
  const [showBook, setShowBook] = useState(true);
  const [modalIsOpen, setIsOpen] = useState(false);
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
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  const { data: Rooms, refetch } = useQuery({
    queryKey: [user?.email, "RoomsTable"],
    queryFn: async () => {
      const res = await axios.get(
        `https://hunterbackend.vercel.app/ownRoom?email=${user?.email}`
      );
      return res.data;
    },
  });
  const handleAddHouse = async (data) => {
    const phoneNumber = data.phoneNumber;
    if (/^(?:\+88)?01[3-9]\d{8}$/.test(phoneNumber) === false) {
      toast("Only Bangladeshi numbers are allowed!");
      return;
    }
    const name = data.name;
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
    const room = {
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
    console.log(room);
    const res = await axios.post(
      `https://hunterbackend.vercel.app/roomsAdd`,
      room
    );
    if (res.data) {
      toast(`Room added successfully !`);
      refetch();
      setIsOpen(false);
    }
  };
  return (
    <div>
      {/* Header */}
      <div>
        <div
        // data-aos="fade-down" data-aos-duration="1000"
        >
          <Header text={`Welcome ${user?.name}`} />
        </div>
        <div
          // data-aos="flip-left"
          // data-aos-duration="1000"
          className="flex flex-col lg:flex-row-reverse items-center text-center lg:text-left justify-center mx-auto w-1/2 rounded-xl bg-orange-300 p-4 text-black shadow-lg "
        >
          <div className="mx-5">
            <img
              className="w-40 bg-slate-300 shadow-lg shadow-orange-200 mx-auto rounded-xl"
              src={user?.photo}
              alt="https://i.ibb.co/N1nwWNp/a.png"
            />
          </div>
          <div className="md:text-2xl">
            <h2>
              <span className=" font-medium  underline">Name: </span>
              {user?.name}
            </h2>
            <h2>
              <span className=" font-medium underline">E-mail: </span>
              {user?.email}
            </h2>
          </div>
        </div>
      </div>
      {/* Navbar */}
      <div className="flex justify-center items-center text-lg md:text-2xl">
        <p
          className={
            !showBook
              ? "link link-hover text-orange-400 underline"
              : "link link-hover"
          }
          onClick={() => setShowBook(false)}
        >
          Owned
        </p>
        <div className="divider lg:divider-horizontal">|</div>
        <p
          className={
            showBook
              ? "link link-hover text-orange-400 underline"
              : "link link-hover"
          }
          onClick={() => setShowBook(true)}
        >
          Bookings
        </p>
      </div>
      {/* Bookings and Owned */}
      <div>
        {showBook ? (
          <>
            <OwnBookedRoom />
          </>
        ) : (
          <>
            <div className="flex justify-center">
              <button
                onClick={openModal}
                className="btn btn-wide bg-orange-300 border-none text-lg "
              >
                Add New House
              </button>
            </div>
            <div className="py-5">
              <OwnedRoom Rooms={Rooms} refetch={refetch} />
            </div>
          </>
        )}
      </div>
      <Modal
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
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
          <form onSubmit={handleSubmit(handleAddHouse)} className="">
            <div className="flex flex-col lg:flex-row  gap-2">
              {/* Name */}
              <div className="form-control  lg:w-1/3">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
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
                <select
                  className="input input-bordered"
                  required
                  name="city"
                  id=""
                  {...register("city")}
                >
                  <option>Dhaka </option>
                  <option>Chattogram </option>
                  <option>Khulna </option>
                  <option>Rajshahi </option>
                  <option>Barishal </option>
                  <option>Sylhet </option>
                  <option>Rangpur </option>
                  <option>Mymensingh </option>
                </select>
              </div>
              {/* Bedroom */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Bedrooms</span>
                </label>
                <input
                  type="number"
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
                  type="number"
                  placeholder="Size "
                  className="input input-bordered"
                  {...register("roomSize")}
                />
              </div>
            </div>

            <div className="form-control mt-12 text-center flex-row justify-evenly">
              <button className="btn bg-orange-300 border-none">Add</button>
              <button className="btn btn-outline" onClick={closeModal}>
                Close
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default DashOwner;
