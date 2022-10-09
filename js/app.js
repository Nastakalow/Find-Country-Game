class FindWorldGame {
  #words = [
    "Azerbaijan",
    "France",
    "Brazil",
    "Canada",
    "Russia",
    "Cuba",
    "Iran",
    "Egypt",
    "Germany",
    "Finland",
    "Greece",
    "Hungary",
    "India ",
    "Italy",
    "Japan",
    "Ireland",
    "Estonia",
    "Norway",
    "Poland",
    "Romania",
    "Spain",
    "Sweden",
    "Turkey",
    "England",
    "USA",
    "Korea",
    "Pakistan",
    "Ukraine",
    "Africa",
  ];
  #currentWord = "";
  #hiddenword = "";
  #chosenLetters = [];
  #allowedLetters = "abcdefghijklmnopqrstuvwxyz";
  #keys = document.querySelectorAll(".key");
  #hiddenWordDOM = document.querySelector(".hidden-word");
  #btn = document.querySelector(".btn");
  constructor() {
    this.start();
    this.showState();
    this.changeWord();
    window.addEventListener("keypress", (e) => {
      this.setLetter(e.key.toLowerCase());
      this.#keys.forEach((key) => {
        if (key.textContent == e.key) {
          this.isLetterTrue(key);
        }
      });
      this.gameEndedAlert();
    });
    this.#keys.forEach((key) => {
      key.addEventListener("click", (e) => {
        this.setLetter(e.target.textContent.toLowerCase());
        this.isLetterTrue(e.target);
        this.gameEndedAlert();
      });
    });
  }

  changeWord() {
    this.#btn.addEventListener("click", () => {
      window.location.reload();
    });
  }

  gameEndedAlert() {
    this.showState();
    setTimeout(() => {
      if (this.isGameEnded()) {
        this.#btn.innerHTML = "play again!";
        alert("Game ended!");
      }
    }, 0.3);
  }

  getRandomWord() {
    let randomIndex = Math.floor(Math.random() * this.#words.length);
    return this.#words[randomIndex].toLowerCase();
  }

  start() {
    this.#currentWord = this.getRandomWord();
    this.#hiddenword = Array.from("-".repeat(this.#currentWord.length));
  }

  get hiddenWord() {
    return this.#hiddenword.join(" ");
  }

  updateHiddenWord() {
    this.#hiddenword.splice(0);
    for (const letter of this.#currentWord) {
      if (this.#chosenLetters.includes(letter)) {
        this.#hiddenword.push(letter);
      } else {
        this.#hiddenword.push("-");
      }
    }
  }

  setLetter(letter) {
    if (!this.#allowedLetters.toLowerCase().includes(letter)) {
      alert("please, enter a letter");
    } else if (!this.#chosenLetters.includes(letter)) {
      this.#chosenLetters.push(letter);
    }
    this.updateHiddenWord();
  }

  isLetterTrue(element) {
    if (this.#currentWord.includes(element.textContent)) {
      element.classList.add("true");
    } else {
      element.classList.add("wrong");
    }
  }

  showState() {
    const hiddenWordDOM = document.querySelector(".hidden-word");
    hiddenWordDOM.innerHTML = this.hiddenWord;
    // console.log("Chosen: " + this.#chosenLetters);
  }

  isGameEnded() {
    let result = !this.#hiddenword.includes("-");
    return result;
  }
}

const game = new FindWorldGame();
