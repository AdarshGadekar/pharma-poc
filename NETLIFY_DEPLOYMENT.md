# Netlify Deployment Guide

**Platform:** Clinical Intelligence Platform  
**Framework:** React + Vite  
**Time to Deploy:** 3-5 minutes

---

## 🚀 **METHOD 1: Netlify CLI (Recommended)**

### **Step 1: Install Netlify CLI**
```bash
npm install -g netlify-cli
```

### **Step 2: Login to Netlify**
```bash
netlify login
```
This will open a browser window - authorize the CLI.

### **Step 3: Build the Project**
```bash
cd /home/adarsh/pharma-poc
npm run build
```
This creates a `dist` folder with your production build.

### **Step 4: Deploy**
```bash
netlify deploy --prod
```

**Follow the prompts:**
- Create & configure a new site? **Yes**
- Team: Select your team
- Site name: `clinical-intelligence` (or your choice)
- Publish directory: `dist`

**Done!** You'll get a URL like: `https://clinical-intelligence.netlify.app`

### **Step 5: Add Environment Variables**
```bash
# Go to Netlify dashboard
# Site settings → Environment variables → Add variable
# Key: VITE_OPENAI_API_KEY
# Value: your-openai-key

# Then redeploy
netlify deploy --prod
```

---

## 🚀 **METHOD 2: Netlify Dashboard (Drag & Drop)**

### **Step 1: Build the Project**
```bash
cd /home/adarsh/pharma-poc
npm run build
```

### **Step 2: Go to Netlify**
1. Visit https://app.netlify.com
2. Click "Add new site" → "Deploy manually"

### **Step 3: Drag & Drop**
1. Drag the `dist` folder to the upload area
2. Wait for deployment (30-60 seconds)
3. Get your URL!

### **Step 4: Add Environment Variables**
1. Site settings → Environment variables
2. Add `VITE_OPENAI_API_KEY` = `your-key`
3. Trigger redeploy

---

## 🚀 **METHOD 3: GitHub Integration (Best for Continuous Deployment)**

### **Step 1: Push to GitHub**
```bash
cd /home/adarsh/pharma-poc

# Initialize git (if not already)
git init
git add .
git commit -m "Initial commit"

# Create repo on GitHub, then:
git remote add origin https://github.com/yourusername/pharma-poc.git
git branch -M main
git push -u origin main
```

### **Step 2: Connect to Netlify**
1. Go to https://app.netlify.com
2. Click "Add new site" → "Import an existing project"
3. Choose "GitHub"
4. Select your repository
5. Configure build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
6. Click "Deploy site"

### **Step 3: Add Environment Variables**
1. Site settings → Environment variables
2. Add `VITE_OPENAI_API_KEY`
3. Trigger redeploy

### **Step 4: Auto-Deploy**
Now every time you push to GitHub, Netlify auto-deploys! 🎉

---

## 📋 **BUILD CONFIGURATION**

Create `netlify.toml` in project root for advanced config:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

This ensures:
- Correct build command
- Correct publish directory
- SPA routing works (redirects to index.html)

---

## 🔒 **ENVIRONMENT VARIABLES**

### **Add via Dashboard:**
1. Site settings → Environment variables
2. Click "Add a variable"
3. Key: `VITE_OPENAI_API_KEY`
4. Value: `sk-proj-your-key-here`
5. Scopes: All (or Production only)
6. Save

### **Add via CLI:**
```bash
netlify env:set VITE_OPENAI_API_KEY "sk-proj-your-key-here"
```

### **⚠️ Important:**
- Never commit `.env` to GitHub
- Add environment variables in Netlify dashboard
- Redeploy after adding variables

---

## 🌐 **CUSTOM DOMAIN**

### **Add Custom Domain:**
1. Site settings → Domain management
2. Click "Add custom domain"
3. Enter domain: `clinical-intelligence.jazzpharma.com`
4. Follow DNS configuration instructions
5. SSL automatically provisioned

**DNS Records (example):**
```
Type: CNAME
Name: clinical-intelligence
Value: your-site.netlify.app
```

---

## 📊 **DEPLOYMENT STATUS**

After deployment, check:
- ✅ Site is live
- ✅ Environment variables set
- ✅ HTTPS enabled
- ✅ Custom domain (if added)

**Test checklist:**
1. Visit site URL
2. Navigate to all 4 tabs
3. Test AI predictions (check console for errors)
4. Verify OpenAI integration working

---

## 🔧 **TROUBLESHOOTING**

### **Issue: Build Fails**
```bash
# Check build locally first
npm run build

# If successful locally, check Netlify build logs
# Common issues:
# - Missing dependencies
# - Node version mismatch
# - Environment variables not set
```

### **Issue: Site is Blank**
```bash
# Check publish directory is "dist" not "build"
# Check netlify.toml redirects
# Check browser console for errors
```

### **Issue: Environment Variables Not Working**
```bash
# Must start with VITE_ for Vite
# Must redeploy after adding variables
# Check scopes (Production/All)
```

### **Issue: OpenAI Not Working**
```bash
# Check API key is correct
# Check VITE_OPENAI_API_KEY is set
# Check browser console for errors
# Verify API key has credits
```

---

## 💰 **NETLIFY PRICING**

**Free Tier Includes:**
- 100GB bandwidth/month
- 300 build minutes/month
- Unlimited sites
- HTTPS/SSL
- Custom domains
- Environment variables
- Form handling
- Analytics (basic)

**Perfect for demos and POCs!**

---

## 📈 **ANALYTICS**

Netlify provides built-in analytics:
- Page views
- Unique visitors
- Top pages
- Bandwidth usage

Access: Site → Analytics

---

## 🚀 **QUICK DEPLOY COMMANDS**

```bash
# One-time setup
npm install -g netlify-cli
netlify login

# Every deployment
npm run build
netlify deploy --prod

# Or with GitHub integration
git add .
git commit -m "Update"
git push
# Auto-deploys!
```

---

## ✅ **POST-DEPLOYMENT CHECKLIST**

- [ ] Site is live and accessible
- [ ] All 4 tabs working (Overview, Patient Journeys, Drug Performance, Biomarker Insights)
- [ ] AI predictions loading (check each view)
- [ ] OpenAI API key configured
- [ ] HTTPS enabled
- [ ] Custom domain configured (if needed)
- [ ] Environment variables set
- [ ] No console errors
- [ ] Mobile responsive
- [ ] Fast loading (<3 seconds)

---

## 🎯 **RECOMMENDED WORKFLOW**

**For Jazz Pharma Demo:**

1. **Deploy via CLI** (fastest)
   ```bash
   npm run build
   netlify deploy --prod
   ```

2. **Add environment variables** in dashboard

3. **Test thoroughly**

4. **Share URL** with stakeholders

5. **Set up GitHub integration** for future updates

**Total time:** 5 minutes

---

## 📞 **SUPPORT**

**Netlify:**
- Docs: https://docs.netlify.com
- Community: https://answers.netlify.com
- Support: support@netlify.com

**Common Issues:**
- Build fails: Check Node version (use 18+)
- Blank page: Check publish directory is `dist`
- 404 errors: Add redirects in netlify.toml
- Env vars not working: Must start with `VITE_`

---

## 🎉 **YOU'RE READY!**

Your app is production-ready and optimized for Netlify deployment.

**Just run:**
```bash
npm run build
netlify deploy --prod
```

**And you're live!** 🚀

**Expected URL:** `https://clinical-intelligence.netlify.app`
