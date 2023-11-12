import { Link } from 'react-router-dom';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

const Error404 = () => {
    return (
        <div className='error-404'>
            <Nav />
            <div className='container'>
                <h1>404</h1>
                <h2>Oups! La page que vous demandez n'existe pas.</h2>
                <Link to="/">Retourner sur la page d'accueil</Link>
            </div>
            <Footer />
        </div>
    );
};

export default Error404;