let httpNews = new EasyHTTP();
let httpDiscussions = new EasyHTTP();
let httpComments = new EasyHTTP();


// news articles
httpNews.get("https://min-api.cryptocompare.com/data/v2/news/?lang=EN&api_key={4af7da224dfe53bde5d9c44d0c9d5836cd0703a755409a35a07035d99b1e8e44}")
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

// Discussions


httpDiscussions.get("https://hn.algolia.com/api/v1/search?query=cryptocurrency")
    .then((data) => data.hits)
    .then(unsortedData => {
        unsortedData.map(sortedData => {
            // console.log(sortedData)
            let title = sortedData.title
            let titleURL = sortedData.url
            let storyID = sortedData.objectID

            let discMain = document.querySelector('.discussions-wrapper');
            let discTitle = document.createElement('a')
            discTitle.classList.add('.disc-title')
            discTitle.innerHTML = title;
            discTitle.href = titleURL;
            discMain.append(discTitle)

            // Comments
            httpComments.get(`https://hn.algolia.com/api/v1/search?tags=comment,story_${storyID}`)
                .then(data => data.hits)
                .then(rawData => rawData.map(comment => {
                    let comments = comment.comment_text;
                    let author = comment.author;

                    //**Create UI**



                    discComment = document.createElement('p');
                    discComment.classList.add('.disc-comment');
                    discComment.innerHTML = comments;



                    let discAuthor = document.createElement('p');
                    discAuthor.classList.add('.disc-author')
                    discAuthor.innerHTML = `Comment by "${author}"`;



                    let discContainer = document.createElement('div');
                    discContainer.classList.add('disc-container');
                    discContainer.append(discTitle, discComment, discAuthor);
                    //append
                    discMain.append(discContainer);

                }));



        })

    })