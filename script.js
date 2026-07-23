/* =========================================================
   ARENA DEV - script.js
   JavaScript puro (sem frameworks).
   Responsável por:
   1. Guardar os dados dos 20 desafios
   2. Renderizar os cards na tela
   3. Controlar a navegação entre páginas (Início / Desafios / Progresso)
   4. Salvar e ler o progresso no localStorage
   ========================================================= */

/* ---------------------------------------------------------
   0. CONFIGURAÇÃO DO WHATSAPP
   Troque pelo número que vai RECEBER o aviso de desafio concluído.
   Formato: código do país + DDD + número, só números (sem +, espaço ou traço).
   Exemplo Brasil (62) 99999-9999 -> "5562999999999"
--------------------------------------------------------- */
const WHATSAPP_NUMERO = "5562999999999"; // <-- TROQUE AQUI PELO SEU NÚMERO

/* ---------------------------------------------------------
   1. DADOS DOS NÍVEIS
   Cada nível tem: id, nome, emoji, cor e faixa de questões
--------------------------------------------------------- */
const LEVELS = [
  { id: 1, nome: "Nível 1 - Iniciante",     emoji: "🟢", cor: "var(--nivel1)", de: 1,  ate: 4 },
  { id: 2, nome: "Nível 2 - Fácil",          emoji: "🟡", cor: "var(--nivel2)", de: 5,  ate: 7 },
  { id: 3, nome: "Nível 3 - Intermediário",  emoji: "🟠", cor: "var(--nivel3)", de: 8,  ate: 10 },
  { id: 4, nome: "Nível 4 - Avançado",       emoji: "🔵", cor: "var(--nivel4)", de: 11, ate: 13 },
  { id: 5, nome: "Nível 5 - Hard",           emoji: "🔴", cor: "var(--nivel5)", de: 14, ate: 20 },
];

/* ---------------------------------------------------------
   2. DADOS DOS 20 DESAFIOS
   Cada desafio tem: número, título, descrição, entrada e saída de exemplo
--------------------------------------------------------- */
const CHALLENGES = [
  {
    numero: 1,
    titulo: "Calcular média de 5 alunos",
    descricao: "Peça 5 notas ao usuário e calcule a média final da turma.",
    entrada: "7.5, 8.0, 6.5, 9.0, 10.0",
    saida: "Média: 8.2",
  },
  {
    numero: 2,
    titulo: "Criar calculadora simples",
    descricao: "Crie uma calculadora que some, subtraia, multiplique e divida dois números.",
    entrada: "10, 5, +",
    saida: "Resultado: 15",
  },
  {
    numero: 3,
    titulo: "Verificar faixa de idade",
    descricao: "Peça a idade da pessoa e informe se é criança, adolescente, adulto ou idoso.",
    entrada: "16",
    saida: "Adolescente",
  },
  {
    numero: 4,
    titulo: "Criar tabuada",
    descricao: "Peça um número e mostre a tabuada de multiplicação de 1 a 10.",
    entrada: "7",
    saida: "7 x 1 = 7 ... 7 x 10 = 70",
  },
  {
    numero: 5,
    titulo: "Encontrar maior número",
    descricao: "Peça 3 números e mostre qual é o maior entre eles.",
    entrada: "4, 9, 2",
    saida: "Maior número: 9",
  },
  {
    numero: 6,
    titulo: "Contar números pares e ímpares",
    descricao: "Peça uma lista de números e conte quantos são pares e quantos são ímpares.",
    entrada: "[1, 2, 3, 4, 5, 6]",
    saida: "Pares: 3 | Ímpares: 3",
  },
  {
    numero: 7,
    titulo: "Sistema de aprovação por média",
    descricao: "Calcule a média de um aluno e diga se ele foi aprovado (média >= 7) ou reprovado.",
    entrada: "6.5, 7.0, 8.0",
    saida: "Média: 7.16 - Aprovado",
  },
  {
    numero: 8,
    titulo: "Sistema bancário simples",
    descricao: "Crie um sistema com depósito, saque e consulta de saldo.",
    entrada: "Depositar 100, Sacar 30",
    saida: "Saldo atual: 70",
  },
  {
    numero: 9,
    titulo: "Lista de compras",
    descricao: "Crie uma lista de compras onde o usuário pode adicionar e remover itens.",
    entrada: "Adicionar: Arroz, Feijão",
    saida: "Lista: [Arroz, Feijão]",
  },
  {
    numero: 10,
    titulo: "Cadastro de alunos",
    descricao: "Crie um cadastro simples de alunos com nome e nota, guardando em uma lista.",
    entrada: "{ nome: 'Ana', nota: 8.5 }",
    saida: "Aluno cadastrado com sucesso!",
  },
  {
    numero: 11,
    titulo: "Sistema de login",
    descricao: "Crie um sistema de login simples validando usuário e senha.",
    entrada: "usuario: 'admin', senha: '1234'",
    saida: "Login realizado com sucesso!",
  },
  {
    numero: 12,
    titulo: "Gerador de senha",
    descricao: "Crie um gerador de senhas aleatórias com letras, números e símbolos.",
    entrada: "Tamanho: 8",
    saida: "Senha gerada: aZ9#kLp1",
  },
  {
    numero: 13,
    titulo: "Analisador de texto",
    descricao: "Receba um texto e conte quantas palavras, letras e vogais ele possui.",
    entrada: "'Arena Dev'",
    saida: "Palavras: 2 | Letras: 8 | Vogais: 4",
  },
  {
    numero: 14,
    titulo: "Sistema de estoque",
    descricao: "Crie um controle de estoque com entrada e saída de produtos.",
    entrada: "Entrada: 50 unidades, Saída: 20 unidades",
    saida: "Estoque atual: 30 unidades",
  },
  {
    numero: 15,
    titulo: "Chat simples",
    descricao: "Crie um chat básico onde as mensagens digitadas aparecem na tela com hora de envio.",
    entrada: "'Olá, tudo bem?'",
    saida: "[10:32] Olá, tudo bem?",
  },
  {
    numero: 16,
    titulo: "Sistema de votação",
    descricao: "Crie uma votação simples entre candidatos, contando os votos de cada um.",
    entrada: "Voto: Candidato A",
    saida: "Candidato A: 1 voto",
  },
  {
    numero: 17,
    titulo: "Jogo da forca",
    descricao: "Crie o clássico jogo da forca com uma palavra secreta e tentativas de letras.",
    entrada: "Palavra: 'javascript', Letra: 'a'",
    saida: "j_v_scr_pt (letra encontrada!)",
  },
  {
    numero: 18,
    titulo: "Sistema com cadastro de usuários",
    descricao: "Crie um CRUD simples (criar, listar, editar e excluir) de usuários.",
    entrada: "Cadastrar: { nome: 'João', email: 'joao@email.com' }",
    saida: "Usuário cadastrado com sucesso!",
  },
  {
    numero: 19,
    titulo: "Criar uma API simples",
    descricao: "Simule uma API usando JavaScript (funções que retornam dados em formato JSON).",
    entrada: "GET /usuarios",
    saida: "[{ id: 1, nome: 'Maria' }]",
  },
  {
    numero: 20,
    titulo: "Sistema completo de gerenciamento de tarefas",
    descricao: "Crie um sistema completo para criar, concluir, editar e excluir tarefas (To-Do List).",
    entrada: "Adicionar tarefa: 'Estudar JavaScript'",
    saida: "Tarefa adicionada: 'Estudar JavaScript' (pendente)",
  },
];

/* Chave usada para salvar o progresso no localStorage */
const STORAGE_KEY = "arenaDevProgresso";

/* ---------------------------------------------------------
   3. FUNÇÕES DE PROGRESSO (localStorage)
--------------------------------------------------------- */

// Lê a lista de desafios concluídos salva no navegador
function getProgresso() {
  const salvo = localStorage.getItem(STORAGE_KEY);
  return salvo ? JSON.parse(salvo) : [];
}

// Salva a lista de desafios concluídos no navegador
function salvarProgresso(lista) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(lista));
}

// Marca (ou verifica) se um desafio já foi concluído
function isConcluido(numero) {
  return getProgresso().includes(numero);
}

// Alterna o status de concluído de um desafio
function concluirDesafio(numero) {
  const progresso = getProgresso();
  if (!progresso.includes(numero)) {
    progresso.push(numero);
    salvarProgresso(progresso);
  }
}

// Reseta todo o progresso salvo
function resetarProgresso() {
  localStorage.removeItem(STORAGE_KEY);
}

/* ---------------------------------------------------------
   3.1 CADASTRO DO PARTICIPANTE (localStorage)
   Guarda nome, idade, área de atuação, situação e área na programação
--------------------------------------------------------- */
const USUARIO_KEY = "arenaDevUsuario";

// Lê os dados do participante já cadastrado (ou null se não existir)
function getUsuario() {
  const salvo = localStorage.getItem(USUARIO_KEY);
  return salvo ? JSON.parse(salvo) : null;
}

// Salva os dados do participante
function salvarUsuario(dados) {
  localStorage.setItem(USUARIO_KEY, JSON.stringify(dados));
}

// Verifica se o cadastro já foi preenchido
function usuarioCadastrado() {
  return getUsuario() !== null;
}

/* ---------------------------------------------------------
   4. RENDERIZAÇÃO DOS DESAFIOS (cards agrupados por nível)
--------------------------------------------------------- */
function renderChallenges() {
  const container = document.getElementById("challenges-container");
  container.innerHTML = ""; // limpa antes de desenhar de novo

  LEVELS.forEach((nivel) => {
    // Filtra os desafios que pertencem a esse nível
    const desafiosDoNivel = CHALLENGES.filter(
      (c) => c.numero >= nivel.de && c.numero <= nivel.ate
    );

    // Cria o bloco do nível
    const levelBlock = document.createElement("div");
    levelBlock.className = "level-block";
    levelBlock.style.setProperty("--level-color", nivel.cor);

    // Cabeçalho do nível
    const header = document.createElement("h3");
    header.className = "level-header";
    header.textContent = `${nivel.emoji} ${nivel.nome} (Questões ${nivel.de} a ${nivel.ate})`;
    levelBlock.appendChild(header);

    // Grid de cards
    const grid = document.createElement("div");
    grid.className = "cards-grid";

    desafiosDoNivel.forEach((desafio) => {
      grid.appendChild(criarCardDesafio(desafio, nivel.cor));
    });

    levelBlock.appendChild(grid);
    container.appendChild(levelBlock);
  });
}

// Cria o elemento HTML de um card de desafio
function criarCardDesafio(desafio, corNivel) {
  const concluido = isConcluido(desafio.numero);

  const card = document.createElement("div");
  card.className = "challenge-card" + (concluido ? " completed" : "");
  card.style.setProperty("--level-color", corNivel);

  card.innerHTML = `
    <span class="challenge-number">Questão ${desafio.numero}</span>
    <span class="challenge-title">${desafio.titulo}</span>
    <p class="challenge-description">${desafio.descricao}</p>
    <div class="challenge-io">
      <strong>Entrada:</strong> ${desafio.entrada}<br />
      <strong>Saída:</strong> ${desafio.saida}
    </div>
    <button class="btn-complete" data-numero="${desafio.numero}" ${concluido ? "disabled" : ""}>
      ${concluido ? "Concluído ✅" : "Concluir desafio"}
    </button>
  `;

  // Evento de clique no botão "Concluir desafio"
  const botao = card.querySelector(".btn-complete");
  botao.addEventListener("click", () => {
    concluirDesafio(desafio.numero);
    renderChallenges();   // re-renderiza os cards (atualiza visual, mostra concluído)
    atualizarProgresso(); // atualiza as barras de progresso

    enviarMensagemWhatsapp(desafio);
  });

  return card;
}

/* ---------------------------------------------------------
   4.1 ENVIO DA MENSAGEM PARA O WHATSAPP
   Abre o WhatsApp (wa.me) com uma mensagem pronta avisando
   que o participante concluiu o desafio.
--------------------------------------------------------- */
function enviarMensagemWhatsapp(desafio) {
  const usuario = getUsuario();
  const mensagem = montarMensagemWhatsapp(usuario, desafio);
  const url = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensagem)}`;
  window.open(url, "_blank");
}

// Monta o texto da mensagem do WhatsApp de forma simples,
// uma linha por vez, para não vir "bagunçada" no celular
function montarMensagemWhatsapp(usuario, desafio) {
  const nome = usuario && usuario.nome ? usuario.nome : "Participante";
  const idade = usuario && usuario.idade ? usuario.idade : "-";
  const atuacao = usuario && usuario.atuacao ? usuario.atuacao : "-";
  const situacao = usuario && usuario.situacao ? usuario.situacao : "-";
  const areaProgramacao =
    usuario && usuario.areaProgramacao ? usuario.areaProgramacao : "-";

  const linhas = [
    "Arena Dev - Desafio concluido!",
    "Nome: " + nome,
    "Idade: " + idade,
    "Area de atuacao: " + atuacao,
    "Situacao: " + situacao,
    "Area na programacao: " + areaProgramacao,
    "Questao " + desafio.numero + ": " + desafio.titulo,
  ];

  return linhas.join("\n");
}

/* ---------------------------------------------------------
   5. ATUALIZAÇÃO DA BARRA DE PROGRESSO
--------------------------------------------------------- */
function atualizarProgresso() {
  const total = CHALLENGES.length; // 20
  const concluidos = getProgresso().length;
  const porcentagem = Math.round((concluidos / total) * 100);

  // Barra mini (página de desafios)
  document.getElementById("progress-mini-text").textContent =
    `Desafios concluídos: ${concluidos}/${total}`;
  document.getElementById("progress-mini-bar").style.width = `${porcentagem}%`;

  // Barra grande (página de progresso)
  document.getElementById("progress-text-big").textContent =
    `Desafios concluídos: ${concluidos}/${total}`;
  document.getElementById("progress-bar-big").style.width = `${porcentagem}%`;
  document.getElementById("progress-percent").textContent = `${porcentagem}%`;

  renderProgressoPorNivel(concluidos);
}

// Mostra um resumo de quantos desafios foram concluídos em cada nível
function renderProgressoPorNivel() {
  const container = document.getElementById("progress-levels");
  container.innerHTML = "";

  const progresso = getProgresso();

  LEVELS.forEach((nivel) => {
    const desafiosDoNivel = CHALLENGES.filter(
      (c) => c.numero >= nivel.de && c.numero <= nivel.ate
    );
    const concluidosNoNivel = desafiosDoNivel.filter((c) =>
      progresso.includes(c.numero)
    ).length;

    const item = document.createElement("div");
    item.className = "progress-level-item";
    item.style.setProperty("--level-color", nivel.cor);
    item.innerHTML = `
      <h4>${nivel.emoji} ${nivel.nome}</h4>
      <p>${concluidosNoNivel}/${desafiosDoNivel.length} concluídos</p>
    `;
    container.appendChild(item);
  });
}

/* ------------------------------------------------
---------
   6. NAVEGAÇÃO ENTRE PÁGINAS
--------------------------------------------------------- */

// Guarda para qual página o usuário queria ir antes de cair no cadastro
let paginaDestinoAposCadastro = "challenges";

// Páginas que exigem cadastro preenchido antes de acessar
const PAGINAS_PROTEGIDAS = ["challenges", "progress"];

function mostrarPagina(nomePagina) {
  // Se a página exige cadastro e ele ainda não foi feito, redireciona para o cadastro
  if (PAGINAS_PROTEGIDAS.includes(nomePagina) && !usuarioCadastrado()) {
    paginaDestinoAposCadastro = nomePagina;
    nomePagina = "cadastro";
  }

  // Esconde todas as páginas
  document.querySelectorAll(".page").forEach((pagina) => {
    pagina.classList.remove("active-page");
  });

  // Mostra apenas a página escolhida
  document.getElementById(`page-${nomePagina}`).classList.add("active-page");

  // Atualiza o botão ativo no menu (a página de cadastro não tem botão no menu)
  document.querySelectorAll(".nav-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.page === nomePagina);
  });

  // Fecha o menu mobile depois de navegar
  document.getElementById("navbar-links").classList.remove("open");
}

/* ---------------------------------------------------------
   7. EVENTOS INICIAIS (quando a página carrega)
--------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  // Configura os botões do menu superior
  document.querySelectorAll(".nav-btn").forEach((btn) => {
    btn.addEventListener("click", () => mostrarPagina(btn.dataset.page));
  });

  // Botão hamburguer (mobile) abre/fecha o menu
  document.getElementById("btn-menu-toggle").addEventListener("click", () => {
    document.getElementById("navbar-links").classList.toggle("open");
  });

  // Botão "Ver desafios" na página inicial
  document.getElementById("btn-ver-desafios").addEventListener("click", () => {
    mostrarPagina("challenges");
  });

  // Envio do formulário de cadastro
  document.getElementById("form-cadastro").addEventListener("submit", (evento) => {
    evento.preventDefault(); // impede o recarregamento da página

    const dados = {
      nome: document.getElementById("input-nome").value.trim(),
      idade: document.getElementById("input-idade").value,
      atuacao: document.getElementById("input-atuacao").value.trim(),
      situacao: document.getElementById("input-situacao").value,
      areaProgramacao: document.getElementById("input-area-programacao").value,
    };

    salvarUsuario(dados);

    // Depois de cadastrar, segue para a página que o usuário queria ver
    mostrarPagina(paginaDestinoAposCadastro);
  });

  // Botão de resetar progresso
  document.getElementById("btn-reset-progress").addEventListener("click", () => {
    const confirmar = confirm("Tem certeza que deseja apagar todo o seu progresso?");
    if (confirmar) {
      resetarProgresso();
      renderChallenges();
      atualizarProgresso();
    }
  });

  // Renderiza tudo pela primeira vez
  renderChallenges();
  atualizarProgresso();
});
