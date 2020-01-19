
const fs = require('fs');
const path = require('path');
const walkSync = (ref, filter) => {
    const list = item => walkSync(path.join(ref, item), filter);
    if(fs.statSync(ref).isDirectory()) {
        return fs.readdirSync(ref).flatMap(list);
    }
    if(typeof filter !== 'function' || filter(ref)) {
        return [ref]; 
    }
    return [];
};
const copy = function(ref) {
    const { src, dest, modify } = this;
    const read = () => fs.readFileSync(ref, 'utf8');
    if(!dest) {
        return { content: modify ? modify(read()) : read() };
    }
    const target = ref.replace(src, dest);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    if (modify) {
        const content = modify(read());
        fs.writeFileSync(target, content, 'utf8');
        return { target, content };
    }
    fs.copyFileSync(ref, target);
    return { target };
};

module.exports = (src, dir, dest, filter, modify) => {
    const keys = walkSync(path.join(__dirname, src, dir), filter);
    const values = keys.map(copy, { modify, src, dest });
    const assign = (key, idx) => [key, values[idx]];
    return Object.fromEntries(keys.map(assign));
};