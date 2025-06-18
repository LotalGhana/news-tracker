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
