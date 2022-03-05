$(document).ready(async () => {
  await getLocation();
  await getRandomFact();
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

  // getting articles for the highlight section
  await getArticle("highlight-article", "technology", 5);
  await getArticle("highlight-article", "science", 4);
  await getArticle("highlight-article", "sports", 9);
  await getArticle("highlight-article", "entertainment", 8);
  await getArticle("highlight-article", "technology", 3);
  await getArticle("highlight-article", "science", 3);
  await getArticle("highlight-article", "sports", 10);
  await getArticle("highlight-article", "entertainment", 11);

  await getArticle("general-article", "general", 1);
  await getArticle("general-article", "general", 2);
  await getArticle("general-article", "general", 3);
  await getArticle("general-article", "general", 5);
  await getArticle("general-article", "general", 7);
  await getArticle("general-article", "general", 13);
  await getArticle("general-article", "general", 8);
  await getArticle("general-article", "general", 15);
  renderHighlightedArticles("general-article");
  renderHighlightedArticles("highlight-article");

  await getRandomWisdomQuote();
});
