"use server"

export const getAnimeDataOnServer = async (query) => {

    const res = await fetch(`https://api.jikan.moe/v4/anime${query}`);
    
    if (!res.ok){
      throw new Error ('Could not retrieve the anime')
    }

    const data = await res.json();
    
    return data;
    };