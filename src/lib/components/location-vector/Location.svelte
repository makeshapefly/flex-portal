<script lang="ts">
  import { onMount } from 'svelte';
  //@ts-ignore
  import jsVectorMap from 'jsvectormap?client';
  import 'jsvectormap/dist/maps/world.js?client';
  import 'jsvectormap/dist/jsvectormap.min.css';

  let userLocationMap: any;

  function initializeUserLocationMap() {
    const mapContainer = document.getElementById('userLocationMap');
    if (mapContainer) mapContainer.innerHTML = '';

    // Initialize the map
    userLocationMap = new jsVectorMap({
      selector: '#userLocationMap',
      map: 'world',
      onRegionTipShow: function (e: any, el: { html: (arg0?: string) => string }, code: any) {
        const regionName = el.html();
        el.html(regionName);
      },
      onLoaded: async (map: any) => {
        // Fetch location data from ipinfo.io
        const response = await fetch('https://ipinfo.io/geo');
        const data = await response.json();
        const city = data.city;
        const country = data.country; // Country code (e.g., 'IN')
        const ip = data.ip;

        // Add event listener for "Find My Location" button
        const findLocationButton = document.querySelector('#request-location');
        if (findLocationButton) {
          findLocationButton.addEventListener('click', async () => {
            map.removeMarkers();

            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(
                (position) => {
                  // Get user's coordinates
                  const coords = [position.coords.latitude, position.coords.longitude];
                  // Format the location name
                  const locationName = `• ${city}-${country} (${ip})`;
                  // Add a marker with the location name
                  map.addMarkers([
                    {
                      coords: coords,
                      name: locationName
                    }
                  ]);
                },
                (error) => {
                  console.error('Error getting location: ', error);
                  alert('Unable to retrieve your location.');
                }
              );
            } else {
              alert('Geolocation is not supported by this browser.');
            }
          });
        }

        const clearLocationButton = document.querySelector('#clear-location');
        if (clearLocationButton) {
          clearLocationButton.addEventListener('click', () => {
            map.removeMarkers(); // Clear all markers
          });
        }
      }
    });
  }

  // Initialize the map on mount
  onMount(() => {
    initializeUserLocationMap();
  });
</script>


<div id="userLocationMap" class="min-h-96"></div>
<!-- Buttons for Location Actions -->
<div class="flex gap-5 mt-4">
  <button id="request-location" class="text-white btn btn-blue">Find My Location</button>
  <button id="clear-location" class="text-white btn btn-red">Clear Location</button>
</div>
