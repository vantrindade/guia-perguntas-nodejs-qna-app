const sequelize = require('sequelize');
const connection = require('./databese');

// definindo um sincro/tabela no sql
// model para exibir uma tabela no sql como um obj

const Pergunta = connection.define('Pergunta', {
    titulo:{
        type: sequelize.STRING,
        allowNull: false // falso porque não pode receber vazio
    },
    descricao:{  // diferencia na tabela no html
        type: sequelize.TEXT,
        allowNull: false
    }
});

Pergunta.sync({force: false}).then(() => {}) // Sincroniza o model Pergunta com o banco de dados, criando a tabela se ela não existir sem apagar dados existentes.


module.exports = Pergunta; // exporta



