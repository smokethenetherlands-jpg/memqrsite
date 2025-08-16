// scripts/patch.js
// Usage: node scripts/patch.js
// Patches app/page.tsx to wire up the existing form to Netlify function
import fs from 'fs';
import path from 'path';

const target = path.join(process.cwd(), 'app', 'page.tsx');
if (!fs.existsSync(target)) {
  console.error('Не найден app/page.tsx — запусти из корня проекта.');
  process.exit(1);
}

let src = fs.readFileSync(target, 'utf8');

// 1) Add import if missing
if (!src.includes("BindExistingForm")) {
  // try to keep alias @/
  const hasAlias = src.includes("from '@/");
  const importLine = hasAlias
    ? "import BindExistingForm from '@/components/BindExistingForm';\n"
    : "import BindExistingForm from '../components/BindExistingForm';\n";
  // put after first import
  const m = src.match(/import .+?;\s*\n/);
  if (m) {
    src = src.replace(m[0], m[0] + importLine);
  } else {
    src = importLine + src;
  }
}

// 2) Ensure id="contactForm" on first <form ...>
if (!/id\s*=\s*["']contactForm["']/.test(src)) {
  src = src.replace(/<form([^>]*?)>/, (full, attrs) => `<form id="contactForm"${attrs}>`);
}

// 3) Insert <BindExistingForm /> after the first closing </form>
if (!src.includes('<BindExistingForm />')) {
  src = src.replace('</form>', '</form>\n      <BindExistingForm />');
}

fs.writeFileSync(target, src, 'utf8');
console.log('✔ Патч применён: app/page.tsx обновлён.');
