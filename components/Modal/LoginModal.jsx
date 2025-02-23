import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { IoMdClose } from "react-icons/io";

const LoginModal = ({ setIsModalOpen, setModalTypeRegister, setIsUserLoggedIn }) => {

    const router = useRouter()

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [validationError, setvalidationError] = useState(false);
    const [loginError, setLoginError] = useState(false)

    const loginUser = async () => {
        setLoginError(false);
        setvalidationError(false);

        if (!username || !password) {
            setvalidationError("Please fill all fields.");
            console.log(setvalidationError)
            return;
        }

        const loginUserData = {
            username: username,
            password: password,
        };

        try {
            const response = await fetch('https://nestjs-aniverse-production.up.railway.app/auth/login', {
                method: 'POST',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json',

                },
                body: JSON.stringify(loginUserData),
            });

            if (!response.ok) {
                const errorData = await response.json(); // Parse the JSON response
                const errorMessage = errorData.message; // Get the error message from the response data
                setLoginError(errorMessage);
                throw new Error(errorMessage);
            }

            const data = await response.json();
            setIsModalOpen(false)
            setIsUserLoggedIn(true)

        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };


    return (
        <div className='fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black/40'>
            <div className='h-[650px] w-[350px] lg:w-[900px] bg-neutral-900 relative rounded-lg overflow-hidden'>
                <div className='absolute left-5 top-5'>
                    <h1 className='text-[24px] font-medium hover:cursor-pointer'>
                        aniverse
                    </h1>
                </div>
                <div className='absolute right-5 top-5'>
                    <IoMdClose
                        onClick={() => { setIsModalOpen(false) }}
                        className='text-white text-[24px] hover:text-[26px] transition-all duration-200 bg-sky-700 border border-sky-500 rounded-lg' />
                </div>
                <div className='h-full w-full flex flex-col justify-center items-center'>
                    <div className='flex flex-col gap-4 w-[350px]'>
                        <div>
                            <h1 className='text-[40px]'>Login</h1>
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
                        <div>
                            {validationError && <h1 className='text-red-400'>Login failed: {validationError}</h1>}
                            {loginError && <h1 className='text-red-400'>Login failed: {loginError}</h1>}
                            <button className='flex items-center justify-center text-[24px] mt-4 transition-all duration-200 ease-in-out rounded-xl tracking-wide px-5 py-1 font-normal border-2 bg-sky-900 border-sky-700 hover:border-sky-500 w-full lg:w-[400px]'
                                onClick={loginUser}
                            >Login</button>
                        </div>
                        <div>
                            <h1 className='text-white flex justify-center items-center'>No account yet?<span className='text-sky-500 ml-2 font-semibold cursor-pointer'
                                onClick={() => {
                                    setModalTypeRegister(true)
                                }}>Register</span>
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default LoginModal