# 📝 Diferenciação de Mensagens - Usuário vs IA

## 🎯 Como o Texto é Diferenciado no HTML

### **Especificação Atendida**
> "O resultado dessa função deve ser um texto que será acrescentado ao HTML como **'texto digitado pela IA do ShatShum'**."

---

## 🔍 Identificadores Implementados

### 1. **Atributos HTML `data-*`**

Cada mensagem possui atributos personalizados para identificação:

#### **Texto Digitado pelo Usuário:**
```html
<div class="message user" data-origem="usuario">
    <div class="message-bubble" data-tipo="texto-digitado-pelo-usuario">
        Olá, como vai?
    </div>
</div>
```

#### **Texto Digitado pela IA do ShatShum:**
```html
<div class="message bot" data-origem="ia-shatshum">
    <div class="bot-avatar">S</div>
    <div class="message-bubble" data-tipo="texto-digitado-pela-ia">
        Olá! A UnB é uma das melhores universidades do Brasil.
    </div>
</div>
```

---

## 🎨 Diferenciação Visual no CSS

### **Texto do Usuário:**
- Cor: Verde (tema UnB)
- Posição: Lado direito
- Identificador ao hover: "👤 Você"

### **Texto da IA:**
- Cor: Branco com borda
- Posição: Lado esquerdo
- Avatar: "S" (ShatShum)
- Identificador ao hover: "🤖 IA"

---

## 💻 Código JavaScript Responsável

### Localização: `shatshum.js` (linhas 207-234)

```javascript
function adicionarMensagemNaTela(texto, tipo) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${tipo}`;
    
    // Adicionar atributo data para identificar origem da mensagem
    if (tipo === 'bot') {
        // ✅ TEXTO DIGITADO PELA IA DO SHATSHUM
        messageDiv.setAttribute('data-origem', 'ia-shatshum');
        messageDiv.innerHTML = `
            <div class="bot-avatar">S</div>
            <div class="message-bubble" data-tipo="texto-digitado-pela-ia">${texto}</div>
        `;
    } else {
        // ✅ TEXTO DIGITADO PELO USUÁRIO
        messageDiv.setAttribute('data-origem', 'usuario');
        messageDiv.innerHTML = `
            <div class="message-bubble" data-tipo="texto-digitado-pelo-usuario">${texto}</div>
        `;
    }
    
    // Adicionar ao HTML
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}
```

---

## 🔄 Fluxo Completo

### **Quando o Usuário Envia uma Mensagem:**

1. **Input do usuário** → `"Olá"`
   
2. **Adicionar ao HTML como "texto digitado pelo usuário":**
   ```javascript
   adicionarMensagemNaTela("Olá", 'user');
   ```
   ```html
   <div data-origem="usuario">
       <div data-tipo="texto-digitado-pelo-usuario">Olá</div>
   </div>
   ```

3. **Processar com IA:**
   ```javascript
   const resposta = processar_texto_e_responder("Olá");
   // Retorna: "Olá! Bem-vindo à Universidade de Brasília!"
   ```

4. **Adicionar ao HTML como "texto digitado pela IA do ShatShum":**
   ```javascript
   adicionarMensagemNaTela(resposta, 'bot');
   ```
   ```html
   <div data-origem="ia-shatshum">
       <div data-tipo="texto-digitado-pela-ia">
           Olá! Bem-vindo à Universidade de Brasília!
       </div>
   </div>
   ```

---

## 🧪 Como Testar/Verificar

### **No Console do Navegador (F12):**

```javascript
// Ver todas as mensagens do usuário
document.querySelectorAll('[data-tipo="texto-digitado-pelo-usuario"]');

// Ver todas as mensagens da IA
document.querySelectorAll('[data-tipo="texto-digitado-pela-ia"]');

// Ver origem das mensagens
document.querySelectorAll('[data-origem="usuario"]');
document.querySelectorAll('[data-origem="ia-shatshum"]');
```

### **Inspecionar Elemento (F12):**

1. Abra `shatshum.html` no navegador
2. Digite uma mensagem e envie
3. Clique com botão direito na mensagem
4. Selecione "Inspecionar"
5. Você verá os atributos `data-origem` e `data-tipo`

---

## 📊 Resumo

| Característica | Texto do Usuário | Texto da IA |
|----------------|------------------|-------------|
| **Atributo `data-origem`** | `usuario` | `ia-shatshum` |
| **Atributo `data-tipo`** | `texto-digitado-pelo-usuario` | `texto-digitado-pela-ia` |
| **Classe CSS** | `message user` | `message bot` |
| **Cor de fundo** | Verde UnB | Branco |
| **Posição** | Direita | Esquerda |
| **Avatar** | Não tem | "S" verde |
| **Badge ao hover** | "👤 Você" | "🤖 IA" |

---

## ✅ Conformidade com Especificação

- ✅ Texto do usuário é acrescentado ao HTML
- ✅ Texto da IA é acrescentado ao HTML
- ✅ São claramente diferenciados (visualmente e no código)
- ✅ Identificadores semânticos no HTML (`data-*`)
- ✅ Função `processar_texto_e_responder()` gera o texto da IA
- ✅ Texto da IA é marcado como "texto-digitado-pela-ia"

---

**Todos os requisitos da especificação foram atendidos! 🎉**

