import axios from "axios";
import { useState } from "react";
import Rooms from "../Components/Rooms";
import { useLoaderData } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const Home = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const Total = useLoaderData();
  const itemPerPage = 10;
  const { data: rooms, refetch } = useQuery({
    queryKey: [currentPage, "AllRoom"],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:5000/rooms?page=${currentPage}&size=${itemPerPage}`
      );
      return res.data;
    },
  });
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
      {/* Search */}
      <div className="my-5 flex justify-center mx-16">
        <input
          type="text"
          name="name"
          placeholder="Search by name"
          className="input input-bordered input-warning w-full "
        />
        <input type="submit" value="Search" className="btn btn-outline mx-2" />
      </div>
      {/* Rooms */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 mx-12 gap-5">
        {rooms?.map((Room) => (
          <Rooms key={Room?._id} Room={Room} refetch={refetch} />
        ))}
      </div>
      {/* Pagination */}
      <div className="flex justify-center my-5 gap-2">
        <button className="btn" onClick={handlePrevPage}>
          Prev
        </button>
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
        <button className="btn " onClick={handleNextPage}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
