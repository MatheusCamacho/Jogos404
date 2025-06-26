const prompt = require("prompt-sync")()
const fs = require("fs")

const nomes = []
const categorias = []
const desenvolvedores = []
const reviews = []
const fotos = []

function titulo(texto) {
    console.log()
    console.log(texto.toUpperCase())
    console.log("=".repeat(40))
    console.log()
}

function inclusao() {
    titulo("Inclusão de Jogo")

    const nome = prompt("Nome do Jogo......: ")
    const categoria = prompt("Categoria.........: ")
    const dev = prompt("Desenvolvedor.....: ")
    const review = prompt("Sua Review........: ")
    const foto = prompt("URL da Foto.......: ")

    nomes.push(nome)
    categorias.push(categoria)
    desenvolvedores.push(dev)
    reviews.push(review)
    fotos.push(foto)

    console.log("Jogo cadastrado com sucesso, e não deu erro 404, ein!")
}

function listagem() {
    titulo("Lista dos seus jogos 404")

    console.log("Nº Nome do Jogo...... Categoria..... Desenvolvedor.... Review")
    console.log("--------------------------------------------------------------------------")

    for (let i = 0; i < nomes.length; i++) {
        console.log(`${String(i+1).padStart(2)} ${nomes[i].padEnd(20)} ${categorias[i].padEnd(15)} ${desenvolvedores[i].padEnd(18)} ${reviews[i]}`)
    }

    console.log("--------------------------------------------------------------------------")
}

function pesquisaCategoria() {
    titulo("Pesquisa de Jogos por Categoria")

    const categoria = prompt("Categoria: ").toUpperCase()

    console.log("Nome do Jogo....... Desenvolvedor........... Review")
    console.log("------------------------------------------------------------")

    let existe = 0

    for (let i = 0; i < nomes.length; i++) {
        if (categorias[i].toUpperCase() === categoria) {
            console.log(`${nomes[i].padEnd(20)} ${desenvolvedores[i].padEnd(20)} ${reviews[i]}`)
            existe++
        }
    }

    if (existe === 0) {
        console.log("* Obs.: Não há jogos nesta categoria")
    }

    console.log("------------------------------------------------------------")
}

function exclusao() {
    listagem()

    console.log()
    const num = Number(prompt("Qual Nº do Jogo para excluir (0 para cancelar)? "))

    if (num == 0 || num > nomes.length) {
        console.log("Nenhum jogo excluído...")
        return
    }

    nomes.splice(num - 1, 1)
    categorias.splice(num - 1, 1)
    desenvolvedores.splice(num - 1, 1)
    reviews.splice(num - 1, 1)
    fotos.splice(num - 1, 1)

    console.log("Ok. Jogo removido com sucesso!")
}

function gravaJogos() {
    const jogos = []

    for (let i = 0; i < nomes.length; i++) {
        jogos.push(nomes[i] + ";" + categorias[i] + ";" + desenvolvedores[i] + ";" + reviews[i] + ";" + fotos[i])
    }

    fs.writeFileSync("jogos.txt", jogos.join("\n"))

    console.log("Ok! Lista de jogos salva com sucesso.")
}

function carregaJogos() {
    if (fs.existsSync("jogos.txt")) {
        const jogos = fs.readFileSync("jogos.txt", "utf-8").split("\n")

        for (let i = 0; i < jogos.length; i++) {
            const partes = jogos[i].split(";")

            nomes.push(partes[0])
            categorias.push(partes[1])
            desenvolvedores.push(partes[2])
            reviews.push(partes[3])
            fotos.push(partes[4])
        }
    }
}

function catalogoWeb() {
    let conteudo = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Jogos 404 - Reviews</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: 'Segoe UI', sans-serif;
      background-color: #1e1e1e;
      color: #f0f0f0;
    }

    header {
      background-color:rgb(49, 48, 48);
      padding: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 15px;
      flex-wrap: wrap;
    }

    header img {
      width: 100px;
      height: 100px;
      object-fit: contain;
      border-radius: 8px;
    }

    header h1 {
      font-size: 2.4em;
      margin: 0;
      color: #fff;
      font-family:Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
      margin-right: 4rem;

    }

    .container {
      max-width: 1000px;
      margin: 40px auto;
      padding: 0 20px;
      display: flex;
      flex-direction: column;
      gap: 30px;
    }

    .card {
      background-color: #2a2a2a;
      border-radius: 16px;
      padding: 20px;
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 20px;
      box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
      transition: 1s background;

    }

    .card img {
      width: 150px;
      height: 200px;
      border-radius: 12px;
      object-fit: cover;
      border: 2px solid #b30000;
    }
    .card:hover{
      height: 210px;
      background-color: #616060;
    }

    .info {
      flex: 1;
    }

    .info h2 {
      font-size: 1.6em;
      margin-bottom: 8px;
      color: #ff4d4d;
    }

    .info p {
      margin: 4px 0;
      font-size: 1.1em;
    }

    .review {
      font-style: italic;
      color: #ccc;
      margin-top: 10px;
    }

  </style>
</head>
<body>
  <header>
    <img src="logo.png" alt="Logo Jogos 404">
    <h1>Jogos 404</h1>
  </header>
  <div class="container">`

    for (let i = 0; i < nomes.length; i++) {
        conteudo += `
    <div class="card">
      <img src="${fotos[i]}" alt="Imagem do Jogo">
      <div class="info">
        <h2>${nomes[i]}</h2>
        <p><strong>Categoria:</strong> ${categorias[i]}</p>
        <p><strong>Desenvolvedora:</strong> ${desenvolvedores[i]}</p>
        <p class="review">"${reviews[i]}"</p>
      </div>
    </div>`
    }

    conteudo += `
  </div>
</body>
</html>`

    fs.writeFileSync("catalogo.html", conteudo)
    console.log("Catálogo gerado com sucesso!")
}




carregaJogos()

menuPrincipal:
do {
    titulo("Jogos 404")
    console.log("1. Incluir Jogo")
    console.log("2. Listar Jogos")
    console.log("3. Pesquisar por Categoria")
    console.log("4. Gerar Catálogo HTML")
    console.log("5. Excluir Jogo")
    console.log("6. Sair")
    const opcao = Number(prompt("Opção: "))

    switch (opcao) {
        case 1: inclusao(); break
        case 2: listagem(); break
        case 3: pesquisaCategoria(); break
        case 4: catalogoWeb(); break
        case 5: exclusao(); break
        case 6: break menuPrincipal
        default: console.log("Opção inválida.")
    }
} while (true)

gravaJogos()
console.log("-".repeat(40))
console.log("Fim do Programa...")
