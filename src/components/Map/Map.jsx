import { memo, useState } from "react";
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
 * @typedef {{ id: string, lat: number, lng: number, text: string }} MockTweet
 */

const Map = memo(() => {
    /**
     * @type {[MapTypes, React.Dispatch<React.SetStateAction<MapTypes>>]}
     */
    const [mapType, setMapType] = useState("roadmap");
    /**
     * @type {[MockTweet, React.Dispatch<React.SetStateAction<MockTweet | null>>]}
     */
    const [hoveredTweet, setHoveredTweet] = useState(null);

    /**
     * @type {MockTweet[]}
     */
    const mockTweets = [
        { id: "1", lat: 40.7128, lng: -74.006, text: "Hello from NYC!" },
        { id: "2", lat: 34.0522, lng: -118.2437, text: "Greetings from LA!" },
        { id: "3", lat: 51.5074, lng: -0.1278, text: "Cheers from London!" },
        { id: "4", lat: 48.8566, lng: 2.3522, text: "Bonjour from Paris!" },
    ];

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
        return mockTweets.map((tweet) => (
            <Marker
                key={tweet.id}
                icon={
                    hoveredTweet?.id === tweet.id
                        ? mapMarkActiveIcon
                        : mapMarkIcon
                }
                position={{ lat: tweet.lat, lng: tweet.lng }}
                eventHandlers={{
                    mouseover: () => {
                        setHoveredTweet(tweet);
                    },
                    mouseout: () => {
                        setHoveredTweet(null);
                    },
                }}
            >
                <Tooltip direction="top" offset={[0, -15]} opacity={1}>
                    <div className="custom-tooltip">
                        <strong>Message:</strong> {tweet.text}
                        <br />
                        <strong>Location:</strong> {tweet.lat.toFixed(2)},{" "}
                        {tweet.lng.toFixed(2)}
                    </div>
                </Tooltip>
            </Marker>
        ));
    };

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
