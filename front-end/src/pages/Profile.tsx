import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { AppDispatch, updateUser, store } from '../store/store';
import Nav from '../components/Nav';
import Footer from '../components/Footer';


const Profile = () => {

    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()

    const firstNameRef = useRef<HTMLInputElement>(null);
    const lastNameRef = useRef<HTMLInputElement>(null);

    const tokenFromStore = useSelector((state: any) => state.user.token)
    const user = useSelector((state: any) => state.user.user)
    const [openModal, setOpenModal] = useState(false)



    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const data = { firstName: firstNameRef?.current?.value, lastName: lastNameRef?.current?.value };
        dispatch(updateUser(data)).then((res: any) => dispatch({
            type: 'user/updateUser',
            payload: res.payload
        }))
        setOpenModal(false)
    }

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault()
        setOpenModal(state => !state)
    }

    const handleClose = () => {
        setOpenModal(false)
    }

    useEffect(() => {
        if (tokenFromStore == '') {
            navigate('/login')
        } else {
            if (tokenFromStore != '') {
                axios.defaults.headers.common['Authorization'] = `Bearer ${tokenFromStore}`
                const request = axios.post('http://localhost:3001/api/v1/user/profile').then((res) => {
                    let fnPayload = () => {
                        if (res.data.body.firstName == '') {
                            return user.firstName
                        } else {
                            return res.data.body.firstName
                        }
                    }
                    let lnPayload = () => {
                        if (res.data.body.lastName == '') {
                            return user.lastName
                        } else {
                            return res.data.body.lastName
                        }
                    }
                    dispatch({
                        type: 'user/setUser',
                        payload: {
                            firstName: fnPayload,
                            lastName: lnPayload,
                            email: res.data.body.email
                        }
                    })
                })
            }
        }
    }, [])

    return (
        <>
            <Nav />
            <main className="main bg-dark">
                <div className="header">
                    <h1>Welcome back<br />{user.firstName} {user.lastName}!</h1>
                    <button className="edit-button" onClick={handleClick}>Edit Name</button>
                </div>
                <h2 className="sr-only">Accounts</h2>
                <section className="account">
                    <div className="account-content-wrapper">
                        <h3 className="account-title">Argent Bank Checking (x8349)</h3>
                        <p className="account-amount">$2,082.79</p>
                        <p className="account-amount-description">Available Balance</p>
                    </div>
                    <div className="account-content-wrapper cta">
                        <button className="transaction-button">View transactions</button>
                    </div>
                </section>
                <section className="account">
                    <div className="account-content-wrapper">
                        <h3 className="account-title">Argent Bank Savings (x6712)</h3>
                        <p className="account-amount">$10,928.42</p>
                        <p className="account-amount-description">Available Balance</p>
                    </div>
                    <div className="account-content-wrapper cta">
                        <button className="transaction-button">View transactions</button>
                    </div>
                </section>
                <section className="account">
                    <div className="account-content-wrapper">
                        <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
                        <p className="account-amount">$184.30</p>
                        <p className="account-amount-description">Current Balance</p>
                    </div>
                    <div className="account-content-wrapper cta">
                        <button className="transaction-button">View transactions</button>
                    </div>
                </section>
                {openModal && <div className='modal'>
                    <div className='overlay'>
                        <i className="fa fa-times" onClick={handleClose}></i>
                        <h2>Edit profile</h2>
                        <form>
                            <div className="input-wrapper">
                                <label htmlFor="firstName">First Name</label>
                                <input type="text" id="firstName" ref={firstNameRef} placeholder={user.firstName} defaultValue={user.firstName} />
                            </div>
                            <div className="input-wrapper">
                                <label htmlFor="lastName">Last Name</label>
                                <input type="text" id="lastName" ref={lastNameRef} placeholder={user.lastName} defaultValue={user.lastName} />
                            </div>
                            <button onClick={handleSubmit} className="sign-in-button">Sign In</button>
                        </form>
                    </div>
                </div>}

            </main>
            <Footer />
        </>
    );
};

export default Profile;