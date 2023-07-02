const listOptions = document.querySelectorAll(".list-option");
const mainGridBox = document.querySelector(".grid-elems-sect");

let categories = ["work", "play", "study", "exercise", "social", "self-care"];

let times = ["daily", "weekly", "monthly"];

function getData() {
  return new Promise((resolve, reject) => {
    fetch(`data.json`)
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
}

// console.log(getData());

function throwData(title, mainHrs, lastHrs, divClass) {
  let card = document.createElement("div");
  card.classList.add("grid-ele");
  card.classList.add(divClass);
  card.innerHTML = `
        <div class="info-wrapper">
            <div class="upper-bar__info">
                <p class="title__bar__info">${title}</p>
                <i class="fa-solid fa-ellipsis more-option"></i>
            </div>
            <div class="lower-wrapper__info">
                <h1 class="elem-title-time">${mainHrs}hrs</h1>
                <p class="elem-under-text-time">Last week - ${lastHrs}hrs</p>
            </div>
        </div>`;
  mainGridBox.appendChild(card);
}

async function dailyData() {
  try {
    const cardInfo = await getData();

    for (let i = 0; i < categories.length; i++) {
      let cardTitle = cardInfo[i].title;
      let cardMainHrs = cardInfo[i].timeframes.daily.current;
      let cardLastHrs = cardInfo[i].timeframes.daily.previous;
      let className = categories[i];
      throwData(cardTitle, cardMainHrs, cardLastHrs, className);
    }

    listOptions[0].setAttribute("data-checked", "true");
  } catch (error) {
    console.log("Error:", error);
  }
}

async function weeklyData() {
  try {
    const cardInfo = await getData();

    for (let i = 0; i < categories.length; i++) {
      let cardTitle = cardInfo[i].title;
      let cardMainHrs = cardInfo[i].timeframes.weekly.current;
      let cardLastHrs = cardInfo[i].timeframes.weekly.previous;
      let className = categories[i];
      throwData(cardTitle, cardMainHrs, cardLastHrs, className);
    }
    listOptions[1].setAttribute("data-checked", "true");
  } catch (error) {
    console.log("Error:", error);
  }
}

async function monthlyData() {
  try {
    const cardInfo = await getData();

    for (let i = 0; i < categories.length; i++) {
      let cardTitle = cardInfo[i].title;
      let cardMainHrs = cardInfo[i].timeframes.monthly.current;
      let cardLastHrs = cardInfo[i].timeframes.monthly.previous;
      let className = categories[i];
      throwData(cardTitle, cardMainHrs, cardLastHrs, className);
    }
    listOptions[2].setAttribute("data-checked", "true");
  } catch (error) {
    console.log("Error:", error);
  }
}

dailyData();

function optionChange(e) {
  switch (e.target.classList[1]) {
    case "daily-opt":
      mainGridBox.innerHTML = "";
      dailyData();
      break;

    case "weekly-opt":
      mainGridBox.innerHTML = "";
      weeklyData();
      break;

    case "monthly-opt":
      mainGridBox.innerHTML = "";
      monthlyData();
      break;

    default:
      console.log("Error :P");
  }
  for (let option of listOptions) {
    option.setAttribute("data-checked", "false");
  }
}

for (let option of listOptions) {
  option.addEventListener("click", optionChange);
}
