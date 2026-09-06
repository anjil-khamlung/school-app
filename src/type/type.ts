type  Role="admin"|"student"|"teacher"

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: Role;
}


export interface RegisterForm{
    name: string,
    email: string,
    password: string,
    confirmPassword: string,
   role:Role,
}

export interface LoginForm{
    email: string,
    password:string,
}



export interface SchoolStore{
    users: User[],
    currentUser: User|null,
    isAuthenticated: boolean,
    register: (user:User) => void,
    login: (user: User) => void,
    logout:()=>void,
}