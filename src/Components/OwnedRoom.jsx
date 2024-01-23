import Table from "./Table";
/* eslint-disable react/prop-types */
const OwnedRoom = ({ Rooms, refetch }) => {
  return (
    <div className="overflow-auto h-[500px]  ">
      <table className="table table-pin-rows z-0 ">
        {/* head */}
        <thead className="divide-y divide-gray-200  text-black">
          <tr>
            <th className="border border-black">#</th>
            <th className="border border-black">Name</th>
            <th className="border border-black">Address</th>
            <th className="border border-black">Bedrooms</th>
            <th className="border border-black">Bathrooms</th>
            <th className="border border-black">Room Size (Sqft)</th>
            <th className="border border-black">Rent</th>
            <th className="border border-black">Phone</th>
            <th className="border border-black">Available</th>
            <th className="border border-black">Edit</th>
            <th className="border border-black">Delete</th>
          </tr>
        </thead>
        <tbody>
          {Rooms?.length < 1 ? (
            <tr className="mx-auto my-10 text-center">
              <td></td>
              <td className="text-red-500">No Owned Room Found !</td>
            </tr>
          ) : (
            Rooms?.map((room, index) => (
              <Table key={index} room={room} index={index} refetch={refetch} />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OwnedRoom;
