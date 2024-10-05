import React from 'react';
import {
    Tag,
    TagLabel,
} from '@chakra-ui/react';

export const ToggleButton = ({label, isSelected, onToggle}: {
    label: string,
    isSelected: boolean,
    onToggle: () => void
}) => {

    return (
        <Tag
            size="lg"
            variant="solid"
            colorScheme={isSelected ? "blue" : "gray"}
            onClick={onToggle}
            cursor="pointer"
        >
            <TagLabel>{label}</TagLabel>
        </Tag>
    );
};

