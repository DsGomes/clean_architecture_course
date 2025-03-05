import Coupon from "./Coupon";
import Cpf from "./Cpf";
import OrderItem from "./OrderItem";

export default class Order {
    private readonly _cpf: Cpf;
    private orderItens: OrderItem[] = [];
    private coupon?: Coupon;

    constructor(cpf: string) {
        this._cpf = new Cpf(cpf);
        this._cpf.validate();
    }

    addItem(item: OrderItem) {
        this.orderItens.push(item);
    }

    getItens() {
        return this.orderItens;
    }

    addCoupon(discountCoupon: Coupon) {
        this.coupon = discountCoupon;
    }

    getTotal() {
        let totalOrder = this.orderItens.reduce((total, item) => total + (item.preco * item.quantidade), 0);
        if (this.coupon) totalOrder = totalOrder - (totalOrder * (this.coupon.discount / 100));

        return totalOrder;
    }
}