let examKey = "ar"; // Exam Storage Key
let truesArr = window.localStorage.getItem(`${examKey}-truesArr`).split(",");
let falseArr = window.localStorage.getItem(`${examKey}-falseArr`).split(",");
let allTrues = window.localStorage.getItem(`${examKey}-allTrues`).split(",");
let questionsArea = document.querySelector(".questions");
let result = document.querySelector("#result > span");
let studentName, StudentMark;
// q Function
getQuestions();
// cheking Name validation

// Create Q Function
let currentIndex = 0;
function getQuestions() {
  let request = new XMLHttpRequest();
  request.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      let questions = JSON.parse(this.responseText);
      let qcount = questions.length;
      createQ(questions, qcount);
      if (allTrues[0] != "") {
        for (let i = 0; i < allTrues.length; i++) {
          document
            .getElementById(allTrues[i])
            .parentElement.classList.add("right");
        }
      }
      if (truesArr[0] != "") {
        for (let i = 0; i < truesArr.length; i++) {
          document
            .getElementById(truesArr[i])
            .parentElement.classList.remove("right");
          document
            .getElementById(truesArr[i])
            .parentElement.classList.add("true");
        }
      }
      if (falseArr[0] != "") {
        for (let i = 0; i < falseArr.length; i++) {
          document
            .getElementById(falseArr[i])
            .parentElement.classList.add("false");
        }
      }
      // truesArr.forEach((el) => {
      //   el.parentElement.classList.remove("right");
      //   el.parentElement.classList.add("true");
      // });
      // falseArr.forEach((el) => {
      //   el.parentElement.classList.add("false");
      // });
      if (window.localStorage.getItem(examKey) == "done") {
        questionsArea.classList.add("done");
      }
      document.querySelector(".studentname").innerHTML =
        window.localStorage.getItem(`${examKey}-sName`);
      result.innerHTML = window.localStorage.getItem(`${examKey}-sMark`);
    }
  };
  request.open("GET", "./questions.json");
  request.send();
}

function createQ(obj, count) {
  for (let i = 0; i < count; i++) {
    //main div
    let question = document.createElement("div");
    question.className = "question";
    questionsArea.appendChild(question);
    // q title
    let title = document.createElement("div");
    title.innerHTML = obj[i].title;
    title.className = "title";
    question.appendChild(title);
    // answers box
    let answersBox = document.createElement("div");
    answersBox.className = "answers";
    question.appendChild(answersBox);
    // input & label
    for (let j = 1; j < 6; j++) {
      let mainDiv = document.createElement("div");
      let input = document.createElement("input");
      input.type = "radio";
      input.dataset.answer = obj[i].ra;
      // NAME
      input.id = `${obj[i].id}a-${j}`;
      input.name = obj[i].name;
      input.value = j;
      let label = document.createElement("label");
      label.innerHTML = obj[i][`a-${j}`];
      label.htmlFor = `${obj[i].id}a-${j}`;
      mainDiv.appendChild(label);
      mainDiv.appendChild(input);
      answersBox.appendChild(mainDiv);
    }
  }
}

// Start Msg Show Function
// function msgShow(element) {
//   const words = [
//     "لاتيأس",
//     "كافح من أجل أحلامك",
//     "لاتكن كسولا",
//     "سيتحقق الحلم فقط تابع",
//   ];
//   let counter = 10;
//   let showTime = setInterval(() => {
//     element.innerHTML = words[Math.floor(Math.random() * words.length)];
//     element.classList.add("active");
//     let countDown = setInterval(() => {
//       counter--;
//       if (counter < 0) {
//         clearInterval(countDown);
//         counter = 10;
//         element.classList.remove("active");
//       }
//     }, 500);
//   }, 10000);
// }
// End Msg Show Function

// redobtn.onclick = () => {
//   redobtn.classList.remove("active");
//   // backBtn.classList.remove("active");
//   window.scrollTo(0, 0);
//   setTimeout(() => {
//     window.location.reload();
//   }, 500);
// };
