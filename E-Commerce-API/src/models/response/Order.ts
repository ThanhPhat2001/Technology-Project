import { Schema } from "mongoose";

interface Product {
    id: string | Schema.Types.ObjectId;
    product_name: string;
    price: number;
    discount: number;
}

interface OrderDetail {
    product: Product;   
    quantity: number;
    totalPrice: number;
}

export default class Order {
    private id: string | Schema.Types.ObjectId;
    private fullName: string;
    private email: string;
    private phoneNumber: string;
    private orderStatus: string;
    private orderDate: Date;
    private shippingDate: Date;
    private orderNote: string;
    private shippingStreet: string;
    private shippingCity: string;
    private shippingState: string;
    private paymentType: string;
    private totalPrice: number;
    private orderDetail: OrderDetail;

    constructor(
        id: string | Schema.Types.ObjectId,
        fullName: string,
        email: string,
        phoneNumber: string,
        orderStatus: string,
        orderDate: Date,
        shippingDate: Date,
        orderNote: string,
        shippingStreet: string,
        shippingCity: string,
        shippingState: string,
        paymentType: string,
        totalPrice: number,
        orderDetail: OrderDetail
    ) {
        this.id = id;
        this.fullName = fullName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.orderStatus = orderStatus;
        this.orderDate = orderDate;
        this.shippingDate = shippingDate;
        this.orderNote = orderNote;
        this.shippingStreet = shippingStreet;
        this.shippingCity = shippingCity;
        this.shippingState = shippingState;
        this.paymentType = paymentType;
        this.totalPrice = totalPrice;
        this.orderDetail = orderDetail;
    }

    getId(): string | Schema.Types.ObjectId {
        return this.id;
    }

    setId(id: string | Schema.Types.ObjectId): void {
        this.id = id;
    }

    getFullName(): string {
        return this.fullName;
    }

    setFullName(fullName: string): void {
        this.fullName = fullName;
    }

    getEmail(): string {
        return this.email;
    }

    setEmail(email: string): void {
        this.email = email;
    }

    getPhoneNumber(): string {
        return this.phoneNumber;
    }

    setPhoneNumber(phoneNumber: string): void {
        this.phoneNumber = phoneNumber;
    }

    getOrderStatus(): string {
        return this.orderStatus;
    }

    setOrderStatus(orderStatus: string): void {
        this.orderStatus = orderStatus;
    }

    getOrderDate(): Date {
        return this.orderDate;
    }

    setOrderDate(orderDate: Date): void {
        this.orderDate = orderDate;
    }

    getShippingDate(): Date {
        return this.shippingDate;
    }

    setShippingDate(shippingDate: Date): void {
        this.shippingDate = shippingDate;
    }

    getOrderNote(): string {
        return this.orderNote;
    }

    setOrderNote(orderNote: string): void {
        this.orderNote = orderNote;
    }

    getShippingStreet(): string {
        return this.shippingStreet;
    }

    setShippingStreet(shippingStreet: string): void {
        this.shippingStreet = shippingStreet;
    }

    getShippingCity(): string {
        return this.shippingCity;
    }

    setShippingCity(shippingCity: string): void {
        this.shippingCity = shippingCity;
    }

    getShippingState(): string {
        return this.shippingState;
    }

    setShippingState(shippingState: string): void {
        this.shippingState = shippingState;
    }

    getPaymentType(): string {
        return this.paymentType;
    }

    setPaymentType(paymentType: string): void {
        this.paymentType = paymentType;
    }

    getTotalPrice(): number {
        return this.totalPrice;
    }

    setTotalPrice(totalPrice: number): void {
        this.totalPrice = totalPrice;
    }

    getOrderDetail(): OrderDetail {
        return this.orderDetail;
    }

    setOrderDetail(orderDetail: OrderDetail): void {
        this.orderDetail = orderDetail;
    }
}
