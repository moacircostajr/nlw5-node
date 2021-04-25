document.querySelector('#start_chat').addEventListener('click', event => {
  const socket = io()

  const chat_help = document.getElementById('chat_help')
  chat_help.style.display = 'none'

  const chat_in_support = document.getElementById('chat_in_support')
  chat_in_support.style.display = 'block'

  const email = document.getElementById('email').value
  const text = document.getElementById('txt_help').value

  socket.on('connect', () => {
    const params = { email, text }
    socket.emit('client_first_access', params, (call, erro) => {
      if (erro) {
        console.err(erro)
      } else {
        console.log(call)
      }
    })
  })
  socket.on('client_list_all_messages', messages => {
    let template_client = document.getElementById('message-user-template').innerHTML
    let template_admin = document.getElementById('admin-template').innerHTML
    messages.forEach(message => {
      if (message.admin_id === null) {
        const rendered = Mustache.render(template_client, {
          message: message.text,
          email
        })
        document.getElementById('messages').innerHTML += rendered
      } else {
        const rendered = Mustache.render(template_admin, {
          message_admin: message.text
        })
        document.getElementById('messages').innerHTML += rendered
      }
    })
  })

  socket.on('admin_send_to_client', message => {
    console.log(message)
  })
})