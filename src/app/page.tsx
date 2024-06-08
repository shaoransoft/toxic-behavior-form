"use client";

import { useState, useEffect } from 'react';
import { Card, CardBody, RadioGroup, Radio, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from '@nextui-org/react';

interface Option {
    label: string;
    value: number;
}

interface Question {
    question: string;
    options: Option[];
}

const questions: Question[] = [
    {
        question: "1. เมื่อเพื่อนร่วมงานของคุณทำผิดพลาดในการทำงาน คุณจะ",
        options: [
            { label: "วิจารณ์เขาต่อหน้าคนอื่นอย่างตรงไปตรงมา", value: 0 },
            { label: "มองข้ามและไม่พูดอะไร", value: 1 },
            { label: "บอกให้หัวหน้าของคุณรู้เกี่ยวกับความผิดพลาดนั้น", value: 2 },
            { label: "พูดคุยกับเขาเป็นการส่วนตัวและเสนอแนะวิธีแก้ไข", value: 3 }
        ]
    },
    {
        question: "2. เมื่อมีการประชุมทีมที่คุณไม่เห็นด้วยกับความคิดเห็นของคนอื่น คุณจะ",
        options: [
            { label: "ยืนยันความเห็นของคุณและไม่รับฟังความคิดเห็นของคนอื่น", value: 0 },
            { label: "ปล่อยให้คนอื่นตัดสินใจและไม่แสดงความคิดเห็นของคุณ", value: 1 },
            { label: "แสดงท่าทีไม่พอใจและถอนตัวออกจากการประชุม", value: 2 },
            { label: "รับฟังความคิดเห็นของคนอื่นและเสนอความเห็นของคุณอย่างมีเหตุผล", value: 3 }
        ]
    },
    {
        question: "3. เมื่อเพื่อนร่วมงานของคุณได้รับการยกย่องสำหรับความสำเร็จ คุณจะ",
        options: [
            { label: "รู้สึกอิจฉาและพยายามหาโอกาสทำลายเขา", value: 0 },
            { label: "เงียบและไม่แสดงท่าทีอะไร", value: 1 },
            { label: "บอกกับคนอื่นว่าความสำเร็จนั้นเป็นเรื่องที่ธรรมดามาก", value: 2 },
            { label: "แสดงความยินดีและขอเรียนรู้จากเขา", value: 3 }
        ]
    },
    {
        question: "4. เมื่อคุณได้รับ Feedback ที่เป็นลบจากหัวหน้า คุณจะ",
        options: [
            { label: "โต้แย้งและปฏิเสธ Feedback นั้น", value: 0 },
            { label: "ไม่สนใจ Feedback และทำงานต่อไปตามปกติ", value: 1 },
            { label: "พยายามหาเหตุผลว่า Feedback นั้นไม่ถูกต้อง", value: 2 },
            { label: "รับฟังและพยายามปรับปรุงตาม Feedback", value: 3 }
        ]
    },
    {
        question: "5. เมื่อมีเพื่อนร่วมงานที่ต้องการความช่วยเหลือในงานของเขา คุณจะ",
        options: [
            { label: "บอกให้เขาหาวิธีแก้ปัญหาเอง", value: 0 },
            { label: "ไม่ใส่ใจและปล่อยให้เขาจัดการเอง", value: 1 },
            { label: "ช่วยเขาเล็กน้อยและปล่อยให้เขาทำต่อเอง", value: 2 },
            { label: "เสนอความช่วยเหลือและร่วมมือกันแก้ไขปัญหา", value: 3 }
        ]
    },
    {
        question: "6. เมื่อคุณได้รับมอบหมายงานที่ยากและต้องทำงานกับทีม คุณจะ",
        options: [
            { label: "พยายามทำทุกอย่างด้วยตัวเองและไม่ขอความช่วยเหลือจากทีม", value: 0 },
            { label: "บ่นว่าได้รับงานยากและไม่พอใจ", value: 1 },
            { label: "ทำงานไปโดยไม่สื่อสารกับทีม", value: 2 },
            { label: "ร่วมมือกับทีมและแบ่งงานกันอย่างชัดเจน", value: 3 }
        ]
    },
    {
        question: "7. เมื่อคุณมีปัญหากับเพื่อนร่วมงาน คุณจะ",
        options: [
            { label: "โต้เถียงกับเพื่อนร่วมงานเพื่อยืนยันว่าคุณถูก", value: 0 },
            { label: "พยายามหลีกเลี่ยงการเผชิญหน้าและไม่พูดถึงปัญหา", value: 1 },
            { label: "บอกกับหัวหน้าให้ช่วยจัดการปัญหา", value: 2 },
            { label: "พูดคุยกับเพื่อนร่วมงานเพื่อหาทางแก้ไขปัญหา", value: 3 }
        ]
    },
    {
        question: "8. เมื่อคุณเห็นเพื่อนร่วมงานทำงานผิดพลาด คุณจะ",
        options: [
            { label: "ใช้ความผิดพลาดนั้นเป็นข้อได้เปรียบของคุณเอง", value: 0 },
            { label: "ไม่พูดอะไรและปล่อยให้เขาเรียนรู้จากความผิดพลาด", value: 1 },
            { label: "นำความผิดพลาดนั้นมาพูดในที่ประชุม", value: 2 },
            { label: "บอกเขาเกี่ยวกับความผิดพลาดและเสนอวิธีแก้ไข", value: 3 }
        ]
    },
    {
        question: "9. เมื่อมีการเปลี่ยนแปลงในนโยบายของบริษัทที่คุณไม่เห็นด้วย คุณจะ",
        options: [
            { label: "โต้แย้งและแสดงท่าทีไม่พอใจ", value: 0 },
            { label: "ไม่สนใจและทำงานต่อไปตามเดิม", value: 1 },
            { label: "พยายามหาทางเปลี่ยนแปลงนโยบาย", value: 2 },
            { label: "รับฟังเหตุผลและปรับตัวตามนโยบายใหม่", value: 3 }
        ]
    },
    {
        question: "10. เมื่อคุณได้รับโอกาสในการเรียนรู้สิ่งใหม่ๆ คุณจะ",
        options: [
            { label: "ปฏิเสธโอกาสนั้นเพราะรู้สึกว่าไม่มีประโยชน์", value: 0 },
            { label: "ยอมรับโอกาสนั้นแต่ไม่ใส่ใจเรียนรู้", value: 1 },
            { label: "บอกให้เพื่อนร่วมงานรับโอกาสนั้นแทนคุณ", value: 2 },
            { label: "รับโอกาสนั้นและพยายามเรียนรู้ให้มากที่สุด", value: 3 }
        ]
    }
];

const shuffleOptions = (options: Option[]): Option[] => {
    const shuffledOptions = [...options];
    for (let i = shuffledOptions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledOptions[i], shuffledOptions[j]] = [shuffledOptions[j], shuffledOptions[i]];
    }
    return shuffledOptions;
};

export default function Home() {
    const [questionsWithShuffledOptions, setQuestionsWithShuffledOptions] = useState<Question[]>([]);
    const [answers, setAnswers] = useState<(number | null)[]>(Array(questions.length).fill(null));
    const [score, setScore] = useState<number>(0);
    const [error, setError] = useState<string | null>(null);
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    useEffect(() => {
        const newQuestions = questions.map(questionItem => ({
            ...questionItem,
            options: shuffleOptions(questionItem.options)
        }));
        setQuestionsWithShuffledOptions(newQuestions);
    }, []);

    const handleChange = (index: number, value: number) => {
        const newAnswers = [...answers];
        newAnswers[index] = value;
        setAnswers(newAnswers);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const unansweredQuestions = answers.some(answer => answer === null);
        if (unansweredQuestions) {
            setError('กรุณาเลือกคำตอบให้ครบถ้วนทุกข้อ');
            return;
        }
        setError(null);
        const totalScore = answers.reduce((acc: number, curr: number | null) => acc + (curr !== null ? curr : 0), 0);
        setScore(totalScore);
        onOpen();
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-between px-md-24 px-3 py-10">
            <h1 className="text-3xl mb-6">แบบสำรวจพฤติกรรมที่เป็นพิษ (TOXIC Behavior)</h1>
            <form onSubmit={handleSubmit}>
                {questionsWithShuffledOptions.map((questionItem, index) => (
                    <Card key={index} className='mb-6'>
                        <CardBody>
                            <RadioGroup label={questionItem.question} isRequired>
                                {questionItem.options.map((option, optionIndex) => (
                                    <div key={optionIndex}>
                                        <Radio
                                            size="lg"
                                            color="success"
                                            checked={answers[index] === option.value}
                                            onChange={() => handleChange(index, option.value)}
                                            value={optionIndex.toString()}
                                        >{option.label}</Radio>
                                    </div>
                                ))}
                            </RadioGroup>
                        </CardBody>
                    </Card>
                ))}
                <Button size="md" color="success" type="submit" fullWidth>คำนวณคะแนน</Button>
            </form>
            {error && <p className="text-danger">{error}</p>}
            {score !== null && (
                <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true}>
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">ผลการประเมิน</ModalHeader>
                                <ModalBody>
                                    <p className="text-3xl">คะแนนของคุณคือ: {score}/30</p>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="secondary" onPress={onClose} fullWidth>ปิด</Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            )}
        </main>
    );
}
