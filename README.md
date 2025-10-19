# 🎓 Shatshum - O Chat Shumbrega da UnB

Chatbot simples desenvolvido com **Cadeias de Markov** para o workshop de Inteligência Artificial da UnB.

## 📁 Estrutura do Projeto

```
shatshum/
├── shatshum.html     # Estrutura HTML (simples e semântica)
├── shatshum.css      # Estilos visuais (design moderno)
├── shatshum.js       # Lógica do chatbot (Cadeias de Markov)
└── README.md         # Documentação
```

## ✨ Funcionalidades

### ✅ Implementadas (Conforme Especificações)

#### HTML (`shatshum.html`)
- ✅ Inclui `shatshum.css` e `shatshum.js`
- ✅ Chama `treinar_ia()` ao carregar
- ✅ Campo de entrada para digitar texto
- ✅ Botão de envio + suporte para **Ctrl+Enter**
- ✅ Área de mensagens com DIVs dinâmicos
- ✅ Envio adiciona texto como "mensagem do usuário"
- ✅ Chama `processar_texto_e_responder()` ao enviar
- ✅ Resposta da IA é adicionada como "mensagem do bot"

#### CSS (`shatshum.css`)
- ✅ Design simples e limpo
- ✅ Interface bonita e moderna
- ✅ Animações suaves
- ✅ Responsivo (mobile-friendly)
- ✅ Tema verde UnB

#### JavaScript (`shatshum.js`)
- ✅ Função `treinar_ia()` - treina o modelo com dados padrão
- ✅ Função `processar_texto_e_responder()` - gera respostas usando Markov
- ✅ Algoritmo de Cadeias de Markov funcional
- ✅ Mínimo de JavaScript no HTML (separação de responsabilidades)

#### Extras
- ✅ Botão "Reset" - limpa chat e retreina IA
- ✅ Botão "Treinar" - permite upload de arquivo .txt para treinar
- ✅ Botão "Sobre" - modal com informações do desenvolvedor
- ✅ Botões de ação rápida (exemplos de perguntas)
- ✅ Indicador de "digitando..." animado

## 🚀 Como Usar

### 1. Abrir o Chatbot
Simplesmente abra o arquivo `shatshum.html` no seu navegador.

### 2. Conversar
- Digite sua mensagem no campo de texto
- Pressione **Enter** ou clique no botão **➤** para enviar
- Use **Ctrl+Enter** como atalho alternativo

### 3. Treinar com Arquivo Personalizado
1. Clique no botão **📂 Treinar**
2. Selecione um arquivo `.txt` com frases (uma por linha ou separadas por pontos)
3. A IA será retreinada com as novas frases

### 4. Resetar
Clique em **🔄 Reset** para limpar o chat e resetar a IA aos dados padrão.

## 🧠 Como Funciona a IA (Cadeias de Markov)

### Conceito Básico
Uma **Cadeia de Markov** é um modelo probabilístico que prevê a próxima palavra baseada na palavra atual.

### Exemplo Prático

**Dados de treinamento:**
- "A UnB é linda"
- "A UnB é moderna"
- "A universidade é grande"

**Cadeia construída:**
```
"a" → ["unb", "universidade"]
"unb" → ["é", "é"]
"é" → ["linda", "moderna", "grande"]
"universidade" → ["é"]
```

**Geração de resposta:**
1. Começa com palavra da entrada do usuário (ou aleatória)
2. Escolhe próxima palavra aleatoriamente das opções disponíveis
3. Repete até atingir comprimento máximo
4. Formata e retorna a resposta

### Fluxo de Execução

```
Usuário digita "conte sobre UnB"
         ↓
processar_texto_e_responder()
         ↓
gerarRespostaMarkov()
         ↓
Encontra "unb" na cadeia → ["é", "é"]
Escolhe "é" → ["linda", "moderna", "grande"]
Escolhe "moderna" → ...
         ↓
Retorna: "Unb é moderna e tem laboratórios modernos."
```

## 🎨 Personalização

### Modificar o CSS
Edite `shatshum.css` para personalizar cores, fontes, animações, etc.

### Adicionar Dados de Treinamento
Edite a variável `trainingData` em `shatshum.js` (linha ~14) ou use o botão "Treinar" para adicionar frases de um arquivo.

### Modificar Comportamento
Ajuste os parâmetros em `shatshum.js`:
- `maxPalavras` (linha ~130): comprimento máximo das respostas
- Delays dos timeouts: velocidade de resposta simulada

## 📊 Estatísticas

- **HTML**: ~120 linhas (estrutura semântica)
- **CSS**: ~400 linhas (design completo)
- **JavaScript**: ~300 linhas (lógica + Markov)
- **Total**: JavaScript mínimo no HTML (apenas 20 linhas de inicialização)

## 🔧 Requisitos

- Navegador moderno (Chrome, Firefox, Edge, Safari)
- Suporte a ES6+ JavaScript
- Nenhuma dependência externa necessária

## 📝 Para Desenvolvedores do Workshop

### Onde Modificar a IA

**Arquivo:** `shatshum.js`

**Funções principais:**
1. `treinar_ia()` - linha 14
2. `processar_texto_e_responder()` - linha 44
3. `construirCadeiaMarkov()` - linha 59
4. `gerarRespostaMarkov()` - linha 93

### Exercícios Sugeridos

1. **Iniciante**: Adicionar mais frases ao `trainingData`
2. **Intermediário**: Implementar bigramas (pares de palavras) em vez de palavras únicas
3. **Avançado**: Adicionar análise de sentimento ou contexto de conversa

## 📄 Licença

Projeto educacional desenvolvido para o Workshop de IA da UnB.

---

**Desenvolvido com ❤️ para a comunidade UnB**

