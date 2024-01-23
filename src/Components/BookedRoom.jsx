/* eslint-disable react/prop-types */

const BookedRoom = ({ Room }) => {
  return (
    <div>
      <h1>{Room?.room}</h1>
    </div>
  );
};

export default BookedRoom;
