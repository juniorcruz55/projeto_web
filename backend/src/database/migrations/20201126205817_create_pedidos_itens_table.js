
exports.up = function(knex) {
    return knex.schema.createTable('pedidos_itens', function (table) {
        table.string('id_pedido').notNullable();
        table.string('id_produto').notNullable();
        table.integer('quantidade');
        table.foreign('id_pedido').references('id').inTable('pedidos');
        table.foreign('id_produto').references('id').inTable('produtos');
        table.timestamps();
      })
};

exports.down = function(knex) {
  return knex.schema.dropTable('pedidos_itens');
};

