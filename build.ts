import s from 'shelljs';
import config from './tsconfig-build.json';
const outDir = config.compilerOptions.outDir;

s.rm('-rf', outDir);
s.mkdir(outDir);
