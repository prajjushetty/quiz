const { DataTypes, CreateTable } = require('sql-query-generator');

exports.up = async client => {
    const sql = new CreateTable('friend')
        .addPrimaryColumn('friend_request_id')
        .addColumns({
            user_id: {
                type: DataTypes.BIGINT_UNSIGNED,
            },
            other_user_id: {
                type: DataTypes.BIGINT_UNSIGNED
            },
            status: {
                type: DataTypes.TINYINT,
                defaultValue: 6
            }
        })
        .addTimestamps()
        .generate();

    await client.query(sql);
};

exports.down = async client => {
    await client.query('DROP TABLE friend');
};
