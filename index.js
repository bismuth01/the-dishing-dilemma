function startGame() {
  changeBackground("./images/washing-dishes.jpg");
  showText("You're washing dishes when the doorbell rings...");
  document.getElementById("start-button").style.display = "none";
  document.getElementById("ending-list").style.display = "none";
  setTimeout(() => {
    showChoices([
      { option: "answerDoor", text: "Answer Door Immediately" },
      { option: "closeTap", text: "Close Tap And Answer" },
      { option: "finishDishes", text: "Finish Dishes First" },
    ]);
  }, 3000);
}

function changeBackground(imageUrl) {
  document.getElementById("game-container").style.backgroundImage =
    `url(${imageUrl})`;
}

function showText(text) {
  let textBox = document.getElementById("text-box");
  textBox.innerText = text;
  textBox.classList.add("show-text");

  setTimeout(() => {
    textBox.classList.remove("show-text");
  }, 5000);
}

function showChoices(choices) {
  let choiceContainer = document.getElementById("choice-container");
  let buttons = choices.map(
    (choice) =>
      `<div> <button onclick="choose('${choice.option}')">${choice.text}</button> </div>`,
  );
  choiceContainer.innerHTML = buttons;
}

function choose(option) {
  if (option === "answerDoor") {
    changeBackground("./images/hallway-door.jpg");
    showText("You open the door...");
    unlockEnding("Flooded Home");
  } else {
    changeBackground("./images/finish-dishes.jpg");
    showText("You finish the dishes first...");
    unlockEnding("Dry Home");
  }

  setTimeout(() => {
    location.reload();
  }, 4000);
}

function unlockEnding(endingName) {
  let endings = JSON.parse(localStorage.getItem("endings")) || [];

  if (!endings.includes(endingName)) {
    endings.push(endingName);
    localStorage.setItem("endings", JSON.stringify(endings));
  }
}

function showUnlockedEndings() {
  let endings = JSON.parse(localStorage.getItem("endings")) || [];
  let endingList = document.getElementById("ending-list");

  if (endings.length === 0) {
    endingList.innerHTML = "<p>No endings unlocked yet.</p>";
  } else {
    endingList.innerHTML = endings.map((e) => `<li>${e}</li>`).join("");
  }
}
