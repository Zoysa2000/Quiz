const numbers=[1,2,3,4,5]

const result= numbers.reduce((previousValue,currentValue)=>
{
    return previousValue+currentValue;
},2)// initial value

console.log(result)

//Array destructuring
const cars= ["BMW","NISAN","TOYOTA"];

const [car1,car2,car3]=cars;
console.log(car1,car2,car3);

const user={userName:'Thilina',userAge:24,userEmail:"thilina@gmail.com"};//object

const {userName:username,userAge,userEmail}=user;
console.log(username)

//Arrow function
//object destructuring
const showuserDetails=({userName:name,userAge:age})=>
{
console.log("My name is",name) ;
    console.log("My age is",age) ;
}

showuserDetails(user);

//spread operators

const copynumbers=[...numbers]
console.log(copynumbers);
const numbers1=[1,2,3,4,5]
const numbers2=[6,7,8,9,10]
//concat array using spread
const newArray=[...numbers1,...numbers2];
console.log(newArray);


