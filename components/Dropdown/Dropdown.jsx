"use client"
import Image from 'next/image';

export default function Dropdown() {
    return (
        <div className='h-9 w-9 relative rounded-full overflow-hidden'>
            <Image
                style={{ objectFit: "cover" }}
                fill
                src={"https://i.pinimg.com/564x/a9/ab/95/a9ab95f858cacbe669dd38ae12142a5d.jpg"}
            />
        </div>
    )
}

