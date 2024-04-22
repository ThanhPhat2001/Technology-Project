import { Date } from "mongoose";

export default class Employee {
  private id: string;
  private firstName: string;
  private lastName: string;
  private fullName: string;
  private email: string;
  private phoneNumber: string;
  private address: string;
  private birthDay: Date;
  private password: string;
  private avatar: string;
  private role: string;

  public constructor(
    id: string,
    firstName: string,
    lastName: string,
    fullName: string,
    email: string,
    phoneNumber: string,
    address: string,
    birthDay: Date,
    password: string,
    avatar: string,
    role: string,
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.fullName = fullName;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.address = address;
    this.birthDay = birthDay;
    this.password = password;
    this.avatar = avatar;
    this.role = role;
  }

  public getId(): string {
    return this.id;
  }

  public setId(id: string): void {
    this.id = id;
  }

  public getFirstName(): string {
    return this.firstName;
  }

  public setFirstName(firstName: string): void {
    this.firstName = firstName;
  }

  public getLastName(): string {
    return this.lastName;
  }

  public setLastName(lastName: string): void {
    this.lastName = lastName;
  }

  public getFullName(): string {
    return this.fullName;
  }

  public setFullName(fullName: string): void {
    this.fullName = fullName;
  }

  public getEmail(): string {
    return this.email;
  }

  public setEmail(email: string): void {
    this.email = email;
  }

  public getPhoneNumber(): string {
    return this.phoneNumber;
  }

  public setPhoneNumber(phoneNumber: string): void {
    this.phoneNumber = phoneNumber;
  }

  public getAddress(): string {
    return this.address;
  }

  public setAddress(address: string): void {
    this.address = address;
  }

  public getBirthDay(): Date {
    return this.birthDay;
  }

  public setBirthDay(birthDay: Date): void {
    this.birthDay = birthDay;
  }

  public getPassword(): string {
    return this.password;
}

public setPassword(password: string): void {
    this.password = password;
}


  public getAvatar(): string {
    return this.avatar;
  }

  public setAvatar(avatar: string): void {
    this.avatar = avatar;
  }

  public getRole(): string {
    return this.role;
  }

  public setRole(role: string): void {
    this.role = role;
  }

}
