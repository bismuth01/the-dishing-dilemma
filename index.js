let choicesHistory = [];

function saveChoice(option) {
  choicesHistory.push(option);
}

function wasChoiceMade(option) {
  return choicesHistory.includes(option);
}

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
  setTimeout(() => {
    document.getElementById("game-container").style.backgroundImage =
      `url(${imageUrl})`;
  }, 4000);
}

function showText(text) {
  let textBox = document.getElementById("text-box");
  textBox.innerText = text;
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
  saveChoice(option);
  if (option === "answerDoor") {
    if (wasChoiceMade("closeTap") && wasChoiceMade("askWho")) {
      changeBackground("./images/annoyed-neighbour.jpg");
      showText("Neighbour is there. She seems annoyed...");
    } else if (wasChoiceMade("finishDishes")) {
      changeBackground("./images/package.jpeg");
      showText("It seems the person left...");
    } else {
      changeBackground("./images/happy-neighbour.jpeg");
      showText("You open the door...");
    }
    showChoices([{ option: "takePackage", text: "Take Package" }]);
  } else if (option === "closeTap") {
    changeBackground("./images/closed-tap.jpg");
    showText("You close the tap...");
    changeBackground("./images/hallway-door.jpg");
    showChoices([
      { option: "answerDoor", text: "Answer the Door" },
      { option: "askWho", text: "Ask who's at the door" },
    ]);
  } else if (option === "finishDishes") {
    changeBackground("./images/finish-dishes.jpg");
    showText("You finish the dishes...");
    changeBackground("./images/hallway-door.jpg");
    showChoices([
      { option: "answerDoor", text: "Answer the Door" },
      { option: "askWho", text: "Ask who's at the door" },
    ]);
  } else if (option === "takePackage") {
    if (!wasChoiceMade("finishDishes")) {
      changeBackground("./images/sign-paper.jpg");
      showText("You sign the papers and take the package...");
    }
    if (wasChoiceMade("closeTap") || wasChoiceMade("finishDishes")) {
      changeBackground("./images/package-inside.jpeg");
      showText("You took the package inside...");
      if (wasChoiceMade("closeTap")) {
        unlockEnding("Let's see the package");
      } else if (wasChoiceMade("finishDishes")) {
        unlockEnding("A lonely package");
      }
    } else {
      changeBackground("./images/flooded.jpeg");
      showText(
        "You forgot to turn off the tap. Now you have a package and a flooded apartment",
      );
      unlockEnding("Flooded with a package");
    }
  } else if (option === "askWho") {
    if (wasChoiceMade("closeTap")) {
      showText("It's me, Karen!!");
    } else if (wasChoiceMade("finishDishes")) {
      showText("Silence....");
    }
    showChoices([{ option: "answerDoor", text: "Answer the Door" }]);
  }
}

function unlockEnding(endingName) {
  document.getElementById("choice-container").style.display = `none`;
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
