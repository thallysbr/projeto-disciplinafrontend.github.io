document.addEventListener("DOMContentLoaded", function () {
    const formularioUsuario = document.getElementById("userForm");
    const nomeUsuario = document.getElementById("userName");
    const emailUsuario = document.getElementById("userEmail");
    const listaUsuarios = document.getElementById("userList");
    const pesquisa = document.getElementById("search");
    const botaoPesquisar = document.getElementById("searchButton");
    const limparTudo = document.getElementById("clearAll");
    const limparCampos = document.getElementById("clearFields");
    
    let usuariosFiltrados = [];
    
    function carregarUsuarios(usuariosParaExibir = []) {
        listaUsuarios.innerHTML = "";
        usuariosParaExibir.forEach(usuario => adicionarUsuarioNaLista(usuario));
    }
    
    function adicionarUsuarioNaLista(usuario) {
        const li = document.createElement("li");
        li.textContent = `${usuario.data} - ${usuario.nome} (${usuario.email})`;
        
        const botaoExcluir = document.createElement("button");
        botaoExcluir.textContent = "Excluir";
        botaoExcluir.onclick = function () {
            removerUsuario(usuario);
        };
        
        li.appendChild(botaoExcluir);
        listaUsuarios.appendChild(li);
    }
    
    function removerUsuario(usuarioParaRemover) {
        let usuarios = JSON.parse(localStorage.getItem("users")) || [];
        usuarios = usuarios.filter(usuario => usuario.email !== usuarioParaRemover.email);
        localStorage.setItem("users", JSON.stringify(usuarios));
        
        usuariosFiltrados = usuariosFiltrados.filter(usuario => usuario.email !== usuarioParaRemover.email);
        carregarUsuarios(usuariosFiltrados);
    }
    
    formularioUsuario.addEventListener("submit", function (event) {
        event.preventDefault();
        const novoUsuario = {
            nome: nomeUsuario.value,
            email: emailUsuario.value,
            data: new Date().toLocaleString()
        };
        
        let usuarios = JSON.parse(localStorage.getItem("users")) || [];
        usuarios.push(novoUsuario);
        localStorage.setItem("users", JSON.stringify(usuarios));
        
        nomeUsuario.value = "";
        emailUsuario.value = "";
        
        carregarUsuarios([novoUsuario]);
    });
    
    botaoPesquisar.addEventListener("click", function () {
        const termoPesquisa = pesquisa.value.toLowerCase();
        if (termoPesquisa === "") {
            carregarUsuarios([]);
            return;
        }
        const usuarios = JSON.parse(localStorage.getItem("users")) || [];
        usuariosFiltrados = usuarios.filter(usuario => usuario.nome.toLowerCase().includes(termoPesquisa) || usuario.email.toLowerCase().includes(termoPesquisa));
        carregarUsuarios(usuariosFiltrados);
    });
    
    limparTudo.addEventListener("click", function () {
        localStorage.removeItem("users");
        usuariosFiltrados = [];
        carregarUsuarios([]);
    });
    
    limparCampos.addEventListener("click", function () {
        nomeUsuario.value = "";
        emailUsuario.value = "";
    });
    
    pesquisa.value = "";
    carregarUsuarios([]);
});