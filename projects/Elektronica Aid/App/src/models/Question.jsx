class Question {
    constructor({ body, userId, productId, id, name, email, read, created }) {
        this.body = body;
        this.userId = userId;
        this.name = name;
        this.email = email;
        this.productId = productId;
        this.id = id;
        this.read = read;
        this.created = created;
    }
}

export default Question;