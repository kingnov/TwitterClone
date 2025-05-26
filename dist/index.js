"use strict";
// Project 1: Twitter Clone
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
//select dom element from the html
const pickUser = document.getElementById("pickUser");
//selectinguser 
const userDetails = document.getElementById("userdetail");
//post
const userPost = document.getElementById("user-post");
//comments
const userComments = document.getElementById("user-comment");
//userdetails call
// function to get  all users
let userURL;
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const userUrl = yield fetch('https://jsonplaceholder.typicode.com/users');
    //sending the request
    if (userUrl.ok) {
        userURL = yield userUrl.json();
        userURL.forEach((user) => {
            // create an option element 
            const avaialableOption = document.createElement('option');
            avaialableOption.value = user.id.toString();
            avaialableOption.textContent = user.name;
            pickUser.appendChild(avaialableOption);
        });
        // pick user with value of 1 to be defauled displayed 
        pickUser.value = '1';
        getUserPost(1);
        getUserDetails(1);
    }
});
//function to get user post
let postURL;
const getUserPost = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const postUrl = yield fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
    if (postUrl.ok) {
        postURL = yield postUrl.json();
        //make the innerHTML of the post and comment empty
        userPost.innerHTML = '';
        userComments.innerHTML = '';
        //loop through the post
        postURL.forEach(post => {
            const postListElement = document.createElement('li');
            const image = document.createElement('div');
            image.className = 'com-image';
            image.innerHTML = "";
            const imageDiv = document.createElement('div'); //div for images
            const image123 = document.createElement('img'); //its on its own
            image123.src = "/src/images/boseman.png";
            const leftDiv = document.createElement('div'); //left
            const pdiv = document.createElement('div');
            pdiv.className = "pElements";
            const message = document.createElement('p');
            message.textContent = '200';
            const share = document.createElement('p');
            share.textContent = '200';
            const love = document.createElement('p');
            love.textContent = '200';
            // commentListElement.textContent = `${comments.email} ${comments.body}`
            postListElement.textContent = `${post.title} -${post.body}`;
            imageDiv.appendChild(image123);
            leftDiv.appendChild(postListElement);
            leftDiv.appendChild(pdiv);
            image.appendChild(imageDiv);
            image.appendChild(leftDiv);
            pdiv.appendChild(message);
            pdiv.appendChild(share);
            pdiv.appendChild(love);
            userPost.appendChild(image);
            postListElement.addEventListener('click', () => {
                getUserComment(post.id);
            });
        });
    }
    ;
});
const getUserDetails = (userId) => {
    // loop 
    const user = userURL.find(user => user.id === userId);
    if (user) {
        userDetails.innerHTML = '';
        const userDetail = [
            `${user.email}`,
            `@${user.username}`,
            `${user.company.catchPhrase}`,
            `${user.address.street}`
        ];
        // loop 
        userDetail.forEach(details => {
            const userLists = document.createElement('li');
            userLists.textContent = details;
            userDetails.appendChild(userLists);
        });
    }
};
//function to get the comment
let commentURL;
const getUserComment = (postId) => __awaiter(void 0, void 0, void 0, function* () {
    const commentUrl = yield fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
    if (commentUrl.ok) {
        commentURL = yield commentUrl.json();
        userComments.innerHTML = '';
        commentURL.forEach(comments => {
            const image = document.createElement('div');
            image.className = 'com-image';
            image.innerHTML = "";
            const imageDiv = document.createElement('div'); //div for images
            const image123 = document.createElement('img'); //its on its own
            image123.src = "/src/images/boseman.png";
            const leftDiv = document.createElement('div'); //left
            const commentListElement = document.createElement('li');
            const pdiv = document.createElement('div');
            pdiv.className = "pElements";
            const message = document.createElement('p');
            message.textContent = '0';
            const share = document.createElement('p');
            share.textContent = '0';
            const love = document.createElement('p');
            love.textContent = '0';
            commentListElement.textContent = `${comments.email} ${comments.body}`;
            imageDiv.appendChild(image123);
            leftDiv.appendChild(commentListElement);
            leftDiv.appendChild(pdiv);
            image.appendChild(imageDiv);
            image.appendChild(leftDiv);
            pdiv.appendChild(message);
            pdiv.appendChild(share);
            pdiv.appendChild(love);
            userComments.appendChild(image);
        });
    }
});
// addEventListener to the select drop down change 
pickUser.addEventListener('change', () => {
    const pickedUserId = parseFloat(pickUser.value);
    getUserPost(pickedUserId);
    getUserDetails(pickedUserId);
});
getAllUsers();
