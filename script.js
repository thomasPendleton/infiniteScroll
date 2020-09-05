const postsContainer = document.getElementById("posts-container");
const loading = document.querySelector(".loader");
const filter = document.getElementById("filter");

let limit = 5;
let page = 1;

// Fetch Post from API
async function getPosts() {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
  );
  const data = await res.json();

  return data;
}

// Show posts in Dom
async function showPosts() {
  const posts = await getPosts();

  posts.forEach((post) => {
    const postEl = document.createElement("div");
    postEl.classList.add("post");
    postEl.innerHTML = `
        <div class="number">
                ${post.id}
            </div>
            <div class="post-info">
                <h2 class="post-title">${post.title}</h2>
                <p class="post-body">
                    ${post.body}
                </p>
            </div>
        </div>
        `;
    postsContainer.appendChild(postEl);
  });

  //   console.log(posts)

  // console.log(posts[0].title)
}

// Show loading and fetch more posts
// This will give an extended loading time to show the
// loading circles. The way below will only show the circles
// during the loading. which for this program is a very short period of time.
// function showLoading(){
//     loading.classList.add('show')
//     setTimeout( ()=> {
//         loading.classList.remove('show')
//         setTimeout(()=> {
//             console.log(page)
//             page++;
//             showPosts();
//         },300)

//     },1000) ;

// }

// Alternate ShowLoading function
let isLoading = false;
async function showLoading() {
  if (isLoading) {
    return;
  }

  page++;
  isLoading = true;
  loading.classList.add("show");

  await showPosts();

  isLoading = false;
  loading.classList.remove("show");
}

// Filter posts by input
function filterPosts(e) {
  const term = e.target.value.toUpperCase();
  const posts = document.querySelectorAll(".post");
  // console.log(posts[0].innerText)
  posts.forEach((post) => {
    const title = post.querySelector(".post-title").innerText.toUpperCase();
    const body = post.querySelector(".post-body").innerText.toUpperCase();

    if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
      post.style.display = "flex";
    } else {
      post.style.display = "none";
    }
  });
}

// Show initial posts
showPosts();

window.addEventListener("scroll", () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight) {
    showLoading();
  }
});

//
filter.addEventListener("input", filterPosts);
