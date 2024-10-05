import styled from '@emotion/styled';

const Container = styled.div`
    width: 100%;
    padding: 0 20px;
    margin: 0 auto;

    @media (min-width: 1280px) {
        max-width: 1280px;
        padding: 0;
    }
`;

export default function Layout({children}: { children: React.ReactNode }) {
    return (
        <Container>
            {children}
        </Container>
    );
}
