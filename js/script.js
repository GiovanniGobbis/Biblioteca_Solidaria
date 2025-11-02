
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
hamburger.addEventListener('click', () => {navLinks.classList.toggle('active');});
document.addEventListener('input', function (e) {
if (e.target.id === 'cpf') {e.target.value = e.target.value.replace(/\D/g, '').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d{1,2})$/, '$1-$2');}
if (e.target.id === 'telefone') {e.target.value = e.target.value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '($1) $2').replace(/(\d{5})(\d)/, '$1-$2');}
if (e.target.id === 'cep') {e.target.value = e.target.value.replace(/\D/g, '').replace(/(\d{5})(\d)/, '$1-$2');}
});
const form = document.getElementById('formCadastro');
const msg = document.getElementById('mensagem-sucesso');
if (form) {form.addEventListener('submit', (event) => {event.preventDefault(); msg.classList.remove('hidden'); form.reset();});}
