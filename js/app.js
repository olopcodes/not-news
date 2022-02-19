$(document).ready(async () => {
  await getLocation();
  await showDailyQuote();
  toggleActiveLink();
  toggleMobileMenu();
  await getArticle("hero-item-1", "entertainment", 1);
  await getArticle("hero-item-2", "sports", 2);
  console.log(articleData);
  // console.log(d);
});
