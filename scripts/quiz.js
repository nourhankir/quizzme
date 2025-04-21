const quizzes = [
    { id: 'math', title: 'Math Quiz', description: 'Test your numbers knowledge.' },
    { id: 'science', title: 'Science Quiz', description: 'Explore the world of science.' },
    { id: 'history', title: 'History Quiz', description: 'Travel back in time with questions.' },
    { id: 'geography', title: 'Geography Quiz', description: 'Test your knowledge of the world.' },
    { id: 'literature', title: 'Literature Quiz', description: 'Dive into the world of books.' }
];

// Store quizzes if not already stored
if (!localStorage.getItem('availableQuizzes')) {
    localStorage.setItem('availableQuizzes', JSON.stringify(quizzes));
}

const quizList = document.getElementById('quiz-list');

// Clear any existing content in the quiz list
quizList.innerHTML = '';

quizzes.forEach(quiz => {
    const card = document.createElement('div');
    card.className = 'quiz-card';
    card.innerHTML = `
      <h3>${quiz.title}</h3>
      <p>${quiz.description}</p>
      <button>Start Quiz</button>
    `;
    card.addEventListener('click', () => {
        localStorage.setItem('selectedQuiz', quiz.id);
        window.location.href = "../pages/quizz.html";
    });
    quizList.appendChild(card);
});
