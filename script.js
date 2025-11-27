async function fetchMultipleUsers(num) {
 let response = await fetch(`https://randomuser.me/api/?results=${num}`);
 let data = await response.json();
 console.log(data.results[0]); 

 return data.results;

 }
 fetchMultipleUsers(20);

 class user(){
    constructor
 }