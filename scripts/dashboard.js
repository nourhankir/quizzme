const tableBody = document.querySelector("#results-table tbody");
const quizResults = JSON.parse(localStorage.getItem("quizResults") || "[]");
const filterInput = document.getElementById("filter-user");
const sortButton = document.getElementById("sort-date");
let allRows = [];

// RENDER TABLE
function renderTable(filteredResults = quizResults) {
  tableBody.innerHTML = "";
  allRows = [];

  filteredResults.forEach(result => {
    const { email, quiz, score, timeTaken, mistakes, submissionDate } = result;

    const row = document.createElement("tr");
    row.dataset.date = new Date(submissionDate || Date.now()).getTime();

    row.innerHTML = `
      <td>${email}</td>
      <td>${quiz.charAt(0).toUpperCase() + quiz.slice(1)}</td>
      <td>${score}</td>
      <td>${timeTaken} sec</td>
      <td>${submissionDate || "N/A"}</td>
      <td>
        <ul>
          ${mistakes.map(m => `<li><strong>${m.question}</strong><br>❌ ${m.wrongAnswer} → ✅ ${m.correctAnswer}</li>`).join('')}
        </ul>
      </td>
    `;

    allRows.push(row);
    tableBody.appendChild(row);
  });
}

renderTable();

// FILTER
filterInput.addEventListener("input", () => {
  const query = filterInput.value.toLowerCase();
  const filtered = quizResults.filter(result =>
    result.email.toLowerCase().includes(query)
  );
  renderTable(filtered);
});

// SORT BY DATE
sortButton.addEventListener("click", () => {
  const sorted = [...allRows].sort((a, b) => b.dataset.date - a.dataset.date);
  tableBody.innerHTML = "";
  sorted.forEach(row => tableBody.appendChild(row));
});

// LOGOUT
const logoutBtn = document.getElementById("logout-btn");
logoutBtn.addEventListener("click", () => {
  window.location.href = "../home.html";
});
