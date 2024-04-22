import { Date } from "mongoose";

export default class Customer {
  private id: string;
  private firstName: string;
  private lastName: string;
  private fullName: string;
  private email: string;
  private phoneNumber: string;
  private street: string;
  private city: string;
  private state: string;
  private birthDay: Date;
  private avatar: string;
  private zip_code: number;

  public constructor(
    id: string,
    firstName: string,
    lastName: string,
    fullName: string,
    email: string,
    phoneNumber: string,
    street: string,
    city: string,
    state: string,
    birthDay: Date,
    avatar: string,
    zip_code: number
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.fullName = fullName;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.street = street;
    this.city = city;
    this.state = state;
    this.birthDay = birthDay;
    this.avatar = avatar;
    this.zip_code = zip_code;
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

  public getStreet(): string {
    return this.street;
  }

  public setStreet(street: string): void {
    this.street = street;
  }

  public getCity(): string {
    return this.city;
  }

  public setCity(city: string): void {
    this.city = city;
  }

  public getState(): string {
    return this.state;
  }

  public setState(state: string): void {
    this.state = state;
  }

  public getBirthDay(): Date {
    return this.birthDay;
  }

  public setBirthDay(birthDay: Date): void {
    this.birthDay = birthDay;
  }

  public getAvatar(): string {
    return this.avatar;
  }

  public setAvatar(avatar: string): void {
    this.avatar = avatar;
  }

  public getZip_code(): number {
    return this.zip_code;
  }

  public setZip_code(zip_code: number): void {
    this.zip_code = zip_code;
  }
}
