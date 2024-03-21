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
  private photo: string;
  private role: string;
  private active: boolean;

  public constructor(
    id: string,
    firstName: string,
    lastName: string,
    fullName: string,
    email: string,
    phoneNumber: string,
    address: string,
    birthDay: Date,
    photo: string,
    role: string,
    active: boolean
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.fullName = fullName;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.address = address;
    this.birthDay = birthDay;
    this.photo = photo;
    this.role = role;
    this.active = active;
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

  public getPhoto(): string {
    return this.photo;
  }

  public setPhoto(photo: string): void {
    this.photo = photo;
  }

  public getRole(): string {
    return this.role;
  }

  public setRole(role: string): void {
    this.role = role;
  }

  public isActive(): boolean {
    return this.active;
  }

  public setActive(active: boolean): void {
    this.active = active;
  }

}
