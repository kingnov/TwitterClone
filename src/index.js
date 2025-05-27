var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var userSelect = document.getElementById("pickUser");
var userDetail = document.getElementById("userdetail");
var userComments = document.getElementById("userComments");
var nameField = document.getElementById("userName");
var handleField = document.getElementById("userHandle");
var emailField = document.getElementById("userEmail");
var bioField = document.getElementById("userBio");
var locationField = document.getElementById("userLocation");
function fetchUsers() {
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("https://jsonplaceholder.typicode.com/users")];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function fetchPosts(userId) {
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("https://jsonplaceholder.typicode.com/posts?userId=".concat(userId))];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function fetchComments(postId) {
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("https://jsonplaceholder.typicode.com/comments?postId=".concat(postId))];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function renderUser(user) {
    nameField.textContent = user.name;
    handleField.textContent = "@".concat(user.username);
    emailField.textContent = user.email;
    bioField.textContent = user.company.catchPhrase;
    locationField.textContent = user.address.city;
}
function renderPosts(posts) {
    userDetail.innerHTML = "";
    posts.forEach(function (post) {
        var li = document.createElement("li");
        li.innerHTML = "\n        <div class=\"post\">\n          <img src=\"images/ProfileImage.png\" class=\"profile-pic\">\n          <div>\n            <h4>Leanne Graham <img src=\"images/verify.png\" class=\"verify-icon\" /></h4>\n            <p>".concat(post.body, "</p>\n            <div class=\"icons\">\n              <span>\uD83D\uDDE8\uFE0F <span>200</span></span>\n              <span>\uD83D\uDD01 <span>200</span></span>\n              <span>\u2764\uFE0F <span style=\"color:red;\">200</span></span>\n            </div>\n          </div>\n        </div>");
        li.addEventListener("click", function () { return loadComments(post.id); });
        userDetail.appendChild(li);
    });
}
function renderComments(comments) {
    userComments.innerHTML = "";
    comments.forEach(function (comment) {
        var li = document.createElement("li");
        li.innerHTML = "\n        <div class=\"comment\">\n          <img src=\"images/ProfileImage.png\" class=\"profile-pic\">\n          <div>\n            <h5>".concat(comment.email, " <img src=\"images/verify.png\" class=\"verify-icon\" /></h5>\n            <p>").concat(comment.body, "</p>\n            <div class=\"icons\">\n              <span>\uD83D\uDDE8\uFE0F <span>0</span></span>\n              <span>\uD83D\uDD01 <span>0</span></span>\n              <span>\u2764\uFE0F <span style=\"color:red;\">0</span></span>\n            </div>\n          </div>\n        </div>");
        userComments.appendChild(li);
    });
}
function loadUser(userId) {
    return __awaiter(this, void 0, void 0, function () {
        var users, user, posts;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetchUsers()];
                case 1:
                    users = _a.sent();
                    user = users.find(function (u) { return u.id === userId; });
                    if (!user) return [3 /*break*/, 3];
                    renderUser(user);
                    return [4 /*yield*/, fetchPosts(user.id)];
                case 2:
                    posts = _a.sent();
                    renderPosts(posts);
                    if (posts.length > 0)
                        loadComments(posts[0].id);
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
function loadComments(postId) {
    return __awaiter(this, void 0, void 0, function () {
        var comments;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetchComments(postId)];
                case 1:
                    comments = _a.sent();
                    renderComments(comments);
                    return [2 /*return*/];
            }
        });
    });
}
function init() {
    return __awaiter(this, void 0, void 0, function () {
        var users;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetchUsers()];
                case 1:
                    users = _a.sent();
                    users.forEach(function (user) {
                        var option = document.createElement("option");
                        option.value = user.id.toString();
                        option.textContent = user.username;
                        userSelect.appendChild(option);
                    });
                    userSelect.addEventListener("change", function () {
                        var userId = parseInt(userSelect.value);
                        loadUser(userId);
                    });
                    loadUser(1);
                    return [2 /*return*/];
            }
        });
    });
}
init();
