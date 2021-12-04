import Link from "next/link";

const Header = () => {
  const logout = () => {
    fetch("/api/logout", {
      method: "POST",
    });
  };

  return (
    <nav className="flex justify-between bg-gray-900 text-white w-screen">
      <div className="px-5 xl:px-12 py-6 flex w-full items-center">
        <a className="text-3xl font-bold font-heading" href="#"></a>
        <ul className="flex px-4 font-semibold font-heading space-x-12">
          <li>
            <Link href="/students">
              <a className="hover:text-gray-200 mr-4" href="#">
                Students
              </a>
            </Link>
            <Link href="/teachers">
              <a className="hover:text-gray-200 mr-4" href="#">
                Teachers
              </a>
            </Link>
            <Link href="/programs">
              <a className="hover:text-gray-200 mr-4" href="#">
                Programs
              </a>
            </Link>
            <Link href="/tasks">
              <a className="hover:text-gray-200 mr-4" href="#">
                Tasks
              </a>
            </Link>
          </li>
        </ul>
      </div>
      <span
        onClick={logout}
        className="cursor-pointer navbar-burger self-center mr-12 xl:hidden"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="#ffffff"
        >
          <path d="M10 9.408l2.963 2.592-2.963 2.592v-1.592h-8v-2h8v-1.592zm-2-4.408v4h-8v6h8v4l8-7-8-7zm6-3c-1.787 0-3.46.474-4.911 1.295l.228.2 1.396 1.221c1.004-.456 2.114-.716 3.287-.716 4.411 0 8 3.589 8 8s-3.589 8-8 8c-1.173 0-2.283-.26-3.288-.715l-1.396 1.221-.228.2c1.452.82 3.125 1.294 4.912 1.294 5.522 0 10-4.477 10-10s-4.478-10-10-10z" />
        </svg>
      </span>
    </nav>
  );
};

export default Header;
