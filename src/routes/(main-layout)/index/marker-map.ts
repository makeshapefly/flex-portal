export const options = {
    selector: "#markersMap",
    map: "world",
    markers: [{
        name: "Brazil",
        coords: [-14.235, -51.9253]
    },
    {
        name: "Russia",
        coords: [61.524, 105.3188]
    },
    {
        name: "China",
        coords: [35.8617, 104.1954]
    }],
    labels: {
        markers: {
            render: (marker: { name: any; }) => marker.name
        }
    },
    selectedMarkers: [1],
  };
  