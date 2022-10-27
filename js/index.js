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

let url;

const newsApi = async () => {
  try {
    let news = await fetch(url);
    let newsData = await news.json();
    console.log(newsData);
    if (news.status == 200) {
      if (newsData.totalArticles === 0) {
        throw new Error('검색된 뉴스가 없습니다.');
      } else {
        newsRender(newsData);
      }
    } else {
      throw new Error(newsData.message);
    }
  } catch (error) {
    errorRender(error.message);
  }
};
function errorRender(message) {
  document.querySelector('.section_title').innerHTML = 'ERROR';
  let errorHTML = `<div>${message}</div>`;
  document.querySelector('.area').innerHTML = errorHTML;
}

const getnewsApi = async () => {
  url = `https://gnews.io/api/v4/top-headlines?max=10&token=2d83b2274a7ea6cc8fd56f0947bd9ef7`;
  newsApi();
};

const newsRender = async (data) => {
  let newsHTML = '';
  let articles = data.articles;

  newsHTML += `
    <div class="first_area">
    <img src=${articles[0].image} alt="" />
    <dl>
      <dt>
       ${articles[0].title}
      </dt>
      <dd>
        ${articles[0].content}
      </dd>
      <dd><span>${moment(articles[0].publishedAt).fromNow()}
      </span></dd>
    </dl>
  </div>
  <div class="second_area">
    <div class="mid_area">
      <div class="second_top">
        <dl>
          <dt>
          ${articles[1].title}
          </dt>
          <dd>
          ${articles[1].content}
          </dd>
          <dd><span>${moment(articles[1].publishedAt).fromNow()}</span></dd>
        </dl>
      </div>
      <div class="second_bottom">
        <img src=${articles[2].image} alt="" />
        <dl>
          <dt>
          ${articles[2].title}
          </dt>
          <dd>
          ${articles[2].content}
          </dd>
          <dd><span>${moment(articles[2].publishedAt).fromNow()}</span></dd>
        </dl>
      </div>
    </div>
    <div class="third_area">
      <img src=${articles[3].image} alt="" />
      <dl>
        <dt>
        ${articles[3].title}
        </dt>
        <dd>
        ${articles[3].content}
        </dd>
        <dd><span>${moment(articles[3].publishedAt).fromNow()}</span></dd>
      </dl>
    </div>
  </div>
    `;
  document.querySelector('.area').innerHTML = newsHTML;
};
const getnewsFeatureApi = async () => {
  let featureApi = await fetch(
    `https://gnews.io/api/v4/top-headlines?max=50&to=2022-08-21T16:27:09Z&token=2d83b2274a7ea6cc8fd56f0947bd9ef7`
  );
  let featureData = await featureApi.json();
  featureRender(featureData);
};
//
const featureRender = async (data) => {
  let featureNewHTML = '';
  let featureArticles = data.articles;
  await featureArticles.forEach((item) => {
    featureNewHTML += `<li>
        <img src=${item.image} alt="" />

        <dl>
          <dt>
           ${item.title}
          </dt>
          <dd>${item.content}</dd>
        </dl>
      </li>
      <li>`;
    document.querySelector('.footer_main ul').innerHTML = featureNewHTML;
  });
  let slideUl = document.querySelector('.footer_main ul');
  let liWidth = 420;
  let ulWidth = liWidth * featureArticles.length;
  let ulLeft = 0;
  let slideTransition = 1;
  //   slideUl.style['transition'] = slideTransition + 's';
  slideUl.style['width'] = ulWidth + 'px';

  leftBtn.addEventListener('click', () => {
    ulLeft >= 0 ? console.log('왼쪽') : (ulLeft += 480);

    slideUl.style['left'] = ulLeft + 'px';
  });
  RightBtn.addEventListener('click', () => {
    ulLeft -= 480;
    slideUl.style['left'] = ulLeft + 'px';
    if (ulLeft < -3300) {
      ulLeft = 0;
    }
  });
};

//카테고리 호출

const categoryTap = document.querySelectorAll('.header_list li');
const getCategoryNews = async (event) => {
  let category = event.target.textContent.toLowerCase();
  url = `https://gnews.io/api/v4/top-headlines?max=50&topic=${category}&token=2d83b2274a7ea6cc8fd56f0947bd9ef7`;

  newsApi();
};

categoryTap.forEach((item) => {
  item.addEventListener('click', (event) => {
    getCategoryNews(event);
    document.querySelector(
      '.section_title'
    ).innerText = `${event.target.textContent}`;
  });
});

//키워드별 검색기능
const searchInput = document.getElementById('search_input');
const searchSubmit = document.querySelector('.xi-search');

const searchNewsApi = async () => {
  let keyword = searchInput.value;

  url = `https://gnews.io/api/v4/top-headlines?max=50&q=${keyword}&token=2d83b2274a7ea6cc8fd56f0947bd9ef7`;
  document.querySelector('.section_title').innerText = `${keyword}`;
  searchInput.value = '';
  newsApi();
};

searchSubmit.addEventListener('click', searchNewsApi);
//   articles.forEach((item) => {
//
//   });
//   let newsImage = data.articles[0].urlToImage;
//   let newsTitle = data.articles[0].title;
//   let newsContent = data.articles[0].content;
//   let date = data.articles[0].publishedAt;
//왼쪽 슬라이드 버튼

//   .addEventListener('click', function () {
//     console.log('click');
//   });
let leftBtn = document.querySelector('.xi-arrow-left');
let RightBtn = document.querySelector('.xi-arrow-right');

getnewsFeatureApi();
getnewsApi();
