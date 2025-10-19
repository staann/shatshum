/* ====================================== */
/* SHATSHUM.JS - CHATBOT COM CADEIAS DE MARKOV */
/* ====================================== */

// Variáveis globais
let markovChain = {};
let startWords = [];
let trainingData = [];

/* ====================================== */
/* FUNÇÃO 1: TREINAR IA */
/* ====================================== */
// Esta função é chamada ao carregar a página
function treinar_ia() {
    // Dados de treinamento padrão
    trainingData = [
        "Olá! Bem-vindo à Universidade de Brasília!",
        "A UnB é uma das melhores universidades do Brasil.",
        "Temos diversos cursos de graduação e pós-graduação.",
        "O campus Darcy Ribeiro é lindo e moderno.",
        "A biblioteca central tem um acervo incrível.",
        "Os professores são muito qualificados e dedicados.",
        "A UnB oferece bolsas de estudo e auxílios.",
        "O restaurante universitário tem comida boa e barata.",
        "Existem muitas atividades culturais e esportivas.",
        "A UnB fica em Brasília, capital do Brasil.",
        "Temos laboratórios modernos e bem equipados.",
        "A universidade tem parcerias internacionais importantes.",
        "O processo seletivo é feito através do ENEM e SISU.",
        "As inscrições abrem no início do ano letivo.",
        "O calendário acadêmico está disponível no site oficial.",
        "Você pode entrar em contato pelo telefone (61) 3107-0100.",
        "Cada faculdade tem seus próprios canais de atendimento.",
        "A UnB tem uma história rica e importante.",
        "Muitos ex-alunos se tornaram profissionais de destaque.",
        "A pesquisa científica é muito valorizada na UnB.",
        "Temos programas de intercâmbio com universidades estrangeiras.",
        "A UnB é pública e gratuita para todos os estudantes.",
        "O campus tem uma infraestrutura moderna e completa.",
        "Existem muitas oportunidades de estágio e emprego.",
        "A UnB valoriza a diversidade e inclusão social.",
        "Temos um sistema de bibliotecas muito eficiente.",
        "Os estudantes podem participar de projetos de extensão.",
        "A universidade oferece apoio psicológico e pedagógico.",
        "A UnB tem uma forte tradição em pesquisa acadêmica.",
        "Muitos cursos são reconhecidos nacionalmente."
    ];

    // Construir cadeia de Markov
    construirCadeiaMarkov();
    
    console.log("✅ IA treinada com sucesso!");
}

/* ====================================== */
/* FUNÇÃO 2: PROCESSAR TEXTO E RESPONDER */
/* ====================================== */
// Esta função é chamada quando o usuário envia uma mensagem
function processar_texto_e_responder(texto) {
    // Se a IA não foi treinada, retornar mensagem padrão
    if (Object.keys(markovChain).length === 0) {
        return "A inteligência artificial ainda não foi implementada. Por favor, treine a IA primeiro!";
    }

    // Gerar resposta usando Markov
    const resposta = gerarRespostaMarkov(texto);
    
    // Adicionar contexto se houver palavras-chave
    return adicionarContexto(texto, resposta);
}

/* ====================================== */
/* FUNÇÕES AUXILIARES - MARKOV */
/* ====================================== */

function construirCadeiaMarkov() {
    markovChain = {};
    startWords = [];

    trainingData.forEach(frase => {
        const palavras = tokenizar(frase);
        
        if (palavras.length > 0) {
            startWords.push(palavras[0]);
            
            for (let i = 0; i < palavras.length - 1; i++) {
                const palavraAtual = palavras[i];
                const proximaPalavra = palavras[i + 1];
                
                if (!markovChain[palavraAtual]) {
                    markovChain[palavraAtual] = [];
                }
                markovChain[palavraAtual].push(proximaPalavra);
            }
        }
    });
}

function tokenizar(texto) {
    return texto.toLowerCase()
        .replace(/[^\w\sáàâãéêíóôõúç]/g, '')
        .split(/\s+/)
        .filter(palavra => palavra.length > 0);
}

function gerarRespostaMarkov(entrada) {
    const palavrasEntrada = tokenizar(entrada);
    
    // Tentar começar com palavra da entrada
    let palavraAtual = null;
    for (const palavra of palavrasEntrada) {
        if (markovChain[palavra]) {
            palavraAtual = palavra;
            break;
        }
    }
    
    // Se não encontrar, usar palavra aleatória
    if (!palavraAtual) {
        palavraAtual = startWords[Math.floor(Math.random() * startWords.length)];
    }
    
    let resposta = palavraAtual;
    let contador = 1;
    const maxPalavras = 15;
    
    // Gerar sequência de palavras
    while (contador < maxPalavras && markovChain[palavraAtual]) {
        const opcoes = markovChain[palavraAtual];
        const proximaPalavra = opcoes[Math.floor(Math.random() * opcoes.length)];
        
        if (proximaPalavra) {
            resposta += " " + proximaPalavra;
            palavraAtual = proximaPalavra;
            contador++;
        } else {
            break;
        }
    }
    
    // Formatar resposta
    return formatarResposta(resposta);
}

function formatarResposta(texto) {
    texto = texto.charAt(0).toUpperCase() + texto.slice(1);
    
    if (!texto.endsWith('.') && !texto.endsWith('!') && !texto.endsWith('?')) {
        texto += '.';
    }
    
    return texto;
}

function adicionarContexto(entrada, resposta) {
    const textoLower = entrada.toLowerCase();
    
    if (textoLower.includes('curso') || textoLower.includes('graduação')) {
        return `Sobre cursos, ${resposta.toLowerCase()} A UnB oferece mais de 100 cursos de graduação.`;
    } else if (textoLower.includes('matrícula') || textoLower.includes('inscrição')) {
        return `Para matrícula, ${resposta.toLowerCase()} O processo é feito através do ENEM/SISU.`;
    } else if (textoLower.includes('calendário') || textoLower.includes('semestre')) {
        return `Sobre o calendário, ${resposta.toLowerCase()} O semestre inicia em março e agosto.`;
    } else if (textoLower.includes('contato') || textoLower.includes('telefone')) {
        return `Para contato, ${resposta.toLowerCase()} Ligue para (61) 3107-0100.`;
    }
    
    return resposta;
}

/* ====================================== */
/* FUNÇÕES DE INTERFACE */
/* ====================================== */

function enviarMensagem() {
    const input = document.getElementById('messageInput');
    const mensagem = input.value.trim();
    
    if (!mensagem) return;
    
    // Adicionar mensagem do usuário
    adicionarMensagemNaTela(mensagem, 'user');
    input.value = '';
    
    // Mostrar "digitando..."
    mostrarDigitando();
    
    // Gerar e mostrar resposta após delay
    setTimeout(() => {
        esconderDigitando();
        const resposta = processar_texto_e_responder(mensagem);
        adicionarMensagemNaTela(resposta, 'bot');
    }, 1500);
}

function enviarMensagemRapida(mensagem) {
    adicionarMensagemNaTela(mensagem, 'user');
    
    mostrarDigitando();
    setTimeout(() => {
        esconderDigitando();
        const resposta = processar_texto_e_responder(mensagem);
        adicionarMensagemNaTela(resposta, 'bot');
    }, 1200);
}

function adicionarMensagemNaTela(texto, tipo) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${tipo}`;
    
    // Adicionar atributo data para identificar origem da mensagem
    if (tipo === 'bot') {
        messageDiv.setAttribute('data-origem', 'ia-shatshum');
        messageDiv.innerHTML = `
            <div class="bot-avatar">S</div>
            <div class="message-bubble" data-tipo="texto-digitado-pela-ia">${texto}</div>
        `;
    } else {
        messageDiv.setAttribute('data-origem', 'usuario');
        messageDiv.innerHTML = `
            <div class="message-bubble" data-tipo="texto-digitado-pelo-usuario">${texto}</div>
        `;
    }
    
    // Remover mensagem de boas-vindas
    const welcomeMessage = chatMessages.querySelector('.welcome-message');
    if (welcomeMessage) {
        welcomeMessage.remove();
    }
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function mostrarDigitando() {
    document.getElementById('typingIndicator').style.display = 'flex';
    document.getElementById('chatMessages').scrollTop = document.getElementById('chatMessages').scrollHeight;
}

function esconderDigitando() {
    document.getElementById('typingIndicator').style.display = 'none';
}

/* ====================================== */
/* FUNÇÕES DE CONTROLE */
/* ====================================== */

function resetarIA() {
    if (confirm('Deseja resetar a IA e limpar todas as mensagens?')) {
        // Limpar chat
        const chatMessages = document.getElementById('chatMessages');
        chatMessages.innerHTML = `
            <div class="welcome-message">
                <h3>🎓 Bem-vindo ao Shatshum!</h3>
                <p>Olá! Sou o ShatShum - O Shat Shumbrega.<br>
                O que conversaremos hoje?</p>
                
                <div class="quick-actions">
                    <button class="quick-action" onclick="enviarMensagemRapida('Conte-me sobre a UnB')">Sobre a UnB</button>
                    <button class="quick-action" onclick="enviarMensagemRapida('Quais cursos existem?')">Cursos</button>
                    <button class="quick-action" onclick="enviarMensagemRapida('Como me matricular?')">Matrícula</button>
                    <button class="quick-action" onclick="enviarMensagemRapida('Calendário acadêmico')">Calendário</button>
                </div>
            </div>
            <div class="typing-indicator" id="typingIndicator">
                <div class="bot-avatar">S</div>
                <div class="typing-dots">
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                </div>
            </div>
        `;
        
        // Retreinar IA
        treinar_ia();
        
        alert('✅ IA resetada com sucesso!');
    }
}

function treinarComArquivo(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        const conteudo = e.target.result;
        
        // Dividir em frases
        const novasFrases = conteudo
            .split(/[.!?]+/)
            .map(f => f.trim())
            .filter(f => f.length > 10);
        
        if (novasFrases.length > 0) {
            trainingData = [...trainingData, ...novasFrases];
            construirCadeiaMarkov();
            alert(`✅ IA treinada com ${novasFrases.length} novas frases!`);
        } else {
            alert('⚠️ Nenhuma frase válida encontrada no arquivo.');
        }
    };
    reader.readAsText(file);
}

function toggleSobre() {
    const modal = document.getElementById('sobreModal');
    if (modal.style.display === 'block') {
        modal.style.display = 'none';
    } else {
        modal.style.display = 'block';
    }
}

// Fechar modal ao clicar fora
window.onclick = function(event) {
    const modal = document.getElementById('sobreModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}

