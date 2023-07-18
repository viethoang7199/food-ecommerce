
import React from 'react'
import { icons } from '../../utils/icons'

const Star = ({ stars }) => {
    const { RiStarFill, RiStarHalfFill, RiStarLine } = icons
    const ratingStar = Array.from({ length: 5 }, (e, index) => {
        let numbers = index + 0.5
        return (
            <span key={index}>
                {
                    stars >= index + 1
                        ?
                        <span className="text-orange"><RiStarFill size={20} /></span>
                        :
                        stars >= numbers
                            ?
                            <span className="text-orange"><RiStarHalfFill size={20} /></span>
                            :
                            <span className="text-orange"><RiStarLine size={20} /></span>
                }
            </span>
        )
    })

    return (
        <>
            {ratingStar}
        </>
    )

}

export default Star