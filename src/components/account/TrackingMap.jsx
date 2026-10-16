import { CircleMarker, MapContainer, Polyline, TileLayer, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const ADDRESS_FALLBACK = [5.0378, 7.9128];
const DRIVER_FALLBACK = [5.0165, 7.9432];

export default function TrackingMap({ order }) {
  const driver = [
    order.driver_lat || DRIVER_FALLBACK[0],
    order.driver_lng || DRIVER_FALLBACK[1],
  ];
  const address = ADDRESS_FALLBACK;
  const center = [(driver[0] + address[0]) / 2, (driver[1] + address[1]) / 2];

  return (
    <div className="h-[320px] overflow-hidden rounded-2xl border border-border">
      <MapContainer
        center={center}
        zoom={12}
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Polyline
          positions={[driver, address]}
          pathOptions={{ color: '#F37021', weight: 3, dashArray: '6 8' }}
        />
        <CircleMarker
          center={address}
          radius={9}
          pathOptions={{ color: '#0A3D2E', fillColor: '#0A3D2E', fillOpacity: 1 }}
        >
          <Tooltip>Delivery address</Tooltip>
        </CircleMarker>
        <CircleMarker
          center={driver}
          radius={11}
          pathOptions={{ color: '#F37021', fillColor: '#F37021', fillOpacity: 1 }}
        >
          <Tooltip>
            {order.driver_name || 'Driver'}
            {order.eta_minutes ? ` · ${order.eta_minutes} min away` : ' · on the way'}
          </Tooltip>
        </CircleMarker>
      </MapContainer>
    </div>
  );
}
