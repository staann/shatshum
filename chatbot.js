document.addEventListener('DOMContentLoaded', () => {
    const corpusText = document.getElementById('corpus-text');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    const chatResponse = document.getElementById('chat-response');

    // O objeto que armazenará nosso modelo da cadeia de Markov
    let markovChain = {};

    /**
     * Treina o modelo com base no texto fornecido.
     * @param {string} text O texto de treinamento (corpus).
     */
    function train(text) {
        // Limpa o modelo anterior
        markovChain = {};

        // Normaliza o texto: minúsculas e remove pontuações simples
        const cleanedText = text.toLowerCase().replace(/[.,!?;]/g, '');
        const words = cleanedText.split(/\s+/).filter(word => word.length > 0);

        // Constrói a cadeia
        for (let i = 0; i < words.length - 1; i++) {
            const currentWord = words[i];
            const nextWord = words[i + 1];

            // Se a palavra atual ainda não está no nosso modelo, adiciona
            if (!markovChain[currentWord]) {
                markovChain[currentWord] = [];
            }

            // Adiciona a próxima palavra ao array de possibilidades
            markovChain[currentWord].push(nextWord);
        }
    }

    /**
     * Gera uma resposta a partir do modelo treinado.
     * @param {string} startWord A palavra inicial para gerar a resposta.
     * @param {number} maxLength O comprimento máximo da resposta.
     * @returns {string} A resposta gerada.
     */
    function generate(startWord, maxLength = 15) {
        // Normaliza a palavra inicial
        let currentWord = startWord.toLowerCase();
        
        // Se a palavra inicial não existe no modelo, escolhe uma aleatória
        if (!markovChain[currentWord]) {
            const allWords = Object.keys(markovChain);
            if (allWords.length === 0) return "Por favor, treine o modelo primeiro.";
            currentWord = allWords[Math.floor(Math.random() * allWords.length)];
        }

        let response = [currentWord];

        for (let i = 0; i < maxLength - 1; i++) {
            const possibleNextWords = markovChain[currentWord];

            // Se não houver uma próxima palavra possível, para a geração
            if (!possibleNextWords || possibleNextWords.length === 0) {
                break;
            }

            // Escolhe a próxima palavra aleatoriamente
            const nextWord = possibleNextWords[Math.floor(Math.random() * possibleNextWords.length)];
            response.push(nextWord);
            currentWord = nextWord; // Atualiza a palavra atual para a próxima iteração
        }
        
        // Junta as palavras e capitaliza a primeira letra
        const finalResponse = response.join(' ');
        return finalResponse.charAt(0).toUpperCase() + finalResponse.slice(1);
    }

    // Evento para o botão de enviar
    sendBtn.addEventListener('click', () => {
        // 1. Treina o modelo com o texto atual do textarea
        train(corpusText.value);

        // 2. Pega a entrada do usuário
        const message = userInput.value;
        if (message.trim() === '') return;

        // 3. Usa a última palavra da mensagem do usuário como semente para a resposta
        const messageWords = message.split(/\s+/);
        const seedWord = messageWords[messageWords.length - 1];

        // 4. Gera e exibe a resposta
        const botReply = generate(seedWord);
        chatResponse.textContent = botReply;
    });
});