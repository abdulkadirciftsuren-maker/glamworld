const fs = require('fs');
const path = require('path');

const sayacYolu = path.join(__dirname, '../src/sayac.json');
const sayac = JSON.parse(fs.readFileSync(sayacYolu, 'utf-8'));

sayac.buildNumber += 1;
sayac.lastUpdated = new Date().toISOString().split('T')[0];

fs.writeFileSync(sayacYolu, JSON.stringify(sayac, null, 2) + '\n');

console.log('Sayac arttirildi: ' + sayac.version + '.B' + sayac.buildNumber);
