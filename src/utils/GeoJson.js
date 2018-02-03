export function toGeoJson(position) {
  return {
    type: 'Feature',
    geometry: {
      coordinates: [
        position.coords.longitude,
        position.coords.latitude
      ]
    },
    timestamp: position.timestamp,
    properties: {
      name: ''
    }
  }
}

