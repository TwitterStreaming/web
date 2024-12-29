import { memo, useEffect, useRef, useState } from "react";
import {
    MapContainer,
    TileLayer,
    Marker,
    Tooltip,
    ZoomControl,
} from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import IconMap from "../../Assets/map-icon.png";
import IconMapActive from "../../Assets/active-map-icon.png";
import "../../styles/Map.css";

/**
 * @typedef {"roadmap" | "satellite" | "hybrid" | "terrain"} MapTypes
 */

const Map = memo(({ locations }) => {
    /**
     * @type {[MapTypes, React.Dispatch<React.SetStateAction<MapTypes>>]}
     */
    const [mapType, setMapType] = useState("roadmap");
    /**
     * @type {[
         import("../../data/database_caller").Location,
         React.Dispatch<React.SetStateAction<import("../../data/database_caller").Location | null>>
     ]}
     */
    const [hoveredLocation, setHoveredLocation] = useState(null);

    const mapRef = useRef(null);

    const getUrl = () => {
        /** @type {Record<MapTypes, string>} */
        const mapTypeUrls = {
            roadmap: "http://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}",
            satellite:
                "http://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}",
            hybrid: "http://mt0.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}",
            terrain: "http://mt0.google.com/vt/lyrs=p&hl=en&x={x}&y={y}&z={z}",
        };
        return mapTypeUrls[mapType];
    };

    const mapMarkIcon = new Icon({
        iconUrl: IconMap,
        iconSize: [47, 55],
    });

    const mapMarkActiveIcon = new Icon({
        iconUrl: IconMapActive,
        iconSize: [57, 65],
    });

    const renderMarks = () => {
        return locations.map((location, index) => {
            if (!location.lat || !location.lon) {
                console.warn(`Invalid location at index ${index}:`, location);
                return null;
            }

            return (
                <Marker
                    key={index}
                    icon={
                        hoveredLocation?.lat === location.lat &&
                        hoveredLocation?.lon === location.lon
                            ? mapMarkActiveIcon
                            : mapMarkIcon
                    }
                    position={{ lat: location.lat, lng: location.lon }}
                    eventHandlers={{
                        mouseover: () => {
                            setHoveredLocation(location);
                        },
                        mouseout: () => {
                            setHoveredLocation(null);
                        },
                    }}
                >
                    <Tooltip direction="top" offset={[0, -15]} opacity={1}>
                        <div className="custom-tooltip">
                            <strong>Location:</strong>{" "}
                            {location?.lat.toFixed(2)},{" "}
                            {location?.lon.toFixed(2)}
                        </div>
                    </Tooltip>
                </Marker>
            );
        });
    };

    useEffect(() => {
        if (locations.length > 0 && mapRef.current) {
            const randomLocation =
                locations[Math.floor(Math.random() * locations.length)];

            if (mapRef.current) {
                mapRef.current.flyTo(
                    { lat: randomLocation.lat, lng: randomLocation.lon },
                    5,
                );
            }
        }
    }, [locations]);

    return (
        <>
            <div
                style={{
                    width: "100%",
                    height: "80vh",
                    borderRadius: "8px",
                    overflow: "hidden",
                }}
            >
                <MapContainer
                    center={{ lat: 40.7128, lng: -74.006 }}
                    zoom={3}
                    minZoom={2}
                    zoomControl={false}
                    attributionControl={false}
                    style={{ width: "100%", height: "100%" }}
                >
                    <TileLayer url={getUrl()} />
                    {renderMarks()}
                    <ZoomControl position="topright" />
                </MapContainer>
            </div>
            <div className="buttons">
                <button
                    className="button-type"
                    onClick={() => setMapType("roadmap")}
                >
                    Roadmap
                </button>
                <button
                    className="button-type"
                    onClick={() => setMapType("satellite")}
                >
                    Satellite
                </button>
                <button
                    className="button-type"
                    onClick={() => setMapType("hybrid")}
                >
                    Hybrid
                </button>
                <button
                    className="button-type"
                    onClick={() => setMapType("terrain")}
                >
                    Terrain
                </button>
            </div>
        </>
    );
});

export default Map;
