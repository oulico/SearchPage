'use client'
import {OutlineWrapper} from "@/app/courses/components/ui/Outliner";
import {Text} from '@chakra-ui/react'
import {Card, CardBody, CardFooter, Stack, Heading} from '@chakra-ui/react'
import {Img} from '@chakra-ui/react'

import {BffCourse} from "app/api/courses/route";

export const CourseCard = ({course}: { course: BffCourse }) => {
    console.log(course);
    return (
        <Card maxW='sm' height={'100%'}>
            <CardBody>
                <Img
                    src={course.logoFileUrl}
                    alt={course.title}
                    borderRadius='lg'
                />
                <Stack mt='6' spacing='3'>
                    <Heading size='md'>{course.title}</Heading>
                    <Text>
                        {course.shortDescription} {/* 필드명 수정 */}
                    </Text>
                </Stack>
            </CardBody>
            {/*<Divider/>*/}
            <CardFooter>
                <Text>
                    {course.discountedPrice === '0' ? '무료' : course.discountedPrice} {/* 필드명 수정 */}
                </Text>
            </CardFooter>
        </Card>
    );
};
