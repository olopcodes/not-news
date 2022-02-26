// get and show the daily quote
const showDailyQuote = async () => {
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

// get article

async function getArticle(idName, category, index) {
  let i = index - 1;
  await $.ajax({
    method: "Get",
    async: true,
    url: `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKeys.newsApi}`,
    dataType: "json",
    success: function (data) {
      console.log(data.articles[0]);
      if (!data.articles[i].urlToImage || !data.articles[i].author) {
        i = 3;
      }
      const title = data.articles[i].title;
      const author = data.articles[i].author;
      const link = data.articles[i].url;
      const imgSrc = data.articles[i].urlToImage;
      const description = data.articles[i].description;
      const source = data.articles[i].source.name;
      const date = formatDate(data.articles[i].publishedAt);
      // console.log(date);
      const time = showTime(hours, data.articles[i].publishedAt);
      console.log("time", time);
      const article = new Article(
        idName,
        title,
        author,
        link,
        imgSrc,
        description,
        source
      );
      articleData.push(article);
    },
    error: function (xhr, status, err) {
      console.log(Err);
    },
  });
}

function formatDate(date) {
  const month = months[new Date(date).getMonth()];
  const day = new Date(date).getDate();
  const year = new Date(date).getFullYear();
  return `${month} ${day}, ${year}`;
}

function formatTime(obj, data) {
  let hourFound = true;
  const hours = new Date(data).getHours();
  const mins = new Date(data).getMinutes();
  while (!hourFound) {
    $.each(obj, (key, val) => {
      const n = Number(key);
      if (hours === n) {
        hourFound = true;
        return `${val}:${mins}pm`;
      } else {
        hourFound = true;
        return `${hours}:${mins}am`;
      }
    });
  }
}

function showTime(hours, data) {
  const hour = new Date(data).getHours();
  const mins = new Date(data).getMinutes();
  return hours.filter((el) => {
    let t = el[hour][0];
    return t;
  });
}

// website functions
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

function toggleMobileMenu() {
  $(".menu-btn").on("click", () => {
    $(".nav__mobile").slideToggle();
  });
}

function renderMainArticle(articleID) {
  for (let a of articleData) {
    if (a.idName === articleID) {
      $(`#${articleID}`).html(`
        <img src="${a.imgSrc}" alt="the image to the article below" class="hero-main__img">
        <a href="${a.link}" target="_blank"><h2 class="heading-main-title">${a.title}</h2></a>
        <p>${a.description}</p>
        `);
    }
  }
}
