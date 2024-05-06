import React, { useState } from "react";

export type RatingType = {
    rating: number;
    setRating: (p: number) => void;
};

const FiveStarRating = (props: RatingType) => {
    // Function to update rating
    const handleChange = (newRating: number) => {
        props.setRating(newRating);
    };

    return (
        <div className="rating rating-md">
            {[...Array(5)].map((_, index) => (
                <input
                    key={index}
                    type="radio"
                    name="rating"
                    className="mask mask-star-2 bg-orange-400"
                    checked={props.rating === index + 1}
                    onChange={() => handleChange(index + 1)}
                />
            ))}
        </div>
    );
};

export default FiveStarRating;
