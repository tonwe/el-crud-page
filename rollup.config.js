import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import scss from 'rollup-plugin-scss';
import vue from 'rollup-plugin-vue';

const production = !process.env.ROLLUP_WATCH;

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: 'dist/index.esm.js',
      format: 'es',
      sourcemap: true,
    },
    {
      file: 'dist/index.umd.js',
      format: 'umd',
      name: 'ElCrudPage',
      sourcemap: true,
      globals: {
        vue: 'Vue',
        'element-ui': 'ELEMENT',
      },
    },
  ],
  external: ['vue', 'element-ui'],
  plugins: [
    vue({
      css: true,
      compileTemplate: true,
    }),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
      extensions: ['.js', '.jsx', '.vue'],
    }),
    resolve({
      browser: true,
      preferBuiltins: false,
      extensions: ['.js', '.jsx', '.vue'],
    }),
    commonjs(),
    scss({
      insert: true,  // 将CSS内联到JS中
      sourceMap: true,
    }),
  ],
};