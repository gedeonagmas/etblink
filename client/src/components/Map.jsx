import { Fragment, useState } from "react";
import {
  GoogleMap,
  InfoWindowF,
  MarkerF,
  useLoadScript,
} from "@react-google-maps/api";

const Map = ({markers,height}) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCEUKZYwBoa5_8QgXYctlFv8q5TphaNex8",
  });

  const [activeMarker, setActiveMarker] = useState(null);

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };
  return (
    <>
      <div className="relative brightness-200 z-30">
        <div style={{ height: height, width: "100%" }}>
          {isLoaded ? (
            <GoogleMap
              center={{ lat: 30.0599153, lng: 31.2620199 }}
              zoom={2.4}
              onClick={() => setActiveMarker(null)}
              mapContainerStyle={{ width: "100%", height: height }}
            >
              {markers.map(({ id, name, position }, i) => {
                return (
                  <MarkerF
                    key={id}
                    position={position}
                    onMouseOver={() => handleActiveMarker(id)}
                    // icon={{
                    //   url:"https://t4.ftcdn.net/jpg/02/85/33/21/360_F_285332150_qyJdRevcRDaqVluZrUp8ee4H2KezU9CA.jpg",
                    //   scaledSize: { width: 50, height: 50 }
                    // }}
                  >
                    {activeMarker === id ? (
                      <InfoWindowF onCloseClick={() => setActiveMarker(null)}>
                        <div className="bg-gray-200 h-auto w-auto p-4">
                          <p>name: {name}</p>
                        </div>
                      </InfoWindowF>
                    ) : null}
                  </MarkerF>
                );
              })}
            </GoogleMap>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Map;
