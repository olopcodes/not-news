$(document).ready(async () => {
  const removeLoader = setTimeout(removePreLoader, `1575`);

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

  // await getNewsArticle("highlight-article", "entertainment", 1);
  await getGuardianArticle("highlight-article", "culture", 1, 1);
  await getGuardianArticle("highlight-article", "science", 1, 3);
  await getGuardianArticle("highlight-article", "technology", 1, 2);
  await getGuardianArticle("highlight-article", "business", 1, 3);
  await getGuardianArticle("highlight-article", "sport", 1, 1);

  await getGuardianArticle("general-article", "business", 5, 3);
  await getGuardianArticle("general-article", "business", 3, 2);
  await getGuardianArticle("general-article", "business", 2, 1);
  await getGuardianArticle("general-article", "business", 1, 2);
  await getGuardianArticle("general-article", "business", 4, 3);

  // render highlight images
  renderHighlightedArticles("general-article");
  renderHighlightedArticles("highlight-article");

  // get and render quote to html
  await getRandomWisdomQuote();

  // jquery tabs for highlight
  tabComponent();

  // category articles
  await getGuardianArticle("category-entertainment", "culture", 4, 1);
  await getGuardianArticle("category-entertainment", "culture", 3, 2);
  await getGuardianArticle("category-entertainment", "culture", 2, 1);
  await getGuardianArticle("category-entertainment", "culture", 1, 3);

  // await getNewsArticle("category-technology", "tech", 4);
  await getGuardianArticle("category-technology", "technology", 4, 3);
  await getGuardianArticle("category-technology", "technology", 3, 2);
  await getGuardianArticle("category-technology", "technology", 2, 1);
  await getGuardianArticle("category-technology", "technology", 1, 3);

  await getGuardianArticle("category-sports", "sport", 4, 2);
  await getGuardianArticle("category-sports", "sport", 3, 1);
  await getGuardianArticle("category-sports", "sport", 2, 3);
  await getGuardianArticle("category-sports", "sport", 1, 2);

  // await getNewsArticle("category-science", "science", 5);
  await getGuardianArticle("category-science", "science", 4, 1);
  await getGuardianArticle("category-science", "science", 3, 3);
  await getGuardianArticle("category-science", "science", 2, 2);
  await getGuardianArticle("category-science", "science", 1, 1);

  renderCategoryArticles("category-entertainment");
  renderCategoryArticles("category-technology");
  renderCategoryArticles("category-sports");
  renderCategoryArticles("category-science");
});
