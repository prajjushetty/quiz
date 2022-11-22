const { DataTypes, CreateTable } = require('sql-query-generator');

exports.up = async client => {
    const sql = new CreateTable('master_player_level')
        .addPrimaryColumn('master_player_level_id')
        .addColumns({
            level: {
                type: DataTypes.INTEGER,
                default:1
            },
            xp_requirement: {
                type: DataTypes.INTEGER,
            },
        })
        .addTimestamps()
        .generate();

    await client.query(sql);
};

exports.down = async client => {
    await client.query('DROP TABLE master_player_level');
};
