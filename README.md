# TypeScript Basic Types

## 1. STRING
let name: string = "Anjil";

## 2. NUMBER

let age: number = 23;

## 3. BOOLEAN

let isStudent: boolean = true;

## 4. ARRAY - STRING

let names: string[] = ["Ram", "Sita", "Hari"];

## 5. ARRAY - NUMBER

let ages: number[] = [20, 21, 22, 23];

## 6. ARRAY - BOOLEAN

let results: boolean[] = [true, false, true];

## 7. OBJECT

let user: {
  name: string;
  age: number;
} = {
  name: "Anjil",
  age: 23
};

## 8. TYPE - CUSTOM TYPE

type User = {
  name: string;
  age: number;
  role: string;
};

const user1: User = {
  name: "Ram",
  age: 20,
  role: "student"
};

## 9. OPTIONAL PROPERTY

type Student = {
  name: string;
  age: number;
  address?: string;
};

const student: Student = {
  name: "Sita",
  age: 21
};

## 10. UNION TYPE

let id: string | number;

id = 123;
id = "abc";

## 11. LITERAL TYPE

let role: "student" | "teacher" | "admin";

role = "student";
role = "teacher";
role = "admin";

## 12. ANY

let data: any = 10;

data = "hello";
data = true;
data = [1, 2, 3];

## 13. UNKNOWN

let value: unknown = "hello";

if (typeof value === "string") {
  console.log(value.toUpperCase());
}

## 14. VOID

function greet(): void {
  console.log("Hello");
}

## 15. NULL

let emptyValue: null = null;

## 16. UNDEFINED

let notFound: undefined = undefined;

## 17. NEVER

function throwError(): never {
  throw new Error("Something went wrong");
}
