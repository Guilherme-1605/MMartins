(function(){
    const form = document.getElementById('contactForm');
    const result = document.getElementById('result');
    const submitBtn = document.getElementById('submitBtn');
    const clearBtn = document.getElementById('clearBtn');
  
    function showMessage(type, text){
      result.innerHTML = '';
      const div = document.createElement('div');
      div.className = 'notice ' + (type === 'ok' ? 'success' : 'error');
      div.textContent = text;
      result.appendChild(div);
    }
  
    function validateEmail(email){
      return /\S+@\S+\.\S+/.test(email);
    }
  
    form.addEventListener('submit', async function(e){
      e.preventDefault();
      result.innerHTML = '';
  
      const data = new FormData(form);
      const name = (data.get('name') || '').trim();
      const email = (data.get('email') || '').trim();
      const subject = (data.get('subject') || '').trim();
      const message = (data.get('message') || '').trim();
      const honeypot = (data.get('company') || '').trim();
  
      if(honeypot){
        showMessage('err', 'Envio bloqueado (suspeita de spam).');
        return;
      }
      if(!name || !email || !subject || !message){
        showMessage('err', 'Por favor, preencha todos os campos obrigatórios.');
        return;
      }
      if(!validateEmail(email)){
        showMessage('err', 'Insira um email válido.');
        return;
      }
  
      submitBtn.disabled = true;
      submitBtn.textContent = 'Enviando...';
  
      try{
        const response = await fetch("https://formspree.io/f/xpwlogkw", {
          method: "POST",
          body: data,
          headers: { 'Accept': 'application/json' }
        });
  
        if(response.ok){
          showMessage('ok', 'Mensagem enviada com sucesso. Iremos te responder em breve!');
          form.reset();
        } else {
          showMessage('err', 'Ocorreu um erro ao enviar. Tente novamente.');
        }
      }catch(err){
        console.error(err);
        showMessage('err', 'Ocorreu um erro na conexão.');
      }finally{
        submitBtn.disabled = false;
        submitBtn.textContent = 'Enviar mensagem';
      }
    });
  
    clearBtn.addEventListener('click', function(){
      form.reset();
      result.innerHTML = '';
    });
  })();
  