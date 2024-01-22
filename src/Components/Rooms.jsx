/* eslint-disable react/prop-types */
import axios from "axios";
import { useState } from "react";
import Modal from "react-modal";
import { Link } from "react-router-dom";

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
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  const handleBook = async (Room) => {
    const res = await axios.put(`http://localhost:5000/book/${Room?._id}`);
    console.log(res);
  };
  return (
    <div>
      <Link onClick={openModal} className="card  bg-base-100 shadow-xl">
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
              {Room?.roomSize}
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
          <button onClick={closeModal}>close</button>
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
                {Room?.roomSize}
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
                  className="btn btn-warning"
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
