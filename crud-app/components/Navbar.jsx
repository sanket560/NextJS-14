import Link from "next/link";
import React from "react";
import { Toaster } from "react-hot-toast";

const Navbar = () => {
  return (
    <>
      <Toaster />
      <header className='w-full md:w-[70%] mx-auto py-3 px-2'>
        <nav className='w-full flex justify-between items-center'>
          <Link href={"/"} className='font-bold text-2xl'>
            Crud App
          </Link>
          <ul className='flex gap-x-4 font-bold'>
            <li>
              <Link href={"/"}>Home</Link>
            </li>
            <li>
              <Link href={"/about"}>About</Link>
            </li>
            <li>
              <Link href={"/"}>Contact</Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
