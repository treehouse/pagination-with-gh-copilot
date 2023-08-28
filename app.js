const addNewFriendBtn = document.querySelector("#addFriendBtn");
const friendsList = document.querySelector("#friendsList");
const pagination = document.querySelector("#pagination");
const numberOfFriendsPerPage = 5;

addNewFriendBtn.addEventListener("click", () => {
  fetch("https://randomuser.me/api/")
    .then((res) => res.json())
    .then((data) => createUser(data.results[0]));
});

function createUser(data) {
  friendsList.innerHTML += `<li>
        <img src="${data.picture.medium}" />
        <div class="name-group">
            <p class="full-name">${data.name.first} ${data.name.last}</p>
            <p class="username">${data.login.username}</p>
        </div>
        <p class="email">${data.email}</p>
    </li>`;
  createPaginationButtons();
}

function createPaginationButtons() {
  // returns the number of friends
  const numberOfFriends = friendsList.querySelectorAll("li").length;
  const numberOfPages = Math.ceil(numberOfFriends / numberOfFriendsPerPage);
  const listItems = friendsList.querySelectorAll("li");

  pagination.innerHTML = "";

  for (let i = 1; i <= numberOfPages; i++) {
    const button = document.createElement("button");

    button.innerText = i;

    button.addEventListener("click", () => {
      paginateList(i);
    });
    pagination.appendChild(button);
  }

  let numOfPages = numberOfFriends / numberOfFriendsPerPage;

  listItems.forEach((item, index) => {
    if (
      index >= numberOfFriendsPerPage * (numOfPages - 1) &&
      index < numberOfFriendsPerPage * numOfPages
    ) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}

function updateListItems(pageNumber) {
  const buttons = pagination.querySelectorAll("button");
  buttons.forEach((button) => {
    if (parseInt(button.innerText) === pageNumber) {
      button.classList.add("active");
    } else {
      button.classList.remove("active");
    }
  });
}

function paginateList(pageNumber) {
  const listItems = friendsList.querySelectorAll("li");

  listItems.forEach((item, index) => {
    if (
      index >= numberOfFriendsPerPage * (pageNumber - 1) &&
      index < numberOfFriendsPerPage * pageNumber
    ) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });

  updateListItems(pageNumber);
}
