"use client"

import { RiDeleteBin5Line } from 'react-icons/ri'
import { useRouter } from "next/navigation";
import toast from 'react-hot-toast';
import Spinner from './Spinner';
import { useState } from 'react';

const DeleteLink = ({ shortUrl }) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const deleteLink = async (code) => {
        try {
            setIsLoading(true);

            const result = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/links/${code}`, {
                method: "DELETE"
            });

            const deletedData = await result.json();

            if(result.ok)
            toast.success("Link Deleted successfully..");

            else
            toast.error("Error in Deleting Link");

            setIsLoading(false);

            router.refresh();
        }

        catch(err) {
            console.error("Error in deleting link: ", err?.message);
            toast.error("Error in Deleting Link");
            setIsLoading(false);
        }
    }

    return (
        <button onClick={() => deleteLink(shortUrl)} className='cursor-pointer flex justify-center align-middle' disabled={isLoading}>{isLoading ? <Spinner /> : <RiDeleteBin5Line />}</button>
    )
}

export default DeleteLink