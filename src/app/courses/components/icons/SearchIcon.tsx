'use client'
// components/Icon.tsx
import React from 'react';

type IconProps = {
    color?: string;
    size?: number;
};

export const SearchIcon: React.FC<IconProps> = ({color = 'currentColor', size = 24}) => {
    return (
        <svg
            width={size}
            height={size}
            fill={color}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <use href={`/icons/search.svg#icon`}/>
        </svg>
    );
};

