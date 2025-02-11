let map;
let directionsService;
let directionsRenderer = [];
let destinationCount = 1; // Inicializamos con 1 dirección por defecto
const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A6', '#FF8C00', '#8A2BE2', '#00CED1']; // Colores para las rutas
import { googleMapsApiKey } from './config.js';  // Agrega esta línea si aún no está

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14,
    center: { lat: -12.0464, lng: -77.0428 }, // Cambia a tu ubicación si es necesario
  });

  directionsService = new google.maps.DirectionsService();
}

// Aquí donde incluimos el API Key de Google Maps dinámicamente
const script = document.createElement('script');
script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&callback=initMap`; //Ahora usas la variable de entorno aqui
document.head.appendChild(script);

function addDestinationInput() {
  destinationCount++; // Incrementar el contador de campos agregados

  // Crear un nuevo contenedor para la dirección
  const destinationDiv = document.createElement('div');
  destinationDiv.className = 'destination-input'; // Añadir la clase para el estilo CSS
  destinationDiv.innerHTML = `
    <label for="destination${destinationCount}">Dirección ${destinationCount}:</label>
    <input type="text" id="destination${destinationCount}" placeholder="Ingresa la dirección ${destinationCount}">
    <span class="remove-btn" onclick="removeDestination(${destinationCount})">X</span>
  `;

  // Añadirlo al contenedor de destinos
  document.getElementById('destinations-container').appendChild(destinationDiv);
}

function removeDestination(index) {
  const destinationDiv = document.getElementById(`destination${index}`).parentElement;
  destinationDiv.remove();

  // Decrementamos el contador de direcciones
  destinationCount--;

  // Reajustamos el orden de las direcciones para reflejar la eliminación
  for (let i = index; i <= destinationCount; i++) {
    const nextDestination = document.getElementById(`destination${i + 1}`);
    if (nextDestination) {
      nextDestination.id = `destination${i}`;
      nextDestination.previousElementSibling.setAttribute('for', `destination${i}`);
      nextDestination.previousElementSibling.textContent = `Dirección ${i}:`;
      nextDestination.nextElementSibling.setAttribute('onclick', `removeDestination(${i})`);
    }
  }
}

function calculateRoutes() {
  const origin = document.getElementById('origin').value.trim();
  const destinations = [];
  let routesData = [];

  // Recolectar todas las direcciones ingresadas
  for (let i = 1; i <= destinationCount; i++) {
    const destination = document.getElementById(`destination${i}`);
    if (destination && destination.value.trim() !== "") {
      destinations.push(destination.value.trim());
    }
  }

  // Limpiar las rutas previas
  directionsRenderer.forEach(renderer => renderer.setMap(null));
  directionsRenderer = [];

  destinations.forEach((destination, index) => {
    const request = {
      origin: origin,
      destination: destination,
      travelMode: google.maps.TravelMode.DRIVING, // O WALKING, dependiendo de la preferencia
    };

    const renderer = new google.maps.DirectionsRenderer({
      polylineOptions: {
        strokeColor: colors[index % colors.length], // Cicla entre los colores
      },
    });

    directionsRenderer.push(renderer);

    directionsService.route(request, function(result, status) {
      if (status === google.maps.DirectionsStatus.OK) {
        renderer.setDirections(result);
        renderer.setMap(map);

        // Obtener el tiempo de viaje
        const duration = result.routes[0].legs[0].duration.text; // Tiempo de viaje en formato legible

        // Almacenar los datos para la tabla
        routesData.push({
          destination: destination,
          duration: duration, // Tiempo de viaje
          color: colors[index % colors.length], // Color de la ruta
          durationInMinutes: convertDurationToMinutes(duration), // Tiempo total en minutos
        });
      } else {
        alert('No se pudo calcular la ruta a ' + destination + ': ' + status);
      }

      // Solo mostramos la tabla y calculamos el destino más cercano cuando todas las rutas se hayan procesado
      if (routesData.length === destinations.length) {
        displayRoutesTable(routesData); // Mostrar tabla ordenada
        calculateNearestDestination(routesData); // Calcular destino más cercano
      }
    });
  });
}

function displayRoutesTable(routesData) {
  const tableBody = document.getElementById('routesTableBody');
  tableBody.innerHTML = "";  // Limpiar la tabla antes de agregar nuevos datos

  // Ordenar las rutas por el tiempo de viaje en minutos (de menor a mayor)
  routesData.sort((a, b) => a.durationInMinutes - b.durationInMinutes);

  // Mostrar cada ruta en la tabla
  routesData.forEach((route) => {
    const row = document.createElement('tr');
    
    const destinationCell = document.createElement('td');
    destinationCell.textContent = route.destination;
    row.appendChild(destinationCell);

    const durationCell = document.createElement('td');
    durationCell.textContent = route.duration;
    row.appendChild(durationCell);

    // Cambiar el color del texto según el color de la ruta
    row.style.color = route.color;

    tableBody.appendChild(row);
  });
}

function calculateNearestDestination(routesData) {
  let minDuration = Infinity;
  let nearestDestination = '';

  routesData.forEach((route) => {
    if (route.durationInMinutes < minDuration) {
      minDuration = route.durationInMinutes;
      nearestDestination = route.destination;
    }
  });

  const nearestDestinationCell = document.getElementById('nearestDestination');
  nearestDestinationCell.textContent = nearestDestination || "Ninguno";
}

function convertDurationToMinutes(durationText) {
  let totalMinutes = 0;

  // Si el tiempo tiene horas, las convertimos a minutos
  const hoursMatch = durationText.match(/(\d+)\s*hour/);  // Detectar horas
  if (hoursMatch) {
    totalMinutes += parseInt(hoursMatch[1]) * 60; // Convertir horas a minutos
  }

  // Si tiene minutos, los sumamos directamente
  const minutesMatch = durationText.match(/(\d+)\s*min/);  // Detectar minutos
  if (minutesMatch) {
    totalMinutes += parseInt(minutesMatch[1]);
  }

  return totalMinutes;
}

// Asignar el evento de "Agregar Dirección" al botón
document.getElementById('addDestinationBtn').addEventListener('click', addDestinationInput);