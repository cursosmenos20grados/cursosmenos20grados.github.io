# Backend - Chat IA Cursos Menos 20 Grados

Backend Node.js + Express para el chatbot del curso de refrigeración.

## 🚀 Instalación Local

### Requisitos
- Node.js v14+ 
- npm o yarn

### Pasos

1. **Clonar el repositorio**
```bash
git clone https://github.com/cursosmenos20grados/cursosmenos20grados.github.io.git
cd cursosmenos20grados.github.io/backend
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Crear archivo .env**
```bash
cp .env.example .env
```

4. **Configurar variables de entorno**
Edita `.env` y agrega tu API Key de Google:
```
API_KEY=tu_api_key_aqui
PORT=3000
CORS_ORIGIN=http://localhost:3000
NODE_ENV=development
```

5. **Ejecutar en desarrollo**
```bash
npm run dev
```

El servidor estará disponible en `http://localhost:3000`

## 📱 Endpoints

### POST /api/chat
Recibe un mensaje y devuelve respuesta de la IA.

**Request:**
```json
{
  "message": "¿Cuánto cuesta el curso?"
}
```

**Response:**
```json
{
  "response": "El curso cuesta..."
}
```

### GET /health
Verifica que el servidor esté activo.

**Response:**
```json
{
  "status": "OK"
}
```

## 🌐 Desplegar en Vercel

1. **Fork o conecta tu repositorio a Vercel**
   - Ve a https://vercel.com
   - Conecta tu GitHub
   - Selecciona el repositorio

2. **Configurar variables de entorno en Vercel**
   - En el dashboard de Vercel, ve a Settings > Environment Variables
   - Agrega:
     - `API_KEY` = tu Google API Key
     - `CORS_ORIGIN` = https://cursosmenos20grados.github.io
     - `NODE_ENV` = production

3. **Desplegar**
   - Vercel automáticamente desplegará cuando hagas push a main

4. **Actualizar URL en index.html**
   - Reemplaza la URL en el fetch con tu URL de Vercel
   - Ej: `https://tu-proyecto.vercel.app/api/chat`

## 🔒 Seguridad

- ⚠️ **NUNCA** hagas commit del archivo `.env` con claves reales
- El archivo `.gitignore` ya está configurado para ignorar `.env`
- Las claves deben estar solo en variables de entorno del servidor

## 📚 Tecnologías

- **Express** - Framework web
- **CORS** - Control de solicitudes cross-origin
- **dotenv** - Gestión de variables de entorno
- **@google/generative-ai** - SDK de Google Gemini

## 🐛 Troubleshooting

**Error: API Key inválida**
- Verifica que tu API Key esté correcta en `.env`
- Asegúrate de tener habilitada la Gemini API en Google Cloud

**Error: CORS bloqueado**
- Verifica que `CORS_ORIGIN` esté correctamente configurado
- Debe coincidir con tu dominio real

## 📞 Soporte

Para reportar problemas, abre un issue en el repositorio principal.