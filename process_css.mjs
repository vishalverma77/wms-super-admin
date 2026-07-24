import fs from 'fs';
import postcss from 'postcss';
import prefixer from 'postcss-prefix-selector';

const inputCss = fs.readFileSync('C:\\Users\\Dell\\wms-web-fe\\src\\index.css', 'utf8');

const outCss = postcss()
  .use(prefixer({
    prefix: '#super-admin-scope',
    exclude: [':root'], // don't prefix :root
    transform: function (prefix, selector, prefixedSelector) {
      if (selector === 'html' || selector === 'body' || selector === '#root') {
        return `#super-admin-scope`;
      }
      return prefixedSelector;
    }
  }))
  .process(inputCss)
  .css;

fs.writeFileSync('src/super-admin/styles/wms-theme.css', outCss);
console.log('CSS processed and saved!');
