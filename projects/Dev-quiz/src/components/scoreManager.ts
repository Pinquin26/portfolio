import { answerFromUser } from "../modules/types";

export class ScoreManager {
  private static _score = 0;
  private static _wrongAnswers: answerFromUser[] = [];
  private static _correctAnswers: answerFromUser[] = [];
  private static _amountOfQuestions = 0;

  public static addAnswer(question: string, answer: string, correct: boolean) {
    if (correct) {
      this._correctAnswers.push({ question, answer });
      this._score++;
    } else {
      this._wrongAnswers.push({ question, answer });
    }
  }
  public static resetScore(score: number) {
    this._score = score;
  }
  public static resetAnswers(questions: number) {
    this._correctAnswers = [];
    this._wrongAnswers = [];
    this._amountOfQuestions = questions;
  }
  public static get score() {
    return ScoreManager._score;
  }
  public static get wrongAnswer() {
    return ScoreManager._wrongAnswers;
  }
  public static get correctAnswer() {
    return ScoreManager._correctAnswers;
  }
  public static get amountOfQuestions() {
    return ScoreManager._amountOfQuestions;
  }
  public static set amountOfQuestions(amount: number) {
    ScoreManager._amountOfQuestions = amount;
  }
}
