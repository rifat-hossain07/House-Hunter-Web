/* eslint-disable react/prop-types */
import axios from "axios";
import { useContext, useState } from "react";
import Modal from "react-modal";
import { Link, useNavigate } from "react-router-dom";
import { context } from "./ContextProvider/Provider";
import { toast } from "react-toastify";

const customStyles = {
  content: {
    content: "center",
    height: "70%",
    width: "90%",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const Rooms = ({ Room }) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const { user } = useContext(context);
  const navigate = useNavigate();
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  const handleBook = async (Room) => {
    if (!user) {
      navigate("/login");
      toast("Please Login First!");
      return;
    }
    const checkForRoom = await axios.get(
      `https://hunterbackend.vercel.app/booked?email=${user?.email}`
    );
    if (checkForRoom?.data?.length >= 2) {
      {
        user?.role === "House Owner"
          ? navigate("/dash-own")
          : navigate("/dash-rent");
      }
      toast("Your Booking Limit is over");
      return;
    }
    const bookedRoom = {
      email: user?.email,
      name: user?.name,
      phone: user?.phone,
      room: Room?.name,
      address: Room?.address,
      rent: Room?.rentPerMonth,
      size: Room?.size,
      bedroom: Room?.bedrooms,
      bath: Room?.bathrooms,
      hostPhone: Room?.phoneNumber,
      photo: Room?.photo,
      description: Room?.description,
    };
    const res = await axios.put(
      `https://hunterbackend.vercel.app/book/${Room?._id}`,
      bookedRoom
    );
    if (res.data.modifiedCount) {
      {
        user?.role === "House Owner"
          ? navigate("/dash-own")
          : navigate("/dash-rent");
      }
      toast("Successfully booked room!");
    }
  };
  return (
    <div>
      <Link onClick={openModal} className="card  bg-slate-100 shadow-xl">
        <figure>
          <img src={Room?.photo} alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title font-semibold">{Room?.name}</h2>
          <p>
            <span className="font-semibold">Address: </span>
            {Room?.address}
          </p>
          <div className="flex flex-wrap">
            <p>
              <span className="font-semibold">Size: </span>
              {Room?.roomSize} sqfts
            </p>
            <p>
              <span className="font-semibold">Rent: </span>
              {Room?.rentPerMonth}/=
            </p>
          </div>
        </div>
      </Link>
      <Modal
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Room Modal"
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
        <div className="card md:card-side ">
          <figure>
            <img src={Room?.photo} alt="Movie" />
          </figure>
          <div className="md:card-body">
            <h2 className="card-title">{Room?.name}</h2>
            <p>{Room?.description}</p>
            <p>
              <span className="font-semibold">Address: </span>
              {Room?.address}
            </p>
            <div className="flex w-full">
              <p className="w-1/2">
                <span className="font-semibold">Size: </span>
                {Room?.roomSize} sqfts
              </p>
              <p className="w-1/2">
                <span className="font-semibold">Date: </span>
                {Room?.availabilityDate}
              </p>
            </div>
            <div className="flex w-full">
              <p className="w-1/2">
                <span className="font-semibold">Bedrooms: </span>
                {Room?.bedrooms}
              </p>
              <p className="w-1/2">
                <span className="font-semibold">Bathrooms: </span>
                {Room?.bathrooms}
              </p>
            </div>
            <div className="md:flex w-full">
              <p className="md:w-1/2">
                <span className="font-semibold">Phone: </span>
                {Room?.phoneNumber}
              </p>
              <p className="md:w-1/2">
                <span className="font-semibold">Rent: </span>
                {Room?.rentPerMonth}/=
              </p>
            </div>
            <div className="card-actions justify-end">
              {Room?.status === "available" ? (
                <button
                  onClick={() => handleBook(Room)}
                  className="btn bg-orange-300 border-none"
                >
                  Book Now
                </button>
              ) : (
                <div className="text-red-400">Booked!</div>
              )}
            </div>
          </div>
        </div>
        {/* <div className="w-1/2">{Room?.description}</div> */}
      </Modal>
    </div>
  );
};

export default Rooms;
