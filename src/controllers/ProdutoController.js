const crypto = require('crypto')
const { listenerCount } = require('process')
const connection = require('../database/connection')
const routes = require('../routes');

module.exports = {
    async list(req, res){
        const produtos = await connection('produtos').select('*')
        return res.json(produtos)
    },

    async list_by_tipo(req, res){ 
        const {tipo_produto, tipo_flor} = req.params
        if (tipo_flor != null){
            const produtos = await connection('produtos').where('tipo_produto', tipo_produto).where('tipo_flor', tipo_flor).select('*')
            return res.json(produtos)
        } else{
            const produtos = await connection('produtos').where('tipo_produto', tipo_produto).select('*')
            return res.json(produtos)
        }
    },

    async show(req, res){
        const {id} = req.params
        const produto = await connection('produtos').where('id',id).select('*')
        return res.json(produto)
    },

    async create(req, res){
        const {name, img, descricao, valor, tipo_flor, tipo_produto} = req.body;
        const id = crypto.randomBytes(4).toString('HEX')
        await connection('produtos').insert({
            id, name, img, descricao, valor, tipo_flor, tipo_produto
        })
        return res.status(204).send()
    },

    async update(req, res){
        const {id} = req.params
        const {name, img, descricao, valor, tipo_flor, tipo_produto} = req.body;
        await connection('produtos').where('id',id).update({
            name, img, descricao, valor, tipo_flor, tipo_produto
        })
        return res.status(204).send()
    },

    async avaliar(req, res){
        const {id_user, id_produto} = req.params
        const {avaliacao} = req.body

        await connection('avaliacaos').insert({
            id_user, id_produto, avaliacao
        })
        
        return res.status(204).send()
    },

    async listar_avaliar(req, res){
        const produtos = await connection('avaliacaos').select('*')
        return res.json(produtos)
    },

    async delete(req, res){
        const {id} = req.params
        await connection('produtos').where('id',id).delete()
        return res.status(204).send()
    }

    
}