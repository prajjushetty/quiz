const { CreateTable, DataTypes } = require('sql-query-generator');

exports.up = async client => {
    const sql = new CreateTable('user')
        .addColumns({
            socket_id: {
                type: DataTypes.STRING(255),
                defaultValue: '',
                after: 'xp'
            }
        })
        .generateAlter();

    await client.query(sql);
};

exports.down = async client => {
    await client.query('ALTER TABLE user DROP user');
};
