class Product {
    constructor({
        productId,
        productName,
        category,
        brand,
        price,
        description,
        specifications,
        images,
        service,
        id,
    }) {
        this.productId = productId;
        this.productName = productName;
        this.category = category;
        this.brand = brand;
        this.price = price;
        this.description = description;
        this.specifications = specifications;
        this.images = images ?? [];
        this.productService = service;
        this.id = id;
    }

    

    deleteProduct() {
        this.productService.deleteProduct(this);
    }

    updateDetails(updatedProduct) {
        this.productName = updatedProduct.productName;
        this.category = updatedProduct.category;
        this.brand = updatedProduct.brand;
        this.price = updatedProduct.price;
        this.description = updatedProduct.description;
        this.specifications = updatedProduct.specifications;
        this.images = updatedProduct.images;
        this.id = updatedProduct.id;
    }
}

export default Product;
