"use client"
import React from 'react';
import Filters from '../../components/Filters/Filters';
import '../globals.css';
import { useSearchParams } from 'next/navigation'
import AnimeCardMap from '@/components/AnimeCardMap/AnimeCardMap';

const Page = () => {

    const searchParams = useSearchParams()

    const search = searchParams.get('search') || "";
    const genres = searchParams.get('genre') || "";
    const status = searchParams.get('status') || "";

    //TODO: add genre in query
    const query = `?status=${status}&q=${search}&genres=${genres}&order_by=popularity&sort=asc&sfw=true&limit=25`;

    return (
        <main className="flex min-h-screen flex-col 2xl:px-64 px-6">
            <Filters />
            <AnimeCardMap query={query} />
        </main>
    );
};

export default Page;
