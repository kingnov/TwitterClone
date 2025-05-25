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
const userdeitails = document.getElementById("userdetail") as HTMLUListElement
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
            avaialableOption.textContent = user.name;
            pickUser.appendChild(avaialableOption)
        });
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
                getUserComment(comment[0].id)
            });
        });
    };
};