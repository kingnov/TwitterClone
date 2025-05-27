"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const userSelect = document.getElementById("pickUser");
const userDetail = document.getElementById("userdetail");
const userComments = document.getElementById("userComments");
const nameField = document.getElementById("userName");
const handleField = document.getElementById("userHandle");
const emailField = document.getElementById("userEmail");
const bioField = document.getElementById("userBio");
const locationField = document.getElementById("userLocation");
function fetchUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch("https://jsonplaceholder.typicode.com/users");
        return yield res.json();
    });
}
function fetchPosts(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
        return yield res.json();
    });
}
function fetchComments(postId) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
        return yield res.json();
    });
}
function renderUser(user) {
    nameField.textContent = user.name;
    handleField.textContent = `@${user.username}`;
    emailField.textContent = user.email;
    bioField.textContent = user.company.catchPhrase;
    locationField.textContent = user.address.city;
}
function renderPosts(posts, user) {
    userDetail.innerHTML = "";
    if (posts.length === 0) {
        userDetail.innerHTML = "<p>No posts available.</p>";
        return;
    }
    posts.forEach((post) => {
        const li = document.createElement("li");
        li.innerHTML = `
      <div class="post">
        <img src="images/ProfileImage.png" class="profile-pic" alt="Post Image">
        <div>
          <h4>${user.name}</h4>
          <p>${post.body}</p>
          <div class="icons">
            <span>🗨️ 200</span>
            <span>🔁 200</span>
            <span style="color:red;">❤️ 200</span>
          </div>
        </div>
      </div>`;
        li.addEventListener("click", () => loadComments(post.id));
        userDetail.appendChild(li);
    });
}
function renderComments(comments) {
    userComments.innerHTML = "";
    if (comments.length === 0) {
        userComments.innerHTML = "<p>No comments found.</p>";
        return;
    }
    comments.forEach((comment) => {
        const li = document.createElement("li");
        li.innerHTML = `
      <div class="comment">
        <img src="images/ProfileImage.png" class="profile-pic" alt="Commenter">
        <div>
          <h5>${comment.email}</h5>
          <p>${comment.body}</p>
          <div class="icons">
            <span>🗨️ 0</span>
            <span>🔁 0</span>
            <span style="color:red;">❤️ 0</span>
          </div>
        </div>
      </div>`;
        userComments.appendChild(li);
    });
}
function loadUser(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield fetchUsers();
        const user = users.find(u => u.id === userId);
        if (user) {
            renderUser(user);
            const posts = yield fetchPosts(user.id);
            renderPosts(posts, user);
            if (posts.length > 0)
                loadComments(posts[0].id);
        }
    });
}
function loadComments(postId) {
    return __awaiter(this, void 0, void 0, function* () {
        const comments = yield fetchComments(postId);
        renderComments(comments);
    });
}
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield fetchUsers();
        users.forEach(user => {
            const option = document.createElement("option");
            option.value = user.id.toString();
            option.textContent = user.username;
            userSelect.appendChild(option);
        });
        userSelect.addEventListener("change", () => {
            const userId = parseInt(userSelect.value);
            loadUser(userId);
        });
        loadUser(1);
    });
}
init();
