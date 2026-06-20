Funcionalidad: Validación de llegada al establecimiento
  Como usuario que llegó al local físico del servicio
  Quiero confirmar mi asistencia mediante la aplicación móvil
  Para habilitar mi código QR de atención y pasar a ventanilla

  Escenario: Activación del código QR al llegar al local
    Dado que el usuario se encuentra físicamente en el establecimiento "RENIEC"
    Y visualiza que quedan "2 personas delante de ti" en la pantalla de la fila virtual
    Cuando presiona el botón "Confirmar asistencia"
    Entonces el sistema debe validar los datos del ticket de atención
    Y debe renderizar en la pantalla el "Código QR de atención" junto con el código de barras para ser escaneado por el módulo físico
