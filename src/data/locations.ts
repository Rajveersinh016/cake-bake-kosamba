export interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  hours: string;
  mapUrl: string;
  isMain?: boolean;
}

export const locations: Location[] = [
  {
    id: "1",
    name: "Kosamba",
    address: "Demo content — address to be confirmed by client",
    city: "Kosamba, Gujarat",
    phone: "+91 00000 00000",
    hours: "9:00 AM – 9:00 PM",
    mapUrl: "https://maps.app.goo.gl/RgSEFzdXEE2QFVHb8",
    isMain: true,
  },
  {
    id: "2",
    name: "Sayan",
    address: "Demo content — address to be confirmed by client",
    city: "Sayan, Gujarat",
    phone: "+91 00000 00000",
    hours: "9:00 AM – 9:00 PM",
    mapUrl: "https://maps.app.goo.gl/RgSEFzdXEE2QFVHb8",
  },
  {
    id: "3",
    name: "Valia",
    address: "Demo content — address to be confirmed by client",
    city: "Valia, Gujarat",
    phone: "+91 00000 00000",
    hours: "9:00 AM – 9:00 PM",
    mapUrl: "https://maps.app.goo.gl/RgSEFzdXEE2QFVHb8",
  },
  {
    id: "4",
    name: "Andada",
    address: "Demo content — address to be confirmed by client",
    city: "Andada, Gujarat",
    phone: "+91 00000 00000",
    hours: "9:00 AM – 9:00 PM",
    mapUrl: "https://maps.app.goo.gl/RgSEFzdXEE2QFVHb8",
  },
  {
    id: "5",
    name: "Ankleshwar",
    address: "Demo content — address to be confirmed by client",
    city: "Ankleshwar, Gujarat",
    phone: "+91 00000 00000",
    hours: "9:00 AM – 9:00 PM",
    mapUrl: "https://maps.app.goo.gl/RgSEFzdXEE2QFVHb8",
  },
];
