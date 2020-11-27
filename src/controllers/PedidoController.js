const crypto = require('crypto')
const { listenerCount } = require('process')
const connection = require('../database/connection')
const routes = require('../routes');

module.exports = {

    async show(req, res){
        const {id} = req.params
        const produto = await connection('pedidos').where('id',id).select('*')
        return res.json(produto)
    },

    async create(req, res){
        const {id_user, endereco_entrega, status} = req.body;
        const id = crypto.randomBytes(4).toString('HEX')
        await connection('pedidos').insert({
            id, id_user, endereco_entrega, status
        })
        return res.status(204).send()
    },

    async create_item(req, res){
        const {id_pedido, id_produto, quantidade} = req.body;
        await connection('pedidos_itens').insert({
            id_pedido, id_produto, quantidade
        })
        return res.status(204).send()
    },

    async update(req, res){
        const {id} = req.params
        const {id_user, endereco_entrega, status} = req.body;
        await connection('pedidos').where('id',id).update({
            name, id_user, endereco_entrega, status
        })
        return res.status(204).send()
    },

    async update_item(req, res){
        const {id_pedido, id_produto, quantidade} = req.params
        await connection('pedidos_itens').where('id_pedido',id_pedido).where('id_produto', id_produto).update({
            quantidade
        })
        return res.status(204).send()
    },

    async delete(req, res){
        const {id} = req.params
        await connection('pedidos_itens').where('id_pedido',id).delete()
        await connection('pedidos').where('id',id).delete()
        return res.status(204).send()
    },

    async delete_item(req, res){
        const {id_pedido, id_produto} = req.params
        await connection('pedidos_itens').where('id_pedido',id_pedido).where('id_produto', id_produto).delete()
        return res.status(204).send()
    }

}