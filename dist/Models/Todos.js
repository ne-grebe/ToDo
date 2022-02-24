const connection = require('hapi-sequelizejs').instances;
const { DataTypes } = require('sequelize');
module.exports.mapModel = function () {
    const todos = connection.dbs.todoDB.sequelize.define('Todos', {
        todo_id: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        todo_created_at: {
            type: DataTypes.DATE
        },
        todo_name: {
            type: DataTypes.STRING
        },
        todo_due_date: {
            type: DataTypes.DATE
        },
        todo_completed_status: {
            type: DataTypes.BOOLEAN
        }
    }, {
        freezeTablename: true,
        tableName: 'Todos',
        timestamps: false
    });
    connection.dbs.todoDB.sequelize.sync();
    return todos;
};
//# sourceMappingURL=Todos.js.map