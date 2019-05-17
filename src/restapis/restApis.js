import axios from "axios";
const API = "http://localhost:3004";
export function postHouse(
  name,
  humidity,
  outsideTemp,
  avgHouseTemp,
  address,
  country,
  city,
  lat,
  lng
) {
  let url = API;
  return axios.post(url.concat("/houses"), {
    name: name,
    lat: lat,
    lng: lng,
    address: address,
    country: country,
    city: city,
    humidity: humidity,
    outsideTemp: outsideTemp,
    avgHouseTemp: avgHouseTemp
  });
}

export function fetchApplianceTypes() {
  let url = API;
  return axios.get(url.concat("/applianceTypes"));
}

export function postRoom(name, humidity, roomTemp, houseId) {
  let url = API;
  return axios.post(url.concat("/rooms"), {
    name: name,
    humidity: humidity,
    roomTemp: roomTemp,
    houseId: houseId
  });
}

export function postApp(onOff, tag, type, temperature, roomId) {
  let url = API;
  return axios.post(url.concat("/appliances"), {
    onOff: onOff,
    tag: tag,
    type: type,
    temperature: temperature,
    roomId: roomId
  });
}

export function editHouse(house, name) {
  let url = API;
  return axios.put(url.concat(`/houses/${house.id}`), {
    name: name,
    lat: house.lat,
    lng: house.lng,
    address: house.address,
    country: house.country,
    city: house.city,
    humidity: house.humidity,
    outsideTemp: house.outsideTemp,
    avgHouseTemp: house.avgHouseTemp
  });
}

export function retrieveHouse(houseId) {
  let url = API;

  return axios.get(url.concat(`/houses?id=${houseId}`));
}
export function retrieveHousesBySearchKey(key) {
  let url = API;

  return axios.get(url.concat(`/houses?q=${key}`));
}
export function retrieveHouses() {
  let url = API;

  return axios.get(url.concat(`/houses`));
}
export function retrieveRooms(houseId) {
  let url = API;

  return axios.get(url.concat(`/rooms?houseId=${houseId}`));
}

export function retrieveAppliances(roomId) {
  let url = API;

  return axios.get(url.concat(`/appliances?roomId=${roomId}`));
}

export function retrieveRoom(roomId) {
  let url = API;

  return axios.get(url.concat(`/rooms?id=${roomId}`));
}

export function fetchAppliances(roomId) {
  let url = API;

  return axios.get(url.concat(`/appliances?roomId=${roomId}`));
}

export function putRoom(room, name, houseId) {
  let url = API;
  return axios.put(url.concat(`/rooms/${room.id}`), {
    name: name,
    humidity: room.humidity,
    roomTemp: room.roomTemp,
    houseId: houseId
  });
}
export function deleteAppliance(appId) {
  let url = API;
  return axios.delete(url.concat(`/appliances/${appId}`));
}
export function deleteRoom(roomId) {
  let url = API;
  return axios.delete(url.concat(`/rooms/${roomId}`));
}
export function deleteHouse(houseId) {
  let url = API;
  return axios.delete(url.concat(`/houses/${houseId}`));
}
export function putAppliance(appliance, name, roomId) {
  let url = API;
  return axios.put(url.concat(`/appliances/${appliance.id}`), {
    onOff: appliance.onOff,
    temperature: appliance.temperature,
    tag: name,
    type: appliance.type,
    roomId: roomId
  });
}
export function putApplianceProperty(appliance, onOff, temperature, roomId) {
  let url = API;
  return axios.put(url.concat(`/appliances/${appliance.id}`), {
    onOff: onOff,
    temperature: temperature,
    tag: appliance.tag,
    type: appliance.type,
    roomId: roomId
  });
}
