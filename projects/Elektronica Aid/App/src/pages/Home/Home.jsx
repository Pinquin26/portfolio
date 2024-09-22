import React, { useEffect } from 'react';
import style from './Home.module.css';
import RandomProducts from '../../components/RandomProducts/RandomProducts';
import { useShop } from '../../context/ShopContext';
const Home = () => {


    return (
        <div className={style.homeContainer}>
            <div className={style.banner}>
                <div className={style.textContainer}>
                    <h1 className={style.h1}> Welkom bij Elektronica-AID </h1>
                    <p>
                        Bij Elektronica-Aid geloven we in het transformeren van
                        de manier waarop mensen elektronica kopen en gebruiken.
                        Onze passie voor technologie drijft ons om een plek te
                        creëren waar klanten hoogwaardige elektronica kunnen
                        vinden die niet alleen innovatief is, maar ook
                        betaalbaar en betrouwbaar. Ons verhaal begon met een
                        simpel idee...
                    </p>
                    <a href="/about">
                        <button className={style.button}>Lees verder</button>
                    </a>
                </div>
                <img alt="devices" className={style.banner_img} src="\devices.jpg"></img>
            </div>

            <div className={style.showProducts}>
                <RandomProducts/>
            </div>
        </div>
    );
};

export default Home;