export class Product {
    constructor(id, name, amount, price) {
        this.id = id;
        this.name = name;
        this.amount = amount;
        this.price = price;
    }

    static fromDynamoDB(item) {
        return new Product(item.id.S, item.name.S, item.amount.N, item.price.N);
    }

    toDynamoDB() {
        return {
            id: { S: this.id },
            name: { S: this.name },
            amount: { N: this.amount.toString() },
            price: { N: this.price.toString() },
        };
    }
}
