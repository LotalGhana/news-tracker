const form = document.getElementById('articleForm');
const tableBody = document.querySelector('#articlesTable tbody');
const totalArticles = document.getElementById('totalArticles');
const totalEarnings = document.getElementById('totalEarnings');

let articles = JSON.parse(localStorage.getItem('articles')) || [];

function updateSummary() {
  totalArticles.textContent = articles.length;
  const earningsSum = articles.reduce((sum, a) => sum + parseFloat(a.earnings), 0);
  totalEarnings.textContent = earningsSum.toFixed(2);
}

function renderTable() {
  tableBody.innerHTML = '';
  articles.forEach(article => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${article.title}</td>
      <td>${article.platform}</td>
      <td>${article.date}</td>
      <td>${parseFloat(article.earnings).toFixed(2)}</td>
    `;
    tableBody.appendChild(row);
  });
}

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const platform = document.getElementById('platform').value;
  const date = document.getElementById('date').value;
  const earnings = document.getElementById('earnings').value;

  const newArticle = { title, platform, date, earnings };
  articles.push(newArticle);
  localStorage.setItem('articles', JSON.stringify(articles));

  form.reset();
  renderTable();
  updateSummary();
});

// Initialize
renderTable();
updateSummary();
