import { Link } from 'react-router-dom';
import style from './About.module.css';
const About = () => {   
    return (
        <div className={style.container}>
            <Link to="/" className={style.back}>
                <p>Return</p>
            </Link>
            <h2 className={style.title}>About Pokémon</h2>
            <p>
                Welcome to our Pokémon community! At Pokémon, it's all about
                adventure, friendship, and discovery. Whether you're a seasoned
                trainer who has been exploring Pokémon for years, or just
                starting out on your journey through the wondrous world of
                Pokémon, we're thrilled to welcome you here.
            </p>

            <h2>Our Mission</h2>
            <p>
                Our mission is to be a source of inspiration, knowledge, and
                entertainment for Pokémon fans around the world. We aim to
                create a community where Pokémon enthusiasts of all ages and
                backgrounds come together to share their passion for this iconic
                franchise.
            </p>

            <h2>What is Pokémon?</h2>
            <p>
                Pokémon, short for "Pocket Monsters," is a global phenomenon
                created by Satoshi Tajiri and Ken Sugimori in 1996. It
                encompasses an extensive universe of fictional creatures called
                Pokémon, which are caught and trained by individuals known as
                Pokémon trainers.
            </p>
            <p>
                At the heart of the Pokémon experience is the bond between
                trainers and their Pokémon. This bond goes beyond mere battle
                and competition; it's about mutual respect, love, and
                understanding between humans and Pokémon.
            </p>

            <h2>Our Community</h2>
            <p>
                Our Pokémon community is a place where fans gather to share
                their experiences, exchange tips, make friends, and celebrate
                their love for Pokémon. Whether you're interested in the video
                games, the animated series, the card games, collecting
                merchandise, or anything Pokémon-related, there's something for
                everyone in our community.
            </p>
            <p>
                We encourage openness, respect, and kindness in all our
                interactions. Regardless of your background, skill level, or
                interests, you're always welcome to be part of our Pokémon
                family.
            </p>

            <h2>Get in Touch</h2>
            <p>
                Have questions, suggestions, or just feel like chatting about
                Pokémon? Feel free to reach out to us! We're always ready to
                talk with like-minded fans and share our love for Pokémon.
            </p>

            <p>
                Thank you for visiting our Pokémon community. Let's embark on an
                adventure together and explore the world of Pokémon!
            </p>
        </div>
    );
}

export default About;