const weatherApi = () => {
  navigator.geolocation.getCurrentPosition(async (position) => {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let data =
      await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=ef944a342d2f7d8f1cfc3fdfeb174548&lang=kr&units=metric
 `);
    let weatherData = await data.json();

    weatherRender(weatherData);
  });
};

const weatherRender = (data) => {
  let weatherContent = data.weather[0].description;
  let weatherTemp = Math.floor(data.main.temp) + ' ℃';

  let weatherIcon =
    'http://openweathermap.org/img/wn/' + data.weather[0].icon + '.png';
  document.querySelector('.section_weather').innerHTML += `
    <p>${weatherContent}&nbsp;&nbsp;<span>${weatherTemp}</span><img src=${weatherIcon} /></p>
    
  `;
};

//날씨 호출
weatherApi();

const getnewsApi = async () => {
  let news = await fetch(
    `https://newsapi.org/v2/top-headlines?country=us&pageSize=5&apiKey=dc72e31ec74e441f87a36f2479368b45`
  );
  let newsData = await news.json();
  newsRender(newsData);
};

const newsRender = async (data) => {
  let newsHTML = '';
  let articles = data.articles;

  let articlesData = articles.map((item) => {
    return item;
  });
  newsHTML += `
    <div class="first_area">
    <img src=${articles[0].urlToImage} alt="" />
    <dl>
      <dt>
       ${articles[0].title}
      </dt>
      <dd>
        ${articlesData[0].content}
      </dd>
      <dd><span>${articlesData[0].publishedAt}
      </span></dd>
    </dl>
  </div>
  <div class="second_area">
    <div class="mid_area">
      <div class="second_top">
        <dl>
          <dt>
          ${articlesData[1].title}
          </dt>
          <dd>
          ${articlesData[1].content}
          </dd>
          <dd><span>${articlesData[1].publishedAt}</span></dd>
        </dl>
      </div>
      <div class="second_bottom">
        <img src=${articlesData[2].urlToImage} alt="" />
        <dl>
          <dt>
          ${articlesData[2].title}
          </dt>
          <dd>
          ${articlesData[2].content}
          </dd>
          <dd><span>${articlesData[2].publishedAt}</span></dd>
        </dl>
      </div>
    </div>
    <div class="third_area">
      <img src=${articlesData[3].urlToImage} alt="" />
      <dl>
        <dt>
        ${articlesData[3].title}
        </dt>
        <dd>
        ${articlesData[3].content}
        </dd>
        <dd><span>${articlesData[3].publishedAt}</span></dd>
      </dl>
    </div>
  </div>
    `;
  document.querySelector('.area').innerHTML += newsHTML;
};

//   articles.forEach((item) => {
//
//   });
//   let newsImage = data.articles[0].urlToImage;
//   let newsTitle = data.articles[0].title;
//   let newsContent = data.articles[0].content;
//   let date = data.articles[0].publishedAt;

getnewsApi();
