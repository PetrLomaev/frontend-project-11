import _ from "lodash";

const updater = (docXtml, watchedState) => {
  const { feeds, posts, stateForm, visitedLinks } = watchedState;
  if (stateForm === 'not_filled') {
    return;
  }

  const parsererror = docXtml.querySelector('parsererror');
  if (parsererror) {
    const errorParsing = parsererror.textContent;
    throw errorParsing;
  }
  
  const feed = {
    title: docXtml.querySelector('channel title').textContent,
    description: docXtml.querySelector('channel description').textContent,
  }

  const itemsFeed = [feed, ...watchedState.feeds];
  const newItemsFeed = _.uniqBy(itemsFeed, 'title');

  watchedState.feeds = newItemsFeed;

  const divFeed = document.querySelector('div[class="col-md-10 col-lg-4 mx-auto order-0 order-lg-1 feeds"]');
  divFeed.innerHTML = '';

  const divFeedTitle = document.createElement('div');
  divFeedTitle.classList.add('card-body');
  const h2Feed = document.createElement('h2');
  h2Feed.classList.add('card-title', 'h4');
  h2Feed.textContent = 'Фиды';
  divFeedTitle.append(h2Feed);

  const ulFeedDescription = document.createElement('ul');
  ulFeedDescription.classList.add('list-group', 'border-0', 'rounded-0');

  newItemsFeed.forEach((item) => {
    const liDescription = document.createElement('li');
    liDescription.classList.add('list-group-item', 'border-0', 'border-end-0');
    const h3Description = document.createElement('h3');
    h3Description.classList.add('h6', 'm-0');
    h3Description.textContent = item.title;
    const pDescription = document.createElement('p');
    pDescription.classList.add('m-0', 'small', 'text-black-50');
    pDescription.textContent = feed.description;

    liDescription.append(h3Description, pDescription);
    ulFeedDescription.append(liDescription);
  })

  

  divFeed.append(divFeedTitle, ulFeedDescription);

  const allItem = Array.from(docXtml.querySelectorAll('item'));
  const allItemToObj = allItem.map((item) => {
    const newPost = {
      title: item.querySelector('title').textContent,
      description: item.querySelector('description').textContent,
      link: item.querySelector('link').textContent,
      id: _.uniqueId(),
      status: 'not_watched',
    }
    //watchedState.posts = [newPost, ...posts];
    return newPost;
  });
  
    
  const divAutoPosts = document.querySelector('div[class="col-md-10 col-lg-8 order-1 mx-auto posts"]');
  divAutoPosts.innerHTML = '';
  const divPosts = document.createElement('div');
    
  divPosts.classList.add('card-body');
  const h2El = document.createElement('h2');
  h2El.classList.add('card-title', 'h4');
  h2El.textContent = 'Посты';
  divPosts.append(h2El);
  const ulPosts = document.createElement('ul');
  ulPosts.classList.add('list-group', 'border-0', 'rounded-0');

  const itemsPost = [...allItemToObj, ...watchedState.posts];
  console.log('itemsPost', itemsPost)
  const newItemsPost = _.uniqBy(itemsPost, 'link');
  watchedState.posts = newItemsPost;
  console.log('newItemsPost', newItemsPost);

  newItemsPost.forEach(({ title, description, link, id, status }) => {

    const liEl = document.createElement('li');
    liEl.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');
    liEl.id = id;

    const aEl = document.createElement('a');
    aEl.classList.add('fw-bold');
    if (watchedState.visitedLinks.includes(link)) {
      aEl.classList.replace('fw-bold', 'fw-normal');
    }
    aEl.setAttribute('href', link);
    aEl.setAttribute('data-id', '');
    aEl.setAttribute('target', '_blank');
    aEl.setAttribute('rel', 'oopener noreferrer');
    aEl.textContent = title;

      const buttonEl = document.createElement('button');
      buttonEl.classList.add('btn', 'btn-outline-primary', 'btn-sm');
      buttonEl.setAttribute('type', 'button');
      buttonEl.setAttribute('data-id', '');
      buttonEl.setAttribute('data-bs-toggle', 'modal');
      buttonEl.setAttribute('data-bs-target', '#modal');
      buttonEl.textContent = 'Просмотр';
      liEl.addEventListener('click', () => {
        const elDescription = document.querySelector('div[class="modal-body text-break"]');
        elDescription.textContent = description;
        aEl.classList.replace('fw-bold', 'fw-normal');
        watchedState.visitedLinks.push(link);
      });

      liEl.append(aEl, buttonEl);
      ulPosts.append(liEl);
    })
    divPosts.append(ulPosts);
    divAutoPosts.append(divPosts);
};

export default updater;