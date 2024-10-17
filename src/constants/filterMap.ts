// filterMap.ts

export const FILTER_MAP = {
    courseType: {
        "1": {
            //주제별
            query: {courseType: "6"},
            filter: {"$or": [{"course_type": 0}, {"course_type": 2}]}
        },
        "2": {
            //챌린지
            query: {courseType: "7"},
            filter: {course_type: 1}
        },
        "3": {
            //테스트
            query: {courseType: "8"},
            filter: {course_type: 3}
        }
    },
    format: {
        "4": {
            //자유 선택
            query: {format: "1"},
            filter: {course_type: 0}
        },
        "5": {
            //순차 학습
            query: {format: "2"},
            filter: {course_type: 2}
        }
    },
    category: {
        "6": {
            //프로그래밍 기초
            query: {category: "4"},
            filter: {tag_id: 12}
        },
        "7": {
            //데이터 분석
            query: {category: "5"},
            filter: {tag_id: 13}
        },
        "8": {
            //웹
            query: {category: "6"},
            filter: {tag_id: 14}
        },
        "9": {
            //AI
            query: {category: "7"},
            filter: {tag_id: 22}
        },
        "10": {
            //알고리즘
            query: {category: "8"},
            filter: {tag_id: 23}
        }
    },
    level: {
        "11": {
            //입문
            query: {level: "11"},
            filter: {tag_id: 100}
        },
        "12": {
            //초급
            query: {level: "12"},
            filter: {tag_id: 101}
        },
        "13": {
            //중급
            query: {level: "13"},
            filter: {tag_id: 102}
        },
        "14": {
            //고급
            query: {level: "14"},
            filter: {tag_id: 103}
        },
        "15": {
            //전문가
            query: {level: "15"},
            filter: {tag_id: 104}
        }
    },
    programmingLanguage: {
        "16": {
            //C
            query: {programmingLanguage: "16"},
            filter: {tag_id: 7}
        },
        "17": {
            //C++
            query: {programmingLanguage: "17"},
            filter: {tag_id: 8}
        },
        "18": {
            //Java
            query: {programmingLanguage: "18"},
            filter: {tag_id: 9}
        },
        "19": {
            //Python
            query: {programmingLanguage: "19"},
            filter: {tag_id: 10}
        },
        "20": {
            //JavaScript
            query: {programmingLanguage: "20"},
            filter: {tag_id: 19}
        },
        "21": {
            //R
            query: {programmingLanguage: "21"},
            filter: {tag_id: 20}
        },
        "22": {
            //HTML/CSS
            query: {programmingLanguage: "22"},
            filter: {tag_id: 21}
        },
        "23": {
            //SQL
            query: {programmingLanguage: "23"},
            filter: {tag_id: 24}
        },
        "24": {
            //Arduino
            query: {programmingLanguage: "24"},
            filter: {tag_id: 25}
        },
        "25": {
            //Scratch
            query: {programmingLanguage: "25"},
            filter: {tag_id: 26}
        },
        "26": {
            //Kotlin
            query: {programmingLanguage: "26"},
            filter: {tag_id: 27}
        },
        "27": {
            //Swift
            query: {programmingLanguage: "27"},
            filter: {tag_id: 29}
        },
        "28": {
            //ENT
            query: {programmingLanguage: "28"},
            filter: {tag_id: 30}
        }
    },
    price: {
        "29": {
            //무료
            query: {price: "29"},
            filter: {enroll_type: 0, is_free: true}
        },
        "30": {
            //유료
            query: {price: "30"},
            filter: {enroll_type: 0, is_free: false}
        },
        "31": {
            //구독
            query: {price: "31"},
            filter: {enroll_type: 4}
        },
        "32": {
            //학점
            query: {price: "32"},
            filter: {enroll_type: 6}
        }
    }
};
