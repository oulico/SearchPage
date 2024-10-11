import React from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import {Courses} from './Courses';
import {useCourse} from 'app/courses/hooks/useCourse';

// Mock the useCourse hook
jest.mock('app/courses/hooks/useCourse');

const mockedUseCourse = useCourse as jest.MockedFunction<typeof useCourse>;

describe('Courses Component', () => {
    it('renders loading state', () => {
        mockedUseCourse.mockImplementation(() => {
            throw new Promise(() => {
            }); // This will cause the component to show the loading state
        });

        render(<Courses/>);
        expect(screen.getByText('Loading courses...')).toBeInTheDocument();
    });

    it('renders courses when loaded successfully', async () => {
        const mockCourses = [
            {id: '1', title: 'React Basics'},
            {id: '2', title: 'Advanced JavaScript'},
        ];

        mockedUseCourse.mockReturnValue({courses: mockCourses});

        render(<Courses/>);

        await waitFor(() => {
            expect(screen.getByText('React Basics')).toBeInTheDocument();
            expect(screen.getByText('Advanced JavaScript')).toBeInTheDocument();
        });
    });

    it('renders error state', async () => {
        mockedUseCourse.mockImplementation(() => {
            throw new Error('Failed to load courses');
        });

        render(<Courses/>);

        await waitFor(() => {
            expect(screen.getByText('Error loading courses: Failed to load courses')).toBeInTheDocument();
            expect(screen.getByText('Try again')).toBeInTheDocument();
        });
    });
});
