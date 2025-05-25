// interfaces user, posts and comments 
interface User{

}

interface Post{

}

interface Comment{
    
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