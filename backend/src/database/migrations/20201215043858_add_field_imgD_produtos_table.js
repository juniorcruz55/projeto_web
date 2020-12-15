
exports.up = function(knex) {
    return knex.schema.table('produtos', function (table) {
        table.string('imgD');
      })
};

exports.down = function(knex) {
    
};