
exports.up = function(knex) {
    return knex.schema.createTable('sacolas', function (table) {
        table.string('id_user').notNullable();
        table.string('id_produto').notNullable();
        table.foreign('id_user').references('id').inTable('users');
        table.foreign('id_produto').references('id').inTable('produtos');
        table.timestamps();
      })
};

exports.down = function(knex) {
  return knex.schema.dropTable('sacolas');
};
