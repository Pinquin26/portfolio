import { ScoreManager } from "./scoreManager";
const $resultWrong = document.getElementById("resultboxWrong");
const $resultRight = document.getElementById("resultboxRight");
const $score = document.getElementById("scorebox");
const $settingsBtn = document.getElementById("settingsNextBtn");
export function showResults() {
  if ($score) {
    $score.innerHTML = `<h3>Your score is: ${ScoreManager.score}/${ScoreManager.amountOfQuestions}</h3>`;
  }
  ScoreManager.wrongAnswer.forEach((answer) => {
    if ($resultWrong) {
      $resultWrong.innerHTML += `<li> ${answer.question} <br> you answered: ${answer.answer}</li> <br>`;
    }
  });
  ScoreManager.correctAnswer.forEach((answer) => {
    if ($resultRight) {
      $resultRight.innerHTML += `<li> ${answer.question}</li>`;
    }
  });
  console.log(ScoreManager.score);
  console.log(ScoreManager.wrongAnswer);
  console.log(ScoreManager.correctAnswer);
}
$settingsBtn?.addEventListener("click", () => {
  if ($score && $resultRight && $resultWrong) {
    $score.innerHTML = "";
    $resultRight.innerHTML = "";
    $resultWrong.innerHTML = "";
  }
});
