"use client"

import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const Searchbar = ({ widthInPX }) => {

    const [search, setSearch] = useState('');

    const searchParams = useSearchParams()
    const router = useRouter()

    const updateSearchParams = (search) => {

        const searchParams = new URLSearchParams(window.location.search);

        if (search) {
            searchParams.set('search', search);
        } else {
            searchParams.delete('search');
        }

        router.push(`/explore${search && `?${searchParams.toString()}`}`);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        updateSearchParams(search);
    };

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        setSearch(searchParams.get('search') || '');
    }, []);

    return (
        <form className={`hidden md:flex w-[${widthInPX}px] ring-sky-900 ring-1 rounded-lg focus:shadow-sky-900 shadow-md hover:shadow-sky-900 transition-shadow duration-700 px-5 items-center justify-between`} onSubmit={handleSearch}>
            <input className={`bg-transparent outline-none p-2 w-full placeholder:opacity-0 lg:placeholder:opacity-100 `} type="text" placeholder="Search for any anime..." onChange={(e) => setSearch(e.target.value)} value={search} />
        </form>
    )
}

export default Searchbar