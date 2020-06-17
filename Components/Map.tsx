import {
  Map as LeafletMap,
  MapProps,
  MarkerProps,
  TileLayer,
  Marker,
} from 'react-leaflet'

type Props = {
  mapProps: Omit<MapProps, 'children'>
  markerProps: MarkerProps
}

const Map: React.FC<Props> = ({ mapProps, markerProps }) => {
  return (
    <>
      <LeafletMap {...mapProps}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker {...markerProps} />
      </LeafletMap>
    </>
  )
}

export default Map
