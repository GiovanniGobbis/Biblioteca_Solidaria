// script.js - final version
document.addEventListener('DOMContentLoaded', function() {
  var y = new Date().getFullYear();
  if(document.getElementById('year')) document.getElementById('year').textContent = y;
  if(document.getElementById('year2')) document.getElementById('year2').textContent = y;
  if(document.getElementById('year3')) document.getElementById('year3').textContent = y;

  document.querySelectorAll('.nav-toggle').forEach(function(btn){
    btn.addEventListener('click', function(){
      var nav = document.querySelector('.nav-links');
      if(nav) nav.classList.toggle('active');
      var expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', String(!expanded));
    });
  });

  function maskCPF(v){ return v.replace(/\D/g,'').replace(/(\d{3})(\d)/,'$1.$2').replace(/(\d{3})(\d)/,'$1.$2').replace(/(\d{3})(\d{1,2})$/,'$1-$2').slice(0,14); }
  function maskPhone(v){ return v.replace(/\D/g,'').replace(/(\d{2})(\d)/,'($1) $2').replace(/(\d{5})(\d)/,'$1-$2').slice(0,15); }
  function maskCEP(v){ return v.replace(/\D/g,'').replace(/(\d{5})(\d)/,'$1-$2').slice(0,9); }

  document.addEventListener('input', function(e){
    if(e.target.id === 'cpf') e.target.value = maskCPF(e.target.value);
    if(e.target.id === 'telefone') e.target.value = maskPhone(e.target.value);
    if(e.target.id === 'cep') e.target.value = maskCEP(e.target.value);
  });

  var form = document.getElementById('cadastroForm');
  var feedback = document.getElementById('form-feedback');
  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      if(!form.checkValidity()){
        form.reportValidity();
        if(feedback){ feedback.className = 'alert error'; feedback.textContent = 'Por favor, corrija os campos.'; feedback.classList.remove('hidden'); }
        return;
      }
      if(feedback){ feedback.className = 'alert success'; feedback.textContent = 'Cadastro enviado com sucesso (protótipo).'; feedback.classList.remove('hidden'); }
      form.reset();
    });
  }
});
