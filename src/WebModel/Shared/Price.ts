export class Price {
    public Price: number;
    public Sale: number;
    constructor (price: number, sale: number) {
      this.Price = Number(price)
      this.Sale = Number(sale)
    }
}
