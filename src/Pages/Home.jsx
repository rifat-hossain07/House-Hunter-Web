import axios from "axios";
import { useEffect, useState } from "react";
import Rooms from "../Components/Rooms";
import { useLoaderData } from "react-router-dom";

const Home = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [rooms, setRooms] = useState([]);
  const Total = useLoaderData();
  const itemPerPage = 9;

  const numberOfPages = Math.ceil(Total.count / itemPerPage);
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
  const handleSearch = async (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const queryData = {
      city: form.get("city"),
      bedrooms: form.get("bedroom"),
      bathrooms: form.get("bathroom"),
      roomSize: form.get("size"),
      availability: form.get("available"),
      rentRange: form.get("rent"),
    };
    const res = await axios.get("http://localhost:5000/search", {
      params: queryData,
    });
    setRooms(res.data);
  };
  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/rooms?page=${currentPage}&size=${itemPerPage}`
      )
      .then((res) => {
        setRooms(res.data);
      });
  }, [currentPage]);
  return (
    <div>
      {/* Search */}
      <div>
        <form
          onSubmit={handleSearch}
          className="my-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mx-10 md:gap-5"
        >
          <div>
            {/* City */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Search by City</span>
              </label>
              <select className="input input-bordered" name="city">
                <option></option>
                <option>Dhaka </option>
                <option>Chattogram </option>
                <option>Khulna </option>
                <option>Rajshahi </option>
                <option>Barishal </option>
                <option>Sylhet </option>
                <option>Rangpur </option>
                <option>Mymensingh </option>
              </select>
            </div>
            {/* Bedroom */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Bedrooms</span>
              </label>
              <input
                type="number"
                placeholder="Bedrooms "
                className="input input-bordered"
                name="bedroom"
              />
            </div>
          </div>
          <div>
            {/* Bathrooms */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Bathrooms</span>
              </label>
              <input
                type="number"
                placeholder="Bathrooms "
                className="input input-bordered"
                name="bathroom"
              />
            </div>
            {/* size */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Size in sqft</span>
              </label>
              <input
                type="number"
                placeholder="Size "
                className="input input-bordered"
                name="size"
              />
            </div>
          </div>
          <div>
            {/* Availability */}
            <div className="form-control  ">
              <label className="label">
                <span className="label-text">Available on</span>
              </label>
              <input
                type="date"
                placeholder="available"
                className="input input-bordered"
                name="available"
              />
            </div>
            {/* rent range */}
            <div className="form-control ">
              <label className="label">
                <span className="label-text">Rent Range</span>
              </label>
              <input
                type="text"
                placeholder="Min-Max"
                className="input input-bordered"
                name="rent"
              />
            </div>
          </div>
          {/* submit */}
          <div className="form-control mt-5 md:mt-16 ">
            <input
              type="submit"
              value="Search"
              className="btn bg-orange-300 border-none mx-2 md:btn-wide "
            />
          </div>
        </form>
      </div>
      {/* Rooms */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 mx-12 gap-5">
        {rooms?.map((Room) => (
          <Rooms key={Room?._id} Room={Room} />
        ))}
      </div>
      {/* Pagination */}

      <div className="flex justify-center py-5 gap-2">
        <button className="btn" onClick={handlePrevPage}>
          Prev
        </button>
        {pages.map((page) => (
          <button
            onClick={() => setCurrentPage(page)}
            className={
              currentPage === page
                ? "bg-orange-400 btn btn-outline"
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
