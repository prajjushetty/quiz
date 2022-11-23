const { DataTypes, CreateTable } = require('sql-query-generator');

exports.up = async client => {
    const sql = new CreateTable('user')
        .addPrimaryColumn('user_id')
        .addColumns({
            user_type: {
                type: DataTypes.TINYINT,
                defaultValue: 2
            },
            access_token: {
                type: DataTypes.STRING(255),
                defaultValue: ''
            },
            user_name :{
                type: DataTypes.STRING(255),
                defaultValue:''
            },
            email: {
                type: DataTypes.STRING(255),
                defaultValue: '',
            },
            password :{
                type: DataTypes.STRING(255),
                defaultValue : ''
            },
            phone: {
                type : DataTypes.STRING(255),
                defaultValue: ''
            },
            gender: {
                type: DataTypes.STRING(255),
                defaultValue: ''
            },
            xp: {
                type: DataTypes.BIGINT_UNSIGNED,
                defaultValue: 0,
            },
            status: {
                type: DataTypes.TINYINT,
                defaultValue:1
            }
        })
        .addTimestamps()
        .generate();

    await client.query(sql);
};

exports.down = async client => {
    await client.query('DROP TABLE user');
};
