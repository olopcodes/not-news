$(document).ready(async () => {
  await getLocation();
  await showDailyQuote();
  toggleActiveLink();
  toggleMobileMenu();
  await getArticle("hero-item-1", "entertainment", 10);
  await getArticle("hero-item-2", "sports", 2);

  renderMainArticle("hero-item-1");
  renderMainArticle("hero-item-2");
});
