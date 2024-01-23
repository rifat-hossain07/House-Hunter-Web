import { useContext } from "react";
import { context } from "../Components/ContextProvider/Provider";
import axios from "axios";
import BookedRoom from "../Components/BookedRoom";
import { useQuery } from "@tanstack/react-query";
import Header from "../Components/Header";

const DashRent = () => {
  const { user } = useContext(context);
  const { data: bookedRoom, refetch } = useQuery({
    queryKey: [user?.email, "BookedRoom"],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:5000/booked?email=${user?.email}`
      );
      return res.data;
    },
  });
  return (
    <div>
      <div>
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
      </div>
      <div>
        {bookedRoom?.length < 1 ? (
          <div className="flex justify-center text-2xl my-10 text-red-500 font-bold">
            <p>No Bookings yet</p>
          </div>
        ) : (
          bookedRoom?.map((Room) => (
            <BookedRoom key={Room?._id} Room={Room} refetch={refetch} />
          ))
        )}
      </div>
    </div>
  );
};

export default DashRent;
