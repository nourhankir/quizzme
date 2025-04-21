const tableBody = document.querySelector("#results-table tbody");
const quizResults = JSON.parse(localStorage.getItem("quizResults") || "{}");
const filterInput = document.getElementById("filter-user");
const sortButton = document.getElementById("sort-date");
let allRows = [];

// RENDER TABLE
function renderTable(filtered = quizResults) {
  tableBody.innerHTML = "";
  allRows = [];

  Object.keys(filtered).forEach(email => {
    const quizzes = filtered[email];

    Object.keys(quizzes).forEach(quizName => {
      const { score, timeTaken, mistakes, submissionDate } = quizzes[quizName];
      const row = document.createElement("tr");
      row.dataset.date = new Date(submissionDate || Date.now()).getTime();

      row.innerHTML = `
        <td>${email}</td>
        <td>${quizName.charAt(0).toUpperCase() + quizName.slice(1)}</td>
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
  });
}

renderTable();

// FILTER
filterInput.addEventListener("input", () => {
  const query = filterInput.value.toLowerCase();
  const filtered = {};

  Object.keys(quizResults).forEach(email => {
    if (email.toLowerCase().includes(query)) {
      filtered[email] = quizResults[email];
    }
  });

  renderTable(filtered);
});

// SORT
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
