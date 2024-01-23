import { useContext } from "react";
import { context } from "../Components/ContextProvider/Provider";
import axios from "axios";
import BookedRoom from "../Components/BookedRoom";
import { useQuery } from "@tanstack/react-query";

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
      <div></div>
      <div>
        {bookedRoom?.map((Room) => (
          <BookedRoom key={Room?._id} Room={Room} refetch={refetch} />
        ))}
      </div>
    </div>
  );
};

export default DashRent;
