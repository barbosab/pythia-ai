const questions: string[] = [];
const answers: string[] = [];

export function addQuestion(question: string) {
  questions.push(question);
}

export function getQuestions() {
  return questions;
}

export function addAnswer(answer: string) {
  answers.push(answer);
}

export function getAnswers() {
  return answers;
}

export function bufferResponse(response: string, nextToken: string) {
  response += nextToken;
  return response;
}
