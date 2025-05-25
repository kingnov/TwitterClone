// interfaces user, posts and comments 
interface User{

    id:number,
    name:string,
    username:string,
    email:string,
    address: {
        street:string,
        suite:string,
        city:string,
        zipcode:string,
        geo:{
            lat:string,
            lng:string
        },
    },
    phone:string,
    website:string,
    company:{
        name:string,
        catchPhrase:string,
        bs:string
    }
}

interface Post{
    userId:string,
    id:number,
    title:string,
    body:string


}

interface Comment{
    postId: number,
    name: string,
    email:string,
    body:string
    
}

//select dom element from the html
const pickUser = document.getElementById("pickUser") as HTMLSelectElement;
//selectinguser 
const userDetails = document.getElementById("userdetails") as HTMLUListElement
//post
const userPost = document.getElementById("user-post") as HTMLUListElement;
//comments
const userComments = document.getElementById("user-comment") as HTMLUListElement;
//userdetails call


// function to get  all users
let userURL: User[]
const getAllUsers = async ()=>{
    const userUrl = await fetch('https://jsonplaceholder.typicode.com/users');
    //sending the request
    if(userUrl.ok){
        userURL = await userUrl.json();
        userURL.forEach(user =>{
            // create an option element 
            const avaialableOption = document.createElement('option');
            avaialableOption.value = user.id.toString()
            avaialableOption.textContent = user.name;
            pickUser.appendChild(avaialableOption)
        });
        // pick user with value of 1 to be defauled displayed 
        pickUser.value = '1'
        getUserPost(1)
        getUserDetails(1)
    }
}

//function to get user post
let postURL: Post[]
const getUserPost = async(userId: number)=>{
    const postUrl = await fetch('https://jsonplaceholder.typicode.com/posts');
    if(postUrl.ok){
        postURL = await postUrl.json();

        //make the innerHTML of the post and comment empty
        userPost.innerHTML = '';
        userComments.innerHTML = '';
        //loop through the post
        postURL.forEach(post =>{
            const postListElement = document.createElement('li')
            postListElement.textContent = `${post.title} -${post.body}`;
            userPost.appendChild(postListElement);
            postListElement.addEventListener('click', ()=>{
            getUserComment(post.id, post.id)
            });
        });
    };
};

const getUserDetails = (userId:number)=>{
    // loop 
    const user = userURL.find(user=>user.id===userId)
    if(user){
        userDetails.innerHTML = '';
        const userDetail = [
            `${user.name}`,
            `${user.username}`,
            `${user.company.catchPhrase}`
        ]
        // loop 
        userDetail.forEach(details =>{
            const userLists = document.createElement('li')
            userLists.textContent = details
            userDetails.appendChild(userLists)

        })
    }
}

//function to get the comment
let commentURL : Comment[]
const getUserComment = async(userId:number, postId:number)=>{
    const commentUrl = await fetch(`https://jsonplaceholder.typicode.com/comments${postId}`)
    if(commentUrl.ok){
        commentURL = await commentUrl.json();
        userComments.innerHTML = '';
        commentURL.forEach(comments =>{
            const commentListElement = document.createElement('li');
            commentListElement.textContent = `${comments.email} ${comments.body}`;
            userComments.appendChild(commentListElement);
        });

    }
}

// addEventListener to the select drop down change 
pickUser.addEventListener('change', ()=>{
    const pickedUserId = parseFloat(pickUser.value)
    getUserPost(pickedUserId)
    getUserDetails(pickedUserId)
})

getAllUsers()