
exports.up = function(knex) {
    return knex.schema.table('users', function (table) {
        table.string('senha');
    })
};

exports.down = function(knex) {
  
};
