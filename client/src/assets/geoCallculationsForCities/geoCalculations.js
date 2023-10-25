
// Your reference points
const ref1 = { pixelX: 173, pixelY: 318, lat: 59.95, lon: 30.31667 };
const ref2 = { pixelX: 302, pixelY: 571, lat: 55.16222, lon: 61.40306 };

// Original calculated scales
const originalLatScale = (ref2.pixelY - ref1.pixelY) / (ref2.lat - ref1.lat);
const originalLonScale = (ref2.pixelX - ref1.pixelX) / (ref2.lon - ref1.lon);

// Manual adjustment factors
const adjustmentFactorLat = 0.55
const adjustmentFactorLon = 1.01

// Adjusted scales using the adjustment factors
const adjustedLatScale = originalLatScale * adjustmentFactorLat;
const adjustedLonScale = originalLonScale * adjustmentFactorLon;

// Function to convert geo-coordinates to pixels
export function geoToPixel(lat, lon) {
    const x = ref1.pixelX + (lon - ref1.lon) * adjustedLonScale;
    const y = ref1.pixelY + (lat - ref1.lat) * adjustedLatScale;
    return { x, y };
}

// const ref1 = { pixelX: 170, pixelY: 310, lat: 59.95, lon: 30.31667 };
// const ref2 = { pixelX: 302, pixelY: 571, lat: 55.16222, lon: 61.40306 };


// const latScale = (ref2.pixelY - ref1.pixelY) / (ref2.lat - ref1.lat)
// const lonScale = (ref2.pixelX - ref1.pixelX) / (ref2.lon - ref1.lon)
// const originalLatScale = (ref2.pixelY - ref1.pixelY) / (ref2.lat - ref1.lat);

// // original!
// // const latScale = (ref2.pixelY - ref1.pixelY) / (ref2.lat - ref1.lat);
// // const lonScale = (ref2.pixelX - ref1.pixelX) / (ref2.lon - ref1.lon);


// const adjustmentFactor = 0.45;  // Increase latScale by 5%
// const adjustedLatScale = latScale * adjustmentFactor;

// export function geoToPixel(lat, lon) {
//     // console.log(lonScale);
//     // const x = ref1.pixelX + (lon - ref1.lon) * lonScale;
//     // const y = ref1.pixelY + (lat - ref1.lat) * latScale
//     // return { x, y };

//     const x = ref1.pixelX + (lon - ref1.lon) * lonScale;
//     const y = ref1.pixelY + (lat - ref1.lat) * adjustedLatScale;
//     return { x, y };
// }

// const mapOriginalWidth = 1200/* original width of your map image */;
// const mapOriginalHeight = 650/* original height of your map image */;
// const divWidth = 700;  // as per your CSS

// const scaledMapHeight = (divWidth * mapOriginalHeight) / mapOriginalWidth;
// const verticalOffset = 0;

// export function geoToPixel(lat, lon, mapRect) {
//     // const x = ref1.pixelX + (lon - ref1.lon) * lonScale;
//     // const y = ref1.pixelY + (lat - ref1.lat) * latScale;
//     // return { x, y };

//     // const x = ref1.pixelX + (lon - ref1.lon) * lonScale - mapRect.left;
//     // const y = ref1.pixelY + (lat - ref1.lat) * latScale - mapRect.top;
//     // return { x, y };

//     // const x = ref1.pixelX + (lon - ref1.lon) * lonScale;
//     // const y = ref1.pixelY + (lat - ref1.lat) * latScale;
//     // return { x, y };

//     const x = ref1.pixelX + (lon - ref1.lon) * lonScale;
//     const y = ref1.pixelY + (lat - ref1.lat) * latScale - verticalOffset;
//     return { x, y };

// }

