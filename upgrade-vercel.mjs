import { execSync } from 'child_process';
try {
  const result = execSync('npm install vercel@latest --save-dev', { cwd: 'D:\\龙虾\\QClaw\\workspace\\carelong-website', encoding: 'utf8' });
  console.log(result);
} catch (e) {
  console.error(e.stdout || e.message);
}