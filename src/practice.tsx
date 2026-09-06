// const arr1:string[]=["a","b","c"]
//   const arr2: number[] = [1, 2, 3, 4]
//   let arr3: boolean = true
//   arr3=false
// type User= {
//   name: string,
//     age: number,
//       address:string,
// }



// const user: User={
//   name: true,
//   age: "23",
//   address:1233,
// }

// console.log(user)
//  function fun(a: number, b: string): void{
//   console.log("a=",a)
//   console.log("b=",b)
// }

// fun(12, "acv")

// function add(a: number, b: number): number{
//   return a+b
// }
// console.log(add(12, 12))

// const mul = (a: number, b: number): number=>{
//   return a * b;
// }

// console.log(mul(12,3))

// const getLength = (str: string) => {
//   console.log("length= ", str.length);
// };
// getLength("anjil");

// const checkAdult = (age: number): void => {
//   if (age >= 18) {
//     console.log("Adult");
//   } else {
//     console.log("minor");
//   }
// };

// checkAdult("18");

// const isValidPassword = (password: string): void => {
//     if (password.length < 6) {
//         console.log("Invalid password")
//     } else {
//         console.log("Valid password");

//     }
// }

// isValidPassword("123243")

// let a:string="anjil"
// a = 123
// console.log(a)

type UserId = number;
type UserName = string;
type Age = number;
type Email = string;
type UserRole = "admin" | "student" | "teacher";

interface User {
  id: UserId;
  name: UserName;
  age: Age;
  email: Email;
  role: UserRole;
  createdAt: Date;
}

const users: User[] = [
  {
    id: 1,
    name: "loki",
    age: 23,
    email: "loki@gmail.com",
    role: "admin",
    createdAt: new Date(),
  },
  {
    id: 2,
    name: "thor",
    age: 25,
    email: "thor@gmail.com",
    role: "student",
    createdAt: new Date(),
  },
  {
    id: 3,
    name: "wanda",
    age: 23,
    email: "wanda@gmail.com",
    role: "student",
    createdAt: new Date(),
  },
  {
    id: 4,
    name: "buck",
    age: 26,
    email: "buck@gmail.com",
    role: "teacher",
    createdAt: new Date(),
  },
];

const getStudents = (users: User[]): User[] => {
  return users.filter((user) => user.role === "student");
};

const addStudent = (user: User) => {
  users.push(user);
};

addStudent({
  id: 5,
  name: "tony",
  age: 26,
  email: "buck@gmail.com",
  role: "student",
  createdAt: new Date(),
});

console.log(users);
console.log(getStudents(users));


