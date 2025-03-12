# NearPlace

**NearPlace** es una aplicación web que utiliza la **API de Google Maps** para mostrar lugares cercanos a la ubicación del usuario y proporcionar información sobre ellos.

## Features

- **Visualización** de mapa interactivo
- **Geolocalización** para encontrar lugares cercanos
- **Búsqueda** de ubicaciones específicas
- **Información detallada** sobre lugares encontrados

## Tech Stack

- HTML5, CSS3, JavaScript
- Google Maps JavaScript API
- Google Places API
- Google Directions API

## Demo

Puedes ver una demostración en vivo de la aplicación [aquí](https://nearplace.netlify.app/)

![App Screenshot](/assets/screenshots/nearplace.jpeg)

## Installation

##### 1. Clona este repositorio:

```bash
  git clone https://github.com/tu-usuario/NearPlace.git
```

##### 2. Crea un archivo **config.js** en la raíz del proyecto basándote en **config.example.js** y añade tu clave API de Google Maps:

```Javascript
  const googleMapsApiKey = "TU_CLAVE_API_AQUI";
```

##### 3. Abre **index.html** en tu navegador web o utiliza un servidor local.

## Google API Configuration

Para utilizar esta aplicación, necesitarás una clave API de Google Maps con las siguientes APIs habilitadas:

- Maps JavaScript API
- Places API
- Directions API
- Geocoding API

Asegúrate de configurar las restricciones de dominio adecuadas para tu clave API en la consola de Google Cloud.

## Deployment

Este proyecto está configurado para desplegarse fácilmente en Netlify:

##### 1. Haz fork de este repositorio

##### 2. Conéctalo a Netlify

##### 3. Configura la variable de entorno GOOGLE_MAPS_API_KEY en Netlify con tu clave API

## Project structure

```bash
NearPlace/
├── index.html          # Archivo HTML principal
├── style.css           # Estilos CSS
├── script.js           # Lógica principal de JavaScript
├── config.example.js   # Ejemplo de configuración de API key
├── netlify.toml        # Configuración de despliegue para Netlify
└── .gitignore          # Archivos excluidos del repositorio
```

## Contributing

Las contribuciones son bienvenidas. Para cambios importantes, por favor abre primero un issue para discutir lo que te gustaría cambiar.

See `contributing.md` for ways to get started.

Please adhere to this project's `code of conduct`.
