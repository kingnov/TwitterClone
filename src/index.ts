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