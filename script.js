//////---global variables----////////

const usersContainer=document.querySelector(".users-list");
const closeModal=document.querySelector("#close");
const modal= document.querySelector(".display");


//-----------------------------------------------------------////

//----------dom events---------------------------------------///

closeModal.addEventListener("click",e=>{
    modal .classList.remove("active");
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
        this.currentUsers=[];
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
    addSortedUsers(){

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
            const randomWealth=Math.floor(Math.random() * (1500000 - 200000  + 1)) + 200000;
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

//-------------helper functions------//
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
//------------------double money--------------//
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

//---------------------------show millinares-------------//
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
//------------------sorting from richest-------------//
function compileUserWealthList(){
     const currentUsers=document.querySelectorAll(".user");
   let userProfiles=[];

    currentUsers.forEach(user=>{
    const userWealth=getCurrentWealth(user);
         if (!isNaN(userWealth)) {
                    userProfiles.push({
                        element: user,
                        id: user.getAttribute("id"),
                        wealth: userWealth
                    });
        }   
    });

    return userProfiles;
}


function sortByRichest(usersArray) {
    const n = usersArray.length;
            // Insertion Sort implementation (Descending order)
        for (let i = 1; i < n; i++) {
                let key = usersArray[i]; // Object to be inserted
                let j = i - 1;

            while (j >= 0 && usersArray[j].wealth < key.wealth) { 
                    usersArray[j + 1] = usersArray[j];
                    j -= 1;
                }
                usersArray[j + 1] = key;
        }

            // After sorting the array, update the DOM order
        const mainContainer = document.getElementById('main');
        console.log(usersArray)
        const newUi=new Users(usersArray,usersContainer,createNode)
        newUi.addUsers();
}
//-----------calculate wealth--------------//
function displayTotals(totalWealth,wealthArray){
    const userTotalElem=document.querySelector(".total-users");
    userTotalElem.textContent=wealthArray.length;
    const wealthTotalElem=document.querySelector(".total-wealth");
    wealthTotalElem.textContent=`$${totalWealth.toLocaleString('en-US')}`;
    
    const overlay=document.querySelector(".display");
    if(overlay.classList.contains("active"))return;
    overlay.classList.add("active");
}

function calculateWealth(){
    const allUsers=document.querySelectorAll(".user");
    let usersWealth=[];
    allUsers.forEach(user=>{
    const wealth= getCurrentWealth(user);
    usersWealth.push(wealth);
    });
 const totalWealth = usersWealth.reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
    }, 0);
    displayTotals(totalWealth,usersWealth);
}

//--------------event listeners------------//
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
                const users=compileUserWealthList()
                    sortByRichest(users);
                break;

            case "calculate-wealth":
                    calculateWealth();
                break;

            default:
                console.error("Unknown action:", action);
                break;
        }
    });
});

//----------------------------------------------------------------------------//
//app intialization
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
    updateEachUserWealth();
 
}

 initializeApp(); // Start the application

 ///////////////////////////////////////////////////////////////////////////////

