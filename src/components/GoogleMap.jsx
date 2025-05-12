"use client";

import { useEffect, useRef } from "react";

const GoogleMap = ({
  locations,
  height = "383px",
  className = "",
  singleLocationZoom = 15,
  multipleLocationsZoom = 12,
}) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    // Function to geocode a single address
    const geocodeAddress = async (address) => {
      const geocoder = new window.google.maps.Geocoder();

      return new Promise((resolve, reject) => {
        geocoder.geocode({ address }, (results, status) => {
          if (status === "OK") {
            const { lat, lng } = results[0].geometry.location;
            resolve({ lat: lat(), lng: lng() });
          } else {
            reject(new Error(`Geocoding failed for ${address}`));
          }
        });
      });
    };

    // Function to fit bounds for multiple locations
    const fitBoundsToCoordinates = (map, coords) => {
      const bounds = new window.google.maps.LatLngBounds();
      coords.forEach((coord) => bounds.extend(coord));
      map.fitBounds(bounds);

      // Add padding to the bounds
      const paddings = {
        top: 50,
        right: 50,
        bottom: 50,
        left: 50,
      };
      map.fitBounds(bounds, paddings);

      // Prevent too much zoom for small areas
      const listener = window.google.maps.event.addListener(map, "idle", () => {
        if (map.getZoom() > multipleLocationsZoom) {
          map.setZoom(multipleLocationsZoom);
        }
        window.google.maps.event.removeListener(listener);
      });
    };

    // Initialize map and geocode addresses
    const initializeMap = async () => {
      if (!locations || locations.length === 0 || !mapRef.current) return;

      try {
        let coords;
        const isSingleLocation = typeof locations === "string";

        if (isSingleLocation) {
          coords = [await geocodeAddress(locations)];
        } else {
          coords = await Promise.all(
            locations.map((location) =>
              geocodeAddress(location.address || location),
            ),
          );
        }

        // Initialize the map
        if (!mapInstanceRef.current) {
          mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
            zoom: isSingleLocation ? singleLocationZoom : multipleLocationsZoom,
            center: coords[0],
            mapTypeControl: false,
            fullscreenControl: false,
            streetViewControl: false,
          });
        }

        // Clear existing markers
        if (mapInstanceRef.current.markers) {
          mapInstanceRef.current.markers.forEach((marker) =>
            marker.setMap(null),
          );
        }
        mapInstanceRef.current.markers = [];

        // Add markers for each location
        coords.forEach((coord, index) => {
          const marker = new window.google.maps.Marker({
            position: coord,
            map: mapInstanceRef.current,
            title: Array.isArray(locations) ? locations[index].name || "" : "",
            animation: window.google.maps.Animation.DROP,
          });
          mapInstanceRef.current.markers.push(marker);
        });

        // Handle zoom and bounds
        if (isSingleLocation) {
          mapInstanceRef.current.setCenter(coords[0]);
          mapInstanceRef.current.setZoom(singleLocationZoom);
        } else if (coords.length > 1) {
          fitBoundsToCoordinates(mapInstanceRef.current, coords);
        }
      } catch (error) {
        console.error("Error initializing map:", error);
      }
    };

    // Only initialize if Google Maps is loaded
    if (window.google?.maps) {
      initializeMap();
    }

    // Cleanup function
    return () => {
      if (mapInstanceRef.current?.markers) {
        mapInstanceRef.current.markers.forEach((marker) => marker.setMap(null));
      }
    };
  }, [locations, singleLocationZoom, multipleLocationsZoom]);

  return (
    <div
      ref={mapRef}
      className={`rounded-[10px] border border-gray-200 ${className}`}
      style={{ height }}
    />
  );
};

export default GoogleMap;
