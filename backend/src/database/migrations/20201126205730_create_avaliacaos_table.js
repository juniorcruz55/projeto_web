
exports.up = function(knex) {
    return knex.schema.createTable('avaliacaos', function (table) {
        table.string('id_user').unsigned();
        table.string('id_produto').unsigned();
        table.string('avaliacao');

        table.foreign('id_user').references('id').inTable('users');
        table.foreign('id_produto').references('id').inTable('produtos');
        table.timestamps();
      })
};

exports.down = function(knex) {
  return knex.schema.dropTable('avaliacaos');
};
