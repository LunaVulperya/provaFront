document.addEventListener('DOMContentLoaded', () => {
    const formCadastro = document.getElementById('form-cadastro');
    const corpoTabelaGastos = document.getElementById('corpo-tabela-gastos');
    const inputDescricao = document.getElementById('descricao');
    const inputValor = document.getElementById('valor');
    const inputCategoria = document.getElementById('categoria');
    const totalGastosElement = document.getElementById('total-gastos'); // Novo elemento para exibir o total

    // Array para armazenar os gastos
    const listaDeGastos = [];

    formCadastro.addEventListener('submit', function(event) {
        event.preventDefault(); // Impede o envio padrão do formulário

        const descricao = inputDescricao.value.trim();
        const valor = parseFloat(inputValor.value);
        const categoria = inputCategoria.value.trim();

        // Verifica se os campos obrigatórios foram preenchidos
        if (descricao === '' || isNaN(valor)) {
            alert('Por favor, preencha a descrição e um valor válido.');
            return;
        }

        // Adiciona o gasto ao array
        listaDeGastos.push({ descricao, valor, categoria });

        // Atualiza a tabela com a lista de gastos e o total
        atualizarTabela();

        // Limpa os campos do formulário
        inputDescricao.value = '';
        inputValor.value = '';
        inputCategoria.value = '';
    });

    function atualizarTabela() {
        // Limpa o corpo da tabela antes de adicionar os itens
        corpoTabelaGastos.innerHTML = '';

        let somaTotal = 0; // Variável para armazenar a soma dos valores

        listaDeGastos.forEach(gasto => {
            // Cria uma nova linha na tabela
            const novaLinha = corpoTabelaGastos.insertRow();

            // Cria as células para cada coluna
            const celulaDescricao = novaLinha.insertCell();
            const celulaValor = novaLinha.insertCell();
            const celulaCategoria = novaLinha.insertCell();

            // Adiciona os valores às células
            celulaDescricao.textContent = gasto.descricao;

            // Formata o valor para moeda brasileira
            celulaValor.textContent = gasto.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

            celulaCategoria.textContent = gasto.categoria;

            // Verifica se o valor é maior que 100 e aplica a classe 'valor-alto'
            if (gasto.valor > 100) {
                celulaValor.classList.add('valor-alto');
            }

            // Adiciona o valor atual à soma total
            somaTotal += gasto.valor;
        });

        // Atualiza o elemento html com o valor total 
        totalGastosElement.textContent = `Total: ${somaTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`;
    }

    // Exibe a tabela inicialmente (se houver dados já no array - útil se você implementar persistência)
    atualizarTabela();
});