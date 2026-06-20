Funcionalidad: Autenticación de usuarios
  Como usuario registrado de OptiTurn
  Quiero iniciar sesión con mi correo y contraseña
  Para acceder a mi panel personalizado y gestionar mis turnos

  Escenario: Inicio de sesión exitoso con credenciales válidas
    Dado que el usuario se encuentra en la pantalla de "Bienvenido/Login"
    Cuando ingresa su correo electrónico válido y su contraseña en los campos correspondientes
    Y hace clic en el botón "Iniciar sesión"
    Entonces el sistema debe validar correctamente las credenciales en memoria
    Y debe redirigir al usuario al "Dashboard Principal" mostrando el mensaje "¿Qué necesitas hoy?"
