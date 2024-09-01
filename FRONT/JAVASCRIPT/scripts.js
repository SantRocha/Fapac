/* ========================== CARREGAMENTO DE IMAGEM ========================== */

// Obtém os elementos do input de upload de imagem e da div de visualização
const imageUpload = document.getElementById('imageUpload');
const preview = document.getElementById('preview');

// Função para carregar a imagem padrão
function loadDefaultImage() {
    const defaultImagePath = '../IMAGENS/sem-foto.png';
    const img = document.createElement('img');
    img.src = defaultImagePath;
    
    // Limpa o conteúdo anterior da div e insere a imagem padrão
    preview.innerHTML = '';
    preview.appendChild(img);
}

// Listener para o evento 'change' no input de arquivo
imageUpload.addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();

        reader.onload = function(e) {
            const img = document.createElement('img');
            img.src = e.target.result;

            // Limpa o conteúdo anterior da div e insere a nova imagem
            preview.innerHTML = '';
            preview.appendChild(img);
        }

        reader.readAsDataURL(file);
    } else {
        // Se nenhum arquivo for selecionado, carrega a imagem padrão
        loadDefaultImage();
    }
});

// Carrega a imagem padrão ao iniciar
loadDefaultImage();



/* ==================== CARREGAMENTO DE PAÍSES ==================== */

// Função para carregar países no select de países de residência
async function fetchCountries() {
    const response = await fetch('https://restcountries.com/v3.1/all');
    const countries = await response.json();
    const paisSelect = document.getElementById('pais');

    // Ordena os países por nome
    countries.sort((a, b) => a.name.common.localeCompare(b.name.common));

    // Adiciona os países ao select
    countries.forEach(country => {
        const option = document.createElement('option');
        option.value = country.cca2; 
        option.textContent = country.name.common;
        paisSelect.appendChild(option);
    });
}

// Função para carregar países no select de países profissionais
async function fetchCountries1() {
    const response = await fetch('https://restcountries.com/v3.1/all');
    const countries = await response.json();
    const paisSelect = document.getElementById('pais-prof');

    // Ordena os países por nome
    countries.sort((a, b) => a.name.common.localeCompare(b.name.common));

    // Adiciona os países ao select
    countries.forEach(country => {
        const option = document.createElement('option');
        option.value = country.cca2; 
        option.textContent = country.name.common;
        paisSelect.appendChild(option);
    });
}

// Inicializa as funções para carregar os países
fetchCountries();
fetchCountries1();




/* ==================== FORMULÁRIO: CAMPOS BRASILEIROS E ESTRANGEIROS ==================== */

// Exibe/oculta campos brasileiros ou estrangeiros com base no país selecionado no select de residência
document.addEventListener('DOMContentLoaded', function () {
    const paisSelect = document.getElementById('pais');
    const camposBrasileiro = document.querySelectorAll('.brasileiro-endR');
    const camposEstrangeiro = document.querySelectorAll('.estrangeiro-endR');

    paisSelect.addEventListener('change', function () {
        if (paisSelect.value === 'BR') {
            camposBrasileiro.forEach(campo => {
                campo.classList.remove('desativar');
                campo.required = true;
            });

            camposEstrangeiro.forEach(campo => {
                campo.classList.add('desativar');
                campo.required = false;
            });
        } else {
            camposBrasileiro.forEach(campo => {
                campo.classList.add('desativar');
                campo.required = false;
            });

            camposEstrangeiro.forEach(campo => {
                campo.classList.remove('desativar');
                campo.required = true;
            });
        }
    })
});

// Exibe/oculta campos brasileiros ou estrangeiros com base no país selecionado no select de residência profissional
document.addEventListener('DOMContentLoaded', function () {
    const paisSelect = document.getElementById('pais-prof');
    const camposBrasileiro = document.querySelectorAll('.brasileiro-endP');
    const camposEstrangeiro = document.querySelectorAll('.estrangeiro-endP');

    paisSelect.addEventListener('change', function () {
        if (paisSelect.value === 'BR') {
            camposBrasileiro.forEach(campo => {
                campo.classList.remove('desativar');
                campo.required = true;
            });

            camposEstrangeiro.forEach(campo => {
                campo.classList.add('desativar');
                campo.required = false;
            });
        } else {
            camposBrasileiro.forEach(campo => {
                campo.classList.add('desativar');
                campo.required = false;
            });

            camposEstrangeiro.forEach(campo => {
                campo.classList.remove('desativar');
                campo.required = true;
            });
        }
    })
});




/* ==================== CARREGAMENTO DE ESTADOS E MUNICÍPIOS ==================== */

// Carregamento de estados do IBGE para selects com a classe 'uf'
document.addEventListener('DOMContentLoaded', async function() {
    const estadosSelects = document.querySelectorAll('.uf'); 

    try {
        const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
        const estados = await response.json();

        // Adiciona os estados a todos os selects com a classe 'uf'
        estados.forEach(estado => {
            const option = document.createElement('option');
            option.value = estado.id;
            option.textContent = estado.nome;

            estadosSelects.forEach(select => {
                select.appendChild(option.cloneNode(true)); 
            });
        });

    } catch (error) {
        console.error('Erro ao carregar os estados:', error);
    }
});

// Listener para mudança de estado no select 'uf1', carregando municípios correspondentes
document.getElementById('uf1').addEventListener('change', async function() {
    const estadoId = this.value;
    const municipioSelect = document.getElementById('municipio1');

    // Reseta o select de municípios
    municipioSelect.innerHTML = '<option value="">Selecione o Município</option>';

    if (estadoId) {
        try {
            const response = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoId}/municipios`);
            const municipios = await response.json();

            // Adiciona os municípios ao select correspondente
            municipios.forEach(municipio => {
                const option = document.createElement('option');
                option.value = municipio.id;
                option.textContent = municipio.nome;
                municipioSelect.appendChild(option);
            });

        } catch (error) {
            console.error('Erro ao carregar os municípios:', error);
        }
    }
});

// Listener para mudança de estado no select 'uf2', carregando municípios correspondentes
document.getElementById('uf2').addEventListener('change', async function() {
    const estadoId = this.value;
    const municipioSelect = document.getElementById('municipio2');

    // Reseta o select de municípios
    municipioSelect.innerHTML = '<option value="">Selecione o Município</option>';

    if (estadoId) {
        try {
            const response = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoId}/municipios`);
            const municipios = await response.json();

            // Adiciona os municípios ao select correspondente
            municipios.forEach(municipio => {
                const option = document.createElement('option');
                option.value = municipio.id;
                option.textContent = municipio.nome;
                municipioSelect.appendChild(option);
            });

        } catch (error) {
            console.error('Erro ao carregar os municípios:', error);
        }
    }
});




/* ==================== VALIDAÇÃO DE SENHA NO FORMULÁRIO ==================== */

// Valida se as senhas inseridas coincidem ao enviar o formulário
document.querySelector('form').addEventListener('submit', function(event) {
    const senha = document.getElementById('senha').value;
    const confirmarSenha = document.getElementById('confirmar_senha').value;

    if (senha !== confirmarSenha) {
        alert('As senhas não coincidem.');
        event.preventDefault(); // Impede o envio do formulário se as senhas não coincidirem
    }
});
