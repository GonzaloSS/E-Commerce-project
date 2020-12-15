module.exports = (sequelize, Sequelize) => {
    const order = sequelize.define("order", {
        date: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        total: {
            type: Sequelize.INTEGER
        },
        status: {
            type: Sequelize.STRING
        },
        id_user: {
            type: Sequelize.INTEGER
        },
        createdAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: true

        },
        updatedAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        }

    }, { timestamps: false });

    return order;
};