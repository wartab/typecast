import {z} from "zod";

const OrderSchema = z.object({
  id: z.string(),
  product: z.string(),
  quantity: z.number(),
  orderedAt: z.coerce.date(),
});

const MyUserSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  registrationDate: z.coerce.date(),
  orders: z.array(OrderSchema),
});

type Order = z.infer<typeof OrderSchema>;
type MyUser = z.infer<typeof MyUserSchema>;

const myUser: MyUser = MyUserSchema.parse({
  firstName: "Olivier",
  lastName: "Leconnard",
  email: "olivier@coiffeur.com",
  registrationDate: "2022-01-01",
  orders: [
    {id: "o-1", product: "Keyboard", quantity: 1, orderedAt: "2022-02-14"},
    {id: "o-2", product: "Mouse", quantity: 2, orderedAt: "2022-03-01"},
  ],
});

const firstOrder: Order = myUser.orders[0];

console.log(myUser);
console.log(firstOrder.orderedAt instanceof Date);
