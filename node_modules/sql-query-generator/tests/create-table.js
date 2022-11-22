import { test } from 'uvu'
import * as assert from 'uvu/assert'
import { DataTypes, CreateTable } from '../index.js'

const expectedSqlString =
`CREATE TABLE user (
  user_id bigint unsigned NOT NULL AUTO_INCREMENT,
  user_type tinyint NOT NULL DEFAULT 2,
  access_token varchar(255) NOT NULL DEFAULT '',
  login_type tinyint NOT NULL DEFAULT 0,
  facebook_id varchar(128) NOT NULL DEFAULT '',
  apple_id varchar(128) NOT NULL DEFAULT '',
  google_id varchar(128) NOT NULL DEFAULT '',
  user_name varchar(128) NOT NULL DEFAULT '',
  device_id varchar(128) NOT NULL DEFAULT '',
  android_push_token varchar(256) NOT NULL DEFAULT '',
  ios_push_token varchar(256) NOT NULL DEFAULT '',
  socket_id varchar(128),
  last_access_time int NOT NULL DEFAULT 0,
  status tinyint NOT NULL DEFAULT 1,
  password varchar(255) NOT NULL DEFAULT '',
  created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id)
)`

test('addColumn + addPrimaryKey', () => {
    const generatedSql = new CreateTable('user')
    .addColumn('user_id', DataTypes.BIGINT_UNSIGNED)
    .addColumn('user_type', DataTypes.TINYINT, 2)
    .addColumn('access_token', DataTypes.STRING(255), '')
    .addColumn('login_type', DataTypes.TINYINT, 0)
    .addColumn('facebook_id', DataTypes.STRING(128), '')
    .addColumn('apple_id', DataTypes.STRING(128), '')
    .addColumn('google_id', DataTypes.STRING(128), '')
    .addColumn('user_name', DataTypes.STRING(128), '')
    .addColumn('device_id', DataTypes.STRING(128), '')
    .addColumn('android_push_token', DataTypes.STRING(256), '')
    .addColumn('ios_push_token', DataTypes.STRING(256), '')
    .addColumn('socket_id', DataTypes.STRING(128), null, true)
    .addColumn('last_access_time', DataTypes.INTEGER, 0)
    .addColumn('status', DataTypes.TINYINT, 1)
    .addColumn('password', DataTypes.STRING(255), '')
    .addColumn('created_at', DataTypes.DATETIME, 'CURRENT_TIMESTAMP')
    .addColumn('updated_at', DataTypes.DATETIME, 'CURRENT_TIMESTAMP')
    .addPrimaryKey('user_id')
    .generate()

    assert.is(generatedSql, expectedSqlString)
})

test('addColumn + addTimestamps + addPrimaryKey', () => {
    const generatedSql = new CreateTable('user')
    .addColumn('user_id', DataTypes.BIGINT_UNSIGNED)
    .addColumn('user_type', DataTypes.TINYINT, 2)
    .addColumn('access_token', DataTypes.STRING(255), '')
    .addColumn('login_type', DataTypes.TINYINT, 0)
    .addColumn('facebook_id', DataTypes.STRING(128), '')
    .addColumn('apple_id', DataTypes.STRING(128), '')
    .addColumn('google_id', DataTypes.STRING(128), '')
    .addColumn('user_name', DataTypes.STRING(128), '')
    .addColumn('device_id', DataTypes.STRING(128), '')
    .addColumn('android_push_token', DataTypes.STRING(256), '')
    .addColumn('ios_push_token', DataTypes.STRING(256), '')
    .addColumn('socket_id', DataTypes.STRING(128), null, true)
    .addColumn('last_access_time', DataTypes.INTEGER, 0)
    .addColumn('status', DataTypes.TINYINT, 1)
    .addColumn('password', DataTypes.STRING(255), '')
    .addTimestamps()
    .addPrimaryKey('user_id')
    .generate()

    assert.is(generatedSql, expectedSqlString)
})

test('addPrimaryColumn + addColumn + addTimestamps', () => {
    const generatedSql = new CreateTable('user')
    .addPrimaryColumn('user_id')
    .addColumn('user_type', DataTypes.TINYINT, 2)
    .addColumn('access_token', DataTypes.STRING(255), '')
    .addColumn('login_type', DataTypes.TINYINT, 0)
    .addColumn('facebook_id', DataTypes.STRING(128), '')
    .addColumn('apple_id', DataTypes.STRING(128), '')
    .addColumn('google_id', DataTypes.STRING(128), '')
    .addColumn('user_name', DataTypes.STRING(128), '')
    .addColumn('device_id', DataTypes.STRING(128), '')
    .addColumn('android_push_token', DataTypes.STRING(256), '')
    .addColumn('ios_push_token', DataTypes.STRING(256), '')
    .addColumn('socket_id', DataTypes.STRING(128), null, true)
    .addColumn('last_access_time', DataTypes.INTEGER, 0)
    .addColumn('status', DataTypes.TINYINT, 1)
    .addColumn('password', DataTypes.STRING(255), '')
    .addTimestamps()
    .generate()

    assert.is(generatedSql, expectedSqlString)
})

test('addPrimaryColumn + addColumns + addTimestamps', () => {
    const generatedSql = new CreateTable('user')
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
        login_type: {
            type: DataTypes.TINYINT,
            defaultValue: 0
        },
        facebook_id: {
            type: DataTypes.STRING(128),
            defaultValue: ''
        },
        apple_id: {
            type: DataTypes.STRING(128),
            defaultValue: ''
        },
        google_id: {
            type: DataTypes.STRING(128),
            defaultValue: ''
        },
        user_name: {
            type: DataTypes.STRING(128),
            defaultValue: ''
        },
        device_id: {
            type: DataTypes.STRING(128),
            defaultValue: ''
        },
        android_push_token: {
            type: DataTypes.STRING(256),
            defaultValue: ''
        },
        ios_push_token: {
            type: DataTypes.STRING(256),
            defaultValue: ''
        },
        socket_id: {
            type: DataTypes.STRING(128),
            defaultValue: null,
            nullable: true
        },
        last_access_time: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        status: {
            type: DataTypes.TINYINT,
            defaultValue: 1
        },
        password: {
            type: DataTypes.STRING(255),
            defaultValue: ''
        }
    })
    .addTimestamps()
    .generate()

    assert.is(generatedSql, expectedSqlString)
})

test.run()
