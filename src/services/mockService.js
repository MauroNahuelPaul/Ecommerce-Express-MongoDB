import { faker } from "@faker-js/faker";

export const generateProduct = async () => {
    return {
        _id: faker.database.mongodbObjectId(),
        title: faker.commerce.product(),
        description: faker.commerce.productDescription(),
        code: faker.string.alphanumeric(8),
        price: faker.commerce.price({ min: 1000, max: 10000}),
        status: faker.datatype.boolean({ probability: 1.0 }),
        stock: faker.number.int(50),
        category: faker.commerce.productName(),
        thumbnails: [faker.image.url()],     
    };
};
