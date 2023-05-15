let counts=setInterval(updated,100);
let upto=0;
function updated(){
var count=document.getElementById("counter")
count.innerHTML=++upto
if(upto===3423){

clearInterval(counts)
}
}

let counts2=setInterval(updated2,100);
let upto2=0;
function updated2(){
var count2=document.getElementById("counter2")
count2.innerHTML=++upto2
if(upto2===4398){

clearInterval(counts2)
}
}
let counts3=setInterval(updated3,100);
let upto3=0;
function updated3(){
var count3=document.getElementById("counter3")
count3.innerHTML=++upto3
if(upto3===50){

clearInterval(counts3)
}
}