const words = [
    { word: "kind", hint: "Amable" },
    { word: "friendly", hint: "Amistoso" },
    { word: "smart", hint: "Inteligente" },
    { word: "loyal", hint: "Leal" },
    { word: "creative", hint: "Creativo" },
    { word: "shy", hint: "Tímido" },
    { word: "stubborn", hint: "Terco" },
    { word: "lazy", hint: "Perezoso" },
    { word: "strong", hint: "Fuerte" },
    { word: "attractive", hint: "Atractivo" }
  ];
  
  let selectedWord;
  let guessedLetters = [];
  let mistakes = 0;
  let timer;
  let timeLeft = 15;
  
  const wordEl = document.getElementById("word");
  const keyboardEl = document.getElementById("keyboard");
  const messageEl = document.getElementById("message");
  const restartBtn = document.getElementById("restart");
  const timerEl = document.getElementById("timer");
  const hintBtn = document.getElementById("hint");
  
  function startTimer() {
    timerEl.textContent = `Tiempo: ${timeLeft}`;
    timer = setInterval(() => {
      timeLeft--;
      timerEl.textContent = `Tiempo: ${timeLeft}`;
      if (timeLeft <= 0) {
        clearInterval(timer);
        messageEl.textContent = `¡Tiempo agotado! La palabra era: ${selectedWord.word.toUpperCase()}`;
        disableKeyboard();
        restartBtn.style.display = "block";
      }
    }, 1000);
  }
  
  function initGame() {
    selectedWord = words[Math.floor(Math.random() * words.length)];
    guessedLetters = [];
    mistakes = 0;
    timeLeft = 15;
  
    clearInterval(timer);
    startTimer();
  
    messageEl.textContent = "";
    restartBtn.style.display = "none";
  
    // Render word placeholders
    wordEl.innerHTML = "";
    for (let i = 0; i < selectedWord.word.length; i++) {
      const letterEl = document.createElement("div");
      letterEl.className = "letter";
      letterEl.textContent = "_";
      wordEl.appendChild(letterEl);
    }
  
    // Render keyboard
    keyboardEl.innerHTML = "";
    for (let i = 65; i <= 90; i++) {
      const key = String.fromCharCode(i).toLowerCase();
      const keyEl = document.createElement("button");
      keyEl.className = "key";
      keyEl.textContent = key;
      keyEl.onclick = () => handleGuess(key);
      keyboardEl.appendChild(keyEl);
    }
  }
  
  function handleGuess(letter) {
    if (guessedLetters.includes(letter)) return;
  
    guessedLetters.push(letter);
  
    const keyEl = Array.from(document.querySelectorAll(".key")).find((btn) => btn.textContent === letter);
    keyEl.classList.add("disabled");
  
    if (selectedWord.word.includes(letter)) {
      // Reveal letters in word
      const letterEls = wordEl.getElementsByClassName("letter");
      for (let i = 0; i < selectedWord.word.length; i++) {
        if (selectedWord.word[i] === letter) {
          letterEls[i].textContent = letter.toUpperCase();
          letterEls[i].classList.add("filled");
        }
      }
  
      if ([...wordEl.getElementsByClassName("filled")].length === selectedWord.word.length) {
        clearInterval(timer);
        messageEl.textContent = "¡Ganaste! 🎉";
        restartBtn.style.display = "block";
      }
    } else {
      keyEl.classList.add("wrong");
      mistakes++;
      if (mistakes >= 6) {
        clearInterval(timer);
        messageEl.textContent = `Perdiste 😢 La palabra era: ${selectedWord.word.toUpperCase()}`;
        disableKeyboard();
        restartBtn.style.display = "block";
      }
    }
  }
  
  function disableKeyboard() {
    document.querySelectorAll(".key").forEach((key) => key.classList.add("disabled"));
  }
  
  hintBtn.addEventListener("click", () => {
    messageEl.textContent = `Pista: ${selectedWord.hint}`;
  });
  
  restartBtn.addEventListener("click", initGame);
  
  // Inicializar el juego al cargar
  initGame();
  