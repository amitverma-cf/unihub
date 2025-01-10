import React from 'react'
import Link from 'next/link';
function Logo() {
  return (
    <div className="hidden md:flex items-center text-primary"> 
    <Link href="/">
      <span className="text-2xl font-bold font-mono p-1">
     Uni<br/>Hub.
      </span>
    </Link>
  </div>
  )
}

export default Logo