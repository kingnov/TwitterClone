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
function renderPosts(posts) {
    userDetail.innerHTML = "";
    posts.forEach((post) => {
        const li = document.createElement("li");
        li.innerHTML = `<div class='post'><img src='images/ProfileImage.png'><div><h4>${post.title}</h4><p>${post.body}</p></div></div>`;
        li.addEventListener("click", () => loadComments(post.id));
        userDetail.appendChild(li);
    });
}
function renderComments(comments) {
    userComments.innerHTML = "";
    comments.forEach((comment) => {
        const li = document.createElement("li");
        li.innerHTML = `<div class='comment'><img src='images/ProfileImage'><div><h5>${comment.email}</h5><p>${comment.body}</p></div></div>`;
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
            renderPosts(posts);
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
