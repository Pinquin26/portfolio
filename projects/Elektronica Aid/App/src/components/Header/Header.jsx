import React, { useState } from 'react';
import style from './Header.module.css';
import { useShop } from '../../context/ShopContext';
import headerImg from '/header.svg';

const Header = () => {
    const {authService, user} = useShop();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    const handleBackClick = () => {
        history.back(); // Ga terug naar de vorige pagina
    };

    return (
        <header
            className={style.header}
            style={{ backgroundImage: `url(${headerImg})` }}
        >
            <a href="/">
                <img alt="logo" className={style.logo} src="\logo.jpeg"></img>
            </a>
            <a onClick={handleBackClick} className={style.goBack}>
                &larr; terug
            </a>

            <div className={style.header_main}>
                <div>
                    <h1>
                        <a href="/">Elektronica-AID</a>
                    </h1>
                    
                        {user ? (
                            <p
                                onClick={() => authService.logout()}
                                className={style.logout}
                            >
                                Logout
                            </p>
                        ) : (
                            <a href="/login" className={style.login}>
                                Login
                            </a>
                        )}
                        <div className={style.burger_wrapper}>
                            <div
                                className={style.hamburger}
                                onClick={toggleMenu}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    width="24"
                                    height="24"
                                    fill="#000000"
                                >
                                    <path d="M3 6h18v2H3zm0 5h18v2H3zm0 5h18v2H3z" />
                                </svg>
                            </div>
                            {isMenuOpen && (
                                <ul className={style.burger_menu}>
                                    <li>
                                        <a href="/">Home</a>
                                    </li>
                                    <li>
                                        <a href="/webshop">Webshop</a>
                                    </li>
                                    <li>
                                        <a href="/contact">Contact</a>
                                    </li>
                                    <li>
                                        <a href="/about">Over ons</a>
                                    </li>
                                    {user && user.admin && (
                                        <li>
                                            <a href="/question-overview">
                                                Vragen
                                            </a>
                                        </li>
                                    )}
                                </ul>
                            )}
                        </div>
                        
                    
                </div>
                <nav>
                    <ul className={style.nav}>
                        <li>
                            <a href="/">Home</a>
                        </li>
                        <li>
                            <a href="/webshop">Webshop</a>
                        </li>
                        <li>
                            <a href="/contact">Contact</a>
                        </li>
                        <li>
                            <a href="/about">Over ons </a>
                        </li>
                        <>
                            {user && user.admin ? (
                                <li>
                                    <a href="/question-overview">Vragen</a>
                                </li>
                            ) : (
                                ""
                            )}
                        </>
                    </ul>

                    <div className={style.icon_wrapper}>
                        <a href="/shoppingcart">
                            <svg
                                width="30"
                                height="30"
                                viewBox="0 0 902 902"
                                xmlns="http://www.w3.org/2000/svg"
                                className={style.icon}
                            >
                                <g fill="#FFFFFF">
                                    <path d="M671.504,577.829l110.485-432.609H902.86v-68H729.174L703.128,179.2L0,178.697l74.753,399.129h596.751V577.829z M685.766,247.188l-67.077,262.64H131.199L81.928,246.756L685.766,247.188z" />
                                    <path
                                        d="M578.418,825.641c59.961,0,108.743-48.783,108.743-108.744s-48.782-108.742-108.743-108.742H168.717
                            c-59.961,0-108.744,48.781-108.744,108.742s48.782,108.744,108.744,108.744c59.962,0,108.743-48.783,108.743-108.744
                            c0-14.4-2.821-28.152-7.927-40.742h208.069c-5.107,12.59-7.928,26.342-7.928,40.742
                            C469.675,776.858,518.457,825.641,578.418,825.641z M209.46,716.897c0,22.467-18.277,40.744-40.743,40.744
                            c-22.466,0-40.744-18.277-40.744-40.744c0-22.465,18.277-40.742,40.744-40.742C191.183,676.155,209.46,694.432,209.46,716.897z
                            M619.162,716.897c0,22.467-18.277,40.744-40.743,40.744s-40.743-18.277-40.743-40.744c0-22.465,18.277-40.742,40.743-40.742
                            S619.162,694.432,619.162,716.897z"
                                    />
                                </g>
                            </svg>
                        </a>
                        <a href="/favorite">
                            <svg
                                width="30"
                                height="30"
                                viewBox="0 0 471.701 471.701"
                                xmlns="http://www.w3.org/2000/svg"
                                className={style.icon}
                            >
                                <g fill="#FFFFFF">
                                    <path
                                        d="M433.601,67.001c-24.7-24.7-57.4-38.2-92.3-38.2s-67.7,13.6-92.4,38.3l-12.9,12.9l-13.1-13.1
                                c-24.7-24.7-57.6-38.4-92.5-38.4c-34.8,0-67.6,13.6-92.2,38.2c-24.7,24.7-38.3,57.5-38.2,92.4c0,34.9,13.7,67.6,38.4,92.3
                                l187.8,187.8c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-3.9l188.2-187.5c24.7-24.7,38.3-57.5,38.3-92.4
                                C471.801,124.501,458.301,91.701,433.601,67.001z M414.401,232.701l-178.7,178l-178.3-178.3c-19.6-19.6-30.4-45.6-30.4-73.3
                                s10.7-53.7,30.3-73.2c19.5-19.5,45.5-30.3,73.1-30.3c27.7,0,53.8,10.8,73.4,30.4l22.6,22.6c5.3,5.3,13.8,5.3,19.1,0l22.4-22.4
                                c19.6-19.6,45.7-30.4,73.3-30.4c27.6,0,53.6,10.8,73.2,30.3c19.6,19.6,30.3,45.6,30.3,73.3
                                C444.801,187.101,434.001,213.101,414.401,232.701z"
                                    />
                                </g>
                            </svg>
                        </a>
                        <a href="/account">
                            <svg
                                width="30"
                                height="30"
                                viewBox="0 0 24 24"
                                fill="#FFFFFF"
                                xmlns="http://www.w3.org/2000/svg"
                                className={style.icon}
                            >
                                <circle cx="12" cy="7.25" r="5.73" />
                                <path d="M1.5,23.48l.37-2.05A10.3,10.3,0,0,1,12,13h0a10.3,10.3,0,0,1,10.13,8.45l.37,2.05" />
                            </svg>
                        </a>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;