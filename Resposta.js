const sequelize = require('sequelize');
const connection = require('./databese');

// model de resposta para cria uma pasta no sql

const Resposta = connection.define('respostas', {
    corpo: { // salvar resposta
        type: sequelize.TEXT,
        allowNull: false  // campo não pode ser vazio
    },
    perguntaId: { // salvar a resposta na pergunta certa pelo id
        type: sequelize.INTEGER,
        allowNull: false
    }
});

Resposta.sync({force: false});

module.exports = Resposta;