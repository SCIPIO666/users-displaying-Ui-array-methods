//////---global variables----////////

const usersContainer=document.querySelector(".users-list");


//-----------------------------------------------------------////


////////////------  state/data----------  /////////////////
async function fetchMultipleUsers(num) {
    try{
        let response = await fetch(`https://randomuser.me/api/?results=${num}`);
            
                if(!response.ok){
                    throw new Error(`HTTP error1 Status: ${response.status}`)
                }{
                    let data= await response.json();
                    console.log(data.results); 
                    return data.results;
                }

    }catch (error) {
        console.error(`Fetch error:  ${error.message}`);
     }
 

}


// fetchMultipleUsers(20);

//////------------------------------------------------------------//

////////////////////////---- array methods ---  //////////////////////


 ///////////------------------------------------------------------//////////////////////////


 ////////////////// ---UI COMPONENTS ---////////////////////////////////////////////
 function createNode(tag,className,parent,content=""){

    const newElement=document.createElement(tag);
    newElement.classList.add(className);
    newElement.innerHTML=content;

  parent.appendChild(newElement);
  return newElement;

 }



 class Users{
    constructor(usersArray,container,childCreatorFunction){
        this.usersArray=usersArray;
        this.parent=container;
        this.childCreatorFunction=childCreatorFunction;
    }

    addUsers() {
            if (!this.usersArray || this.usersArray.length === 0) {
                console.error("User array is empty or not loaded.");
                return;
            }

            let userNodes = ["img", "h2", "div", "div", "div"];
            let userNodeClasses = ["user-photo", "user-name", "user-email", "user-location", "wealth"];

            for (let i = 0; i < this.usersArray.length; i++) {
                
                const newUser = this.childCreatorFunction("li", "user", this.parent);
                newUser.setAttribute("id", `user${i}`);

                userNodes.forEach((node, index) => {
                    
                    const nodeClass = userNodeClasses[index]; 
                    const createdNode = this.childCreatorFunction(node, nodeClass, newUser); 
                   
                    if (createdNode.classList.contains("user-photo")) {
                        this.allocateContent(createdNode, i);
                    } else {
                        createdNode.innerHTML = this.allocateContent(createdNode, i);
                    }
                });
            }
        }

    allocateContent(node,number){
        if(node.classList.contains("user-photo")){
            node.setAttribute("src",this.usersArray[number].picture.medium)

        }
        if(node.classList.contains("user-name")){
            return `<label>Name: </label> ${this.usersArray[number].name.title} ${this.usersArray[number].name.first} ${this.usersArray[number].name.last}`;

        }

        if(node.classList.contains("user-email")){
            return `<label>Email: </label> ${this.usersArray[number].email}`;
        }

        if(node.classList.contains("user-location")){
            return `<label>Location: </label> ${this.usersArray[number].location.city}, ${this.usersArray[number].location.country}`
        }
        if(node.classList.contains("wealth")){
            const randomWealth=Math.floor(Math.random() * (2000000000 - 200000  + 1)) + 200000;
            return `<label>Wealth: </label> $${randomWealth.toLocaleString('en-US')}`;

        }
        return ""; // Fallback return value

    }

    removeUsers(){
        const users=document.querySelectorAll(".user");
        users.forEach(user=>{
            user.remove();
        });
    }

    getUser(userId){
        this.usersArray.filter(index=>{
            userId=this.usersArray[index]=userId
        });
    }

 }

async function initializeApp() {
    const usersArray = await fetchMultipleUsers(32);
    
    if (!usersContainer) {
        console.error("Element with class 'users-list' not found.");
        return;
    }

    const ui = new Users(usersArray, usersContainer, createNode);
    ui.addUsers(); 
    
}

 initializeApp(); // Start the application
 ///////////////////////////////////////////////////////////////////////////////

