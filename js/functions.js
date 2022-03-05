// get and show the daily quote
const getRandomFact = async () => {
  // geting the daily quote
  await $.ajax({
    method: "GET",
    async: true,
    url: "https://uselessfacts.jsph.pl//random.json?language=en",
    dataType: "json",
    success: function (data) {
      $(".daily-fact").html(`
          <h3>daily random fact</h3>
          <p>"${data.text}"</p>
      `);
    },
    error: function (xhr, status, err) {
      console.log(err);
    },
  });
};

// location to show weather ============================
const getLocation = async () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      successfullLocation,
      errorLocation
    );
  } else {
    alert(
      "It seems like Geolocation, which is required for this page, is not enabled in your browser."
    );
  }
};

async function successfullLocation(location) {
  const long = location.coords.longitude;
  const lat = location.coords.latitude;

  await getWeather(apiKeys.weatherApi, lat, long);
}

function errorLocation(err) {
  return "err";
}

// get weather from api ========================================
async function getWeather(key, lat, long) {
  await $.ajax({
    method: "GET",
    async: true,
    url: `http://api.weatherapi.com/v1/current.json?key=${key}&q=${lat},${long}&aqi=no`,
    dataType: "json",
    success: function (data) {
      $(".weather").html(`
      <p class="weather__region">${data.location.region}</p>

            <img class="weather__img" src="${data.current.condition.icon}" />
            <p class="weather__temp">${Math.floor(
              data.current.temp_f
            )}&#x2109;</p>
        `);
    },
    error: function (xhr, status, err) {
      $(".weather").css("display", "none");
    },
  });
}

async function getRandomWisdomQuote() {
  $.ajax({
    type: "GET",
    url: "https://api.quotable.io/random?tags=wisdom",
    data: "data",
    dataType: "json",
    success: function (response) {
      console.log(response.content);
      console.log(response.author);
    },
    error: function (x, s, err) {
      console.log(err);
    },
  });
}

// get article from api ==================================================
async function getArticle(idName, category, index) {
  let i = index - 1;
  await $.ajax({
    method: "Get",
    async: true,
    url: `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKeys.newsApi}`,
    dataType: "json",
    success: function (data) {
      let imgSrc = "";
      let author = "";
      console.log(data.articles[0]);

      try {
        data.articles[i].urlToImage;
      } catch (err) {
        imgSrc = "./images/default-image.jpeg";
      }

      try {
        data.articles[i].author;
      } catch (err) {
        author = "unknown author";
      }
      const title = data.articles[i].title;
      author = data.articles[i].author;
      const link = data.articles[i].url;
      imgSrc = data.articles[i].urlToImage;
      const description = data.articles[i].description;
      const source = data.articles[i].source.name;
      const date = formatDate(data.articles[i].publishedAt);
      const time = formatTime(hours, data.articles[i].publishedAt);

      const article = new Article(
        idName,
        title,
        author,
        link,
        imgSrc,
        description,
        source,
        date,
        time,
        category
      );
      articleData.push(article);
    },
    error: function (xhr, status, err) {
      console.log(err);
    },
  });
}

function formatDate(date) {
  const month = months[new Date(date).getMonth()];
  const day = new Date(date).getDate();
  const year = new Date(date).getFullYear();
  return `${month} ${day}, ${year}`;
}

function formatTime(hours, data) {
  const hour = new Date(data).getHours();
  let mins = new Date(data).getMinutes();
  const arr = hours.filter((el) => el[hour]);

  if (String(mins).length === 1) {
    mins = `0${mins}`;
  }

  if (arr.length === 0) {
    return `${hour}:${mins}am`;
  } else {
    return `${arr[0][hour]}:${mins}pm`;
  }
}

function renderHighlightedArticles(name) {
  const filteredCategory = articleData.filter(
    (article) => article.idName === name
  );
  console.log(filteredCategory);
}
// website functions =====================

// adding active class to links
function toggleActiveLink() {
  $(".nav__link").on("click", (e) => {
    e.preventDefault();
    const isLink = $(e.currentTarget).hasClass("nav__link");
    if (isLink) {
      $(".nav-link").removeClass("active-class");
      $(e.currentTarget).toggleClass("active-class");
    }
  });
}

// show and hide mobile menu
function toggleMobileMenu() {
  $(".menu-btn").on("click", () => {
    $(".nav__mobile").slideToggle();
  });
}

// render the main hero articles on the page
function renderMainArticle(articleID) {
  for (let a of articleData) {
    if (a.idName === articleID) {
      $(`#${articleID}`).html(`
        
        <img src="${a.imgSrc}" alt="the image to the article below" class="hero-main__img">
        <div class="hero-main__text">
          <a href="${a.link}" target="_blank"><h2 class="main-link">${a.title}</h2></a>
          <p class="main-desc">${a.description}</p>
        </div>
        `);
    }
  }
}

// render latest articles
function renderLatestArticles() {
  const latestArticles = articleData.slice(2, 7);
  let html = ``;
  // const latestStories = ;
  $.each(latestArticles, (index, article) => {
    html += `
    <div class="latest__story">
    <div class="latest__category"><p>${article.category}</p></div>
    <img
      class="latest__img"
      src="${article.imgSrc}"
      alt="image from article"
    />
    <div class="latest__heading">
      <h3 class="article-title">
        ${article.title}
      </h3>
      <p class="article-desc">
        ${article.description}
      </p>
    </div>
    <div class="latest__credit">
      <p class="article-author">by <span>${article.author}</span></p>
      <p class="article-publish-date">
        on <span>${article.date}, ${article.time}</span>
      </p>
      <p class="article-source">
        article source: <span>${article.source}</span>
      </p>
      <a href="${article.link}" target="_blank" class="btn">read more</a>
    </div>
  </div>
    `;
  });

  $(".latest__stories").html(html);
}

// show main description paragraph when main hero article hover
function showMainDescription() {
  $(".hero-main__item").hover(
    (e) => {
      $(`#${e.currentTarget.id} .main-desc`).show("500");
    },
    (e) => {
      $(`#${e.currentTarget.id} .main-desc`).hide("500");
    }
  );
}
