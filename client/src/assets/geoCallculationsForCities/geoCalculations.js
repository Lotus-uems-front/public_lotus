const ref1 = { pixelX: 562, pixelY: 115, lat: 59.95, lon: 30.31667 };
const ref2 = { pixelX: 792, pixelY: 296, lat: 55.16222, lon: 61.40306 };

const latScale = (ref2.pixelY - ref1.pixelY) / (ref2.lat - ref1.lat);
const lonScale = (ref2.pixelX - ref1.pixelX) / (ref2.lon - ref1.lon);

export function geoToPixel(lat, lon, mapRect) {
    // const x = ref1.pixelX + (lon - ref1.lon) * lonScale;
    // const y = ref1.pixelY + (lat - ref1.lat) * latScale;
    // return { x, y };
    const x = ref1.pixelX + (lon - ref1.lon) * lonScale - mapRect.left;
    const y = ref1.pixelY + (lat - ref1.lat) * latScale - mapRect.top;
    return { x, y };

    // const x = ref1.pixelX + (lon - ref1.lon) * lonScale;
    // const y = ref1.pixelY + (lat - ref1.lat) * latScale;
    // return { x, y };

}