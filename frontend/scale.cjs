const fs = require('fs');
const path = require('path');

const stylesDir = path.join('c:', 'arsham', 'TY', 'EDUAI', 'frontend', 'src', 'styles');
const files = fs.readdirSync(stylesDir).filter(f => f.endsWith('.css'));

files.forEach(file => {
    const filePath = path.join(stylesDir, file);
    let css = fs.readFileSync(filePath, 'utf8');

    // We are going to replace font-size: Xpx 
    // only if X is between 6 and 28 to scale small text up.
    css = css.replace(/font-size:\s*(\d+)px/g, (match, p1) => {
        let size = parseInt(p1);
        if (size >= 6 && size <= 28) {
            return `font-size: ${size + 3}px`;
        }
        return match;
    });

    fs.writeFileSync(filePath, css);
});

console.log('Font scaling executed across:', files);
