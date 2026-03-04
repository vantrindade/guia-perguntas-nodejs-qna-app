const express = require("express"); //importando o express
const app = express(); // iniciando o express
const connection = require('./database/databese') // fazendo a ligação da pagina/pasta database e requerindo o banco de dados
const Pergunta = require('./database/Pergunta') // requiri o model para representar no sql um tabela  como um obj
const Resposta = require('./database/Resposta')

//database
connection
.authenticate()
.then(() => {
    console.log('conexão feita com o banco de dados')
})
.catch((msqErro) => { // caso erro
    console.log(msqErro);
})

app.use(express.urlencoded({ extended: false })); // Permite ler dados enviados por formulários (req.body)
app.use(express.json()); // Permite ler dados enviados em formato JSON (req.body)

app.set('view engine','ejs'); // Define o EJS como mecanismo de renderização de páginas (template engine)
app.use(express.static('public')); // arquivo estatico como css

//Rotas

app.get('/realize_uma_pergunta',(req, res) => { //pagina 1
    res.render('realize_uma_pergunta');
});

app.get('/perguntas_feitas',(req,res) => { // Cria uma rota GET
    Pergunta.findAll({ raw: true, order:[ //ligar ao banco de dados
        ['id','DESC'] // asc crecente || desc descrecente
    ]}).then(perguntas => {
        res.render('perguntas_feitas',{
            perguntas: perguntas
        });       //mostra as perguntas guardadas no banco de dados/
    });
});
 


app.post('/salvarpergunta',(req, res) => {  //rota para enviar dados para sql
    let titulo = req.body.titulo  //recebe os dados do formulario
    let descricao = req.body.descricao

    Pergunta.create({// insert into pergunta passando os dados do formulario
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.redirect('/perguntas_feitas'); // se for sucesso redirecionar para '/' 
    })
});


app.get('/responder_pergunta_feita/:id', (req, res) => {

    let id = req.params.id;

    Pergunta.findOne({
        where: { id: id }
    }).then(responder_pergunta_feita => {

        if (responder_pergunta_feita != undefined) {

            Resposta.findAll({
                where: { perguntaId: responder_pergunta_feita.id }
           ,order:[['id', 'DESC']] }).then(respostas => {

                res.render('responder_pergunta_feita', {
                    responder_pergunta_feita: responder_pergunta_feita,
                    respostas: respostas
                });

            });

        } else {
            res.redirect('/');
        }

    });

});

app.post('/responder',(req, res) => {
    let corpo = req.body.corpo;
    let perguntaId = req.body.responder_pergunta_feita;
    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() => {
        res.redirect('/responder_pergunta_feita/'+perguntaId)
    })
});

app.listen(8080,()=>{console.log('app rodando!');}); // Inicia o servidor na porta 8080 e exibe mensagem no console
