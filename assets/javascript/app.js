let http = new EasyHTTP();
let httpER = new EasyHTTP();

//news articles
http.get("https://min-api.cryptocompare.com/data/v2/news/?lang=EN&api_key={4af7da224dfe53bde5d9c44d0c9d5836cd0703a755409a35a07035d99b1e8e44}")
    .then((data) => {

        data.Data.map(mainData => {
            let title = mainData.title;
            let para = mainData.body;
            let image = mainData.imageurl;
            let articleUrl = mainData.url;
            let newsPara = document.createElement('p');
            newsPara.innerHTML = para;
            //extras <<<
            let tags = mainData.tags;
            let upvotes = mainData.upvotes;
            //>>>

            //News image
            let newsImage = document.createElement('img');
            newsImage.classList.add('news-image');
            newsImage.src = image;


            //News header
            let newsTitle = document.createElement('a');
            newsTitle.innerText = title;
            newsTitle.href = articleUrl;
            newsTitle.target = "_blank";
            newsTitle.classList.add('news-title');

            //News container
            let newsContainer = document.createElement('div');
            newsContainer.classList.add('news-container')
            newsContainer.append(newsTitle, newsImage);

            // main
            let newsMain = document.querySelector('.news-main');
            newsMain.append(newsContainer);
        });


    })
    .catch((err) => alert(`${err}`))

// News

fetch("https://api.nomics.com/v1/currencies/ticker?key=demo-26240835858194712a4f8cc0dc635c7a&ids=BTC,ETH,XRP&interval=1d,30d&convert=EUR")
    .then(response => response.json())
    .then(data => console.log(data))