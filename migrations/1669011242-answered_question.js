const { DataTypes, CreateTable } = require('sql-query-generator');

exports.up = async client => {
    const sql = new CreateTable('answered_question')
        .addPrimaryColumn('answered_question_id')
        .addColumns({
            user_id: {
                type: DataTypes.INTEGER,
            },
            question: {
                type: 'json'
            },
        })
        .addTimestamps()
        .generate();

    await client.query(sql);
};

exports.down = async client => {
    await client.query('DROP TABLE quetion');
};
