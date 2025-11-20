'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function LinksFilter() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const [urlFilter, setUrlFilter] = useState(searchParams.get('url') || '');
    const [shortUrlFilter, setShortUrlFilter] = useState(searchParams.get('shortUrl') || '');

    // Debounce effect to update URL after user stops typing
    useEffect(() => {
        const handler = setTimeout(() => {
            const params = new URLSearchParams(searchParams);

            if (urlFilter) {
                params.set('url', urlFilter);
            } else {
                params.delete('url');
            }

            if (shortUrlFilter) {
                params.set('shortUrl', shortUrlFilter);
            } else {
                params.delete('shortUrl');
            }

            router.replace(`${pathname}?${params.toString()}`, {scroll:false});
        }, 400);

        return () => {
            clearTimeout(handler);
        };
        /*eslint-disable-next-line*/
    }, [urlFilter, shortUrlFilter, pathname, router]);


    return (
        <div className="mb-6 w-full flex gap-4 p-4 bg-gray-50 border rounded-lg">
            <input
                type="text"
                placeholder="Filter by Target URL..."
                value={urlFilter}
                onChange={(e) => setUrlFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
                type="text"
                placeholder="Filter by Short Code..."
                value={shortUrlFilter}
                onChange={(e) => setShortUrlFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
    );
}