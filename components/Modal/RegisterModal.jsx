import React, { useState } from 'react'
import { IoMdClose } from "react-icons/io";

const RegisterModal = ({ setIsModalOpen, setModalTypeRegister }) => {


    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [validationError, setvalidationError] = useState(false);
    const [registrationCompleted, setRegistrationCompleted] = useState(false)
    const [registrationError, setRegistrationError] = useState(false)


    const registerUser = async () => {
        setRegistrationCompleted(false);
        setvalidationError(false);
        setRegistrationError(false)

        if (!email || !username || !password) {
            setvalidationError("Please fill all fields.");
            return;
        }

        const registerUserData = {
            email: email,
            username: username,
            password: password,
        };

        try {
            const response = await fetch('http://localhost:5000/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    username: username,
                    password: password,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json(); // Parse the JSON response
                const errorMessage = errorData.message; // Get the error message from the response data
                setRegistrationError(errorMessage);
                throw new Error(errorMessage);
            }

            const data = await response.json();
            setRegistrationCompleted(true);
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };


    return (
        <div className='fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black/40'>
            <div className='w-[350px] h-[650px] lg:w-[900px] bg-neutral-900 relative rounded-lg overflow-hidden'>
                <div className='absolute left-5 top-5'>
                    <h1 className='text-[24px] font-medium hover:cursor-pointer'>
                        aniverse
                    </h1>
                </div>
                <div className='absolute right-5 top-5'>
                    <IoMdClose onClick={() => { setIsModalOpen(false) }} className='text-white text-[24px] hover:text-[26px] transition-all duration-200 bg-sky-700 border border-sky-500 rounded-lg' />
                </div>
                <div className='h-full w-full flex flex-col justify-center items-center'>
                    {registrationCompleted ? (
                        <>
                            <h1 className='text-green-300 text-[20px]'>Registration sucessful</h1>
                            <button
                                className='flex items-center justify-center text-[24px] mt-4 transition-all duration-200 ease-in-out rounded-xl tracking-wide px-5 py-1 font-normal border-2      bg-sky-900 border-sky-700 hover:border-sky-500 w-[400px]'
                                onClick={() => {
                                    setModalTypeRegister(false)
                                }}>
                                Login
                            </button>
                        </>
                    ) : (
                        <div className='flex flex-col gap-4 w-[350px]'>
                            <div>
                                <h1 className='text-[40px]'>Register</h1>
                            </div>
                            <>
                                <div>
                                    <h1 className='text-white text-[18px] mb-2'>Email</h1>
                                    <input
                                        type="text"
                                        className='focus:outline-none ring-neutral-700 ring-1 rounded-lg focus:shadow-sky-900 shadow-lg hover:shadow-sky-900 transition-shadow duration-700 bg-neutral-800 p-2 text-[20px] w-full lg:w-[400px] placeholder:text-[16px] placeholder:text-neutral-700'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div>
                                    <h1 className='text-white text-[18px] mb-2'>Username</h1>
                                    <input
                                        type="text"
                                        className='focus:outline-none ring-neutral-700 ring-1 rounded-lg focus:shadow-sky-900 shadow-lg hover:shadow-sky-900 transition-shadow duration-700 bg-neutral-800 p-2 text-[20px] w-full lg:w-[400px] placeholder:text-[16px] placeholder:text-neutral-700'
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)} />
                                </div>
                                <div>
                                    <h1 className='text-white text-[18px] mb-2'>Password</h1>
                                    <input
                                        type="text"
                                        className='focus:outline-none ring-neutral-700 ring-1 rounded-lg focus:shadow-sky-900 shadow-lg hover:shadow-sky-900 transition-shadow duration-700 bg-neutral-800 p-2 text-[20px] w-full lg:w-[400px] placeholder:text-[16px] placeholder:text-neutral-700'
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)} />
                                </div>
                            </>
                            <div>
                                {validationError && <h1 className='text-red-400'>Registration failed: {validationError}</h1>}
                                {registrationError && <h1 className='text-red-400'>Registration failed: {registrationError}</h1>}
                                <button
                                    className='flex items-center justify-center text-[24px] mt-4 transition-all duration-200 ease-in-out rounded-xl tracking-wide px-5 py-1 font-normal border-2 bg-sky-900 border-sky-700 hover:border-sky-500 w-full lg:w-[400px]'
                                    onClick={() => registerUser()}
                                >
                                    Register
                                </button>
                            </div>
                            <div>
                                <h1 className='text-white flex justify-center items-center'>Already have an account?
                                    <span
                                        className='text-sky-500 ml-2 font-semibold cursor-pointer'
                                        onClick={() => {
                                            setModalTypeRegister(false)
                                        }}>
                                        Login
                                    </span>
                                </h1>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div >
    )
}

export default RegisterModal