document.querySelector('#user').focus();

function showHide() {
    const password = document.getElementById('password');
    const icon = document.getElementById('icon');


    if (password.type === 'password') {
        password.setAttribute('type', 'text');
        icon.classList.add('hide')
    } else {
        password.setAttribute('type', 'password');
        icon.classList.remove('hide')
    }
};

function entrar() {
    const login = document.getElementById('user').value;
    const senha = document.getElementById('password').value;
    var logado = false;

    fetch("./json/usuarios.json").then((response) => {
        response.json().then((usuario) => {
            usuario.map((pass) => {

                for (let i = 0; i < usuario.length; i++) {
                    if (login == pass.usuario && senha == pass.senha) {
                        logado = true;
                    }
                }
            })
            if (logado == true) {
                window.location.href = "./pi.html";
                let token = Math.random().toString(32).substr(2) + Math.random().toString(32).substr(2) + Math.random().toString(32).substr(2);
                localStorage.setItem('token', token);
                localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
                localStorage.setItem('usuarios', login);
            } else {
                alert('Campo usuário ou senha incorreto.');
            }
        })
    })
};