'use client'

import {ReactNode} from 'react';
import styled from '@emotion/styled';

interface OutlineWrapperProps {
    children: ReactNode;
    color?: string;
    thickness?: string;
}


const Outliner = styled.div<OutlineWrapperProps>`
    outline: ${({color, thickness}) => `${thickness} solid ${color}`};
`;


export const OutlineWrapper: React.FC<OutlineWrapperProps> = ({
                                                                  children,
                                                                  color = 'red',
                                                                  thickness = '1px'
                                                              }) => {
    return <Outliner color={color} thickness={thickness}>{children}</Outliner>;
};

