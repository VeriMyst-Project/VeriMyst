# 🔍 VeriMyst - AI-Powered Misinformation Detection Platform

> “ VeriMyst - an AI-powered truth engine that detects lies, verifies facts, and educates minds across text, images, audio, and video. 100% public, multilingual, and barrier-free because truth belongs to everyone.
”

---

## 🌍 Overview

**VeriMyst** is a **public, AI-powered misinformation detection and education platform** designed to help users **identify false, misleading, or unverified content** online.

It can analyze **text, images, audio, and video** using advanced AI models, providing a **trust score**, **risk level**, and **explanation chain** to help users understand *why* something may be false.

Unlike most tools, VeriMyst is **completely public**, **multilingual (English, Hindi, Gujarati)**, and **requires no login** — because the truth should be open to everyone.

VeriMyst combines cutting-edge AI, transparent reasoning, and real-time analytics to make the internet a more **informed, credible, and aware** space.

---

## 🚀 Key Features

* 🧠 **AI-Powered Detection** — Detect misinformation in text, image, audio, and video using advanced AI analysis.
* 🌐 **Multilingual Support** — Full interface and AI chat in **English, Hindi, and Gujarati**.
* 🔍 **Claim Verification** — Verify any statement or claim with verdicts like *True*, *False*, *Partially True*, or *Unverifiable*.
* 💬 **AI Chat Assistant** — Ask misinformation-related questions and get real-time, language-specific answers.
* 📊 **Analytics Dashboard** — Visualize total scans, trust scores, and risk-level breakdowns using interactive charts.
* 📚 **Learning Hub** — 8 comprehensive guides from beginner to advanced to educate users on detecting misinformation.
* 🔓 **Public Access** — No authentication or barriers — fully open and accessible to everyone.

---

## ⚙️ How VeriMyst Works

```
User → Upload Content → AI Analysis → Trust Score → Results Display
                              ↓
                        Detailed Findings
                        Risk Level (Low / Medium / High / Critical)
                        Explainability Chain (Why this verdict)
                        Source Credibility
```

1. The user uploads content or enters a claim.
2. The AI model performs multi-layer analysis and assigns a **trust score**.
3. A **risk level** is determined, with detailed findings and reasoning.
4. The result is shown transparently with source credibility and confidence levels.

---

## 🧱 Technology Stack

| Layer               | Technologies                                               |
| ------------------- | ---------------------------------------------------------- |
| **Frontend**        | Next.js 16, React 18, Tailwind CSS, ShadCN/UI              |
| **Backend**         | Next.js API Routes, Node.js                                |
| **AI Integration**  | Gemini                  |
| **Database**        | PostgreSQL (Neon)                                          |
| **Deployment**      | Vercel, GitHub Actions                             |
| **Version Control** | Git, GitHub                                                |
| **Analytics**       | Recharts, Chart.js                                         |
| **Security**        | HTTPS, CORS, CSP, Environment Variables, Validation Layers |

---

## 🗃️ Database Structure

```
Scans Table
├── Content (text/image/audio/video)
├── Trust Score (0–100)
├── Risk Level (Low/Medium/High/Critical)
└── Timestamp

Scan Results Table
├── Detection Type (misinformation, deepfake, etc.)
├── Confidence Score
├── Findings (detailed reasoning)
└── Explanation (AI reasoning chain)

Uploads Table
├── File Name & Size
├── Storage Path
└── Timestamp

Feedback Table
├── Rating (1–5)
├── Comments
└── Associated Scan ID

Provenance Table
├── Source URL
├── Platform
├── Spread Count
└── First Seen Date

Analytics Table
├── Metrics (scans, verifications, trends)
└── Timestamps
```

---

## 🧠 Core Workflows

### 🧾 **1. Scanning Workflow**

1. User uploads text, image, audio, or video.
2. AI analyzes the content for misinformation patterns.
3. Trust score and risk level are generated.
4. Detailed explanations and findings are shown.
5. User feedback is collected for continuous learning.

### 🗞️ **2. Verification Workflow**

1. User inputs a claim.
2. AI verifies the statement using reliable sources.
3. Verdict (True, False, Partially True, or Unverifiable) is generated.
4. Confidence score and source credibility are displayed.

### 🎓 **3. Learning Workflow**

1. User selects a learning guide (Beginner → Advanced).
2. Reads and practices examples of misinformation detection.
3. Applies learnings in scanning and verification.

---

## 🧩 File Structure

```
app/
├── page.tsx (Home)
├── dashboard/
├── scanner/
├── chat/
├── verify/
├── learn/
├── analytics/
└── api/

components/
├── Scanner/
├── Chat/
├── Verify/
├── Learn/
├── Analytics/
└── UI/

lib/
├── i18n.ts (Language support)
├── ml-models.ts (AI integration)
└── utils.ts (Security and helpers)
```

---

## 🔐 Security & Privacy

✅ HTTPS encryption
✅ Input validation on all forms
✅ Secure headers (CORS, CSP)
✅ Environment variable protection
✅ Public access without user tracking
✅ Database connection pooling and rate limiting

---

## 👥 Collaborators

| 👤 Name             | 💼 Role                             | 🌐 GitHub                                              |
| ------------------- | ----------------------------------- | ------------------------------------------------------ |
| **Ritik Kalal**     | Project Lead / Full Stack Developer | [@ritikkalal07](https://github.com/ritikkalal07)       |
| **Harsh Mandaliya** | Backend & AI Developer              | [@Harsh-Mandaliya](https://github.com/Harsh-Mandaliya) |
| **MrA18Makes**      | Database & DevOps Engineer          | [@MrA18Makes](https://github.com/MrA18Makes)           |
| **Dhruv**           | Frontend Developer                  | [@dhruv18457](https://github.com/dhruv18457)           |

---

## 🧰 Installation & Setup

```bash
# Clone the repository
git clone https://github.com/VeriMyst-Project/VeriMyst.git

# Move into the project directory
cd VeriMyst

# Install dependencies
npm install

# Start the development server
npm run dev

# Visit the app in your browser
http://localhost:3000
```

---

## 🌐 Deployment

* **Platform:** Vercel
* **Database:** Neon PostgreSQL
* **CI/CD:** GitHub Actions
* **Containerization:** Docker
* **Branch:** Main
* **Environment:** Production-ready

---

## 💡 Vision

> “In a world of noise, VeriMyst helps you find the signal — the truth.”

Our mission is to build a transparent, intelligent platform that empowers every individual to **detect**, **verify**, and **understand** misinformation effortlessly.

VeriMyst stands for **accessibility, education, and AI transparency** — making truth a collective right, not a privilege.

---

## 📜 License

This project is licensed under the **MIT License**.
You are free to use, modify, and distribute it — just give credit to the **VeriMyst Team**.

---

## ⭐ Support

If you like this project, please **star the repository** 🌟
Your support helps promote open-source truth verification and AI transparency.

---

### 🏁 Built with ❤️ by the **VeriMyst Team**

> Ritik Kalal • Harsh Mandaliya • MrA18Makes • Dhruv
> Empowering truth through open AI innovation.

---

Would you like me to add **GitHub badges** (Next.js, PostgreSQL, License, Contributors, etc.) to make the top section look more like a **professional open-source launch page** (like trending repos on GitHub)?

