import React from 'react';
import style from './About.module.css';

const About = () => {
    return (
        <div className={style.container}>
            <div className={style.textContainer}>
                <h2>Over ons</h2>
                <p>
                    Bij Elektronica-Aid geloven we in het transformeren van de
                    manier waarop mensen elektronica kopen en gebruiken. Onze
                    passie voor technologie drijft ons om een plek te creëren
                    waar klanten hoogwaardige elektronica kunnen vinden die niet
                    alleen innovatief is, maar ook betaalbaar en betrouwbaar.
                </p>
                <p>
                    Ons verhaal begon met een simpel idee: elektronica
                    toegankelijk maken voor iedereen. Of je nu een
                    doorgewinterde tech-liefhebber bent of net begint met het
                    verkennen van de mogelijkheden van moderne gadgets, we
                    streven ernaar om producten aan te bieden die voldoen aan
                    een breed scala van behoeften en interesses.
                </p>
                <p>
                    Bij Elektronica-Aid gaat het niet alleen om de producten die
                    we verkopen, maar ook om de ervaring die we onze klanten
                    bieden. We streven naar uitmuntendheid in klantenservice en
                    streven er altijd naar om een naadloze en plezierige
                    winkelervaring te bieden.
                </p>
                <p>
                    We zijn trots op ons deskundige team, bestaande uit
                    gepassioneerde liefhebbers van technologie die graag hun
                    kennis en expertise delen om je te helpen het perfecte
                    product te vinden. Of je nu op zoek bent naar de nieuwste
                    smartphones, smart home-apparaten, of accessoires om je
                    tech-setup te verbeteren, we staan altijd klaar om je te
                    helpen bij elke stap van je elektronica-reis.
                </p>
                <p>
                    Bedankt dat je voor Elektronica-Aid hebt gekozen. We kijken
                    ernaar uit om je te helpen ontdekken en genieten van de
                    eindeloze mogelijkheden van moderne technologie.
                </p>
            </div>
            <img src="\logo.jpeg" alt="logo"></img>
        </div>
    );
};

export default About;