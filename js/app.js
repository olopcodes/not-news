$(document).ready(async () => {
  await getLocation();
  await showDailyQuote();
  toggleActiveLink();
  toggleMobileMenu();

  // main articles shown
  await getArticle("hero-item-1", "entertainment", 1);
  await getArticle("hero-item-2", "sports", 1);
  // rendering main to the page
  renderMainArticle("hero-item-1");
  renderMainArticle("hero-item-2");
  // show the description when you hover on the main article
  showMainDescription();

  await getArticle("latest-article-1", "technology", 1);
});
