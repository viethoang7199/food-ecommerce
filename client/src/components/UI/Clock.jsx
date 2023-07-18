import React, { useEffect, useState } from 'react'

const Clock = () => {

    const [days, setDays] = useState()
    const [hours, setHours] = useState()
    const [minutes, setMinutes] = useState()
    const [seconds, setSeconded] = useState()

    let interval;

    const countDown = () => {
        const destination = new Date('Dec 31, 2023').getTime()
        interval = setInterval(() => {
            const now = new Date().getTime()
            const different = destination - now
            const days = Math.floor(different / (1000 * 60 * 60 * 24))
            const hours = Math.floor(different % (1000 * 60 * 60 * 24) / (1000 * 60 * 60))
            const minutes = Math.floor(different % (1000 * 60 * 60) / (1000 * 60))
            const seconds = Math.floor(different % (1000 * 60) / (1000))
            if (destination < 0) {
                clearInterval(interval.current)
            }
            else {
                setDays(days)
                setHours(hours)
                setMinutes(minutes)
                setSeconded(seconds)
            }
        });
    }

    useEffect(() => {
        countDown()
    })

    return (
        <ul className="flex items-center flex-row lg:flex-col gap-5">
            <li className="text-center bg-white w-14 h-14 rounded-xl flex justify-center items-center flex-col gap-1">
                <div className="text-black text-2xl font-extrabold">{days}</div>
                <span className="text-black text-sm uppercase -mt-1 font-medium">Days</span>
            </li>
            <li className="text-center bg-white w-14 h-14 rounded-xl flex justify-center items-center flex-col gap-1">
                <div className="text-black text-2xl font-extrabold">{hours}</div>
                <span className="text-black text-sm uppercase -mt-1 font-medium">Hours</span>
            </li>
            <li className="text-center bg-white w-14 h-14 rounded-xl flex justify-center items-center flex-col gap-1">
                <div className="text-black text-2xl font-extrabold">{minutes}</div>
                <span className="text-black text-sm uppercase -mt-1 font-medium">Min</span>
            </li>
            <li className="text-center bg-white w-14 h-14 rounded-xl flex justify-center items-center flex-col gap-1">
                <div className="text-black text-2xl font-extrabold">{seconds}</div>
                <span className="text-black text-sm uppercase -mt-1 font-medium">Sec</span>
            </li>
        </ul>
    )
}

export default Clock