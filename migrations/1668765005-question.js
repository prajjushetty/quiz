const { DataTypes, CreateTable } = require('sql-query-generator');

exports.up = async client => {
    const sql = new CreateTable('question')
        .addPrimaryColumn('question_id')
        .addColumns({
            question: {
                type: DataTypes.STRING(255),
                defaultValue: ''
            },
            option_1: {
                type: DataTypes.STRING(255),
                defaultValue: '',
            },
            option_2: {
                type: DataTypes.STRING(255),
                defaultValue: ''
            },
            option_3: {
                type: DataTypes.STRING(255),
                defaultValue: ''
            },
            option_4: {
                type: DataTypes.STRING(255),
                defaultValue: ''
            },
            question_level: {
                type: DataTypes.INTEGER,
                defaultValue: '',
            },
            answer: {
                type: DataTypes.INTEGER,
                defaultValue: '',
            },
            status: {
                type: DataTypes.TINYINT,
                defaultValue: 1
            }
        })
        .addTimestamps()
        .generate();

    await client.query(sql);
};

exports.down = async client => {
    await client.query('DROP TABLE quetion');
};
