/* eslint-disable react/prop-types */
const Header = ({ text }) => {
  return (
    <div>
      <h1 className="  text-center mx-10 border-2 p-2 border-orange-400 my-5  text-xl md:text-5xl font-bold text-orange-400 rounded-xl">
        {text}
      </h1>
    </div>
  );
};

export default Header;
