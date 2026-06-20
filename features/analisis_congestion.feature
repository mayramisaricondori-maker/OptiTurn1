Funcionalidad: Visualización de picos de congestión horaria
  Como usuario que planifica un trámite presencial
  Quiero ver el reporte de afluencia por horas de un establecimiento
  Para evitar acudir en los momentos de más alta demanda de público

  Escenario: Identificación visual de bloques horarios con alta congestión
    Dado que el usuario se encuentra en la pantalla de "Información del servicio" de la entidad "SUNAT"
    Cuando hace clic en la opción "Comparar horarios"
    Entonces el sistema debe renderizar la lista completa de bloques de atención del día
    Y debe marcar visualmente con etiquetas de color rojo e indicadores de congestión los horarios de alta afluencia (ej. "12:00 PM")
