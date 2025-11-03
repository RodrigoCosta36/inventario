let contagem = 0;
contador.innerHTML = contagem;

const codigoBarra = document.getElementById('codBarraPrimary');
const codigos = document.getElementById('codBarra');
const diminuir = document.getElementById('diminuir');
const limpar = document.getElementById('limpar');
const referencia = document.getElementById('referencia');
const descricao = document.getElementById('descricao');
const localiza = document.getElementById('localiza');

document.getElementById('codBarraPrimary').focus();
document.getElementById('codBarraPrimary').onchange = function () {
    retorno();
};

let usuarios = localStorage.getItem('usuarios');
let nomeLogado = document.getElementById('nomeUser');

nomeLogado.innerHTML = `Olá, ${usuarios}`

if (localStorage.getItem('token') == null) {
    alert('Login Obrigatório.');
    window.location.href = 'https://inventariodescarte.netlify.app/';
}

function sair() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuarioLogado');
    localStorage.removeItem('usuarios');
    window.location.href = 'https://inventariodescarte.netlify.app/';
};

limpar.addEventListener('click', function () {
    var r = confirm("Clique em OK para limpar todos os campos!");
    if (r == true) {
        contador.innerHTML = contagem = 0;
        referencia.innerHTML = contagem = "";
        descricao.innerHTML = contagem = "";
        localiza.innerHTML = "";
        codigoBarra.value = "";
        codigos.value = "";
        document.getElementById('codBarraPrimary').focus();
    }
});

function retorno() {
    fetch("/json/info.json").then((response) => {
        response.json().then((sb1) => {
            sb1.infos.map((peca) => {
                if (codigoBarra.value == peca.placa) {
                    referencia.innerHTML = peca.cc;
                    descricao.innerHTML = peca.descricao;
                    localiza.innerHTML = peca.localizacao;
                    contador.innerHTML = ++contagem;

                    produtos.salvar();
                }
            })
        })
    })
    document.getElementById('codBarraPrimary').focus();
};
function enter() {
    document.getElementById('codBarraPrimary').focus();
};

class Produto {

    constructor() {
       this.id = codBarraPrimary.value; 
       this.arrayProdutos = [];
    }

    salvar() {
        let produtos = this.lerDados();

        if (this.validaCampos(produtos)) {
            this.adicionar(produtos);
        };

        this.listaTabela();
        codigoBarra.value = "";

        document.getElementById('codBarraPrimary').focus();
    };

    listaTabela() {
        let tbody = document.getElementById('tbody');
        tbody.innerHTML = '';

        //for (let i = 0; i < this.arrayProdutos.length; i++) {
        for (let i = this.arrayProdutos.length - 1; i >= 0; i--) {
            let tr = tbody.insertRow();

            let td_id = tr.insertCell();
            let td_sku = tr.insertCell();
            let td_qtde = tr.insertCell();
            let td_descricao = tr.insertCell();
            let td_localiza = tr.insertCell();
            let td_conferente = tr.insertCell();

            td_id.innerHTML = this.arrayProdutos[i].id;
            td_sku.innerHTML = this.arrayProdutos[i].referencia;
            td_qtde.innerHTML = 1;
            td_descricao.innerHTML = this.arrayProdutos[i].descricao;
            td_localiza.innerHTML = this.arrayProdutos[i].localiza;
            td_conferente.innerHTML = `${usuarios}`;

            td_id.classList.add('center');
            td_sku.classList.add('center');
            td_qtde.classList.add('center');
            td_localiza.classList.add('center');
            td_conferente.classList.add('center');
        }


    };

    adicionar(produtos) {
        this.arrayProdutos.push(produtos);
        this.id++;
    };

    editar(dados) {
       document.getElementById('codBarraPrimary').value = dados.id;
        referencia.innerHTML = dados.referencia;
        descricao.innerHTML = dados.descricao;
        contador.innerHTML = dados.contador;
    }

    lerDados() {
        let produtos = {}

       produtos.id = document.getElementById('codBarraPrimary').value;
        produtos.referencia = referencia.innerHTML;
        produtos.contador = contador.innerHTML;
        produtos.descricao = descricao.innerHTML;
        produtos.localiza = localiza.innerHTML;


        return produtos;
    };

    validaCampos(produtos) {
        let msg = '';

        if (produtos.referencia == '' && produtos.descricao == '') {
            msg += 'Campo não pode ser vazio \n';
        }
        if (msg != '') {
            alert(msg);
            return false
        }
        return true;
    };

    deletar(id) {
        if (confirm(`Excluir o Baú Nº ${id} ?`)) {
            let tbody = document.getElementById('tbody');

            for (let i = this.arrayProdutos.length - 1; i >= 0; i--) {
                if (this.arrayProdutos[i].id == id) {
                    this.arrayProdutos.splice(i, 1);
                    tbody.deleteRow(i);
                }
            };

        };
    };
};

var produtos = new Produto();

document.getElementById('exportCSV').addEventListener('click', function () {
    var table2excel = new Table2Excel();
    table2excel.export(document.getElementById('export'))
});

document.querySelector('*' && 'body').setAttribute("class", 'amd');

// document.getElementById('verde-btn').addEventListener('click', function () {
//     document.querySelector('*' && 'body').setAttribute("class", "verde");
// });
// document.getElementById('azul-btn').addEventListener('click', function () {
//     document.querySelector('*' && 'body').setAttribute("class", "azul");
// });
// document.getElementById('amd-btn').addEventListener('click', function () {
//     document.querySelector('*' && 'body').setAttribute("class", "amd");
// });