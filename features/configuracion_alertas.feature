Funcionalidad: Personalización de alertas de atención
  Como usuario que espera un turno de forma remota
  Quiero configurar alertas de proximidad en mis preferencias
  Para que el sistema me notifique antes de que sea llamado en ventanilla

  Escenario: Activación exitosa de notificaciones por cantidad de personas pendientes
    Dado que el usuario se encuentra en la pantalla de "Configuración" desde la sección de Perfil
    Y selecciona la opción "Notificaciones" dentro del bloque de Preferencias
    Cuando activa el selector para la opción "Avisarme cuando falten 5 personas en la fila"
    Entonces el sistema debe almacenar la preferencia en el estado de la aplicación
    Y debe mostrar un mensaje flotante confirmando que la configuración fue guardada con éxito
