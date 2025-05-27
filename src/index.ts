interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    address: {
      city: string;
    };
    company: {
      catchPhrase: string;
    };
  }
  
  interface Post {
    id: number;
    userId: number;
    title: string;
    body: string;
  }
  
  interface Comment {
    postId: number;
    name: string;
    email: string;
    body: string;
  }
  
  const userSelect = document.getElementById("pickUser") as HTMLSelectElement;
  const userDetail = document.getElementById("userdetail")!;
  const userComments = document.getElementById("userComments")!;
  const nameField = document.getElementById("userName")!;
  const handleField = document.getElementById("userHandle")!;
  const emailField = document.getElementById("userEmail")!;
  const bioField = document.getElementById("userBio")!;
  const locationField = document.getElementById("userLocation")!;
  
  async function fetchUsers(): Promise<User[]> {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    return await res.json();
  }
  
  async function fetchPosts(userId: number): Promise<Post[]> {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
    return await res.json();
  }
  
  async function fetchComments(postId: number): Promise<Comment[]> {
    const res = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
    return await res.json();
  }
  
  function renderUser(user: User) {
    nameField.textContent = user.name;
    handleField.textContent = `@${user.username}`;
    emailField.textContent = user.email;
    bioField.textContent = user.company.catchPhrase;
    locationField.textContent = user.address.city;
  }
  
  function renderPosts(posts: Post[]) {
    userDetail.innerHTML = "";
    posts.forEach((post) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <div class="post">
          <img src="images/ProfileImage.png" class="profile-pic">
          <div>
            <h4>Leanne Graham <img src="images/verify.png" class="verify-icon" /></h4>
            <p>${post.body}</p>
            <div class="icons">
              <span>🗨️ <span>200</span></span>
              <span>🔁 <span>200</span></span>
              <span>❤️ <span style="color:red;">200</span></span>
            </div>
          </div>
        </div>`;
      li.addEventListener("click", () => loadComments(post.id));
      userDetail.appendChild(li);
    });
  }
   
  
  function renderComments(comments: Comment[]) {
    userComments.innerHTML = "";
    comments.forEach((comment) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <div class="comment">
          <img src="images/ProfileImage.png" class="profile-pic">
          <div>
            <h5>${comment.email} <img src="images/verify.png" class="verify-icon" /></h5>
            <p>${comment.body}</p>
            <div class="icons">
              <span>🗨️ <span>0</span></span>
              <span>🔁 <span>0</span></span>
              <span>❤️ <span style="color:red;">0</span></span>
            </div>
          </div>
        </div>`;
      userComments.appendChild(li);
    });
  }
  
  
  async function loadUser(userId: number) {
    const users = await fetchUsers();
    const user = users.find(u => u.id === userId);
    if (user) {
      renderUser(user);
      const posts = await fetchPosts(user.id);
      renderPosts(posts);
      if (posts.length > 0) loadComments(posts[0].id);
    }
  }
  
  async function loadComments(postId: number) {
    const comments = await fetchComments(postId);
    renderComments(comments);
  }
  
  async function init() {
    const users = await fetchUsers();
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
  }
  
  init();
  