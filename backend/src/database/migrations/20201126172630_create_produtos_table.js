
exports.up = function(knex) {
    return knex.schema.createTable('produtos', function (table) {
        table.string('id').primary();
        table.string('name').notNullable();
        table.string('img');
        table.string('descricao');
        table.string('valor').notNullable();
        table.string('tipo_flor');
        table.string('tipo_produto'); //flor, buque, arranjo, etc...
        table.timestamps();
      })
};

exports.down = function(knex) {
  return knex.schema.dropTable('produtos');
};
