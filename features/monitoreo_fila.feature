Funcionalidad: Monitoreo en tiempo real de la fila virtual
  Como usuario con un turno reservado
  Quiero ver mi posición dinámica en la lista de espera
  Para calcular mi hora de llegada al establecimiento sin hacer filas físicas

  Escenario: Actualización dinámica de la posición en la cola de espera
    Dado que el usuario ingresa a la sección "Mis turnos" desde la barra de navegación inferior
    Y visualiza la pantalla "Fila virtual" mostrando su turno actual "A123" en la posición "12"
    Cuando transcurre el tiempo de atención en las ventanillas del local
    Entonces la interfaz de la aplicación debe actualizarse automáticamente
    Y debe mostrar al usuario que tiene "2 personas delante de ti" y un tiempo estimado de espera de "3-5 min"
