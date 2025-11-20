import Link from "next/link";
import { IoMdArrowBack } from "react-icons/io";

async function getLink(shortUrl) {
    try {

        let requestUrl = `${process.env.NEXT_PUBLIC_HOST}/api/links/${shortUrl}`;

        const res = await fetch(requestUrl, {
            method: 'GET',
            cache: 'no-store', // Ensures fresh data on each request
        });

        if (!res.ok) {
            throw new Error('Failed to fetch link');
        }

        return res.json();
    } catch (error) {
        toast.error(error?.message);
        console.error(error?.message);
        return [];
    }
}

export default async function LinkStats({ params }) {

    const { code } = await params;
    const link = await getLink(code);

    const data = link?.data;

    // If no record found, show fallback message
    if (!data) {
        return (
            <>
                <div className="p-8 text-center text-gray-500">
                    No link found for <strong>{code}</strong>
                </div>
            </>
        );
    }

    return (
        <div className="w-full max-w-3xl mx-auto p-8 space-y-8">

            <h1 className="text-3xl font-bold text-gray-900">
                Link Details
            </h1>

            <h2><Link href={process.env.NEXT_PUBLIC_HOST}><IoMdArrowBack /></Link></h2>

            <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200 space-y-6">

                <div className="flex flex-col">
                    <span className="text-sm text-gray-500">Original URL</span>
                    <Link
                        href={data.url}
                        target="_blank"
                        className="text-blue-600 break-all hover:underline text-lg"
                    >
                        {data?.url.slice(0,Math.max(75, data?.url?.length/2))}..
                    </Link>
                </div>

                <div className="flex flex-col">
                    <span className="text-sm text-gray-500">Short URL</span>
                    <Link
                        href={`${process.env.NEXT_PUBLIC_HOST}/${data.shortUrl}`}
                        target="_blank"
                        className="text-indigo-600 font-semibold hover:underline text-xl"
                    >
                        {process.env.NEXT_PUBLIC_HOST}/{data.shortUrl}
                    </Link>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-6">

                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-center">
                        <div className="text-4xl font-bold text-gray-800">
                            {data.totalClicks ?? 0}
                        </div>
                        <div className="text-sm text-gray-600">
                            Total Clicks
                        </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-center">
                        <div className="text-lg text-gray-800 font-medium">
                            {data.lastClickedTime || "—"}
                        </div>
                        <div className="text-sm text-gray-600">
                            Last Clicked Time
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}