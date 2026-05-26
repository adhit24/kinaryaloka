import fs from 'fs'
import path from 'path'

function copyDir(src, dest) {
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true })
  for (const file of fs.readdirSync(src)) {
    const srcPath = path.join(src, file)
    const destPath = path.join(dest, file)
    fs.statSync(srcPath).isDirectory()
      ? copyDir(srcPath, destPath)
      : fs.copyFileSync(srcPath, destPath)
  }
}

copyDir('Assets', 'dist/Assets')
console.log('Assets copied to dist/Assets')
