import {ArrayTypeCast, TypeCast} from "./type-cast";

function initObject<T extends object>(model: { new(): T}, data: any): T {
  return Object.assign(new model(), data);
}

class Order {
  id!: string;
  product!: string;
  quantity!: number;

  @TypeCast(Date)
  orderedAt!: Date;
}

class MyUser {
  firstName!: string;
  lastName!: string;
  email!: string;

  @TypeCast(Date)
  registrationDate!: Date;

  @ArrayTypeCast(Order)
  orders!: Order[];
}

const myUser = initObject(MyUser, {
  firstName: "Olivier",
  lastName: "Leconnard",
  email: "olivier@coiffeur.com",
  registrationDate: "2022-01-01",
  orders: [
    {id: "o-1", product: "Keyboard", quantity: 1, orderedAt: "2022-02-14"},
    {id: "o-2", product: "Mouse", quantity: 2, orderedAt: "2022-03-01"},
  ],
});

console.log(myUser);
console.log(myUser.orders[0] instanceof Order, myUser.orders[0].orderedAt instanceof Date);
