fetch("https://jsonplaceholder.typicode.com/users")
  .then((response) => response.json())
  .then((users) => {
    const topUsers = users.slice(0, 3);
    const bottomUsers = users.slice(3, 6);

    // Display top users
    const topUserList = document.getElementById("topUserList");
    topUsers.forEach((user) => {
      const userDiv = createUserDiv(user);
      topUserList.appendChild(userDiv);
    });

    // Display bottom users
    const bottomUserList = document.getElementById("bottomUserList");
    bottomUsers.forEach((user) => {
      const userDiv = createUserDiv(user);
      bottomUserList.appendChild(userDiv);
    });
  })
  .catch((error) => console.log(error));

//create user div element
function createUserDiv(user) {
  const userDiv = document.createElement("div");
  userDiv.className = "userDiv";
  userDiv.innerHTML = `
    <div class="user-name"> ${user.name}</div>
    <div class="user-id">ID: ${user.id}</div>
    <div class="user-mail">Email: ${user.email}</div>
    <div class="user-phone">Phone: ${user.phone}</div>
    <button>Select User</button>
  `;
  return userDiv;
}

const usersTitle = document.querySelector(".users-title");
usersTitle.addEventListener("mouseover", handleTitleHover);
usersTitle.addEventListener("mouseout", handleTitleHover);

//handle title hover
function handleTitleHover(event) {
  const userDetails = document.querySelectorAll(".userDiv");

  if (event.type === "mouseover") {
    userDetails.forEach((userDetail) => {
      userDetail.style.transition = "font-size 0.4s";
      userDetail.style.fontSize = "16px";
    });
  } else if (event.type === "mouseout") {
    userDetails.forEach((userDetail) => {
      userDetail.style.transition = "font-size 0.4s";
      userDetail.style.fontSize = "13px";
    });
  }
}

function createUserDiv(user) {
  const userDiv = document.createElement("div");
  userDiv.className = "userDiv";
  userDiv.innerHTML = `
      <div class="user-name">${user.name}</div>
      <div class="user-id">ID: ${user.id}</div>
      <div class="user-mail">Email: ${user.email}</div>
      <div class="user-phone">Phone: ${user.phone}</div>
      <button class="select-user" data-userid="${user.id}">Select User</button>
    `;
  return userDiv;
}

document.addEventListener("click", handleSelectUser);

function handleSelectUser(event) {
  if (event.target.classList.contains("select-user")) {
    const selectedUserId = event.target.dataset.userid;
    document.getElementById("userId").value = selectedUserId;
    document.getElementById("userId").disabled = true;
  }
}

const form = document.getElementById("addPostForm");
form.addEventListener("submit", handleFormSubmit);

function handleFormSubmit(event) {
  event.preventDefault();

  const userId = document.getElementById("userId").value;
  const title = document.getElementById("title").value;
  const body = document.getElementById("body").value;

  const postData = {
    userId: userId,
    title: title,
    body: body,
  };

  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Post created:", data);
    })
    .catch((error) => console.log(error));
}

const addPostForm = document.getElementById("addPostForm");
addPostForm.addEventListener("submit", handleFormSubmit);

function handleFormSubmit(event) {
  event.preventDefault();

  const userId = document.getElementById("userId").value;
  const title = document.getElementById("title").value;
  const body = document.getElementById("body").value;

  const formData = {
    userId: userId,
    title: title,
    body: body,
  };

  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => response.json())
    .then((data) => {
      alert("Form data sent successfully", data);
    })
    .catch((error) => {
      alert("Error sending form data", error);
    });
}

//download images
fetch("https://jsonplaceholder.typicode.com/photos")
  .then((response) => response.json())
  .then((photos) => {
    // Shuffle the array of photos randomly
    const shuffledPhotos = shuffleArray(photos);

    // Display six random photos
    const photoList = document.getElementById("photoList");

    for (let i = 0; i < 6; i++) {
      const photo = shuffledPhotos[i];
      const photoDiv = createPhotoDiv(photo);
      photoList.appendChild(photoDiv);
    }
  })
  .catch((error) => console.log(error));

function createPhotoDiv(photo) {
  const photoDiv = document.createElement("div");
  photoDiv.className = "photo-container";
  photoDiv.innerHTML = `
    <img src="${photo.url}" alt="${photo.title}" class="random-image">
  `;
  return photoDiv;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
