# Jazz Pharmaceuticals - Screenshot to Use Case Mapping

## Demo Context
Jazz Pharmaceuticals is running an observational, real-world study tracking patient outcomes over 12 months. They want to explore whether AI can estimate what outcomes might look like at year two. The demo presents this as **scientific hypothesis generation and outcome modeling**, not a finished clinical conclusion.

---

## User Story 1: Establish the Scientific Landscape

**Screen:** Overview Dashboard

**Demo Narrative:**
"Open with the dashboard showing 9,580 patients across 68 active studies with 136 biomarkers and an average 18.5-month follow-up. This establishes credibility — the platform isn't working from thin data; it has structured a rich, multi-dimensional dataset."

### Screenshot 1: KPI Panel
**Captures:** Top section of Dashboard
**Shows:**
- Time to Insight: 2.5 hrs (↓78%)
- Evidence Coverage: 12 databases
- Traceability: 100%
- Model Transparency: 95%
- Hypotheses Generated: 47

**Maps to talking point:**
> "Evidence coverage KPI — multiple therapeutic areas, patient populations, and biomarker profiles connected in a single view"

**How to use in demo:**
Show this first to establish the platform's value proposition immediately.

---

### Screenshot 2: Key Metrics Cards
**Captures:** 4 metric cards below KPI panel
**Shows:**
- Total Patients: 9,580
- Active Studies: 68
- Biomarkers Tracked: 136
- Avg Follow-up: 18.5 months

**Maps to narrative:**
> "9,580 patients across 68 active studies with 136 biomarkers and an average 18.5-month follow-up"

**How to use in demo:**
Point to these numbers to establish dataset credibility and scope.

---

### Screenshot 3: Therapeutic Area Cards
**Captures:** 4 therapeutic area cards (Oncology, Neurology, Cardiology, Immunology)
**Shows:**
- Each area's patient count
- Active trials per area
- Biomarkers tracked per area

**Maps to talking point:**
> "Multiple therapeutic areas, patient populations, and biomarker profiles connected in a single view"

**How to use in demo:**
Show diversity of the dataset across therapeutic areas.

---

### Screenshot 4: Patient Distribution Chart
**Captures:** Bar chart showing patients by therapeutic area
**Shows:**
- Visual representation of patient distribution
- Comparative volumes across areas

**Maps to narrative:**
> "The Patient Distribution charts show the diversity of the population, reinforcing that any downstream modeling reflects real-world heterogeneity"

**How to use in demo:**
Emphasize real-world heterogeneity in the dataset.

---

### Screenshot 5: Age Distribution Chart
**Captures:** Chart showing demographic breakdown
**Shows:**
- Age group distribution
- Population diversity

**Maps to narrative:**
> "Age Distribution charts show the diversity of the population, reinforcing that any downstream modeling reflects real-world heterogeneity"

**Maps to talking point:**
> "Data completeness at 94.7% signals that the dataset is robust enough to support modeling"

**How to use in demo:**
Reinforce that modeling is based on diverse, complete data.

---

## User Story 2: Explore Individual Patient Journeys Within the Study

**Screen:** Patient Journeys

**Demo Narrative:**
"Select patient PT-2847-A (HER2+ Breast Cancer, 58-year-old female, Stage IIIA). Walk through her 7-month treatment journey: Trastuzumab + Pertuzumab + Docetaxel, tumor shrinkage of 67%, biomarker profile (HER2 Score 3, ER/PR Positive, Ki67 28%), and adverse events (mild nausea resolved, fatigue ongoing, peripheral neuropathy resolved)."

### Screenshot 6: Patient Selection Cards
**Captures:** Patient cards showing PT-2847-A or similar
**Shows:**
- Patient ID
- Demographics (58F)
- Diagnosis (HER2+ Breast Cancer, Stage IIIA)
- Current status

**Maps to narrative:**
> "Select patient PT-2847-A (HER2+ Breast Cancer, 58-year-old female, Stage IIIA)"

**How to use in demo:**
Show patient selection interface and highlight the selected patient.

---

### Screenshot 7: Patient Header Section
**Captures:** Selected patient's header
**Shows:**
- Name/ID: PT-2847-A
- Age: 58, Gender: Female
- Diagnosis: HER2+ Breast Cancer
- Stage: IIIA
- Current Status: "Responding"

**Maps to narrative:**
> "58-year-old female, Stage IIIA"

**How to use in demo:**
Confirm patient details before diving into timeline.

---

### Screenshot 8: Treatment Timeline Chart
**Captures:** Line chart showing patient journey over time
**Shows:**
- Tumor size reduction (67% shrinkage)
- CA 15-3 biomarker levels
- Quality of life scores
- Month-over-month evolution

**Maps to narrative:**
> "Treatment Timeline chart shows how tumor size, CA 15-3, and quality of life evolved month over month"

**Maps to talking point:**
> "This is the type of longitudinal patient data that sits inside Jazz's observational study"

**How to use in demo:**
Walk through the 7-month journey, pointing to tumor shrinkage and biomarker trends.

---

### Screenshot 9: Biomarker Profile Section
**Captures:** Biomarker cards/panel
**Shows:**
- HER2 Score: 3
- ER/PR: Positive
- Ki67: 28%

**Maps to narrative:**
> "biomarker profile (HER2 Score 3, ER/PR Positive, Ki67 28%)"

**Maps to talking point:**
> "The platform structures it around patient variables and outcomes (step 2 of the proposed workflow)"

**How to use in demo:**
Show how biomarkers are structured and tracked for each patient.

---

### Screenshot 10: Adverse Events Panel
**Captures:** Adverse events list
**Shows:**
- Nausea: Grade 1, Resolved
- Fatigue: Grade 2, Ongoing
- Peripheral Neuropathy: Grade 2, Resolved

**Maps to narrative:**
> "adverse events (mild nausea resolved, fatigue ongoing, peripheral neuropathy resolved)"

**How to use in demo:**
Show safety tracking alongside efficacy data.

---

### Screenshot 11: AI-Generated Outcome Hypothesis Panel (FULL) ⭐ CRITICAL
**Captures:** ENTIRE AI panel from top to bottom
**Shows:**
- Predicted outcome: "Excellent" or "Good"
- Confidence score: 87%
- Key factors (4 items)
- Recommendations
- Risk assessment: "Low recurrence risk"
- Estimated time to remission
- Methodology & Data Sources section
- Scientific disclaimer

**Maps to narrative:**
> "The 'Predicted Outcomes' panel (89% two-year survival, 76% five-year survival, Low recurrence risk) is the bridge to the predictive modeling conversation"

**Maps to talking points:**
> "Based on the patterns in the observed data, the system generates projected outcomes with confidence levels"
> "AI Confidence at 87% demonstrates model transparency — a key KPI Jazz cares about"
> "Traceability: every prediction links back to the patient's actual biomarker and treatment data"

**How to use in demo:**
This is THE KEY SCREENSHOT for User Story 2. Introduce it as: "Based on the patterns in the observed data, the system generates projected outcomes with confidence levels." Point to the 87% confidence score and emphasize traceability to patient data.

---

## User Story 3: ARNI + SGLT2i Combination — Cardiology

**Screen:** Drug Performance

**Demo Narrative:**
"Switch to ARNI + SGLT2i Combination (892 patients, 72% one-year response). This is the largest patient cohort in the dataset, which strengthens the statistical foundation for predictive modeling."

### Screenshot 12: Drug Selection Cards
**Captures:** Drug cards showing ARNI + SGLT2i
**Shows:**
- Drug name: ARNI + SGLT2i Combination
- Patient count: 892 patients
- Response rate: 72%
- Therapeutic area: Cardiology

**Maps to narrative:**
> "ARNI + SGLT2i Combination (892 patients, 72% one-year response)"

**Maps to talking point:**
> "Largest patient cohort (892) — more data points mean higher confidence in the predictive model"

**How to use in demo:**
Emphasize that this is the largest cohort, strengthening statistical foundation.

---

### Screenshot 13: Drug Metrics Summary
**Captures:** 3 metric cards for selected drug
**Shows:**
- Patients Enrolled: 892
- 1-Year Response Rate: 72%
- Cost per QALY: $78K

**Maps to talking point:**
> "72% one-year response with the most cost-effective profile in the dataset ($78K/QALY)"

**How to use in demo:**
Highlight cost-effectiveness for health economics discussions.

---

### Screenshot 14: Biomarker Response Chart (if available)
**Captures:** Chart showing NT-proBNP or Ejection Fraction trends
**Shows:**
- NT-proBNP levels over time
- Ejection Fraction improvement

**Maps to talking point:**
> "NT-proBNP, as the relevant biomarker (a cardiac biomarker), shows that the platform connects the right clinical signals to the right therapeutic context"

**How to use in demo:**
Show biomarker-specific tracking for cardiology context.

---

### Screenshot 15: Cost-Effectiveness Card
**Captures:** Cost-effectiveness metrics
**Shows:**
- Cost per QALY: $78K
- QALY Gained
- Incremental benefit

**Maps to narrative:**
> "The Cost-Effectiveness view is especially relevant here, as heart failure is one of the highest-cost conditions in healthcare, and payers scrutinize QALY data closely"

**Maps to talking point:**
> "This is the kind of finding Medical Affairs teams bring to health economics and market access discussions"

**How to use in demo:**
Emphasize relevance to payers and market access.

---

## User Story 3(i): Evaluate Drug Performance and Extrapolate Beyond Year One

**Screen:** Drug Performance Analytics

**Demo Narrative:**
"This is the core of the Jazz ask. Select Trastuzumab + Pertuzumab (487 patients, 76% one-year response). The 'Response Rate Over Time' chart shows the observed trend from 6 months through 1 year, with the curve extending to a projected 2-year estimate."

### Screenshot 16: Drug Selection - Trastuzumab + Pertuzumab
**Captures:** Drug card for Trastuzumab + Pertuzumab
**Shows:**
- Drug name: Trastuzumab + Pertuzumab
- Patient count: 487 patients
- Response rate: 76%
- Therapeutic area: Oncology

**Maps to narrative:**
> "Select Trastuzumab + Pertuzumab (487 patients, 76% one-year response)"

**How to use in demo:**
Transition to the core Jazz question about extrapolation.

---

### Screenshot 17: Response Rate Over Time Chart
**Captures:** Area/line chart showing response rates
**Shows:**
- 6-month response: 84%
- 1-year response: 76%
- 2-year response: 68% (observed or projected)

**Maps to narrative:**
> "The 'Response Rate Over Time' chart shows the observed trend from 6 months through 1 year, with the curve extending to a projected 2-year estimate"

**Maps to talking point:**
> "Efficacy summary shows the degradation curve (84% at 6 months → 76% at 1 year → 68% at 2 years) — this is an honest, scientifically grounded projection"

**How to use in demo:**
Point to the trend and explain the degradation curve.

---

### Screenshot 18: AI-Generated Efficacy Hypothesis Panel (FULL) ⭐ CRITICAL - CENTERPIECE
**Captures:** ENTIRE AI panel from top to bottom
**Shows:**
- 3-Year Prediction: 64.0%
- 5-Year Prediction: 56.0%
- Trend Analysis: "Declining"
- Confidence Interval (lower/upper bounds)
- Market Projection
- Key Insights
- Methodology & Data Sources section
- Scientific disclaimer

**Maps to narrative:**
> "The 'Survival Curve – Observed vs AI-Predicted' chart is the centerpiece: observed data (solid green line) runs through month 12, then the AI-predicted curve (dashed red line) extends to month 36 with visible confidence intervals"

**Maps to talking points:**
> "This directly answers Jazz's scientific question: 'Based on what we see at one year, what might outcomes look like at two years?'"
> "The survival modeling and longitudinal extrapolation approaches are mentioned here"
> "AI supporting scientific hypothesis generation, not replacing clinical evidence"

**How to use in demo:**
THIS IS THE CENTERPIECE OF THE ENTIRE DEMO. Say: "Based on what we see at one year (76%), the model projects 64% at three years and 56% at five years. This is where your observed data ends. This is where the model begins."

---

### Screenshot 19: Adverse Event Profile Chart
**Captures:** Bar chart showing adverse event incidence
**Shows:**
- Event types and frequencies
- Safety profile over time

**Maps to talking point:**
> "Adverse Event Profile adds the safety dimension — modeling isn't just about efficacy but also about understanding evolving risk"

**How to use in demo:**
Show that modeling includes safety, not just efficacy.

---

### Screenshot 20: Cost-Effectiveness - Trastuzumab
**Captures:** Cost metrics for this drug
**Shows:**
- Cost per QALY: $125K
- QALY Gained: 4.2 years

**Maps to talking point:**
> "Cost-effectiveness ($125K/QALY, 4.2 QALYs gained) positions the analysis within health economics"

**How to use in demo:**
Connect clinical outcomes to health economics value.

---

## User Story 4: Use Biomarker Intelligence to Refine Predictive Hypotheses

**Screen:** Biomarker Insights

**Demo Narrative:**
"Show the Biomarker Performance Comparison (radar chart) and the Outcome Improvement by Biomarker (horizontal bars). HER2 Amplification shows +67% outcome improvement; CD20+ B-cells shows +73% improvement."

### Screenshot 21: Biomarker Selection Cards - HER2 & CD20+
**Captures:** Biomarker cards for HER2 and CD20+
**Shows:**
- HER2 Amplification: +67% outcome improvement, $850 cost
- CD20+ B-cells: +73% outcome improvement, $180 cost, 100% positive rate

**Maps to narrative:**
> "HER2 Amplification shows +67% outcome improvement with high predictive value; CD20+ B-cells shows +73% improvement"

**How to use in demo:**
Show both biomarkers side-by-side for comparison.

---

### Screenshot 22: Biomarker Performance Radar Chart
**Captures:** Radar chart
**Shows:**
- Predictive Value
- Clinical Utility
- Turnaround Time
- Comparison across biomarkers

**Maps to narrative:**
> "Biomarker Performance Comparison (radar chart comparing Predictive Value, Clinical Utility, and Turnaround)"

**Maps to talking point:**
> "This is how the platform moves from raw data to structured scientific insight"

**How to use in demo:**
Show multi-dimensional biomarker comparison.

---

### Screenshot 23: Outcome Improvement Bar Chart
**Captures:** Horizontal bar chart
**Shows:**
- HER2: +67%
- CD20+: +73%
- Other biomarkers with their improvement percentages

**Maps to narrative:**
> "Outcome Improvement by Biomarker (horizontal bars)"

**Maps to talking point:**
> "Biomarker-driven patient stratification is essential for credible predictive modeling — not all patients will follow the same trajectory"

**How to use in demo:**
Highlight CD20+ as the highest outcome improvement.

---

### Screenshot 24: Cost vs Clinical Utility Scatter Plot
**Captures:** Scatter plot
**Shows:**
- X-axis: Cost per test
- Y-axis: Outcome improvement / clinical utility
- HER2 and CD20+ positions clearly marked

**Maps to narrative:**
> "The Cost vs Clinical Utility scatter plot helps prioritize which biomarkers offer the best signal-to-cost ratio for inclusion in predictive models"

**Maps to talking points:**
> "Time to scientific insight KPI — instead of manually cross-referencing biomarker literature with study data, the platform surfaces these correlations automatically"
> "Hypothesis generation KPI — the platform identifies that HER2 Amplification and CD20+ B-cells are high-value predictive signals"

**How to use in demo:**
Show how platform automatically identifies high-value biomarkers.

---

## User Story 4(ii): CD20+ B-cells — Neurology Focus

**Screen:** Biomarker Insights (CD20+ selected)

**Demo Narrative:**
"Switch to the CD20+ B-cells biomarker card. Walk through the metrics: 1,923 patients screened, 100% positive rate, +73% outcome improvement, $180 cost per test, Flow Cytometry testing method, 2–3 day turnaround."

### Screenshot 25: CD20+ B-cells Details (CRITICAL)
**Captures:** CD20+ biomarker card or detail panel
**Shows:**
- Patients screened: 1,923
- Positive rate: 100%
- Outcome improvement: +73%
- Cost per test: $180
- Testing method: Flow Cytometry
- Turnaround: 2-3 days

**Maps to narrative:**
> "1,923 patients screened, 100% positive rate, +73% outcome improvement, $180 cost per test, Flow Cytometry testing method, 2–3 day turnaround"

**Maps to talking points:**
> "Highest outcome improvement in the dataset (+73%) with universal applicability (100% positive rate) — this is the strongest biomarker signal the platform has identified"
> "Low cost ($180) and fast turnaround (2–3 days) make this biomarker practical for real-world monitoring, not just research"
> "The contrast with HER2 is itself an insight: HER2 is highly predictive but narrow; CD20+ B-cells is highly predictive and broad"

**How to use in demo:**
Emphasize this as the ideal biomarker profile: high signal, broad coverage, low cost.

---

### Screenshot 26: AI-Generated Biomarker Hypothesis Panel (FULL) ⭐ CRITICAL
**Captures:** ENTIRE AI panel for CD20+ B-cells
**Shows:**
- Clinical significance
- Predictive accuracy
- Future applications
- Research priority
- Cost-benefit ratio
- Methodology & Data Sources
- Scientific disclaimer

**Maps to talking point:**
> "CD20+ B-cells represent the ideal biomarker profile for predictive modeling — high signal, broad coverage, low cost — and the platform makes that comparison visible without manual analysis"

**How to use in demo:**
Show how AI generates hypotheses about biomarker applications and research priorities.

---

### Screenshot 27: Biomarker-Drug Association Chart
**Captures:** Network/chart showing connections
**Shows:**
- CD20+ B-cells
- Ocrelizumab
- Rituximab
- Connection lines

**Maps to talking point:**
> "Associated drugs (Ocrelizumab, Rituximab) tie directly back to User Story 3(ii) — the biomarker intelligence feeds the drug performance modeling"

**How to use in demo:**
Show how biomarker insights connect to drug performance analysis.

---

## User Story 5: End-to-End Workflow

**Screens:** All tabs in sequence

**Demo Flow:**

| Workflow Step | Platform Screen | Screenshot(s) to Use | What to Show |
|---------------|-----------------|----------------------|--------------|
| 1. Ingest study data | Overview Dashboard | Screenshots 1-5 | 9,580 patients, 68 studies, 136 biomarkers |
| 2. Structure data around patient variables | Patient Journeys | Screenshots 6-11 | Longitudinal patient data organized by treatment, biomarkers, response, AEs |
| 3. Train predictive model | Biomarker Insights + Drug Performance | Screenshots 21-24 + 17 | Biomarker stratification and observed efficacy trends |
| 4. Simulate outcomes at year 2 | Drug Performance | Screenshot 18 (AI Panel) | 3-year and 5-year predictions with confidence levels |
| 5. Visualize projected results | Drug Performance + Patient Journeys | Screenshots 18 + 11 | Response extrapolation, predicted outcomes |

---

## KPI Integration Across Demo

| KPI | Screenshot | Where to Point | Talking Point |
|-----|------------|----------------|---------------|
| Time to scientific insight | Screenshot 1 (KPI Panel) | "2.5 hrs (↓78%)" card | "Minutes to go from raw data to projected outcomes vs. weeks of manual analysis" |
| Evidence coverage | Screenshot 1 (KPI Panel) | "12 databases" card | "4 therapeutic areas, 68 studies, 136 biomarkers in a unified framework" |
| Traceability | Screenshot 11 (Patient AI Panel) | Methodology section | "Every prediction links to specific patient data, biomarkers, and treatment history" |
| Model transparency | Screenshot 18 (Drug AI Panel) | Confidence intervals + methodology | "Observed vs. predicted clearly separated; confidence intervals visible" |
| Hypothesis generation | Screenshot 1 (KPI Panel) + Screenshot 26 (Biomarker AI Panel) | "47 hypotheses" card + AI insights | "AI-surfaced biomarker correlations that inform which subgroups to model" |

---

## Recommended Demo Script with Screenshot Cues

### Opening (30 seconds):
**Say:** "Your team is exploring whether AI can help model what patient outcomes might look like beyond the one-year observational window. Let me show you how we approach that."

**Show:** No screenshot yet - just verbal introduction

---

### Overview Dashboard (2 minutes):
**Show Screenshot 1:** KPI Panel
**Say:** "We start with evidence coverage across 12 databases, with 100% traceability and 95% model transparency."

**Show Screenshot 2:** Key Metrics
**Say:** "The platform has structured 9,580 patients across 68 active studies with 136 biomarkers tracked."

**Show Screenshots 3-5:** Therapeutic areas, patient distribution, age distribution
**Say:** "This diversity ensures any downstream modeling reflects real-world heterogeneity."

---

### Patient Journey (2-3 minutes):
**Show Screenshot 6-7:** Patient selection and header
**Say:** "Let's drill into patient PT-2847-A, a 58-year-old female with HER2+ Breast Cancer, Stage IIIA."

**Show Screenshot 8:** Treatment timeline
**Say:** "Her 7-month journey shows 67% tumor shrinkage with Trastuzumab + Pertuzumab."

**Show Screenshot 9:** Biomarker profile
**Say:** "Her biomarker profile: HER2 Score 3, ER/PR Positive, Ki67 28%."

**Show Screenshot 10:** Adverse events
**Say:** "Safety tracking shows nausea resolved, fatigue ongoing, neuropathy resolved."

**Show Screenshot 11:** AI-Generated Outcome Hypothesis Panel ⭐
**Say:** "Based on patterns in the observed data, the system generates projected outcomes with 87% confidence. Every prediction links back to her actual biomarker and treatment data."

---

### Drug Performance (3-4 minutes):
**Show Screenshot 16:** Trastuzumab + Pertuzumab selection
**Say:** "This is the core of your question. Trastuzumab + Pertuzumab: 487 patients, 76% one-year response."

**Show Screenshot 17:** Response rate over time
**Say:** "The observed trend: 84% at 6 months, 76% at 1 year, 68% at 2 years."

**Show Screenshot 18:** AI-Generated Efficacy Hypothesis Panel ⭐⭐⭐ CENTERPIECE
**Say:** "Based on what we see at one year, the model projects 64% at three years and 56% at five years. This is where your observed data ends. This is where the model begins. The platform doesn't replace your clinical evidence — it helps your scientific teams explore what comes next, with transparency and traceability built in."

**Show Screenshot 19:** Adverse events
**Say:** "Modeling includes safety, not just efficacy."

**Show Screenshot 20:** Cost-effectiveness
**Say:** "$125K per QALY, 4.2 QALYs gained — positioning this within health economics."

---

### Biomarker Insights (2-3 minutes):
**Show Screenshot 21:** HER2 and CD20+ cards
**Say:** "HER2 shows +67% outcome improvement; CD20+ shows +73%."

**Show Screenshots 22-24:** Radar chart, bar chart, scatter plot
**Say:** "The platform automatically surfaces which biomarkers offer the best signal-to-cost ratio for predictive modeling."

**Show Screenshot 25:** CD20+ details
**Say:** "CD20+ B-cells: highest outcome improvement (+73%), universal applicability (100% positive), low cost ($180), fast turnaround (2-3 days) — the ideal biomarker profile."

**Show Screenshot 26:** AI-Generated Biomarker Hypothesis Panel
**Say:** "The platform generates hypotheses about research priorities and future applications."

---

### Close (1 minute):
**Return to Screenshot 18:** Drug AI Panel
**Point to 3-year and 5-year predictions**
**Say:** "This is where your data ends. This is where the model begins. The platform doesn't replace your clinical evidence — it helps your scientific teams explore what comes next, with transparency and traceability built in."

---

## 🎯 Critical Screenshots Summary

**Must-Have (Top 4):**
1. **Screenshot 11:** Patient Journey AI Panel - Shows traceability and confidence
2. **Screenshot 18:** Drug Performance AI Panel - THE CENTERPIECE answering Jazz's core question
3. **Screenshot 25:** CD20+ Details - Ideal biomarker profile example
4. **Screenshot 26:** Biomarker AI Panel - Hypothesis generation capability

**Supporting (Important):**
- Screenshots 1-2: KPI and metrics establishing credibility
- Screenshot 8: Treatment timeline showing longitudinal data
- Screenshot 17: Response rate degradation curve
- Screenshots 22-24: Biomarker intelligence visualizations

**Total Screenshots:** 27
**Minimum for effective demo:** 15-20
**Estimated capture time:** 30-45 minutes
