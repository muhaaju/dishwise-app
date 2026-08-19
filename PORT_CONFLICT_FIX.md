# Fix Port 3000 Conflict

## Problem
Another application (caoc-self-service-ui) is already running on port 3000, preventing DishWise from starting.

## Solutions

### Option 1: Stop the Other Application (Recommended)

1. **Find the process using port 3000:**
```bash
lsof -ti:3000
```

2. **Kill the process:**
```bash
kill -9 $(lsof -ti:3000)
```

3. **Start DishWise:**
```bash
cd /Users/muhammedajas/Documents/IBM/Muhammed_Ajas/Dishwiser/dishwise-app
npm run dev
```

### Option 2: Use a Different Port for DishWise

1. **Create/edit `.env.local` file:**
```bash
cd /Users/muhammedajas/Documents/IBM/Muhammed_Ajas/Dishwiser/dishwise-app
nano .env.local
```

2. **Add this line:**
```env
PORT=3001
```

3. **Update package.json dev script:**
```json
{
  "scripts": {
    "dev": "next dev -p 3001"
  }
}
```

4. **Start DishWise on port 3001:**
```bash
npm run dev
```

5. **Access at:** http://localhost:3001

### Option 3: Stop the Other App via Terminal

If you see the nodemon process running:

1. **Press `Ctrl + C` in the terminal** where caoc-self-service-ui is running

2. **Or find and kill nodemon:**
```bash
pkill -f nodemon
```

3. **Then start DishWise:**
```bash
cd /Users/muhammedajas/Documents/IBM/Muhammed_Ajas/Dishwiser/dishwise-app
npm run dev
```

## Quick Commands

### Kill Port 3000 and Start DishWise
```bash
# Kill port 3000
kill -9 $(lsof -ti:3000)

# Navigate to DishWise
cd /Users/muhammedajas/Documents/IBM/Muhammed_Ajas/Dishwiser/dishwise-app

# Start development server
npm run dev
```

### Start DishWise on Port 3001
```bash
cd /Users/muhammedajas/Documents/IBM/Muhammed_Ajas/Dishwiser/dishwise-app
npm run dev -- -p 3001
```

## Verify DishWise is Running

After starting, you should see:
```
▲ Next.js 16.3.1
- Local:        http://localhost:3000 (or 3001)
- Network:      http://192.168.x.x:3000

✓ Ready in 2.3s
```

Then visit:
- http://localhost:3000 (or 3001) - Landing page
- http://localhost:3000/restaurants - Restaurant listing
- http://localhost:3000/restaurants/spice-garden - Restaurant detail

## Recommended: Use Different Ports for Different Projects

**caoc-self-service-ui:** Keep on port 3000
**DishWise:** Use port 3001

This way both can run simultaneously if needed.
