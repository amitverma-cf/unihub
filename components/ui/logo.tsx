import React from 'react'
import Link from 'next/link';
function Logo() {
    return (
        <div className="hidden md:flex items-center text-primary">
            <Link href="/">
                <span className="block text-2xl font-bold font-mono p-1 leading-3">
                    Uni
                </span>
                <span className="block text-2xl font-bold font-mono p-1 leading-3">
                    Hub
                </span>
            </Link>
        </div>
    )
}

export default Logo