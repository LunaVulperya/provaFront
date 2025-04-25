document.addEventListener('DOMContentLoaded', () => {
    const formCadastro = document.getElementById('form-cadastro');
    const corpoTabelaTarefas = document.getElementById('corpo-tabela-tarefas');
    const inputDescricao = document.getElementById('descricao');
    const inputCategoria = document.getElementById('categoria');
    const totalTarefasElement = document.getElementById('total-tarefas'); // Novo elemento para exibir o total
    
    // Array para armazenar as tarefas
    const listaDeTarefas = [];

    formCadastro.addEventListener('submit', function(event) {
        event.preventDefault(); // Impede o envio padrão do formulário

        const descricao = inputDescricao.value.trim();
        const categoria = inputCategoria.value.trim();

        // Verifica se os campos obrigatórios foram preenchidos
        if (descricao === '') {
            alert('Por favor, preencha a descrição e um valor válido.');
            return;
        }

        // Adiciona a tarefa ao array
        listaDeTarefas.push({ descricao, categoria });

        // Atualiza a tabela com a lista de tarefas e o total
        atualizarTabela();

        // Limpa os campos do formulário
        inputDescricao.value = '';
        inputCategoria.value = '';
    });

    function atualizarTabela() {
        var elementos = document.querySelectorAll('td');
        var contAlta = 0, contMedia = 0, contBaixa = 0;
        // Limpa o corpo da tabela antes de adicionar os itens
        corpoTabelaTarefas.innerHTML = '';

        listaDeTarefas.forEach(tarefa => {
            // Cria uma nova linha na tabela
            const novaLinha = corpoTabelaTarefas.insertRow();

            // Cria as células para cada coluna
            const celulaDescricao = novaLinha.insertCell();
            const celulaCategoria = novaLinha.insertCell();
            const celulaAcoes = novaLinha.insertCell();

            // Adiciona os valores às células
            celulaDescricao.textContent = tarefa.descricao;
            celulaCategoria.textContent = tarefa.categoria;
            celulaAcoes.innerHTML += "</td><td><button class='btn btn-success'>Editar</button><button class='btn btn-danger' onclick='excluir(this.parentNode.parentNode.rowIndex)'>Excluir</button> </td></tr>";
    
        
                var contadorAlta = document.getElementById('alta');
                var contadorMedia = document.getElementById('media');
                var contadorBaixa = document.getElementById('baixa');
                
        
                // verifica a cor e incrementa o contador correspondente
                if(celulaCategoria.textContent == 'Alta'){
                    contAlta++;
                    contadorAlta.textContent = contAlta;
                }
                else if((celulaCategoria.textContent == 'Media') || (celulaCategoria.textContent == 'Média')){
                    contMedia++;
                    contadorMedia.textContent = contMedia;
                }
                else if(celulaCategoria.textContent == 'Baixa'){
                    contBaixa++;
                    contadorBaixa.textContent = contBaixa;
                }

        });
    }

    

    function excluir(i){
        listaDeTarefas.splice((i - 1), 1);
        document.getElementById('corpo-tabela-tarefas').deleteRow(i);
    }

    // Exibe a tabela inicialmente (se houver dados já no array - útil se você implementar persistência)
    atualizarTabela();
});