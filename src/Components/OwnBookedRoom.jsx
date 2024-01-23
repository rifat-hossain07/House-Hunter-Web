import { useContext } from "react";
import BookedRoom from "./BookedRoom";
import { context } from "./ContextProvider/Provider";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const OwnBookedRoom = () => {
  const { user } = useContext(context);
  const { data: bookedRoom, refetch } = useQuery({
    queryKey: [user?.email, "BookedRoomOwn"],
    queryFn: async () => {
      const res = await axios.get(
        `https://hunterbackend.vercel.app/booked?email=${user?.email}`
      );
      return res.data;
    },
  });
  return (
    <div>
      {bookedRoom?.length < 1 ? (
        <div className="flex justify-center text-2xl my-10 text-red-500 font-bold">
          <p>No Bookings yet</p>
        </div>
      ) : (
        bookedRoom?.map((Room) => (
          <BookedRoom key={Room._id} Room={Room} refetch={refetch} />
        ))
      )}
    </div>
  );
};

export default OwnBookedRoom;
