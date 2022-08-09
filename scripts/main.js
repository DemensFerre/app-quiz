import question from "./question.js";

const headerContainer = document.querySelector("#header");
const listContainer = document.querySelector("#list");
const submitBtn = document.querySelector("#submit");

let score = 0; // кол-во правильных ответов
let questionIndex = 0; // теукщий вопрос

const clearPage = () => {
  headerContainer.innerHTML = "";
  listContainer.innerHTML = "";
};

const showQuestion = () => {
  const headerTemplate = `<h2 class="title">${question[questionIndex].question}</h2>`;
  let answerIndex = 1;

  headerContainer.insertAdjacentHTML("beforeend", headerTemplate);

  for (let answerText of question[questionIndex].answers) {
    const answerTemplate = `
      <li>
        <label>
          <input value="${answerIndex}" type="radio" class="answer" name="answer" />
          <span>${answerText}</span>
        </label>
      </li>
    `;

    listContainer.insertAdjacentHTML("beforeend", answerTemplate);

    answerIndex++;
  }
};

const checkAnswer = () => {
  const inputRadio = listContainer.querySelector('input[type="radio"]:checked');

  if (!inputRadio) {
    submitBtn.blur();
    return;
  }

  const inputValue = +inputRadio.value;

  if (question[questionIndex].correct === inputValue) {
    score++;
  }

  if (questionIndex !== question.length - 1) {
    questionIndex++;
    clearPage();
    showQuestion();
    return;
  } else {
    clearPage();
    showResults();
  }
};

const showResults = () => {
  let resultTemplate, title, message;

  if (score === question.length) {
    title = "Ура, вы на все повросы ответили правильно!";
    message = `Вы на все повросы ответили правильно, продолжайте в том же духе!`;
  } else if ((score * 100) / question.length >= 50) {
    title = "Неплохой результат";
    message = `Вы ответили больше чем на половину вопросов`;
  } else {
    title = "Попробуйте еще раз";
    message = `Вы ответили меньше чем на половину вопросов`;
  }

  resultTemplate = `
      <h2 class="title">${title}</h2>
      <h3 class="summary">${message}</h3>
      <p class="result">${score} из ${question.length}</p>
    `;

  headerContainer.innerHTML = resultTemplate;

  submitBtn.blur();
  submitBtn.innerText = "Начать заново";
  submitBtn.addEventListener("click", () => {
    history.go();
  });
};

clearPage();
showQuestion();
submitBtn.addEventListener("click", checkAnswer);
