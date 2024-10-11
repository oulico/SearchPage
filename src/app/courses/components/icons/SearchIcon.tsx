'use client'
import SearchSvg from '/public/icons/search.svg';

type IconProps = {
    color?: string;
    size?: number;
};

export const SearchIcon: React.FC<IconProps> = ({color = 'currentColor', size = 24}) => {
    return <SearchSvg width={size} height={size} fill={color}/>;
};
