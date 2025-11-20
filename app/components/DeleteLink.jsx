"use client"

import { RiDeleteBin5Line } from 'react-icons/ri'
import { useRouter } from "next/navigation";

const DeleteLink = ({ shortUrl }) => {
    const router = useRouter();

    const deleteLink = async (code) => {
        try {
            const result = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/links/${code}`, {
                method: "DELETE"
            });

            const deletedData = await result.json();
            router.refresh();
            console.log("Deleted data: ", deletedData);
        }

        catch(err) {
            console.error("Error in deleting link: ", err?.message);
        }
    }

    return (
        <button onClick={() => deleteLink(shortUrl)}><RiDeleteBin5Line /></button>
    )
}

export default DeleteLink