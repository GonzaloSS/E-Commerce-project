module.exports = (sequelize, Sequelize) => {
    const orderProduct = sequelize.define("orderProduct", {
        id_product: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        id_order: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        createdAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updatedAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        }

    }, { timestamps: true });

    return orderProduct;
};