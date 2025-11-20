"use client"

import { RiDeleteBin5Line } from 'react-icons/ri'
import { useRouter } from "next/navigation";
import toast from 'react-hot-toast';

const DeleteLink = ({ shortUrl }) => {
    const router = useRouter();

    const deleteLink = async (code) => {
        try {
            const result = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/links/${code}`, {
                method: "DELETE"
            });

            const deletedData = await result.json();
            toast.success("Link Deleted successfully..")
            router.refresh();
            console.log("Deleted data: ", deletedData);


        }

        catch(err) {
            console.error("Error in deleting link: ", err?.message);
            toast.error("Error in Deleting Link");

        }
    }

    return (
        <button onClick={() => deleteLink(shortUrl)} className='cursor-pointer'><RiDeleteBin5Line /></button>
    )
}

export default DeleteLink