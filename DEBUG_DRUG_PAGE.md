# Drug Performance Page Debug Guide

## Issue: Page Goes Blank After 3-4 Seconds

**Symptom:** Drug Performance page loads initially, then goes blank after 3-4 seconds.

**Root Cause:** Likely a JavaScript error in the DrugForecastPanel component when it tries to load AI predictions.

---

## Fixes Applied:

### 1. **Added Error Handling to DrugForecastPanel**
- Added `error` state to catch and display errors gracefully
- Added fallback forecast data to prevent blank page
- Added error UI to show when AI forecast fails

### 2. **Added Defensive Programming to aiForecasting.js**
- Validates drugData before processing
- Handles missing responseRate data
- Uses optional chaining (?.) to prevent undefined errors
- Always returns valid forecast object

### 3. **Added Safety Check in DrugPerformanceView**
- Wrapped DrugForecastPanel in conditional render
- Ensures selectedDrug exists before rendering

---

## How to Debug:

### **Step 1: Open Browser Console**
1. Press **F12** in your browser
2. Go to **Console** tab
3. Navigate to Drug Performance page
4. Watch for errors when page goes blank

### **Step 2: Check for Common Errors**

**Look for:**
- `Cannot read property 'responseRate' of undefined`
- `Cannot read property 'twoYear' of undefined`
- OpenAI API errors
- Network errors

### **Step 3: Test with Console Open**
1. Refresh page
2. Click Drug Performance tab
3. Watch console for 5 seconds
4. Note any errors that appear

---

## Expected Behavior Now:

### **If OpenAI Works:**
- Page loads
- Shows "Analyzing drug efficacy data..." for 2-4 seconds
- Shows AI-generated forecast with GPT-4 predictions
- Page stays loaded

### **If OpenAI Fails:**
- Page loads
- Shows "Analyzing drug efficacy data..." for 2-4 seconds
- Shows "AI Forecast Unavailable" message (amber box)
- Page stays loaded with rule-based forecast

### **If Data is Missing:**
- Page loads
- Shows forecast with 0 values
- Page stays loaded (doesn't crash)

---

## Test Checklist:

- [ ] Page loads initially
- [ ] Drug selection cards visible
- [ ] Metric cards show data
- [ ] Charts render correctly
- [ ] AI forecast panel appears (or shows error)
- [ ] Page doesn't go blank
- [ ] No console errors
- [ ] Can switch between drugs

---

## If Still Blank:

### **Check Console for:**
1. **Syntax errors** - Missing brackets, parentheses
2. **Import errors** - Missing components
3. **Data errors** - Undefined properties
4. **OpenAI errors** - API key issues

### **Quick Fixes:**

**If OpenAI is causing issues:**
```bash
# Remove API key temporarily
# Edit .env file:
# VITE_OPENAI_API_KEY=
# (leave it empty)

# Restart server
npm run dev
```

**If still failing:**
```bash
# Check for syntax errors
npm run build

# If build fails, it will show the error
```

---

## Files Modified:

1. **src/components/DrugForecastPanel.jsx**
   - Added error state
   - Added error handling in loadForecast()
   - Added error UI component
   - Added fallback forecast data

2. **src/services/aiForecasting.js**
   - Added drugData validation
   - Added defensive null checks
   - Added optional chaining
   - Improved error handling

3. **src/components/DrugPerformanceView.jsx**
   - Added conditional render for DrugForecastPanel

---

## Next Steps:

1. **Restart dev server** (already done)
2. **Open browser console** (F12)
3. **Navigate to Drug Performance page**
4. **Watch console for errors**
5. **Share any error messages** you see

The page should now stay loaded even if AI forecast fails!
