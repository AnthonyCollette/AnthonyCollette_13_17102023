import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from'react-redux';
import { getToken, AppDispatch } from '../store/store';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

const SignIn = () => {
    const tokenFromStore = useSelector((state: any) => state.user.token)
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const data = {email: emailRef?.current?.value, password: passwordRef?.current?.value};
        dispatch(getToken(data)).then((res) => {
            dispatch({
                type: 'user/setToken',
                payload: res.payload
            })
        })
    }

    useEffect(() => {
        if (tokenFromStore !== '') {
            navigate('/profile')
        }
    }, [tokenFromStore])

    return (<>
        <Nav />
        <main className="main bg-dark">
            <section className="sign-in-content">
                <i className="fa fa-user-circle sign-in-icon"></i>
                <h1>Sign In</h1>
                <form>
                    <div className="input-wrapper">
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" ref={emailRef} />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" ref={passwordRef} />
                    </div>
                    <div className="input-remember">
                        <input type="checkbox" id="remember-me" />
                        <label htmlFor="remember-me">Remember me</label>
                    </div>
                    <button onClick={handleSubmit} className="sign-in-button">Sign In</button>
                </form>
            </section>
        </main>
        <Footer />
    </>)
}

export default SignIn;