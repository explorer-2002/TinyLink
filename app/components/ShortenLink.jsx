"use client";

import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import Spinner from './Spinner';

const ShortenLink = () => {
    const [url, setUrl] = useState('');
    const [shortUrl, setShortUrl] = useState('');

    const [isLoading, setIsLoading] = useState(false)

    const router = useRouter();

    const generate = () => {
        if (url === '' || shortUrl === '')
            return;

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "url": url,
            "shortUrl": shortUrl
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        setIsLoading(true);

        fetch("/api/links", requestOptions)
            .then((response) => {
                if (response.status === 409) {
                    toast.error("This code already exists");
                }

                else if (response.status === 200) {
                    setUrl('');
                    setShortUrl('');

                    toast.success("Short Link created successfully");
                }

                setIsLoading(false)
            })
            .catch((error) => {
                console.error("Catch Block: ", error);
                toast.error(`${error?.message}`);
                setIsLoading(false);
            });


        router.refresh();
    }

    return (
        <div className='mx-auto w-[70%] max-w-[80%] bg-purple-100 my-16 p-8 rounded-lg flex flex-col gap-4'>
            <h1 className='font-bold text-2xl'>Generate your Short Urls</h1>
            <div className='flex flex-col gap-2'>
                <input type="text" placeholder="Enter URL to shorten" className='p-4 rounded-md bg-white focus:outline-purple-600' value={url} onChange={(e) => setUrl(e.target.value)} />
                <input type="text" placeholder="Enter your preferred short url" className='p-4 bg-white focus:outline-purple-600 rounded-md' value={shortUrl} onChange={(e) => setShortUrl(e.target.value)} />
                <button className='bg-purple-500 rounded-lg shadow-lg p-4 py-1 my-3 cursor-pointer text-center flex justify-center items-center' onClick={generate}>{isLoading ? <Spinner /> : "Generate"}</button>
            </div>
        </div>
    )
}

export default ShortenLink