import { QuizQuestion } from "../modules/types.ts";
import { getQuestions } from "./quiz.ts";
import { ScoreManager } from "./scoreManager.ts";

const quizbox = document.getElementById("quizbox");
const $nextQuestionBtn = document.getElementById("quizNextBtn");
const $resultsBtn = document.getElementById("goToResultsBtn");
const $settingsBtn = document.getElementById("settingsNextBtn");

let questionCounter = 0;

const displayQuestion = async () => {
    const questions: QuizQuestion[] | null = getQuestions();
    if (quizbox && questions) {
        quizbox.innerHTML =
            "<p>" + questions[questionCounter].question + "</p>";
        Object.entries(questions[questionCounter].answers).forEach(
            ([key, value]) => {
                if (value !== null) {
                    quizbox.innerHTML += `
            <div class="answer">
                <input type="radio" id="${key}" name="answer" value="${value}">
                <label for="${key}">${escapeHtml(value)}</label>
            </div>
        `;
                }
            }
        );
    }
};

const escapeHtml = (unsafe) => {
    return unsafe
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
};

function checkAnswers() {
    let answerCorrect = false;
    const questions: QuizQuestion[] | null = getQuestions();
    if (questions) {
        Object.entries(questions[questionCounter].correct_answers).forEach(
            ([key, value]) => {
                if (
                    value == "true" &&
                    document.getElementById(key.substring(0, 8))?.checked
                ) {
                    ScoreManager.addAnswer(
                        questions[questionCounter].question,
                        value,
                        true
                    );
                    answerCorrect = true;
                }
            }
        );
        if (!answerCorrect) {
            Object.entries(questions[questionCounter].answers).forEach(
                ([key, value]) => {
                    if (document.getElementById(key)?.checked) {
                        ScoreManager.addAnswer(
                            questions[questionCounter].question,
                            value ?? "",
                            false
                        );
                        return;
                    }
                }
            );
        }
    }
}

export function createBtnNextQuestion() {
    displayQuestion();
}

if ($nextQuestionBtn) {
    $nextQuestionBtn.addEventListener("click", () => {
        checkAnswers();
        questionCounter++;
        console.log(
            `questionat: ${questionCounter}, amountOfQuestions ${ScoreManager.amountOfQuestions}`
        );

        if (
            questionCounter === ScoreManager.amountOfQuestions ||
            questionCounter === 20
        ) {
            $resultsBtn?.classList.remove("hidden");
            $nextQuestionBtn?.classList.add("hidden");
        } else {
            displayQuestion();
        }
    });
}

$settingsBtn?.addEventListener("click", () => {
    questionCounter = 0;
    $resultsBtn?.classList.add("hidden");
    $nextQuestionBtn?.classList.remove("hidden");
    ScoreManager.resetScore(0);
    ScoreManager.resetAnswers(0);
    $nextQuestionBtn?.removeEventListener("click", () => {});
});

export { questionCounter };
export { displayQuestion };
