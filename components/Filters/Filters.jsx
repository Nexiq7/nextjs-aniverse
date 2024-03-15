import React, { useEffect, useState, Fragment } from 'react'
import { useRouter } from 'next/navigation'
import { FaAngleDown } from "react-icons/fa6";
import { MotionDiv } from '../MotionDiv/MotionDiv';

const Filters = () => {
    const router = useRouter()

    const [dropdownOpen, setDropDownOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [genre, setGenre] = useState('');
    const [status, setStatus] = useState('');
    const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);


    const allFilters = ["Search", "Genre", "Status"];
    const allStatusOptions = ['airing', 'complete', 'upcoming'];

    const handleDropDown = () => {
        setDropDownOpen((prev) => !prev)
    }

    const handleSearch = (e) => {
        e.preventDefault();
        updateSearchParams(search, genre, status);
    };

    const updateSearchParams = (search, genre, status) => {
        const searchParams = new URLSearchParams(window.location.search);

        if (search) {
            searchParams.set('search', search);
        } else {
            searchParams.delete('search');
        }

        if (genre) {
            searchParams.set('genre', genre);
        } else {
            searchParams.delete('genre');
        }

        if (status) {
            searchParams.set('status', status);
        } else {
            searchParams.delete('status');
        }

        const newPathname = `${window.location.pathname}?${searchParams.toString()}`;
        router.push(newPathname);
    };

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        setSearch(searchParams.get('search') || '');
        setGenre(searchParams.get('genres') || '');
        setStatus(searchParams.get('status') || '');
    }, []);

    const setFilter = (filter, e) => {
        if (filter === "Search") {
            setSearch(e.target.value);
        } else if (filter === "Genre") {
            setGenre(e.target.value);
        } else if (filter === "Status") {
            setStatus(e.target.value);
        }
    }

    const setValueBasedOnFilter = (filter) => {
        let value;

        if (filter === 'Search') {
            value = search;
        } else if (filter === 'Status') {
            // Handle status filter
            value = status;
        } else {
            // Handle genre filter
            value = genre;
        }

        return value;
    }

    const setPlaceholderBasedOnFilter = (filter) => {
        let placeholder;

        if (filter === 'Search') {
            placeholder = "search any anime";
        } else if (filter === 'Status') {
            // Handle status filter
            placeholder = "select";
        } else {
            // Handle genre filter
            placeholder = "select";
        }

        return placeholder;
    }

    const variants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1 },
    };

    return (
        <>
            <form className='hidden md:flex h-20 flex-row items-center gap-10 mt-10 w-full' onSubmit={handleSearch}>
                {allFilters.map((filter) => (
                    <div>
                        <h2 className='mb-2 font-medium'>{filter}</h2>
                        <div className=' bg-slate-600 h-10 w-[200px] rounded-md flex items-center px-5'>
                            <input className='bg-transparent h-full w-full focus:outline-none font-medium'
                                type="text"
                                placeholder={setPlaceholderBasedOnFilter(filter)}
                                onChange={(e) => setFilter(filter, e)}
                                value={setValueBasedOnFilter(filter)}
                            />
                            {filter == "Status" &&
                                <FaAngleDown
                                    className='text-[20px] text-sky-300 hover:text-sky-600 transition-all ease-in-out duration-200 mt-1'
                                    onClick={() => { setIsStatusDropdownOpen(prev => !prev) }}
                                />
                            }

                        </div>
                        {isStatusDropdownOpen & filter == "Status" ? (
                            <MotionDiv
                                className='absolute bg-slate-600 w-[200px] rounded-md z-50 mt-2 p-2'
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
                                <div>
                                    {allStatusOptions.map((option) => (
                                        <div
                                            key={option}
                                            className='h-10 flex items-center hover:bg-sky-900 rounded-md p-2 font-medium cursor-pointer'
                                            onClick={() => {
                                                setStatus(option);
                                                setIsStatusDropdownOpen(false);
                                            }}
                                        >
                                            {option}
                                        </div>
                                    ))}
                                </div>
                            </MotionDiv>
                        ) : (null)}
                    </div>

                ))}

                <div className='h-[72px] w-[200px] flex items-end'>
                    <button className=' bg-sky-900 rounded-md h-10 w-[120px] font-medium ' type='submit'>submit</button>
                </div>

            </form >

            {
                dropdownOpen ? (
                    <>
                        <div className='md:hidden'>
                            <div className='flex items-center gap-2'>
                                <h1 className='text-xl'>Filters</h1>


                            </div>
                            <div className='flex flex-col gap-3 mt-5 w-full'>
                                <div>
                                    <h2 className='mb-2'>Search</h2>
                                    <div className=' bg-slate-500 h-10 w-[200px] rounded-md'>
                                        <input className='bg-transparent h-full w-full px-5 focus:outline-none'
                                            type="text"
                                            placeholder='any anime' />
                                    </div>
                                </div>
                                <div>
                                    <h2 className='mb-2'>Genre</h2>
                                    <div className=' bg-slate-500 h-10 w-[200px] rounded-md'>
                                        <input className='bg-transparent h-full w-full px-5 focus:outline-none'
                                            type="text"
                                            placeholder='select' />
                                    </div>
                                </div>
                                <div>
                                    <h2 className='mb-2'>Status</h2>
                                    <div className=' bg-slate-500 h-10 w-[200px] rounded-md'>
                                        <input className='bg-transparent h-full w-full px-5 focus:outline-none'
                                            type="text"
                                            placeholder='select' />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </>
                ) : (
                    <>
                        <div className='md:hidden'>
                            <div className='md:hidden flex flex-row items-center gap-2'>
                                <h1 className='text-xl md:hidden'>Filters</h1>

                            </div>
                        </div>

                    </>
                )}
        </>
    )
}

export default Filters