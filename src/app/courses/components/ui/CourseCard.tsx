'use client'
import {Text, Card, CardBody, CardFooter, Stack, Heading, Box} from '@chakra-ui/react'
import {Img} from '@chakra-ui/react'
import {BffCourse} from "app/api/courses/route";

export const CourseCard = ({course}: { course: BffCourse }) => {
    const imageUrl = course.imageFileUrl || course.logoFileUrl;
    const isLogoImage = !course.imageFileUrl && course.logoFileUrl;

    // Placeholder 이미지 URL
    const placeholderImageUrl = "https://placehold.co/600x400/png?text=No+Image";

    return (
        <Card maxW='sm' height={'100%'}>
            <CardBody padding={0}>
                <Box
                    margin={isLogoImage ? 'auto' : '0'}
                >
                    <Img
                        src={imageUrl || placeholderImageUrl}
                        alt={course.title}
                        objectFit="contain"
                        borderTopRadius={'md'}
                        width="100%"
                        height={isLogoImage ? "auto" : "155px"}
                    />
                </Box>
                <Stack mt='6' spacing='3'>
                    <Box margin={'12px'}>
                        <Heading size='md'>{course.title}</Heading>
                        <Text>
                            {course.shortDescription}
                        </Text>
                    </Box>
                </Stack>
            </CardBody>
            <CardFooter>
                <Text>
                    {course.discountedPrice === '0' ? '무료' : `${course.discountedPrice}원`}
                </Text>
            </CardFooter>
        </Card>
    );
};
