const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const PORT = process.env.PORT || 3000;

// Configurar CORS (solo tu dominio)
const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

// Inicializar Gemini AI
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

// Ruta para el chat
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;

    // Validar que el mensaje no esté vacío
    if (!message || message.trim().length === 0) {
      return res.status(400).json({ error: 'Mensaje vacío' });
    }

    // Limitar longitud del mensaje
    if (message.length > 500) {
      return res.status(400).json({ error: 'Mensaje muy largo' });
    }

    const contextIA = `Sos el asistente experto de 'Cursos Menos 20 Grados' (-20°T.E-). 
Tu objetivo es inscribir alumnos, responde de forma extremadamente concisa y directa. Evita saludos largos, introducciones repetitivas o frases de cortesía innecesarias. Prioriza ahorrar palabras. Sugiere que se comuniquen por WhatsApp.

INFO CLAVE:
- No requiere conocimientos previos (incluye electricidad básica).
- Edad promedio de inscripción: de 17 a 70 años.
- Salida Laboral: Trabajo independiente + Matrícula C.A.I.M.
- Herramientas: El taller provee todo para las prácticas.
- Prácticas: Heladeras (familiares, No Frost, comerciales) y Aire Acondicionado Splits.
- Los pagos de las cuotas son del 1 al 10 de cada mes.

ADMIN:
- Ubicación: Entre Ríos 1555, Rafael Calzada.
- Inicio: 9 de Marzo 2026. Comisiones L/M o M/J (17:30 a 20:30).
- Duración: 4 meses.
- Instructores: Marcelo Cardozo (Certificados/Matrículas) y Ruben Ruiz (Aire Acondicionado).

Responde amable y profesional. Si no sabes algo, deriva al WhatsApp.`;

    // Llamar a Gemini
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent(contextIA + "\n\nUsuario pregunta: " + message);
    const response = await result.response;
    const text = response.text();

    res.json({ response: text });
  } catch (error) {
    console.error('Error en /api/chat:', error);
    res.status(500).json({ error: 'Error procesando tu mensaje' });
  }
});

// Ruta de salud (para verificar que el servidor está activo)
app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor ejecutándose en puerto ${PORT}`);
  console.log(`Ambiente: ${process.env.NODE_ENV}`);
});