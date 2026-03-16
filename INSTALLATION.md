# Installation Guide

## Prerequisites

### System Requirements
- **Node.js**: v18 or higher
- **npm**: v9 or higher (comes with Node.js)
- **Operating System**: Linux, macOS, or Windows

## Installation Steps

### 1. Install Node.js and npm (if not already installed)

#### On Ubuntu/Debian:
```bash
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt install -y nodejs
```

#### On macOS:
```bash
brew install node
```

#### On Windows:
Download from [nodejs.org](https://nodejs.org/)

### 2. Verify Installation
```bash
node --version   # Should show v18.x or higher
npm --version    # Should show v9.x or higher
```

### 3. Install Project Dependencies
```bash
cd /home/adarsh/pharma-poc
npm install
```

This will install all required packages listed in `package.json`:
- react (^18.2.0)
- react-dom (^18.2.0)
- recharts (^2.10.3)
- lucide-react (^0.294.0)
- clsx (^2.0.0)
- vite (^5.0.8)
- @vitejs/plugin-react (^4.2.1)
- tailwindcss (^3.3.6)
- autoprefixer (^10.4.16)
- postcss (^8.4.32)

### 4. Start Development Server
```bash
npm run dev
```

The application will be available at: **http://localhost:3000**

### 5. Build for Production (Optional)
```bash
npm run build
npm run preview
```

## Troubleshooting

### Issue: "npm: command not found"
**Solution**: Install Node.js and npm first (see step 1)

### Issue: Port 3000 already in use
**Solution**: 
- Stop other processes using port 3000, or
- Edit `vite.config.js` to use a different port

### Issue: Module not found errors
**Solution**: 
```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: Permission errors
**Solution**: 
```bash
sudo chown -R $USER:$USER /home/adarsh/pharma-poc
```

## Quick Start (All-in-One)

If you have Node.js installed:
```bash
cd /home/adarsh/pharma-poc
npm install
npm run dev
```

Then open **http://localhost:3000** in your browser.

## Project Structure
```
pharma-poc/
├── node_modules/          # Dependencies (auto-generated)
├── src/                   # Source code
│   ├── components/        # React components
│   ├── data/             # Synthetic data
│   ├── App.jsx           # Main app
│   ├── main.jsx          # Entry point
│   └── index.css         # Global styles
├── package.json          # Dependencies list
├── vite.config.js        # Build configuration
└── tailwind.config.js    # Styling configuration
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Dependencies Overview

### Production Dependencies
- **react** - UI framework
- **react-dom** - React DOM renderer
- **recharts** - Data visualization library
- **lucide-react** - Icon library
- **clsx** - Utility for conditional classNames

### Development Dependencies
- **vite** - Build tool and dev server
- **@vitejs/plugin-react** - React plugin for Vite
- **tailwindcss** - CSS framework
- **autoprefixer** - PostCSS plugin
- **postcss** - CSS processor
