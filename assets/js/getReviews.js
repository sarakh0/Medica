fetch('php/getReviews.php')
  .then(res => res.json())
  .then(data => {
    const reviews = data.result.reviews;
    const container = document.getElementById('google-reviews');
    reviews.forEach(review => {
      const div = document.createElement('div');
      div.innerHTML = `
        <p>"${review.text}"</p>
        <strong>- ${review.author_name}</strong> ★${review.rating}
      `;
      container.appendChild(div);
    });
  });