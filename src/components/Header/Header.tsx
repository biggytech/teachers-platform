import Link from "next/link";

const Header: React.FC = () => {
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
                Студенты
              </a>
            </Link>
            <Link href="/teachers">
              <a className="hover:text-gray-200 mr-4" href="#">
                Инструкторы
              </a>
            </Link>
            <Link href="/programs">
              <a className="hover:text-gray-200 mr-4" href="#">
                Учебные программы
              </a>
            </Link>
          </li>
        </ul>
      </div>
      <Link href="/help" passHref>
        <span style={{ marginRight: 20 }} className="cursor-pointer">
          <Link href="/help">
            <a href="#">
              <svg
                width="24"
                height="70"
                viewBox="0 0 1000 1000"
                xmlns="http://www.w3.org/2000/svg"
                fill="#ffffff"
              >
                <path d="M 500 0C 224 0 0 224 0 500C 0 776 224 1000 500 1000C 776 1000 1000 776 1000 500C 1000 224 776 0 500 0C 500 0 500 0 500 0 M 501 191C 626 191 690 275 690 375C 690 475 639 483 595 513C 573 525 558 553 559 575C 559 591 554 602 541 601C 541 601 460 601 460 601C 446 601 436 581 436 570C 436 503 441 488 476 454C 512 421 566 408 567 373C 566 344 549 308 495 306C 463 303 445 314 411 361C 400 373 384 382 372 373C 372 373 318 333 318 333C 309 323 303 307 312 293C 362 218 401 191 501 191C 501 191 501 191 501 191M 500 625C 541 625 575 659 575 700C 576 742 540 776 500 775C 457 775 426 739 425 700C 425 659 459 625 500 625C 500 625 500 625 500 625" />
              </svg>
            </a>
          </Link>
        </span>
      </Link>
      <span
        onClick={logout}
        className="cursor-pointer navbar-burger self-center mr-12"
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
