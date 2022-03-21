import { CartItem } from "./cartItem";

export class Cart{

    companyId: number = 44;
    items: CartItem [] = [];

    get totalprice(): number{
        let totalprice = 0;
        this.items.forEach(item => {
            totalprice += item.price;
        });

        return totalprice;
    }
}