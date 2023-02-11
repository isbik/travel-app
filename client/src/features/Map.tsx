"use client";

import { createEvent, createStore, restore, sample } from "effector";
import { useStore } from "effector-react";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import * as L from "leaflet";
import ReactDOMServer from "react-dom/server";

type Props = {};

const center = [-43.5321, 172.6362];

const $dots = createStore([]);

const addDot = createEvent<any>();

const setPosition = createEvent();

const $position = restore<any>(setPosition, center);

sample({
  clock: addDot,
  source: { dots: $dots, position: $position },
  target: $dots,
  fn: ({ dots, position }) => [
    ...dots,
    { lat: position[0], lng: position[1], name: "DOT " + dots.length },
  ],
});

const setMap = createEvent<L.Map>();
const $map = restore<L.Map | null>(setMap, null);

const Map = (props: Props) => {
  const dots = useStore($dots);
  const p = useStore($position);

  const m = useStore($map);

  useEffect(() => {
    if (m) return;

    var map = L.map("map").setView([51.505, -0.09], 13);
    setMap(map);

    map.on("click", ({ latlng }) => {
      const { lat, lng } = latlng;
      setPosition([lat, lng]);
    });

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    const icon = L.divIcon({
      className: "my-custom-pin",
      iconAnchor: [0, 24],
      popupAnchor: [0, -36],

      html: `<div class="bg-blue-500 w-5 h-5 rounded-xl" />`,
    });

    var marker = L.marker([51.5, -0.09], {
      zIndexOffset: 1000,
      draggable: true,
      icon,
    }).addTo(map);

    //codesandbox.io/s/leaflet-with-react-forked-7252c?file=/src/index.js:716-720

    https: var popup = L.popup().setContent(`
      <div className="flex flex-col">
        <p className="mb-2">Interesting place</p>
        <button
        class="bg-red-500"
        onclick="console.log(this)" >
        Delete this dot
        </button>
      </div>
    `);

    marker.bindPopup(popup, { className: "m-0" });

    marker.on("dragend", () => {
      const { lat, lng } = marker.getLatLng();
      setPosition([lat, lng]);
    });
  }, []);

  const handleAddPoint = () => {
    addDot();

    const icon = L.divIcon({
      className: "my-custom-pin",
      iconAnchor: [0, 24],
      popupAnchor: [0, -36],
      html: `<div class="bg-green-500 w-5 h-5 rounded-xl" />`,
    });

    L.marker([p[0], p[1]], {
      icon,
      draggable: true,
    }).addTo(m);
  };

  return (
    <div className="relative h-screen">
      <div className="z-[9000] absolute bg-white left-2 top-2 p-4">
        <button
          className="px-2 py-1 mb-4 bg-red-200 rounded"
          onClick={handleAddPoint}
        >
          Добавить точку
        </button>
      </div>

      <div id="map" style={{ height: "100%" }}></div>
    </div>
  );
};
export default Map;
