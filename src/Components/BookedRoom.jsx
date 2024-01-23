/* eslint-disable react/prop-types */

import axios from "axios";
import { useState } from "react";
import Modal from "react-modal";
import { toast } from "react-toastify";

const customStyles = {
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
const BookedRoom = ({ Room, refetch }) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  const handleDelete = async (Room) => {
    const res = await axios.put("http://localhost:5000/roomDelete", Room);
    if (res.data.deletedCount) {
      refetch();
      closeModal();
      toast("Successfully Deleted!");
    }
  };
  return (
    <div>
      <div className="card lg:card-side bg-base-100 shadow-xl m-10 ">
        <div className="lg:w-1/2">
          <img src={Room?.photo} alt="Album" />
        </div>
        <div className="card-body lg:w-1/2">
          <h2 className="card-title">{Room?.room}</h2>
          <p>
            <span className="font-semibold">Address: </span>
            {Room?.address}
          </p>
          <p>{Room?.description}</p>
          <div className="flex w-full">
            <p className="w-1/2">
              <span className="font-semibold">Bedrooms: </span>
              {Room?.bedroom}
            </p>
            <p className="w-1/2">
              <span className="font-semibold">Bathrooms: </span>
              {Room?.bath}
            </p>
          </div>
          <p className="">
            <span className="font-semibold">Rent: </span>
            {Room?.rent}/= per month
          </p>
          <p className="">
            <span className="font-semibold">Host Phone: </span>
            {Room?.hostPhone}
          </p>
          <div className="card-actions justify-end">
            <button onClick={openModal} className="btn btn-warning">
              Delete
            </button>
          </div>
        </div>
      </div>
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
        <div className="text-center my-10">
          <p className="font-bold text-2xl">Are You Sure?</p>
          <p className="text-lg">You will not able to revert this later</p>
        </div>
        <div className="flex justify-evenly">
          <div>
            <button
              className="btn-warning btn-sm md:btn  bg-yellow-400"
              onClick={() => handleDelete(Room)}
            >
              Yes Delete!
            </button>
          </div>
          <div>
            <button className="btn-sm md:btn btn-outline" onClick={closeModal}>
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default BookedRoom;
