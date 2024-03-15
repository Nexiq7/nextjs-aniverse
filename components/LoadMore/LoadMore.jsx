"use client"

import ClipLoader from "react-spinners/ClipLoader";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import AnimeCard from "../AnimeCard/AnimeCard";


const LoadMore = ({ query }) => {
    const [page, setPage] = useState(2);
    const { ref, inView } = useInView();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const res = await fetch(`https://api.jikan.moe/v4/anime${query}&page=${page}`);
            const resJson = await res.json();
            const animeArray = resJson.data;

            if (animeArray.length > 0) {
                setData((prevData) => [...prevData, ...animeArray]);
                setPage((prevPage) => prevPage + 1);
            } else {
                setLoading(false);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (inView) {
            fetchData();
        }
    }, [inView]);


    return (
        <>
            {data.map((item, index) => (
                <div key={index} className='h-[300px]'>
                    <AnimeCard data={item} title={true} />
                </div>
            ))}

            <div className="flex justify-center items-center w-full">
                <div ref={ref}>
                    <ClipLoader color="#fff" loading={loading} />
                </div>
            </div>
        </>
    );
};

export default LoadMore;
