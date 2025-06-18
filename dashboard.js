const db = firebase.firestore();
const auth = firebase.auth();

const form = document.getElementById("articleForm");
const table = document.getElementById("articlesTable").querySelector("tbody");
const totalArticles = document.getElementById("totalArticles");
const totalEarnings = document.getElementById("totalEarnings");

auth.onAuthStateChanged(user => {
  if (!user) return window.location.href = 'index.html';

  const userId = user.uid;

  // Load user's articles on login
  loadArticles(userId);

  // Add article
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const platform = document.getElementById("platform").value;
    const date = document.getElementById("date").value;

    await db.collection("users").doc(userId).collection("articles").add({
      title,
      platform,
      date,
      earnings: 0.015
    });

    form.reset();
    loadArticles(userId);
  });

  // Load and display all articles
  async function loadArticles(uid) {
    const snapshot = await db.collection("users").doc(uid).collection("articles").get();

    let total = 0;
    let earnings = 0;
    table.innerHTML = ''; // Clear table

    snapshot.forEach(doc => {
      const data = doc.data();
      const id = doc.id;

      total++;
      earnings += data.earnings;

      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${data.title}</td>
        <td>${data.platform}</td>
        <td>${data.date}</td>
        <td>$${data.earnings.toFixed(3)}</td>
        <td><button class="delete-btn" data-id="${id}">Delete</button></td>
      `;
      table.appendChild(row);
    });

    totalArticles.textContent = total;
    totalEarnings.textContent = earnings.toFixed(3);

    // Add event listeners to delete buttons
    document.querySelectorAll(".delete-btn").forEach(btn => {
      btn.addEventListener("click", async (e) => {
        const articleId = e.target.getAttribute("data-id");

        await db.collection("users").doc(uid).collection("articles").doc(articleId).delete();

        loadArticles(uid); // Refresh the table
      });
    });
  }
});
