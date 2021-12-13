interface NotAnswered {
  question: string;
  student: string;
  class: string;
  tags: string;
  answered: boolean;
  submitAt: string;
}

interface Answered extends NotAnswered {
  answeredAt: string;
  answeredBy: string;
  answer: string;
}

export { NotAnswered, Answered };
