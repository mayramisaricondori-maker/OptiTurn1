Funcionalidad: Reserva de turnos interactiva
  Como usuario de OptiTurn
  Quiero seleccionar un establecimiento y un bloque horario
  Para asegurar mi atención y reducir mi tiempo de espera en el local

  Escenario: Reserva exitosa de un turno para atención presencial
    Dado que el usuario se encuentra en el "Dashboard Principal" de la aplicación
    Y selecciona la categoría "Trámites" para buscar una entidad
    Cuando hace clic sobre el establecimiento "RENIEC" con nivel de congestión "Bajo"
    Y presiona el botón "Reservar turno"
    Y selecciona la fecha actual y el bloque horario de las "8:00 AM"
    Y hace clic en "Confirmar reserva" en la pantalla de revisión de datos
    Entonces el sistema debe registrar la reserva con éxito
    Y debe mostrar la pantalla de éxito con el código único de reserva "RT-2026-0521-1000"
