export default {
    STRING(length) {
        return `varchar(${length})`
    },
    TEXT: 'text',
    TINYINT: 'tinyint',
    TINYINT_UNSIGNED: 'tinyint unsigned',
    INTEGER: 'int',
    INTEGER_UNSIGNED: 'int unsigned',
    BIGINT: 'bigint',
    BIGINT_UNSIGNED: 'bigint unsigned',
    DATETIME: 'datetime',
    TIMESTAMP: 'timestamp'
}
