
exports.up = function(knex) {
    return knex.schema.createTable('pedidos', function (table) {
        table.string('id').primary();
        table.string('id_user').notNullable();
        table.string('endereco_entrega').notNullable();
        table.string('status');
        table.foreign('id_user').references('id').inTable('users');
        table.timestamps();
      })
};

exports.down = function(knex) {
  return knex.schema.dropTable('pedidos');
};
