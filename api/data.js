const questions = [
  {
    idPregunta: 'a1a1a1a1-a1a1-4a1a-8a1a-a1a1a1a1a1a1',
    titulo: '¿Cuáles de los siguientes son mamíferos?',
    Habilitado: true,
    foto: 'https://www.mundomar.es/wp-content/uploads/2019/12/collage-mamiferos-cabecera.jpg',
    respuestas: [
      // 8 correct answers (valor: false)
      { idRespuesta: 'b1b1b1b1-b1b1-4b1b-8b1b-b1b1b1b1b1b1', titulo: 'Perro', valor: false, foto: 'https://www.mundomar.es/wp-content/uploads/2019/12/collage-mamiferos-cabecera.jpg', seleccionada: false },
      { idRespuesta: 'b2b2b2b2-b2b2-4b2b-8b2b-b2b2b2b2b2b2', titulo: 'Gato', valor: false, foto: 'Sin foto', seleccionada: false },
      { idRespuesta: 'b3b3b3b3-b3b3-4b3b-8b3b-b3b3b3b3b3b3', titulo: 'Elefante', valor: false, foto: 'Sin foto', seleccionada: false },
      { idRespuesta: 'b4b4b4b4-b4b4-4b4b-8b4b-b4b4b4b4b4b4', titulo: 'Ballena', valor: false, foto: 'Sin foto', seleccionada: false },
      { idRespuesta: 'b5b5b5b5-b5b5-4b5b-8b5b-b5b5b5b5b5b5', titulo: 'Murciélago', valor: false, foto: 'Sin foto', seleccionada: false },
      { idRespuesta: 'b6b6b6b6-b6b6-4b6b-8b6b-b6b6b6b6b6b6', titulo: 'Delfín', valor: false, foto: 'Sin foto', seleccionada: false },
      { idRespuesta: 'b7b7b7b7-b7b7-4b7b-8b7b-b7b7b7b7b7b7', titulo: 'Humano', valor: false, foto: 'Sin foto', seleccionada: false },
      { idRespuesta: 'b8b8b8b8-b8b8-4b8b-8b8b-b8b8b8b8b8b8', titulo: 'Ornitorrinco', valor: false, foto: 'Sin foto', seleccionada: false },
      // 4 incorrect answers (valor: true)
      { idRespuesta: 'b9b9b9b9-b9b9-4b9b-8b9b-b9b9b9b9b9b9', titulo: 'Pingüino', valor: true, foto: 'Sin foto', seleccionada: false },
      { idRespuesta: 'b0b0b0b0-b0b0-4b0b-8b0b-b0b0b0b0b0b0', titulo: 'Tiburón', valor: true, foto: 'Sin foto', seleccionada: false },
      { idRespuesta: 'c0c0c0c0-c0c0-4c0c-8c0c-c0c0c0c0c0c0', titulo: 'Águila', valor: true, foto: 'Sin foto', seleccionada: false },
      { idRespuesta: 'c2c2c2c2-c2c2-4c2c-8c2c-c2c2c2c2c2c2', titulo: 'Cocodrilo', valor: true, foto: 'Sin foto', seleccionada: false },
    ],
  },
  {
    idPregunta: 'd1d1d1d1-d1d1-4d1d-8d1d-d1d1d1d1d1d1',
    titulo: '¿Qué países se encuentran en América del Sur?',
    Habilitado: true,
    foto: 'Sin foto',
    respuestas: [
      // 8 correct
      { idRespuesta: 'e1e1e1e1-e1e1-4e1e-8e1e-e1e1e1e1e1e1', titulo: 'Argentina', valor: false, foto: 'Sin foto', seleccionada: false },
      { idRespuesta: 'e2e2e2e2-e2e2-4e2e-8e2e-e2e2e2e2e2e2', titulo: 'Brasil', valor: false, foto: 'Sin foto', seleccionada: false },
      { idRespuesta: 'e3e3e3e3-e3e3-4e3e-8e3e-e3e3e3e3e3e3', titulo: 'Colombia', valor: false, foto: 'Sin foto', seleccionada: false },
      { idRespuesta: 'e4e4e4e4-e4e4-4e4e-8e4e-e4e4e4e4e4e4', titulo: 'Perú', valor: false, foto: 'Sin foto', seleccionada: false },
      { idRespuesta: 'e5e5e5e5-e5e5-4e5e-8e5e-e5e5e5e5e5e5', titulo: 'Chile', valor: false, foto: 'Sin foto', seleccionada: false },
      { idRespuesta: 'e6e6e6e6-e6e6-4e6e-8e6e-e6e6e6e6e6e6', titulo: 'Ecuador', valor: false, foto: 'Sin foto', seleccionada: false },
      { idRespuesta: 'e7e7e7e7-e7e7-4e7e-8e7e-e7e7e7e7e7e7', titulo: 'Venezuela', valor: false, foto: 'Sin foto', seleccionada: false },
      { idRespuesta: 'e8e8e8e8-e8e8-4e8e-8e8e-e8e8e8e8e8e8', titulo: 'Uruguay', valor: false, foto: 'Sin foto', seleccionada: false },
      // 4 incorrect
      { idRespuesta: 'e9e9e9e9-e9e9-4e9e-8e9e-e9e9e9e9e9e9', titulo: 'México', valor: true, foto: 'Sin foto', seleccionada: false },
      { idRespuesta: 'f1f1f1f1-f1f1-4f1f-8f1f-f1f1f1f1f1f1', titulo: 'España', valor: true, foto: 'Sin foto', seleccionada: false },
      { idRespuesta: 'f2f2f2f2-f2f2-4f2f-8f2f-f2f2f2f2f2f2', titulo: 'Canadá', valor: true, foto: 'Sin foto', seleccionada: false },
      { idRespuesta: 'f3f3f3f3-f3f3-4f3f-8f3f-f3f3f3f3f3f3', titulo: 'Nigeria', valor: true, foto: 'Sin foto', seleccionada: false },
    ]
  }
];

module.exports = { questions };
