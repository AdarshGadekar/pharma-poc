# Clinical Intelligence Platform - Patient Journey Analytics

A comprehensive, story-driven pharmaceutical analytics platform featuring synthetic patient data, detailed visualizations, and predictive insights across multiple therapeutic areas.

## 🎯 Features

- **Patient Journey Stories**: Follow real patient experiences through treatment with clinical outcomes and biomarkers
- **Drug Performance Analytics**: Comprehensive efficacy, safety, and cost-effectiveness analysis
- **Biomarker Intelligence**: Predictive biomarkers driving precision medicine strategies
- **Interactive Visualizations**: Detailed charts showing survival curves, response rates, and clinical trends
- **Synthetic Data**: Fully fabricated patient data across 4 therapeutic areas (Oncology, Neurology, Cardiology, Immunology)

## 📊 Therapeutic Areas Covered

1. **Oncology** - HER2+ Breast Cancer with targeted therapy
2. **Neurology** - Multiple Sclerosis with B-cell depletion therapy
3. **Cardiology** - Heart Failure with combination therapy
4. **Immunology** - Rheumatoid Arthritis with JAK inhibitors

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm, yarn, or pnpm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The application will open at `http://localhost:3000`

### Build for Production

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
pharma-poc/
├── src/
│   ├── components/
│   │   ├── Dashboard.jsx              # Overview dashboard
│   │   ├── PatientJourneyView.jsx     # Patient stories & timelines
│   │   ├── DrugPerformanceView.jsx    # Drug efficacy & safety
│   │   └── BiomarkerInsightsView.jsx  # Biomarker analytics
│   ├── data/
│   │   └── syntheticData.js           # All synthetic clinical data
│   ├── App.jsx                        # Main application
│   ├── main.jsx                       # Entry point
│   └── index.css                      # Global styles
├── index.html
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## 📈 Data Overview

### Patient Journeys (4 detailed stories)
- **PT-2847-A**: 58yo female with HER2+ breast cancer - 67% tumor reduction
- **PT-1923-B**: 45yo male with MS - 14 months relapse-free
- **PT-3156-C**: 62yo male with heart failure - EF improved from 28% to 38%
- **PT-1654-D**: 34yo female with RA - achieved clinical remission in 5 months

### Drug Performance Data
- Trastuzumab + Pertuzumab (HER2+ Breast Cancer)
- Ocrelizumab (Relapsing-Remitting MS)
- ARNI + SGLT2i Combination (Heart Failure)
- Upadacitinib (Rheumatoid Arthritis)

### Biomarkers Tracked
- HER2 Amplification
- CD20+ B-cells
- NT-proBNP
- Anti-CCP Antibodies

### Key Metrics
- **9,580** total patients across all studies
- **68** active clinical studies
- **136** biomarkers tracked
- **94.7%** data completeness

## 🎨 Technology Stack

- **Frontend**: React 18 with Vite
- **Styling**: TailwindCSS
- **Charts**: Recharts
- **Icons**: Lucide React

## 📊 Visualizations Included

- Survival curves (observed vs AI-predicted)
- Treatment response timelines
- Biomarker trends over time
- Adverse event profiles
- Cost-effectiveness analysis
- Population demographics
- Radar charts for drug comparison
- Scatter plots for biomarker utility

## 🎭 Storytelling Approach

Unlike traditional technical dashboards, this platform emphasizes:
- **Narrative-driven patient journeys** with real stories
- **Clinical context** for every metric
- **Predictive outcomes** with AI confidence scores
- **Quality of life improvements** alongside clinical metrics
- **Real-world evidence** comparisons

## 📝 Notes

- All data is **100% synthetic** and fabricated for demonstration purposes
- Patient stories are fictional but clinically realistic
- Biomarker values and drug responses are simulated
- No real patient data or PHI is included

## 🔮 Future Enhancements

- Real-time data integration
- Advanced ML predictions
- Comparative effectiveness research
- Patient cohort builder
- Export functionality for reports

## 📄 License

This is a demonstration project with synthetic data for educational purposes.
