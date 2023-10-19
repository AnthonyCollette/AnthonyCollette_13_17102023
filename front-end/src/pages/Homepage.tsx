import Nav from "../components/Nav";
import Features from '../components/Features';
import Footer from '../components/Footer';
import Hero from '../components/Hero';

const Homepage = () => {

    return (
        <>
            <Nav />
            <main>
                <Hero />
                <Features />
            </main>
            <Footer />
        </>
    );
};

export default Homepage;