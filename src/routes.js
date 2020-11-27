const express = require('express')
const PedidoController = require('./controllers/PedidoController')
const ProdutoController = require('./controllers/ProdutoController')
const SacolaController = require('./controllers/SacolaController')
const routes = express.Router()
const UserController = require('./controllers/UserController')

//Rotas do Usuário
routes.get('/users', UserController.list)
routes.get('/users/:id', UserController.show)
routes.post('/users', UserController.create)
routes.put('/users/:id', UserController.update)
routes.delete('/users/:id', UserController.delete)

//Rotas dos Produtos
routes.get('/produtos', ProdutoController.list)
routes.get('/produtos/tipo/:tipo_produto', ProdutoController.list_by_tipo)
routes.get('/produtos/tipo/:tipo_produto/:tipo_flor', ProdutoController.list_by_tipo)
routes.get('/produtos/:id', ProdutoController.show)
routes.post('/produtos', ProdutoController.create)
routes.put('/produtos/:id', ProdutoController.update)
routes.delete('/produtos/:id', ProdutoController.delete)

routes.get('/produtos/avalicoes', ProdutoController.listar_avaliar)
routes.post('/produtos/avaliar/:id_user/:id_produto', ProdutoController.avaliar)

//Rotas da Sacola
routes.get('/sacolas/:id', SacolaController.list)
routes.post('/sacolas', SacolaController.create)
routes.delete('/sacolas/:id_user/:id_produto', SacolaController.remove_one)
routes.delete('/sacolas/:id_user', SacolaController.remove_all)

//Rotas Pedidos
routes.get('/pedidos/:id', PedidoController.show)
routes.post('/pedidos/', PedidoController.create)
routes.post('/pedidos/item/', PedidoController.create_item)
routes.put('/pedidos/:id', PedidoController.update)
routes.put('/pedidos/item/:id_pedido/:id_produto/:quantidade', PedidoController.update_item)
routes.delete('/pedidos/:id', PedidoController.delete)
routes.delete('/pedidos/item/:id_pedido/:id_produto', PedidoController.delete_item)


module.exports = routes