let questionsArea = document.querySelector(".questions");
let submitBtn = document.querySelector(".submit-btn");
let result = document.querySelector(".result span");
let resultBox = document.querySelector(".result");
let dataBox = document.querySelector(".data");
let currentIndex = 0;

function getQuestions() {
  let request = new XMLHttpRequest();
  request.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      let questions = JSON.parse(this.responseText);
      let qcount = questions.length;
      createQ(questions, qcount);
      let inputs = document.querySelectorAll("input");
      let allTrues = [];
      let truesArr = [];
      let falseArr = [];
      submitBtn.onclick = function () {
        let trues = 0;
        inputs.forEach((ele) => {
          if (ele.value === ele.dataset.answer) {
            allTrues.push(ele);
          }
          if (ele.checked) {
            if (ele.value === ele.dataset.answer) {
              truesArr.push(ele);
              trues++;
            } else {
              falseArr.push(ele);
            }
          }
        });
        allTrues.forEach((el) => {
          el.parentElement.classList.add("right");
        });
        truesArr.forEach((el) => {
          el.parentElement.classList.remove("right");
          el.parentElement.classList.add("true");
        });
        falseArr.forEach((el) => {
          el.parentElement.classList.add("false");
        });
        dataBox.classList.add("active");
        questionsArea.classList.add("done");
        result.parentElement.classList.add("show");
        result.innerHTML = `100 / ${Math.floor((100 / qcount) * trues)} `;
        let theResult = Math.floor((100 / qcount) * trues);
        StudentMark = theResult;
        if (theResult >= 50 && theResult < 80) {
          resultBox.style.color = "lightgreen";
        } else if (theResult >= 80) {
          resultBox.style.color = "green";
        }
        submitBtn.style.display = "none";
        window.scrollTo(0, 0);
      };
    }
  };
  request.open("GET", "./questions.json");
  request.send();
}
getQuestions();
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
    switch (i) {
      case 4:
        let img5 = document.createElement("img");
        img5.setAttribute = "src";
        img5.src = "./q5.png";
        title.appendChild(img5);
        break;
      case 7:
        let img7 = document.createElement("img");
        img7.setAttribute = "src";
        img7.src = "./q8.png";
        title.appendChild(img7);
        break;
      case 8:
        let img8 = document.createElement("img");
        img8.setAttribute = "src";
        img8.src = "./q9.png";
        title.appendChild(img8);
        break;
      case 9:
        let img9 = document.createElement("img");
        img9.setAttribute = "src";
        img9.src = "./q10.png";
        title.appendChild(img9);
        break;
      case 11:
        let img11 = document.createElement("img");
        img11.setAttribute = "src";
        img11.src = "./q12.png";
        title.appendChild(img11);
        break;
      case 15:
        let img15 = document.createElement("img");
        img15.setAttribute = "src";
        img15.src = "./q16.png";
        title.appendChild(img15);
        break;
      case 22:
        let img22 = document.createElement("img");
        img22.setAttribute = "src";
        img22.src = "./q23.png";
        title.appendChild(img22);
        break;
    }
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
function msgShow(element) {
  const words = [
    "لاتيأس",
    "كافح من أجل أحلامك",
    "لاتكن كسولا",
    "سيتحقق الحلم فقط تابع",
  ];
  let counter = 10;
  let showTime = setInterval(() => {
    element.innerHTML = words[Math.floor(Math.random() * words.length)];
    element.classList.add("active");
    let countDown = setInterval(() => {
      counter--;
      if (counter < 0) {
        clearInterval(countDown);
        counter = 10;
        element.classList.remove("active");
      }
    }, 500);
  }, 10000);
}
// End Msg Show Function

// redobtn.onclick = () => {
//   redobtn.classList.remove("active");
//   // backBtn.classList.remove("active");
//   window.scrollTo(0, 0);
//   setTimeout(() => {
//     window.location.reload();
//   }, 500);
// };
// timer Function
window.localStorage.clear();
function countDown(hours, min, sec, total, halftime, beforeEndTime, h, m, s) {
  let seccount = setInterval(() => {
    submitBtn.style.visibility = "hidden";
    total--;
    sec--;
    if (total <= halftime) {
      submitBtn.style.visibility = "visible";
      document.querySelector(".timemsg").innerHTML = "لقد مضى نصف الوقت";
      document.querySelector(".timemsg").classList.add("active");
      setTimeout(() => {
        document.querySelector(".timemsg").classList.remove("active");
      }, 10000);
    }
    if (total <= beforeEndTime) {
      document.querySelector(".beforeendtime").classList.add("active");
      setTimeout(() => {
        document.querySelector(".timemsg").classList.remove("active");
      }, 10000);
    }
    if (sec < 0) {
      min--;
      sec = 60;
    }
    if (min < 0) {
      hours--;
      min = 59;
    }
    h.innerHTML = hours < 10 ? `0${hours}` : hours;
    m.innerHTML = min < 10 ? `0${min}` : min;
    s.innerHTML = sec < 10 ? `0${sec}` : sec;
    if (hours <= 0 && min <= 0 && sec <= 0) {
      clearInterval(seccount);
      submitBtn.click();
    }
  }, 1000);
}
