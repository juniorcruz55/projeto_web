const crypto = require('crypto')
const { listenerCount } = require('process')
const connection = require('../database/connection')
const routes = require('../routes');

module.exports = {
    async list(req, res){
        const {id_user, status} = req.params
        if (status == "criado"){
            const produtos = await connection('pedidos').where('id_user', id_user).where('status', 'criado').select('*')
            return res.json(produtos)
        } else{
            const produtos = await connection('pedidos').select('*')
            return res.json(produtos)
        }
        
    },

    async list_itens(req, res){
        const produtos = await connection('pedidos_itens').select('*')
        return res.json(produtos)
    },

    async show(req, res){
        const {id} = req.params
        const produto = await connection('pedidos').where('id',id).select('*')
        return res.json(produto)
    },

    async create(req, res){
        const {id_user, endereco_entrega, status} = req.body
        const id = crypto.randomBytes(4).toString('HEX')
        await connection('pedidos').insert({
            id, id_user, endereco_entrega, status
        })
        return res.status(204).send()
    },

    async create_item(req, res){
        const {id_pedido, id_produto, quantidade} = req.body
        await connection('pedidos_itens').insert({
            id_pedido, id_produto, quantidade
        })
        return res.status(204).send()
    },

    async update(req, res){
        const {id} = req.params
        var {id_user, endereco_entrega, status, realizar} = req.body
        if (realizar == "true"){
            status = "realizado"
            await connection('pedidos').where('id',id).update({
                status
            })
        } else {
            await connection('pedidos').where('id',id).update({
                name, id_user, endereco_entrega, status
            })
        }
            
        
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
        await connection('pedidos').where('id',id).where('id_user', '57333a64').delete()
        return res.status(204).send()
    },

    async delete_all(req, res){
        await connection('pedidos').delete()
        await connection('pedidos_itens').delete()
        return res.status(204).send()
    },

    async delete_item(req, res){
        const {id_pedido, id_produto} = req.params
        await connection('pedidos_itens').where('id_pedido',id_pedido).where('id_produto', id_produto).delete()
        return res.status(204).send()
    }

}