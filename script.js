//////---global variables----////////

const usersContainer=document.getElementsByClassName("users-list");

////////////------  state/data----------  /////////////////
async function fetchMultipleUsers(num) {
 let response = await fetch(`https://randomuser.me/api/?results=${num}`);
 let data = await response.json();
 console.log(data.results[0]); 

 return data.results;

 }

 fetch()
// fetchMultipleUsers(20);

////////////////////////////////////////////

////////////////////////---- logic/app functionality rules ---  //////////////////////


 /////////////////////////////////////////////////////////////////////////////


 ////////////////// ---UI COMPONENTS ---////////////////////////////////////////////
 class Users{
    constructor(usersArray){
        this.usersArray=usersArray;
        this.parentContainer=
    }

    addUsers(){


    }

    removeUsers(){

    }

    getUser(userId){

    }

 }




 ///////////////////////////////////////////////////////////////////////////////