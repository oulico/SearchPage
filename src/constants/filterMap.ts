// filterMap.ts

export const FILTER_MAP = {
    courseType: {
        "1": {
            query: {courseType: "1"},
            // filter: { course_type: [0, 2] }
            filter: {"$or": [{"course_type": 0}, {"course_type": 2}]}
        },
        "2": {
            query: {courseType: "2"},
            filter: {course_type: 1}
        },
        "3": {
            query: {courseType: "3"},
            filter: {course_type: 3}
        }
    },
    format: {
        "4": {
            query: {format: "4"},
            filter: {course_type: 0}
        },
        "5": {
            query: {format: "5"},
            filter: {course_type: 2}
        }
    },
    category: {
        "6": {
            query: {category: "6"},
            filter: {tag_id: 12}
        },
        "7": {
            query: {category: "7"},
            filter: {tag_id: 13}
        },
        "8": {
            query: {category: "8"},
            filter: {tag_id: 14}
        },
        "9": {
            query: {category: "9"},
            filter: {tag_id: 22}
        },
        "10": {
            query: {category: "10"},
            filter: {tag_id: 23}
        }
    },
    level: {
        "11": {
            query: {level: "11"},
            filter: {tag_id: 100}
        },
        "12": {
            query: {level: "12"},
            filter: {tag_id: 101}
        },
        "13": {
            query: {level: "13"},
            filter: {tag_id: 102}
        },
        "14": {
            query: {level: "14"},
            filter: {tag_id: 103}
        },
        "15": {
            query: {level: "15"},
            filter: {tag_id: 104}
        }
    },
    programmingLanguage: {
        "16": {
            query: {programmingLanguage: "16"},
            filter: {tag_id: 7}
        },
        "17": {
            query: {programmingLanguage: "17"},
            filter: {tag_id: 8}
        },
        "18": {
            query: {programmingLanguage: "18"},
            filter: {tag_id: 9}
        },
        "19": {
            query: {programmingLanguage: "19"},
            filter: {tag_id: 10}
        },
        "20": {
            query: {programmingLanguage: "20"},
            filter: {tag_id: 19}
        },
        "21": {
            query: {programmingLanguage: "21"},
            filter: {tag_id: 20}
        },
        "22": {
            query: {programmingLanguage: "22"},
            filter: {tag_id: 21}
        },
        "23": {
            query: {programmingLanguage: "23"},
            filter: {tag_id: 24}
        },
        "24": {
            query: {programmingLanguage: "24"},
            filter: {tag_id: 25}
        },
        "25": {
            query: {programmingLanguage: "25"},
            filter: {tag_id: 26}
        },
        "26": {
            query: {programmingLanguage: "26"},
            filter: {tag_id: 28}
        },
        "27": {
            query: {programmingLanguage: "27"},
            filter: {tag_id: 29}
        },
        "28": {
            query: {programmingLanguage: "28"},
            filter: {tag_id: 30}
        }
    },
    price: {
        "29": {
            query: {price: "29"},
            filter: {enroll_type: 0, is_free: true}
        },
        "30": {
            query: {price: "30"},
            filter: {enroll_type: 0, is_free: false}
        },
        "31": {
            query: {price: "31"},
            filter: {enroll_type: 4}
        },
        "32": {
            query: {price: "32"},
            filter: {enroll_type: 6}
        }
    }
};
