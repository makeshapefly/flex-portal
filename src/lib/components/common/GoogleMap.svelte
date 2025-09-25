<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  
  export let apiKey: string; // Your Google Maps API key
  export let center = { lat: -31.397, lng: 125.644 };
  export let zoom = 6;
  export let mapId = 'map'; // Optional map container ID
  
  let mapContainer: HTMLElement;
  let mapInstance: google.maps.Map | null = null;
  let scriptElement: HTMLScriptElement;

  // Load the Google Maps script dynamically
  const loadGoogleMapsScript = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (window.google && window.google.maps) {
        resolve(); // Already loaded
        return;
      }

      scriptElement = document.createElement('script');
      scriptElement.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
      scriptElement.async = true;
      scriptElement.defer = true;

      scriptElement.onload = () => resolve();
      scriptElement.onerror = (err) => reject(err);

      document.head.appendChild(scriptElement);
    });
  };

  const initMap = async () => {
    try {
      await loadGoogleMapsScript();

      mapInstance = new google.maps.Map(mapContainer, {
        center,
        zoom
      });

      // You can add markers here if you like
      // new google.maps.Marker({ position: center, map: mapInstance });
    } catch (err) {
      console.error('Error loading Google Maps:', err);
    }
  };

  onMount(() => {
    initMap();
  });

  onDestroy(() => {
    // Cleanup (optional, mostly for dynamic script handling)
    if (scriptElement) {
      scriptElement.remove();
    }
    mapInstance = null;
  });
</script>

<!-- ✅ Map container -->
<div
  bind:this={mapContainer}
  id={mapId}
  class="w-full rounded"
  style="height: 350px;"
></div>
