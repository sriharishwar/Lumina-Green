# LuminaGreen 🌱⚡

> **AI-Based Waste Classification and Smart Recycling System**  
> *See Waste Differently. Recycle Smarter.*

---

## 📖 Overview

**LuminaGreen** is an intelligent waste classification and municipal recycling guidance platform. By leveraging computer vision and MobileNetV2 transfer learning, LuminaGreen empowers citizens and municipal authorities to identify waste streams with high precision, prevent contamination at the source, and quantify real environmental impact (CO₂ and kWh offsets).

---

## ✨ Key Features

- **Automated Stream Classification**: Classifies materials into 6 key streams:
  - 🧴 Plastic (PET #1, HDPE #2, PP #5)
  - 📄 Paper & Cardboard
  - 🥛 Glass
  - 🔩 Metal & Aluminum
  - 🌱 Organic / Compostable Waste
  - 🗑 General / Residual Waste
- **Real-Time Camera & Upload Pipeline**: Live webcam capture or drag-and-drop image upload with automated resolution & format validation.
- **Multi-Stage AI HUD**: Visual step-by-step telemetry through neural network preprocessing, MobileNetV2 feature extraction, and softmax distribution.
- **Smart Recycling Directives**: Bin color coding, citizen preparation instructions (cleaning, flattening), and municipal policy clauses.
- **Low-Confidence Safeguards**: Automatic detection for scans with `< 70%` confidence with clear photographic guidance to prevent misdirection.
- **Citizen Feedback & Retraining Loop**: Citizen verification ("Yes" / "No" with correction selector) feeding continuous model retraining.
- **Telemetry & Impact Dashboard**: Personal and municipal diversion metrics, carbon offset calculator, and scan history with CSV export.
- **Model Evaluation & Diagnostics**: Interactive 6×6 confusion matrix (2,400 test images), precision/recall/F1 metrics, and latency telemetry.
- **Municipal Admin Portal**: Material stream toggles, policy guidance editor, model version registry, and compliance audit trail.

---

## 🛠 Tech Stack

- **Frontend**: React 19, Vite 8, Vanilla CSS (Custom Design System & Tokens)
- **Icons**: Lucide React
- **Animations & FX**: HTML5 Canvas particle simulation, Video Background (`Scene-17.mp4`), Canvas Confetti
- **Model Architecture**: MobileNetV2 Transfer Learning (Input: 224×224×3 RGB, Alpha 1.0)
- **Linting**: Oxlint

---

## 🚀 Quick Start

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- `npm`

### 2. Installation & Setup
```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be live at `http://localhost:5173/`.

### 3. Production Build
```bash
npm run build
npm run preview
```

---

## 📁 Repository Structure

```
Lumina Green/
├── .gitignore
├── README.md
└── frontend/
    ├── index.html
    ├── package.json
    ├── vite.config.js
    ├── public/
    │   ├── Scene-17.mp4
    │   └── samples/
    └── src/
        ├── App.jsx
        ├── index.css
        ├── components/
        │   ├── Background/
        │   └── Navbar/
        ├── data/
        │   └── mockData.js
        └── pages/
            ├── Admin/
            ├── Analytics/
            ├── Analyze/
            ├── Auth/
            ├── Dashboard/
            ├── History/
            ├── Landing/
            ├── ModelEvaluation/
            └── Result/
```

---

## 📜 License
This project is licensed under the MIT License.
