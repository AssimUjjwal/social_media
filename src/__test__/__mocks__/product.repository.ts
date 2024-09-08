export const createProductRepository = () => ({
    createProduct: jest.fn().mockResolvedValue({
        _id: "productId",
        name: "Product Name",
        price: 100,
        toJSON: () => ({
            _id: "productId",
            name: "Product Name",
            price: 100,
        }),
    }),

    findProduct: jest.fn().mockResolvedValue({
        _id: "productId",
        name: "Product Name",
        price: 100,
    }),

    updateProduct: jest.fn().mockResolvedValue({
        _id: "productId",
        name: "Updated Product Name",
        price: 150,
    }),

    deleteProduct: jest.fn().mockResolvedValue({
        deletedCount: 1,
    }),
});
