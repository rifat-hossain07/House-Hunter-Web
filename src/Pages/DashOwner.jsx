import { useContext, useState } from "react";
import { context } from "../Components/ContextProvider/Provider";
import Header from "../Components/Header";
import BookedRoom from "../Components/BookedRoom";
import OwnedRoom from "../Components/OwnedRoom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const DashOwner = () => {
  const { user } = useContext(context);
  const { data: bookedRoom, refetch } = useQuery({
    queryKey: [user?.email, "BookedRoomOwn"],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:5000/booked?email=${user?.email}`
      );
      return res.data;
    },
  });
  const [showBook, setShowBook] = useState(true);
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
            {bookedRoom?.map((Room) => (
              <BookedRoom key={Room._id} Room={Room} refetch={refetch} />
            ))}
          </>
        ) : (
          <>
            <div className="flex justify-center">
              <button className="btn btn-wide btn-warning ">Add Room</button>
            </div>
            <OwnedRoom />
          </>
        )}
      </div>
    </div>
  );
};

export default DashOwner;
