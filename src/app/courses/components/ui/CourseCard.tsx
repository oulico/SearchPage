'use client'
import {OutlineWrapper} from "@/app/courses/components/ui/Outliner";
import {Text} from '@chakra-ui/react'
import {Card, CardBody, CardFooter, Stack, Heading} from '@chakra-ui/react'
import {Img} from '@chakra-ui/react'

import {BffCourse} from "app/api/courses/route";

export const CourseCard = ({course}: { course: BffCourse }) => {
    console.log(course)
    return (
        <OutlineWrapper>
            <Card maxW='sm' height={'100%'}>
                <CardBody>
                    <Img
                        src={course.image_file_url}
                        alt={course.title}
                        borderRadius='lg'
                    />
                    <Stack mt='6' spacing='3'>
                        <Heading size='md'>{course.title}</Heading>
                        <Text>
                            {course.short_description}
                        </Text>
                    </Stack>
                </CardBody>
                {/*<Divider/>*/}
                <CardFooter>
                    <Text>
                        {course.discounted_price === '0' ? '무료' : course.discounted_price}
                    </Text>
                </CardFooter>
            </Card>
        </OutlineWrapper>
    );
};
