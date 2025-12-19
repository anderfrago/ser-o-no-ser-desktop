// ser-o-no-ser-ng/src/app/models.ts

export interface Respuesta {
  idRespuesta: string; // Changed to string for UUID
  // Removed idPregunta here as it's typically nested within Pregunta
  valor: boolean;
  titulo: string;
  foto: string;
  seleccionada: boolean;
}

export interface Pregunta {
  idPregunta: string; // Changed to string for UUID
  Habilitado: boolean; // Changed to match backend casing
  titulo: string;
  foto: string;
  respuestas: Respuesta[];
}

export interface Grupo {
  name: string;
  puntos: number;
  puntosPanel: number;
  color: string; // Representing Color as a string (e.g., hex code or name)
}
