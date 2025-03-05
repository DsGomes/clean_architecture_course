import Coupon from "../src/Coupon";
import Order from "../src/Order";
import OrderItem from "../src/OrderItem";

describe('Order suit test', () => {
    it('should not create an order when cpf is invalid', () => {
        expect(() => new Order('')).toThrow(Error('Cpf length has to be equals 11 characters'));
    })

    it('should create an order with 3 itens', () => {
        const orderItem1 = new OrderItem('Mouse sem fio', 59.90, 2);
        const orderItem2 = new OrderItem('Teclado sem fio', 68.90, 1);
        const orderItem3 = new OrderItem('Monitor Samsung 69"', 859.90, 1);

        const order = new Order('94986150049');
        order.addItem(orderItem1);
        order.addItem(orderItem2);
        order.addItem(orderItem3);

        expect(order.getTotal()).toBe(1048.6);
    })

    it('should create an order with discount coupon', () => {
        const orderItem = new OrderItem('Mouse sem fio', 59.90, 2);
        const discountCoupon = new Coupon('VALE10', 10);

        const order = new Order('94986150049');
        order.addItem(orderItem);
        order.addCoupon(discountCoupon);

        expect(order.getTotal()).toBe(107.82);
    })
})