import Head from "next/head";
import { AppLayout } from "@/shared/AppLayout";
import { MapContainer, TileLayer } from "react-leaflet";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("@/features/Map"), { ssr: false });

export default function Home() {
  return (
    <AppLayout>
      <Map />
    </AppLayout>
  );
}
