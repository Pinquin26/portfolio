import { QuizQuestion } from "./types.ts";
export async function fetchQuizQuestions(
  amountOfQuestions: number,
  difficulty: string,
  category: string
): Promise<QuizQuestion[] | null> {
  try {
    const response = await fetch(
      `https://quizapi.io/api/v1/questions?apiKey=K0sl9XTi42jntlJ1pojaOieftOG88eSGJSFs06V6&limit=${amountOfQuestions}&difficulty=${difficulty}&category=${category}`
    );
    const json = await response.json();
    console.log(json);
    return json;
  } catch (error) {
    console.log(error);
    return null;
  }
}
