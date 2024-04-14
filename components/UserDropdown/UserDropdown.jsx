import Image from 'next/image'
import React, { useState } from 'react'
import { MotionDiv } from '../MotionDiv/MotionDiv'
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const UserDropdown = ({ user, setIsUserLoggedIn, setUser }) => {

    const router = useRouter();

    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleClick = () => {
        setDropdownOpen(false);
    };

    const variants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1 },
    };

    const links = [
        { category: 'Profile', href: '/explore' },
        { category: 'Settings', href: '/' },
    ];

    const logout = async () => {

        try {
            const response = await fetch('http://localhost:5000/auth/logout', {
                method: 'GET',
                credentials: "include",
            });

            if (!response.ok) {
                const errorData = await response.json(); // Parse the JSON response
                const errorMessage = errorData.message; // Get the error message from the response data
                console.log(errorMessage);
            }

            setIsUserLoggedIn(false);
            setUser(null);
            setDropdownOpen(false);
            router.push("/")

        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };

    return (
        <div>
            <div className='relative h-9 w-9 rounded-full overflow-hidden' onClick={() => {
                setDropdownOpen(prevState => !prevState);
            }}>
                <Image
                    style={{ objectFit: "cover" }}
                    fill
                    src={"https://i.pinimg.com/564x/a9/ab/95/a9ab95f858cacbe669dd38ae12142a5d.jpg"}
                />
            </div>
            {
                dropdownOpen && (
                    <MotionDiv
                        className='absolute bg-slate-600 w-[300px] sm:w-[175px] rounded-md z-50 top-16 p-2 right-5'
                        variants={variants}
                        initial="hidden"
                        animate="visible"
                        transition={{
                            delay: 0,
                            ease: 'easeInOut',
                            duration: 0.3,
                        }}
                        viewport={{ amount: 0 }}
                    >

                        <div className='flex flex-col'>
                            <div className='px-2 border-b-2 border-slate-500 mb-2'>
                                <p className='text-[20px]'>{user?.username}</p>
                            </div>
                            {links.map((link, index) => (
                                <Link key={index} href={link.href} onClick={handleClick}>
                                    <div className='p-2 hover:bg-slate-700 hover:rounded-md cursor-pointer'>
                                        <p className='text-[16px] text-white'>{link.category}</p>
                                    </div>
                                </Link>
                            ))}
                            <div className='p-2 hover:bg-slate-700 hover:rounded-md cursor-pointer' onClick={logout}>
                                <p className='text-[16px] text-red-500'>Logout</p>
                            </div>
                        </div>
                    </MotionDiv>
                )
            }
        </div>
    )
}

export default UserDropdown