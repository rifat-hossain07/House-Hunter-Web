import axios from "axios";
import { useEffect, useState } from "react";
import Rooms from "../Components/Rooms";
import { useLoaderData } from "react-router-dom";

const Home = () => {
  const [rooms, setRooms] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const Total = useLoaderData();
  const itemPerPage = 10;
  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/rooms?page=${currentPage}&size=${itemPerPage}`
      )
      .then((res) => {
        setRooms(res.data);
      });
  }, [currentPage]);
  const numberOfPages = Math.ceil(Total.count / 10);
  const pages = [...Array(numberOfPages).keys()];
  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };
  return (
    <div>
      {/* header */}
      <div></div>
      {/* Rooms */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 mx-12 gap-5">
        {rooms?.map((Room) => (
          <Rooms key={Room?._id} Room={Room} />
        ))}
      </div>
      {/* Pagination */}
      <div className="flex justify-center mb-5">
        <button onClick={handlePrevPage}>Prev</button>
        {pages.map((page) => (
          <button
            onClick={() => setCurrentPage(page)}
            className={
              currentPage === page
                ? "bg-red-400 btn btn-outline"
                : "btn btn-outline"
            }
            key={page}
          >
            {page + 1}
          </button>
        ))}
        <button onClick={handleNextPage}>Next</button>
      </div>
    </div>
  );
};

export default Home;
