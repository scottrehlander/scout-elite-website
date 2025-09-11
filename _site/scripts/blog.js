// Blog category filter functionality

document.addEventListener('DOMContentLoaded', function () {
  const categoryButtons = document.querySelectorAll('.category-btn');
  const postCards = document.querySelectorAll('.post-card');

  categoryButtons.forEach(btn => {
    btn.addEventListener('click', function () {
      // Remove active from all buttons
      categoryButtons.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      const category = this.getAttribute('data-category');
      postCards.forEach(card => {
        if (category === 'all' || card.classList.contains('category-' + category)) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
});
