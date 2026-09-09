import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

function createPng(width, height, rBg, gBg, bBg, rFg, gFg, bFg) {
  // Uncompressed RGBA scanlines: 1 filter byte (0) per row + width * 4 bytes
  const rowSize = 1 + width * 4;
  const rawData = Buffer.alloc(rowSize * height);

  for (let y = 0; y < height; y++) {
    const rowOffset = y * rowSize;
    rawData[rowOffset] = 0; // Filter None

    for (let x = 0; x < width; x++) {
      const pxOffset = rowOffset + 1 + x * 4;
      
      // Draw dumbbell / lightning badge shape in center
      const cx = width / 2;
      const cy = height / 2;
      const dx = (x - cx) / (width * 0.4);
      const dy = (y - cy) / (height * 0.4);
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Barbell shape logic: horizontal bar or weights
      const isBar = Math.abs(y - cy) < height * 0.04 && Math.abs(x - cx) < width * 0.35;
      const isPlateLeft = Math.abs(x - (cx - width * 0.28)) < width * 0.05 && Math.abs(y - cy) < height * 0.22;
      const isPlateRight = Math.abs(x - (cx + width * 0.28)) < width * 0.05 && Math.abs(y - cy) < height * 0.22;
      const isPlateLeftInner = Math.abs(x - (cx - width * 0.20)) < width * 0.04 && Math.abs(y - cy) < height * 0.17;
      const isPlateRightInner = Math.abs(x - (cx + width * 0.20)) < width * 0.04 && Math.abs(y - cy) < height * 0.17;
      const isRing = dist > 0.82 && dist < 0.96;

      if (isRing || isBar || isPlateLeft || isPlateRight || isPlateLeftInner || isPlateRightInner) {
        rawData[pxOffset] = rFg;
        rawData[pxOffset + 1] = gFg;
        rawData[pxOffset + 2] = bFg;
        rawData[pxOffset + 3] = 255;
      } else {
        rawData[pxOffset] = rBg;
        rawData[pxOffset + 1] = gBg;
        rawData[pxOffset + 2] = bBg;
        rawData[pxOffset + 3] = 255;
      }
    }
  }

  const deflated = zlib.deflateSync(rawData);

  // PNG Header
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR Chunk
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // Bit depth
  ihdr[9] = 6; // Color type RGBA
  ihdr[10] = 0; // Compression
  ihdr[11] = 0; // Filter
  ihdr[12] = 0; // Interlace

  const ihdrChunk = makeChunk('IHDR', ihdr);
  const idatChunk = makeChunk('IDAT', deflated);
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

function makeChunk(type, data) {
  const len = data.length;
  const chunk = Buffer.alloc(8 + len + 4);
  chunk.writeUInt32BE(len, 0);
  chunk.write(type, 4, 4, 'ascii');
  data.copy(chunk, 8);

  const crcData = chunk.subarray(4, 8 + len);
  const crc = crc32(crcData);
  chunk.writeInt32BE(crc, 8 + len);
  return chunk;
}

// CRC32 table
const crcTable = new Int32Array(256);
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    if (c & 1) c = 0xedb88320 ^ (c >>> 1);
    else c = c >>> 1;
  }
  crcTable[n] = c;
}

function crc32(buf) {
  let c = -1;
  for (let i = 0; i < buf.length; i++) {
    c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  }
  return c ^ -1;
}

const outDir = path.resolve(process.cwd(), 'public/icons');
fs.mkdirSync(outDir, { recursive: true });

// Dark: #0a0a0a (10, 10, 10), Accent: #ccff00 (204, 255, 0)
const png192 = createPng(192, 192, 10, 10, 10, 204, 255, 0);
fs.writeFileSync(path.join(outDir, 'icon-192.png'), png192);

const png512 = createPng(512, 512, 10, 10, 10, 204, 255, 0);
fs.writeFileSync(path.join(outDir, 'icon-512.png'), png512);

console.log('Successfully created PWA icons in public/icons!');
