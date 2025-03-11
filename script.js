// Lista de palavras para o jogo
const palavras = ["Bulbasaur","Ivysaur","Venusaur","Mega Venusaur","Charmander","Charmeleon","Charizard","Mega Charizard X","Mega Charizard Y","Squirtle","Wartortle","Blastoise","Mega Blastoise","Caterpie","Metapod","Butterfree","Weedle","Kakuna","Beedrill","Mega Beedrill","Pidgey","Pidgeotto","Pidgeot","Mega Pidgeot","Rattata","Raticate","Spearow","Fearow","Ekans","Arbok","Pichu","Pikachu","Raichu","Sandshrew","Sandslash","Nidoran♀","Nidorina","Nidoqueen","Nidoran♂","Nidorino","Nidoking","Cleffa","Clefairy","Clefable","Vulpix","Ninetales","Igglybuff","Jigglypuff","Wigglytuff","Zubat","Golbat","Crobat","Oddish","Gloom","Vileplume","Bellossom","Paras","Parasect","Venonat","Venomoth","Diglett","Dugtrio","Meowth","Persian","Psyduck","Golduck","Mankey","Primeape","Annihilape","Growlithe","Arcanine","Poliwag","Poliwhirl","Poliwrath","Politoed","Abra","Kadabra","Alakazam","Mega Alakazam","Machop","Machoke","Machamp","Bellsprout","Weepinbell","Victreebel","Tentacool","Tentacruel","Geodude","Graveler","Golem","Ponyta","Rapidash","Slowpoke","Slowbro","Mega Slowbro","Slowking","Magnemite","Magneton","Magnezone","Farfetch’d","Doduo","Dodrio","Seel","Dewgong","Grimer","Muk","Shellder","Cloyster","Gastly","Haunter","Gengar","Mega Gengar","Onix","Steelix","Mega Steelix","Drowzee","Hypno","Krabby","Kingler","Voltorb","Electrode","Exeggcute","Exeggutor","Cubone","Marowak","Tyrogue","Hitmonlee","Hitmonchan","Hitmontop","Lickitung","Lickilicky","Koffing","Weezing","Rhyhorn","Rhydon","Rhyperior","Happiny","Chansey","Blissey","Tangela","Tangrowth","Kangaskhan","Mega Kangaskhan","Horsea","Seadra","Kingdra","Goldeen","Seaking","Staryu","Starmie","Mime Jr.","Mr. Mime","Scyther","Scizor","Mega Scizor","Smoochum","Jynx","Elekid","Electabuzz","Electivire","Magby","Magmar","Magmortar","Pinsir","Mega Pinsir","Tauros","Magikarp","Gyarados","Mega Gyarados","Lapras","Ditto","Eevee","Vaporeon","Jolteon","Flareon","Porygon","Porygon2","Porygon-Z","Omanyte","Omastar","Kabuto","Kabutops","Aerodactyl","Mega Aerodactyl","Snorlax","Articuno","Zapdos","Moltres","Dratini","Dragonair","Dragonite","Mewtwo","Mega Mewtwo X","Mega Mewtwo Y","Mew"]; // A lista de palavras que o jogo pode escolher aleatoriamente
let palavraSecreta = ''; // Variável para armazenar a palavra secreta
let letrasCorretas = []; // Array para armazenar as letras corretas que o jogador adivinha
let letrasErradas = []; // Array para armazenar as letras erradas que o jogador tenta
let tentativas = 5; // O número de tentativas iniciais do jogador
let numeroDeLetras = 0; // Variável para armazenar o número de letras na palavra secreta

// Função para escolher uma palavra aleatória da lista
function escolherPalavra() {
    const indice = Math.floor(Math.random() * palavras.length); // Escolhe um índice aleatório da lista de palavras
    //  Math.floor(): Essa função arredonda o número para baixo, transformando o valor decimal em um número inteiro. Por exemplo, se o valor obtido for 4.89, Math.floor() vai arredondá-lo para 4.
    palavraSecreta = palavras[indice]; // A palavra secreta é escolhida

    // Contando o número de letras na palavra secreta, ignorando os espaços
    numeroDeLetras = palavraSecreta.replace(/ /g, '').length; // Conta apenas as letras, sem considerar os espaços
     // replace(/ /g, ''): A função replace() é usada para substituir partes da string.

    // Substitui os espaços da palavra secreta por hífens para visualização
    let palavraComHifen = palavraSecreta.replace(/ /g, '-'); // Troca espaços por hífens

    letrasCorretas = Array(palavraComHifen.length).fill('_');  // Inicializa o array de letras corretas com '_'
    // O método fill() em JavaScript é usado para preencher todos os elementos de um array com um valor fixo, a partir de um índice inicial até um índice final.
    letrasErradas = []; // Reinicia o array de letras erradas
    tentativas = 5; // Reinicia as tentativas para 5
    atualizarPalavra(); // Atualiza a visualização da palavra secreta
    atualizarErros(); // Atualiza a visualização do número de tentativas restantes
    document.getElementById('mensagem').textContent = ''; // Limpa qualquer mensagem da tela
    document.getElementById('imagem-acerto').style.display = 'none'; // Esconde a imagem de acerto
    document.getElementById('imagem-erro').style.display = 'none'; // Esconde a imagem de erro
    document.getElementById('tentativas-contagem').textContent = tentativas; // Exibe o número de tentativas restantes

    // Atualiza o número de letras no jogo
    document.getElementById('numero-letras').textContent = `Número de letras: ${numeroDeLetras}`;
}

// Função para atualizar a visualização da palavra secreta
function atualizarPalavra() {
    let palavraExibida = ''; // Inicializa uma variável para a palavra exibida

    // Itera sobre a palavra secreta e revela as letras corretas, deixando espaços ou hífens
    for (let i = 0; i < palavraSecreta.length; i++) {
        if (letrasCorretas[i] === '_') {
            if (palavraSecreta[i] === ' ') {
                palavraExibida += ' '; // Se for um espaço, mantém o espaço visível
            } else if (palavraSecreta[i] === '-') {
                palavraExibida += '-'; // Se for um hífen, mantém o hífen visível
            } else {
                palavraExibida += '_'; // Senão, mantém um traço indicando uma letra não adivinhada
            }
        } else {
            palavraExibida += letrasCorretas[i]; // Caso a letra já tenha sido adivinhada, exibe a letra
        }

        // Adiciona um espaço após cada letra ou traço para separar visualmente
        palavraExibida += ' ';
    }
    // Atualiza o elemento HTML com a palavra visível
    document.getElementById('palavra-secreta').textContent = palavraExibida.trim(); // Remove o último espaço extra
}

// Função para atualizar a contagem de tentativas restantes
function atualizarErros() {
    document.getElementById('tentativas-contagem').textContent = tentativas; // Atualiza a contagem de tentativas
}

// Função para verificar se a letra digitada é correta ou errada
function verificarLetra() {
    const letra = document.getElementById('letra').value.toLowerCase(); // Obtém a letra digitada e converte para minúscula

    // Verifica se a letra não foi tentada antes e se não é uma letra vazia
    if (letra && !letrasErradas.includes(letra) && !letrasCorretas.includes(letra)) {
        // Se a letra estiver na palavra secreta
        if (palavraSecreta.toLowerCase().includes(letra)) {
            for (let i = 0; i < palavraSecreta.length; i++) {
                // Substitui os "_" pelas letras corretas na posição correspondente
                if (palavraSecreta[i].toLowerCase() === letra) {
                    letrasCorretas[i] = letra;
                }
            }
            document.getElementById('mensagem').textContent = `Ah ah AH! Voce nao disse a palavra magica: "${letra}"!`; // Exibe a mensagem de acerto
            document.getElementById('mensagem').style.color = 'green'; // A mensagem fica verde
            document.getElementById('imagem-acerto').style.display = 'block'; // Exibe a imagem de acerto
            document.getElementById('imagem-erro').style.display = 'none'; // Esconde a imagem de erro
        } else {
            letrasErradas.push(letra); // Adiciona a letra errada ao array
            tentativas--; // Diminui as tentativas
            document.getElementById('mensagem').textContent = `Letra errada: "${letra}".`; // Exibe a mensagem de erro
            document.getElementById('mensagem').style.color = 'red'; // A mensagem fica vermelha
            document.getElementById('imagem-erro').style.display = 'block'; // Exibe a imagem de erro
            document.getElementById('imagem-acerto').style.display = 'none'; // Esconde a imagem de acerto
        }

        document.getElementById('letra').value = ''; // Limpa a caixa de entrada após o chute
        atualizarPalavra(); // Atualiza a visualização da palavra secreta
        atualizarErros(); // Atualiza o número de tentativas restantes

        // Verifica se o jogador adivinhou a palavra completamente
        if (letrasCorretas.join('') === palavraSecreta.replace(/ /g, '-')) {
            document.getElementById('mensagem').textContent = `COMO! Voce é um genio! A palavra era: ${palavraSecreta}`; // Exibe a mensagem de vitória
            document.getElementById('mensagem').style.color = 'green'; // A mensagem fica verde
        } else if (tentativas <= 0) {
            document.getElementById('mensagem').textContent = `Você não vai acreditar. Mas você cabia aqui. Eu segurava você e dizia “Esse menino vai ser o melhor menino do mundo. Esse menino vai ser melhor do que qualquer um que conhecemos.”. E você cresceu bom, maravilhoso.

            Aí chegou a hora de você ser adulto e conquistar o mundo. E conquistou. Mas em algum ponto desse percurso, você mudou. Você deixou de ser você.
            
            Agora deixa as pessoas botarem o dedo na sua cara e dizer que você não é bom. Eu vou te dizer uma coisa que você já sabe: O mundo não é um grande arco-íris. É um lugar sujo, é um lugar cruel. Que não quer saber o quanto você é durão. Vai botar você de joelhos e você vai ficar de joelhos para sempre se você deixar.
            
            Você, eu, ninguém vai bater tão forte como a vida. Mas não se trata de bater forte. Se trata de quanto você aguenta apanhar e seguir em frente. O quanto você é capaz de aguentar e continuar tentando. É assim que se consegue vencer.
            
            Agora se você sabe o seu valor, então vá atrás do que você merece. Mas tem que ter disposição para apanhar. E nada de apontar dedos, dizer que você não consegue por causa dele, dela ou de quem seja. Só covardes fazem isso e você não é covarde. Você é melhor do que isso! A palavra era: ${palavraSecreta}`; // Exibe a mensagem de derrota
            document.getElementById('mensagem').style.color = 'black'; // A mensagem fica vermelha
        }
    }
}

document.getElementById('letra').addEventListener('keypress', function(event) /* Escuta quando uma tecla é pressionada no campo de entrada. */ {
    if (event.key === 'Enter'/* Verifica se a tecla pressionada foi "Enter". */) {
        verificarLetra(); // Chama a função de verificação automaticamente
    }
});

// Função para reiniciar o jogo
function reiniciarJogo() {
    escolherPalavra(); // Escolhe uma nova palavra
    document.getElementById('mensagem').textContent = ''; // Limpa qualquer mensagem existente
}

// Inicia o jogo chamando a função escolherPalavra
escolherPalavra();
