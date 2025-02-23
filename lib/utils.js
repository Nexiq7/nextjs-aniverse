import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const checkAnimeSaved = async (username, animeId) => {
  try {
    const response = await fetch('https://nestjs-aniverse-production.up.railway.app/saved/checkAnimeSaved', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        animeId: animeId,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = errorData.message;
      console.log(errorMessage)
    }
    const data = await response.json();
    return data;

  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
}



export const getProfile = async () => {

  try {
    const response = await fetch('https://nestjs-aniverse-production.up.railway.app/auth/profile', {
      method: 'GET',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error("couldnt get profile");
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
};


export const getSavedAnimesByUsername = async (username) => {

  try {
    const response = await fetch(`https://nestjs-aniverse-production.up.railway.app/saved/${username}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error("couldnt get saved animes for this user");
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
};

export const getAnimeGenres = async (query) => {

  const res = await fetch(`https://api.jikan.moe/v4/genres/anime`);

  if (!res.ok) {
    throw new Error('Could not retrieve the genres')
  }

  const data = await res.json();

  return data;
};





