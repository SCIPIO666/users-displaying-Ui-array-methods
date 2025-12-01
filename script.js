//////---global variables----////////

const usersContainer=document.querySelector(".users-list");
const closeModal=document.querySelector("#close");
const modal= document.querySelector(".display");


//-----------------------------------------------------------////

//----------dom events---------------------------------------///

closeModal.addEventListener("click",e=>{
    modal .classList.toggle("active");
});

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

//////------------------------------------------------------------//

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
            const randomWealth=Math.floor(Math.random() * (2000000 - 200000  + 1)) + 200000;
            return `<label >Wealth: </label> $${randomWealth.toLocaleString('en-US')}`;
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
//----------------------------------array mehods ------------------------------//
function getWealthElem(userContainer){
        const wealthElem=userContainer.querySelector(".wealth")
        return wealthElem;
}
function getCurrentWealth(userContainer) {
    if(!userContainer) return;

    const welathElem=getWealthElem(userContainer);
  const wealthValue=welathElem.textContent;
//   console.log(wealthValue);
  const cleanedValue=wealthValue.replace(/[\D]/g,"");
//   console.log(cleanedValue.trim())
  return parseFloat(cleanedValue.trim());

}
function updateWealthDisplay(wealthValue,wealthNode){
    wealthNode.innerHTML=`<label >Wealth: </label> $${wealthValue.toLocaleString('en-US')}`;
}

function doubleMoney() {
    const currentUsers=document.querySelectorAll(".user");
    currentUsers.forEach(user=>{
        const originalWealth=getCurrentWealth(user);
        const wealthElem=getWealthElem(user);
        const doubleWealth=originalWealth*2;
         updateWealthDisplay(doubleWealth,wealthElem);

    });
updateEachUserWealth()
}
function showMillionares(){
   const currentUsers=document.querySelectorAll(".user");
    currentUsers.forEach(user=>{
        if(user.dataset.wealth>999999){
            user.style.display="flex";
        }else{
            user.style.display="none";
        }
    });
}
function sortByRichest(){
 const currentUsers=document.querySelectorAll(".user");
    currentUsers.forEach(user=>{
        if(user.dataset.wealth>999999){
            user.style.display="flex";
        }else{
            user.style.display="none";
        }
    });
}
function calculateWealth(){

}
function displayTotal(){
    const overlay=document.querySelector(".display");
    overlay.classList.toggle("active");

}
const buttons=document.querySelectorAll("button");
buttons.forEach(button=>{
    button.addEventListener("click",e=>{
        const action=e.target.id;

        switch (action) {
            case "double-money":
                    doubleMoney();
                break;

            case "show-millionaires":
                    showMillionares();
                break;

            case "sort-by-richest":
                    sortByRichest();
                break;

            case "calculate-wealth":
                    calculateWealth();
                    displayTotal();
                break;

            default:
                console.error("Unknown action:", action);
                break;
        }
    });
});

//----------------------------------------------------------------------------//

function updateEachUserWealth(){
    const allUsers=document.querySelectorAll(".user");
    allUsers.forEach(user=>{
       const wealth=getCurrentWealth(user);
       user.dataset.wealth=wealth;
    });

}
async function initializeApp() {
    const usersArray = await fetchMultipleUsers(32);
    
    if (!usersContainer) {
        console.error("Element with class 'users-list' not found.");
        return;
    }

    const ui = new Users(usersArray, usersContainer, createNode);
    ui.addUsers(); 
    updateEachUserWealth()
 
}

 initializeApp(); // Start the application

 ///////////////////////////////////////////////////////////////////////////////

