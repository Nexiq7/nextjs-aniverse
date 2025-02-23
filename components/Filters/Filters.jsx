import React, { useEffect, useState, Fragment } from 'react'
import { useRouter } from 'next/navigation'
import { FaAngleDown } from "react-icons/fa6";
import { MotionDiv } from '../MotionDiv/MotionDiv';
import { FaAlignLeft } from "react-icons/fa6";
import { getAnimeGenres } from '@/lib/utils';

const Filters = () => {
    const router = useRouter()
    const [mobileFilterDropdownOpen, setMobileFilterDropdownOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [genre, setGenre] = useState();
    const [status, setStatus] = useState('');
    const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
    const [isGenreDropdownOpen, setIsGenreDropdownOpen] = useState(false);
    const [allGenreOptions, setAllGenreOptions] = useState([]);

    const allFilters = ["Search", "Genre", "Status"];
    const allStatusOptions = ['airing', 'complete', 'upcoming'];


    const getGenres = async () => {
        try {
            const data = await getAnimeGenres();
            setAllGenreOptions(data.data.map(({ mal_id, name }) => ({ id: mal_id, genre: name })));
        } catch (error) {
            console.error("Error fetching genres:", error);
        }
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            getGenres();
        }, 1000);

        return () => clearTimeout(timeout);
    }, []);


    const handlemobileFilterDropdown = () => {
        setMobileFilterDropdownOpen((prev) => !prev)
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
            searchParams.set('genre', genre.id);
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
            value = status;
        } else {
            value = genre?.name;
        }

        return value;
    }

    const setPlaceholderBasedOnFilter = (filter) => {
        let placeholder;

        if (filter === 'Search') {
            placeholder = "search any anime";
        } else if (filter === 'Status') {
            placeholder = "select";
        } else {
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
            <div className='md:hidden h-10 w-10 bg-sky-900 rounded-lg mt-5 flex justify-center items-center' onClick={handlemobileFilterDropdown}>
                <FaAlignLeft className={`text-2xl ${mobileFilterDropdownOpen ? "text-sky-500" : "text-white"}`} />
            </div>

            <form className={`${mobileFilterDropdownOpen ? "" : "hidden"} md:flex min-h-20 flex-col md:flex-row items-center gap-10 mt-5 md:mt-10 w-full`} onSubmit={handleSearch}>
                {allFilters.map((filter, index) => (
                    <div key={index} className='mb-2 md:mb-0'>
                        <h2 className='mb-2 font-medium'>{filter}</h2>
                        <div className=' bg-slate-600 h-10 w-[200px] rounded-md flex items-center px-5'>
                            <input className='bg-transparent h-full w-full focus:outline-none font-medium'
                                type="text"
                                placeholder={setPlaceholderBasedOnFilter(filter)}
                                onChange={(e) => setFilter(filter, e)}
                                value={setValueBasedOnFilter(filter)}
                            />
                            {filter == "Genre" &&
                                <FaAngleDown
                                    className='text-[20px] text-sky-300 hover:text-sky-600 transition-all ease-in-out duration-200 mt-1 h-56'
                                    onClick={() => { setIsGenreDropdownOpen(prev => !prev) }}
                                />
                            }
                            {filter == "Status" &&
                                <FaAngleDown
                                    className='text-[20px] text-sky-300 hover:text-sky-600 transition-all ease-in-out duration-200 mt-1'
                                    onClick={() => { setIsStatusDropdownOpen(prev => !prev) }}
                                />
                            }

                        </div>
                        {isGenreDropdownOpen & filter == "Genre" ? (
                            <MotionDiv
                                className='h-56 absolute bg-slate-600 w-[200px] rounded-md z-50 mt-2 p-2 overflow-y-auto'
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
                                    {allGenreOptions.map((option) => (
                                        <div
                                            key={option.id}
                                            className='h-10 flex items-center hover:bg-sky-900 rounded-md p-2 font-medium cursor-pointer'
                                            onClick={() => {
                                                setGenre({ id: option.id, name: option.genre });
                                                setIsGenreDropdownOpen(false);
                                            }}
                                        >
                                            {option.genre}
                                        </div>
                                    ))}
                                </div>
                            </MotionDiv>
                        ) : (null)}
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
        </>
    )
}

export default Filters