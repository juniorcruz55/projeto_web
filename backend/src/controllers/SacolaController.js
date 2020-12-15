const crypto = require('crypto')
const { listenerCount } = require('process')
const connection = require('../database/connection')
const routes = require('../routes');

module.exports = {
    async list(req, res){
        const {id} = req.params
        const sacola = await connection('sacolas').leftJoin('produtos', 'sacolas.id_produto', 'produtos.id').where('sacolas.id_user', id)
                            .select('sacolas.id_user', 'sacolas.id_produto', 'produtos.name', 'produtos.valor')
        return res.json(sacola)
    },

    async create(req, res){ //adicionar à sacola

        const {id_user, id_produto} = req.body;
        await connection('sacolas').insert({
            id_user, id_produto
        })
        return res.status(204).send()
    },

    async remove_one(req, res){
        const {id_user, id_produto} = req.params
        await connection('sacolas').where('id_user',id_user).where('id_produto', id_produto).delete()
        return res.status(204).send()
    },

    async remove_all(req, res){
        const {id_user} = req.params
        await connection('sacolas').where('id_user',id_user).delete()
        return res.status(204).send()
    }
}