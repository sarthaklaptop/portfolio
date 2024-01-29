import React, {useEffect, useState} from 'react';
import {Link } from "react-router-dom";

import {styles} from '../styles';
import { navLinks } from "../constants";
import { logo, menu, close } from '../assets';

const Navbar = () => {
  const [active, setActive] = useState();
  const [toggle, setToggle] = useState(false);

  return (
    <nav
    className={`${styles.paddingX} w-full items-center py-5 top-0 
    z-20 bg-primary`}
    >
      <div className='w-full max-w-7xl mx-auto flex justify-between 
      items-center'>

        <Link
        to='/'
        className='flex items-center gap-2'
        onClick={() => {
          setActive("");
          window.scrollTo(0, 0)
        }}
        >
          <img src={logo} alt='Logo'
          className='w-9 h-9 object-contain'/>
          <p className='text-white font-bold cursor-pointer
          text-[18px]'>
            Sarthak Patil</p>
        </Link>
        <ul className='list-none hidden sm:flex flex-row gap-10'>
          {navLinks.map((link)=>(
            <li
            key={link.id}
            className={`${
              active === link.title 
              ? "text-white"
              : "text-secondary"
            } hover:text-white text-[18px] first-letter:font-medium
            cursor-pointer`}
            onClick={() => setActive(link.title)}
            >
              <a href={`#${link.id}`}>{link.title}</a>
            </li>
          ))}
        </ul>

        <div className='sm:hidden flex flex-1 justify-end items-center'>
          <img src={toggle ? close : menu} alt="menu" 
          className='w-[28px] h-[28px] origin-center cursor-pointer'
          onClick={() => setToggle(!toggle)}/>

          <div className={`${!toggle ? "hidden" : "flex"} p-6 black-gradient
          absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10
          rounded-xl`}>

            <ul className='list-none flex justify-end items-stert flex-col gap-4'>
              {navLinks.map((link)=>(
                <li
                key={link.index}
                className={`${
                  active === link.title 
                  ? "text-white"
                  : "text-secondary"
                } font-poppins cursor-pointer font-medium
                text-[16px]`}
                onClick={() => {
                  setActive(link.title);
                  setToggle(!toggle)
                }}
                >
                  <a href={`#${link.id}`}>{link.title}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
} 

export default Navbar