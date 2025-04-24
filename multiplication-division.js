
    const questionDisplay = document.getElementById('question');
    const optionsDisplay = document.getElementById('options');
    const scoreDisplay = document.getElementById('score');
    const questionCountDisplay = document.getElementById('questionCount');
    const correctSound = document.getElementById('correctSound');
    const wrongSound = document.getElementById('wrongSound');
    const congratsSound = document.getElementById('congratsSound');

    const totalQuestions = 50;
    let score = 0;
    let currentQuestion = 0;

    const questions = [];

    // Generate Year 1 & 2: Add/Sub within 20
    for (let i = 0; i < 25; i++) {
      let a = Math.floor(Math.random() * 11);
      let b = Math.floor(Math.random() * 11);
      questions.push({
        q: `What is ${a} + ${b}?`,
        a: a + b,
        options: shuffle([a + b, a + b + 1, a + b - 1, a + b + 2])
      });
      questions.push({
        q: `What is ${a + b} - ${a}?`,
        a: b,
        options: shuffle([b, b + 1, b - 1, b + 2])
      });
    }

    // Generate Year 3 & 4: Mul/Div within 12
    for (let i = 0; i < 25; i++) {
      let a = Math.floor(Math.random() * 13);
      let b = Math.floor(Math.random() * 13);
      questions.push({
        q: `What is ${a} × ${b}?`,
        a: a * b,
        options: shuffle([a * b, a * b + 2, a * b - 1, a * b + 1])
      });
      let product = a * b;
      if (b !== 0) {
        questions.push({
          q: `What is ${product} ÷ ${b}?`,
          a: a,
          options: shuffle([a, a + 1, a - 1, a + 2])
        });
      }
    }

    shuffle(questions);

    function shuffle(array) {
      return array.sort(() => 0.5 - Math.random());
    }

    function showQuestion() {
      if (currentQuestion >= totalQuestions || currentQuestion >= questions.length) {
        congratsSound.play();
        questionDisplay.textContent = `You finished! Final Score: ${score}/${currentQuestion}`;
        optionsDisplay.innerHTML = '<button onclick="location.reload()">Play Again</button>';
        return;
      }

      const current = questions[currentQuestion];
      questionDisplay.textContent = `Question ${currentQuestion + 1}: ${current.q}`;
      questionCountDisplay.textContent = `(${currentQuestion + 1}/${totalQuestions})`;
      optionsDisplay.innerHTML = '';

      current.options.forEach(opt => {
        const btn = document.createElement('div');
        btn.className = 'option';
        btn.textContent = opt;
        btn.onclick = () => checkAnswer(opt, current.a);
        optionsDisplay.appendChild(btn);
      });
    }

    function checkAnswer(selected, correct) {
      if (selected === correct) {
        correctSound.play();
        score++;
      } else {
        wrongSound.play();
      }
      scoreDisplay.textContent = `Score: ${score}`;
      currentQuestion++;
      setTimeout(showQuestion, 500);
    }

    showQuestion();
