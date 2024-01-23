import { useContext, useEffect, useState } from "react";
import { context } from "../Components/ContextProvider/Provider";
import axios from "axios";
import BookedRoom from "../Components/BookedRoom";

const DashRent = () => {
  const { user } = useContext(context);
  const [bookedRoom, setBookedRoom] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/booked?email=${user?.email}`)
      .then((res) => {
        setBookedRoom(res.data);
      });
  }, [user?.email]);
  return (
    <div>
      <div></div>
      <div>
        {bookedRoom.map((Room) => (
          <BookedRoom key={Room?._id} Room={Room} />
        ))}
      </div>
    </div>
  );
};

export default DashRent;
