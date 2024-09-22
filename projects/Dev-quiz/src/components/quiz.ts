//imports
import { fetchQuizQuestions } from "../modules/api.ts";
import { QuizQuestion } from "../modules/types.ts";
import { createBtnNextQuestion, displayQuestion } from "./questions";
import { showResults } from "./result.ts";
import { ScoreManager } from "./scoreManager.ts";

//alle 3 de vieuws worden binnen gehaald
const $settings = document.getElementById("settings");
const $quiz = document.getElementById("quiz");
const $result = document.getElementById("result");
const $settingNextBtn = document.getElementById("settingNextBtn");
const $resultsBtn = document.getElementById("goToResultsBtn");
const $settingsBtn = document.getElementById("settingsNextBtn");

let currentView: "quiz" | "result" | "settings" = "settings"; //deze bepaalt welke view er getoond wordt

let questions: null | QuizQuestion[];

let $amountOfQuestions = document.getElementById(
  "numQuestions"
) as HTMLInputElement;
let $category = document.getElementById("subjects") as HTMLSelectElement;
let $difficulty = document.getElementById("difficulty") as HTMLSelectElement;

async function fetchQuestions() {
  questions = await fetchQuizQuestions(
    Number($amountOfQuestions.value),
    $difficulty.value,
    $category.value
  );
}

export function getQuestions() {
  return questions;
}

$settingNextBtn?.addEventListener("click", async () => {
  currentView = "quiz";
  await fetchQuestions();
  startQuiz();
});

$resultsBtn?.addEventListener("click", () => {
  currentView = "result";
  startQuiz();
});

$settingsBtn?.addEventListener("click", () => {
  currentView = "settings";
  startQuiz();
});

const init = () => {
  startQuiz();
};

const startQuiz = () => {
  if (currentView === "settings") {
    $quiz?.classList.add("hidden");
    $settings?.classList.remove("hidden");
    $result?.classList.add("hidden");
  } else if (currentView === "quiz") {
    $quiz?.classList.remove("hidden");
    $settings?.classList.add("hidden");
    $result?.classList.add("hidden");
    console.log(Number($amountOfQuestions.value));
    ScoreManager.amountOfQuestions = Number($amountOfQuestions.value);
    createBtnNextQuestion();
    displayQuestion();
  } else if (currentView === "result") {
    $quiz?.classList.add("hidden");
    $settings?.classList.add("hidden");
    $result?.classList.remove("hidden");
    showResults();
  }
};

export { $settingNextBtn };
export { init };
