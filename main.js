const form = document.getElementById('form-agenda');
let contatos = JSON.parse(localStorage.getItem('contatos')) || [];

document.addEventListener('DOMContentLoaded', () => {
    atualizaTabela();
});

form.addEventListener('submit', function(e) {
    e.preventDefault();
    adicionaContato();
    atualizaTabela();
});

function adicionaContato() {
    const inputNomeCompleto = document.getElementById('nome-completo');
    const inputNumeroTelefone = document.getElementById('numero-telefone');

    if (contatos.some(contato => contato.nome === inputNomeCompleto.value)) {
        alert(`O contato: ${inputNomeCompleto.value} já está adicionado`);
    } else {
        contatos.push({
            nome: inputNomeCompleto.value,
            telefone: inputNumeroTelefone.value,
        });

        localStorage.setItem('contatos', JSON.stringify(contatos));
    }

    inputNomeCompleto.value = '';
    inputNumeroTelefone.value = '';
}

function atualizaTabela() {
    const corpoTabela = document.querySelector('tbody');
    corpoTabela.innerHTML = ''; 


    contatos.forEach((contato, index) => {
        let linha = `<tr>
                        <td>${contato.nome}</td>
                        <td>${contato.telefone}</td>
                        <td><button onclick="removerContato(${index})">Remover</button></td>
                    </tr>`;
        corpoTabela.innerHTML += linha; 
    });
}

function removerContato(index) {

    contatos.splice(index, 1);

    localStorage.setItem('contatos', JSON.stringify(contatos));
    atualizaTabela();
}
