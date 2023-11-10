import { IPerson } from "./person";
import { Operation, IOperation } from "./operation";

interface ICart {
  person: IPerson;
  items: Array<IOperation>;

  /**
   * checkout
   */
  checkout: () => Promise<void>;
}

export class Cart implements ICart {
  person: IPerson;
  items: IOperation[] = [];

  checkout: () => Promise<void> = async () => {
    for (const operation of this.items) {
      try {
        await Operation.add(operation);
      } catch (e) {
        console.error("checkout", e);
      }
    }
  };

  constructor(person: IPerson) {
    this.person = person;
  }

  private static objects: Cart[] = [];

  public static newCart(person: IPerson): number {
    const newCart: Cart = new Cart(person);
    Cart.objects.push(newCart);
    return Cart.objects.length - 1; // Return the index of the new cart
  }

  public static removeCart(cartIndex: number): void {
    if (Cart.objects[cartIndex]) {
      Cart.objects.splice(cartIndex, 1);
    } else {
      console.error("Cart not found");
    }
  }

  public static addToCart(cartIndex: number, item: IOperation): void {
    if (Cart.objects[cartIndex]) {
      Cart.objects[cartIndex].items.push(item);
    } else {
      console.error("Cart not found");
    }
  }

  public static removeFromCart(cartIndex: number, itemIndex: number): void {
    const cart = Cart.objects[cartIndex];
    if (cart) {
      if (cart.items[itemIndex]) {
        cart.items.splice(itemIndex, 1);
      } else {
        console.error("Item not found in the cart");
      }
    } else {
      console.error("Cart not found");
    }
  }

  public static getCarts() {
    return Cart.objects;
  }

}
