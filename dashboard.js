form.addEventListener('submit', async function (e) {
  e.preventDefault();

  const title = document.getElementById('title').value;
  const platform = document.getElementById('platform').value;
  const date = document.getElementById('date').value;
  const earnings = 0.015; // fixed earnings per article

  await db.collection('users').doc(userIdRef.uid).collection('articles').add({
    title,
    platform,
    date,
    earnings
  });

  form.reset();
  loadArticles();
});

function loadArticles(uid) {
  db.collection('users').doc(uid).collection('articles').get().then(snapshot => {
    let total = 0;
    let earnings = 0;
    articlesTable.innerHTML = '';

    snapshot.forEach(doc => {
      const data = doc.data();
      const docId = doc.id;

      total++;
      earnings += data.earnings;

      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${data.title}</td>
        <td>${data.platform}</td>
        <td>${data.date}</td>
        <td>$${data.earnings.toFixed(3)}</td>
        <td><button class="delete-btn" data-id="${docId}">Delete</button></td>
      `;
      articlesTable.appendChild(row);
    });

    totalArticles.textContent = total;
    totalEarnings.textContent = earnings.toFixed(3);

    // Attach event listeners to all delete buttons
    document.querySelectorAll('.delete-btn').forEach(button => {
      button.addEventListener('click', async (e) => {
        const id = e.target.getAttribute('data-id');
        await db.collection('users').doc(uid).collection('articles').doc(id).delete();
        loadArticles(uid); // Refresh after delete
      });
    });
  });
}
