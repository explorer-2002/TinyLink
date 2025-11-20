// app/components/LinksTable.jsx

import Link from "next/link";
import LinksFilter from "./LinksFilter"; // Import the new client component
import { FaEye } from "react-icons/fa";
import DeleteLink from "./DeleteLink";
import CopyButton from "./CopyButton";

async function getLinks(searchParams) {
    try {
        const urlFilter = searchParams?.url;
        const shortUrlFilter = searchParams?.shortUrl;

        console.log("Value of 'url':", urlFilter);
        console.log("Value of 'shortUrl':", shortUrlFilter);

        let requestUrl = `${process.env.NEXT_PUBLIC_HOST}/api/links`;

        const paramsString = `?url=${urlFilter}&shortUrl=${shortUrlFilter}`;
        requestUrl += paramsString;

        const res = await fetch(requestUrl, {
            method: 'GET',
            cache: 'no-store', // Ensures fresh data on each request
        });

        if (!res.ok) {
            throw new Error('Failed to fetch links');
        }

        return res.json();
    } catch (error) {
        console.error('Error fetching links:', error);
        return [];
    }
}

export default async function LinksTable({ searchParams }) {
    const params = await searchParams;
    console.log("params: ", params);
    const filter = {
        shortUrl: params?.shortUrl,
        url: params?.url
    }

    const links = await getLinks(filter);

    console.log("Links: ", links);

    if (links?.data?.length === 0) {
        return (
            <>
                <LinksFilter />

                <div className="w-full mx-auto p-3 text-center text-gray-600 text-2xl">
                    No links found
                </div>
            </>
        );
    }

    return (
        <div className="w-full mx-auto p-3">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">URL Links</h1>

            <LinksFilter />

            {/* Grid Table Header */}
            <div className="grid grid-cols-[1fr_2fr_1fr_1fr_0.8fr] gap-3 p-4 bg-gray-800 text-white rounded-t-lg font-semibold w-full">
                <div className="px-2">Short code</div>
                <div className="px-2">Target URL</div>
                <div className="px-2">Total Clicks</div>
                <div className="px-2">Last Clicked Time</div>
                <div className="px-2">Details</div>
            </div>


            {/* Grid Table Body */}
            <div className="border border-gray-300 rounded-b-lg overflow-hidden">
                {links?.data?.map((link, index) => (
                    <div
                        key={index}
                        className="grid grid-cols-[1fr_2fr_1fr_1fr_0.8fr] gap-3 p-3 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition-colors"
                    >
                        <div className="text-gray-700 break-all px-2"><Link href={`${process.env.NEXT_PUBLIC_HOST}/${link?.shortUrl}`} target="_blank">{link?.shortUrl}</Link><CopyButton text={`${process.env.NEXT_PUBLIC_HOST}/${link?.shortUrl}`} /></div>
                        <div className="text-blue-600 break-all px-2"><span>{link?.url.slice(0,50)}..</span><CopyButton text={link?.url} /></div>
                        <div className="text-gray-700 break-all px-2">{link?.totalClicks}</div>
                        <div className="text-gray-700 break-all px-2">{link?.lastClickedTime ?? '-'}</div>
                        <div className="text-gray-700 break-all px-2 flex gap-2 justify-between align-text-top h-4"><Link href={`${process.env.NEXT_PUBLIC_HOST}/code/${link?.shortUrl}`}><FaEye /></Link><DeleteLink shortUrl={link?.shortUrl}/></div>
                    </div>
                ))}
            </div>
        </div>
    );
}