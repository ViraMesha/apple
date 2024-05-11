import { navLists } from "../constants";
import { appleImg, bagImg, searchImg } from "../utils";

const Navbar = () => {
  return (
    <header className="w-full py-5 sm:px-10 px-5 flex justify-between items-center">
      <nav className="w-full flex screen-max-width">
        {/* LOGO */}
        <img src={appleImg} alt="Apple logo" width={14} height={18} />

        {/* NAV ITEMS */}
        <ul className="flex flex-1 justify-center max-sm:hidden">
          {navLists.map((nav, i) => (
            <li
              key={i}
              className="px-5 text-sm cursor-pointer text-gray hover:text-white transition-all"
            >
              {nav}
            </li>
          ))}
        </ul>

        {/* SEARCH AND BAG */}
        <div className="flex items-baseline gap-7 max-sm:justify-end max-sm:flex-1">
          <img
            src={searchImg}
            alt="search"
            width={18}
            height={18}
            className="cursor-pointer"
          />
          <img
            src={bagImg}
            alt="bag"
            width={18}
            height={18}
            className="cursor-pointer"
          />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
