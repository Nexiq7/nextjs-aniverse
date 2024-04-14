import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const checkAnimeSaved = async (username, animeId) => {
  try {
    const response = await fetch('http://localhost:5000/saved/checkAnimeSaved', {
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
    const response = await fetch('http://localhost:5000/auth/profile', {
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
    const response = await fetch(`http://localhost:5000/saved/${username}`, {
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





