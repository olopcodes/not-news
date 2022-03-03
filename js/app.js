$(document).ready(async () => {
  await getLocation();
  await showDailyQuote();
  toggleActiveLink();
  toggleMobileMenu();

  // main articles shown
  await getArticle("hero-item-1", "entertainment", 2);
  await getArticle("hero-item-2", "sports", 2);
  // rendering main to the page
  renderMainArticle("hero-item-1");
  renderMainArticle("hero-item-2");
  // show the description when you hover on the main article
  showMainDescription();

  // fetching the latest stories
  await getArticle("latest-article-1", "technology", 1);
  await getArticle("latest-article-2", "science", 1);
  await getArticle("latest-article-3", "sports", 1);
  await getArticle("latest-article-4", "entertainment", 1);

  // rendering the latest articles
  renderLatestArticles();
});
