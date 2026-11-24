
// Banco de dados dos jogos
const data = {
    produtos: [
        {
            id: 1,
            nome: "Cyberpunk 2077",
            preco: 129.90,
            categoria: "Ação",
            imagem: "https://cdn.akamai.steamstatic.com/steam/apps/1091500/header.jpg",
            descricao: "Um jogo de mundo aberto em uma cidade futurista.",
            emEstoque: true
        },
        {
            id: 2,
            nome: "Red Dead Redemption 2",
            preco: 159.90,
            categoria: "Aventura",
            imagem: "https://cdn.akamai.steamstatic.com/steam/apps/1174180/header.jpg",
            descricao: "Explore o Velho Oeste em uma grande aventura.",
            emEstoque: true
        },
        {
            id: 3,
            nome: "The Witcher 3",
            preco: 89.90,
            categoria: "RPG",
            imagem: "https://cdn.akamai.steamstatic.com/steam/apps/292030/header.jpg",
            descricao: "Uma aventura de fantasia com monstros e magia.",
            emEstoque: true
        },
        {
            id: 4,
            nome: "Elden Ring",
            preco: 199.90,
            categoria: "RPG",
            imagem: "https://cdn.akamai.steamstatic.com/steam/apps/1245620/header.jpg",
            descricao: "Explore um mundo de fantasia cheio de desafios.",
            emEstoque: true
        },
        {
            id: 5,
            nome: "Baldur's Gate 3",
            preco: 179.90,
            categoria: "RPG",
            imagem: "https://cdn.akamai.steamstatic.com/steam/apps/1086940/header.jpg",
            descricao: "Um RPG de aventura com escolhas e batalhas.",
            emEstoque: false
        },
        {
            id: 6,
            nome: "Stardew Valley",
            preco: 24.90,
            categoria: "Simulação",
            imagem: "https://cdn.akamai.steamstatic.com/steam/apps/413150/header.jpg",
            descricao: "Cuide de uma fazenda e construa sua própria história.",
            emEstoque: true
        },
        {
            id: 7,
            nome: "Counter-Strike 2",
            preco: 49.90,
            categoria: "Ação",
            imagem: "https://cdn.akamai.steamstatic.com/steam/apps/730/header.jpg",
            descricao: "Jogo de tiro competitivo em equipes.",
            emEstoque: true
        },
        {
            id: 8,
            nome: "Dota 2",
            preco: 39.90,
            categoria: "Estratégia",
            imagem: "https://cdn.akamai.steamstatic.com/steam/apps/570/header.jpg",
            descricao: "Jogo de estratégia com batalhas entre equipes.",
            emEstoque: false
        }
    ]
};

// Selecionando elementos do HTML
const productList = document.getElementById("product-list");
const productDetails = document.getElementById("product-details");

const search = document.querySelector("#search");
const category = document.querySelector("#category");
const btnRender = document.querySelector("#btnRender");

// Formatar preço
function formatPrice(preco) {
    return preco.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

// Criar card do jogo
function createProductCard(produto) {

    const card = document.createElement("div");
    card.classList.add("card");

    card.setAttribute("data-id", produto.id);

    // Imagem do jogo
    const imagem = document.createElement("img");
    imagem.setAttribute("src", produto.imagem);
    imagem.setAttribute("alt", produto.nome);

    // Nome do jogo
    const nome = document.createElement("h3");
    nome.textContent = produto.nome;
    nome.classList.add("card-title");

    // Preço
    const preco = document.createElement("p");
    preco.textContent = formatPrice(produto.preco);

    // Categoria
    const cat = document.createElement("p");
    cat.textContent = produto.categoria;

    // Botão de detalhes
    const btnDetalhes = document.createElement("button");
    btnDetalhes.textContent = "Ver detalhes";

    btnDetalhes.addEventListener("click", function() {
        showProductDetails(produto);
    });

    // Botão de destaque
    const btnDestacar = document.createElement("button");
    btnDestacar.textContent = "Destacar";

    btnDestacar.addEventListener("click", function() {
        card.classList.toggle("highlight");
    });

    // Estilo via JavaScript
    card.style.padding = "15px";

    // Adicionando elementos ao card
    card.appendChild(imagem);
    card.appendChild(nome);
    card.appendChild(preco);
    card.appendChild(cat);
    card.appendChild(btnDetalhes);
    card.appendChild(btnDestacar);

    return card;
}

// Mostrar jogos na tela
function renderProducts(produtos) {

    productList.innerHTML = "";

    produtos.forEach(function(produto) {
        const card = createProductCard(produto);
        productList.appendChild(card);
    });

    // Selecionar todos os cards
    const cards = document.querySelectorAll(".card");

    cards.forEach(function(card) {
        console.log("ID do jogo:", card.getAttribute("data-id"));
    });
}

// Preencher categorias automaticamente
function renderCategories() {

    category.innerHTML = "";

    const opcaoTodas = document.createElement("option");
    opcaoTodas.value = "Todas";
    opcaoTodas.textContent = "Todas as categorias";

    category.appendChild(opcaoTodas);

    const categorias = [];

    data.produtos.forEach(function(produto) {
        if (!categorias.includes(produto.categoria)) {
            categorias.push(produto.categoria);
        }
    });

    categorias.forEach(function(cat) {
        const opcao = document.createElement("option");

        opcao.value = cat;
        opcao.textContent = cat;

        category.appendChild(opcao);
    });
}

// Mostrar detalhes do jogo
function showProductDetails(produto) {

    productDetails.innerHTML = `
        <h3>${produto.nome}</h3>
        <p><strong>Preço:</strong> ${formatPrice(produto.preco)}</p>
        <p><strong>Categoria:</strong> ${produto.categoria}</p>
        <p><strong>Estoque:</strong> ${produto.emEstoque ? "Disponível" : "Indisponível"}</p>
        <p><strong>Descrição:</strong> ${produto.descricao}</p>
    `;
}

// Filtrar jogos
function filterProducts() {

    const texto = search.value.toLowerCase();
    const categoriaSelecionada = category.value;

    const filtrados = data.produtos.filter(function(produto) {

        const nomeCombina = produto.nome.toLowerCase().includes(texto);

        const categoriaCombina =
            categoriaSelecionada === "Todas" ||
            produto.categoria === categoriaSelecionada;

        return nomeCombina && categoriaCombina;
    });

    return filtrados;
}

// Evento de busca
search.addEventListener("input", function() {
    renderProducts(filterProducts());
});

// Evento de categoria
category.addEventListener("change", function() {
    renderProducts(filterProducts());
});

// Evento do botão atualizar
btnRender.addEventListener("click", function() {
    renderProducts(filterProducts());
});

// Iniciar a loja
renderCategories();
renderProducts(data.produtos);
