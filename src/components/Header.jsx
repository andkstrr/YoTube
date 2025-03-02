import { PiLetterCircleHFill } from "react-icons/pi";
import Search from "./Search";
import { ImYoutube2 } from "react-icons/im";
import { Link } from "react-router";
import ThemeButton from "./ThemeButton";

const Header = () => {
  return (
    <div className="w-full flex flex-row justify-between items-center">
      <div className="flex items-center">
        <Link to="/" className="cursor-pointer">
          <ImYoutube2 className="w-20 h-10 text-red-500" />
        </Link>
      </div>
      <Search />
      <div className="flex flex-row items-center space-x-3">
        <ThemeButton />
        <PiLetterCircleHFill className="w-10 h-10 text-blue-500 " />
      </div>
    </div>
  );
};

export default Header;
