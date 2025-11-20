import Link from 'next/link'
import React from 'react'

const Navbar = () => {
    return (
        <nav className='h-22 bg-purple-500 flex justify-between px-3 w-full items-center text-white'>
            <div className="font-bold text-lg px-3">
                TinyLink
            </div>

            <ul className='flex justify-center gap-4 items-center font-medium px-4'>
                <Link href="/"><li>Dashboard</li></Link>
            </ul>
        </nav>
    )
}

export default Navbar