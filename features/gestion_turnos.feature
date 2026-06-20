Funcionalidad: Gestión, cancelación y reprogramación de turnos
  Como usuario con un turno previamente agendado
  Quiero poder reprogramar o cancelar mi reserva desde la aplicación
  Para flexibilizar mi tiempo y liberar el cupo en el establecimiento si no puedo asistir

  Escenario: Cancelación exitosa de un turno activo
    Dado que el usuario se encuentra en la pantalla de "Confirmación de reserva" o "Mis turnos"
    Cuando hace clic en el botón "Cancelar reserva"
    Y confirma la acción en el mensaje emergente de advertencia
    Entonces el sistema debe actualizar el estado del ticket a "Cancelado"
    Y debe liberar el bloque horario inmediatamente en el sistema global
  Escenario: Reprogramación de fecha y hora para una reserva
    Dado que el usuario visualiza su turno activo en la pantalla de detalles
    Cuando selecciona la opción "Reprogramar turno"
    Y elige una nueva fecha y el bloque horario alternativo de las "11:30 AM"
    Y presiona "Confirmar cambio"
    Entonces el sistema debe modificar los datos de la reserva existente
    Y debe actualizar el panel con el nuevo horario confirmado
