# 🔐 Front-End Security FaceID

Sistema de reconhecimento facial para controle de acesso com interface moderna e responsiva.

## 📋 Sobre o Projeto

Aplicação frontend desenvolvida em React para captura e análise de reconhecimento facial. O sistema permite:

- ✅ Captura de imagens através da webcam
- 📊 Visualização de análises realizadas
- 🔒 Área administrativa protegida por PIN
- 🚨 Identificação de tentativas suspeitas
- 📱 Interface responsiva e moderna

## 🚀 Tecnologias

- **React 19** - Biblioteca JavaScript para interfaces
- **Vite** - Build tool e dev server
- **Styled Components** - Estilização com CSS-in-JS
- **React Router** - Roteamento de páginas
- **React Webcam** - Captura de imagens da câmera
- **React Icons** - Biblioteca de ícones

## 📦 Estrutura do Projeto

```
src/
├── components/         # Componentes reutilizáveis
│   ├── FaceMask/      # Moldura da câmera
│   ├── MenuButton/    # Botão de menu
│   ├── SideBar/       # Menu lateral
│   ├── Toast/         # Notificações
│   └── VerifyButton/  # Botão de verificação
├── pages/             # Páginas da aplicação
│   ├── Home/          # Página inicial com câmera
│   ├── Analysis/      # Lista de análises
│   └── PinCode/       # Autenticação por PIN
├── routes/            # Configuração de rotas
└── globalStyle.js     # Estilos globais
```

## ⚙️ Configuração e Instalação

### Pré-requisitos

- Node.js 18+ 
- npm ou yarn
- Backend rodando na porta 8080 (ou configurar variável de ambiente)

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/Davi-Mancebo/Front-End-Security-FaceID.git
cd Front-End-Security-FaceID
```

2. Instale as dependências:
```bash
npm install
```

3. Configure a URL do backend (opcional):
```bash
# Crie um arquivo .env na raiz do projeto
echo "VITE_API_BASE=http://localhost:8080" > .env
```

4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

5. Acesse no navegador:
```
http://localhost:5173
```

## 🔌 Integração com Backend

O frontend espera que o backend esteja disponível em `http://localhost:8080` por padrão.

### Endpoints Utilizados

**POST** `/analises/upload`
- Envia foto capturada e informações do dispositivo
- Content-Type: `multipart/form-data`
- Campos:
  - `image` / `imagem`: Arquivo da foto (JPEG)
  - `dispositivo`: String com informações do dispositivo
- Resposta esperada:
```json
{
  "data": { "id": 1, "..." },
  "message": "Análise criada com sucesso"
}
```

**GET** `/analises`
- Retorna lista de análises realizadas
- Resposta esperada:
```json
[
  {
    "id": 1,
    "dispositivo": "Android (mobile) — Chrome",
    "imagemBase64": "/9j/4AAQSkZJRg...",
    "status": false,
    "createdAt": "2025-11-26T16:54:53.799501",
    "updatedAt": "2025-11-26T16:54:53.799501"
  }
]
```

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_API_BASE=http://localhost:8080
```

## 🎯 Funcionalidades

### Página Inicial (Home)
- Captura de foto via webcam
- Detecção automática de informações do dispositivo
- Upload automático para análise
- Notificações de sucesso/erro

### Área Administrativa
- Acesso protegido por PIN (padrão: `123456`)
- Listagem de todas as análises
- Visualização de fotos capturadas
- Indicadores visuais de status (✓ aprovado / ⚠ suspeito)
- Carregamento animado

### Menu Lateral
- Navegação rápida entre páginas
- Acesso à área administrativa

## 🎨 Personalização

### Alterar PIN de Acesso

Edite o arquivo `src/pages/PinCode/index.jsx`:

```javascript
const senhaCorreta = "123456"; // Altere aqui
```

### Alterar Cores do Tema

Edite o arquivo `src/globalStyle.js`:

```javascript
body {
  background: linear-gradient(46deg, #484C7B 0%, #8E1010 100%);
}
```

## 📱 Build para Produção

```bash
npm run build
```

Os arquivos otimizados serão gerados na pasta `dist/`.

Para pré-visualizar o build:

```bash
npm run preview
```

## 🐛 Solução de Problemas

### Câmera não funciona
- Verifique se o navegador tem permissão para acessar a câmera
- Use HTTPS ou localhost (navegadores modernos bloqueiam câmera em HTTP)

### Erro "Servidor fora do ar"
- Verifique se o backend está rodando
- Confirme a URL configurada em `VITE_API_BASE`
- Verifique o CORS no backend (deve permitir `http://localhost:5173`)

### Imagens não aparecem na lista
- Verifique o formato do campo `imagemBase64` retornado pelo backend
- Deve ser uma string base64 (sem o prefixo `data:image/jpeg;base64,`)

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

**Davi Mancebo**

- GitHub: [@Davi-Mancebo](https://github.com/Davi-Mancebo)
- Repositório: [Front-End-Security-FaceID](https://github.com/Davi-Mancebo/Front-End-Security-FaceID)

---

⭐ Se este projeto foi útil, considere dar uma estrela no repositório!
