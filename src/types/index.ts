import { ReactElement } from 'react';
export interface User {
    split(arg0: string): unknown;
    id: number;
    Name: string;
    Email: string;
    DateOfBirth: string;
    _id: string;
    CreatedAt: string;
    __v: number;
    EmpId: string;
    Password: string;
    Employee : string;
    ProfileImg : string

  } 

  export interface Employee {
    _id: string;
    Name: string;
    EmpId: string;
    Email: string;
    Password: string;
    DateOfBirth: string;
    CreatedAt: string;
    __v: number;
  }

  export interface HomeMenu {
    name: string;
    routeTo: string;
    logo: ReactElement | string;
  }
  export interface IFormInput {
    Email: string;
    Password: string;
    otp: number;
  }
  export interface IFormInputLogin {
    EmpId: string;
    Password: string;
    
}
export interface IFormInputRegister {
  Name: string;
  EmpId: string;
  Email: string;
  Password: string;
  DateOfBirth: string | null;
  POSITION : any
  ProfileImg : string
  
}
