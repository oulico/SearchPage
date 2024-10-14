'use client'
//테스트로 만들어본 것임.
import React, {ReactNode} from 'react';
import styled from "@emotion/styled";
import {useMedia} from "react-use";

interface ContainerProps {
    isWide: boolean;
}

const Container = styled.div<ContainerProps>(props => ({
    width: props.isWide ? '1280px' : '100%',
    margin: props.isWide ? '0 auto' : '0',
}));

interface BodyProps {
    children: ReactNode;
}

export const Body: React.FC<BodyProps> = ({children}) => {
    const isWide = useMedia('(min-width: 1280px)');
    return (
        <Container isWide={isWide}>
            {children}
        </Container>
    );
};
