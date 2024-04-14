"use client"
import { useState } from 'react';
import ModalHandler from '../Modal/ModalHandler';
import UserDropdown from '../UserDropdown/UserDropdown';

export default function UserNavigation({ user, setIsUserLoggedIn, setUser }) {

    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            {user?.username ? (
                <UserDropdown user={user} setIsUserLoggedIn={setIsUserLoggedIn} setUser={setUser} />
            ) : (
                <div>
                    <button className='h-full flex items-center text-[15px] sm:text-[18px] bg-transparent transition-all duration-200 ease-in-out rounded-xl tracking-wide px-5 py-1 font-normal border-2 border-sky-700 hover:border-sky-500' onClick={() => {
                        setIsModalOpen(true);
                    }}>Register</button>
                </div>
            )
            }
            {isModalOpen &&
                <ModalHandler setIsModalOpen={setIsModalOpen} setIsUserLoggedIn={setIsUserLoggedIn} />
            }
        </>
    )
}

