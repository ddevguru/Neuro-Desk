<div align="center">

# 🧠 NeuroDesk

### AI-Powered Task & Team Management Platform

*A voice-controlled, AI-powered platform for seamless task and team management*

[![Next.js](https://img.shields.io/badge/Next.js-14.x-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org)
[![Express.js](https://img.shields.io/badge/Express.js-4.x-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)
[![MySQL](https://img.shields.io/badge/MySQL-8.0+-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://mysql.com)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)



</div>

---

## 🚀 Overview

**NeuroDesk** is a cutting-edge task and team management platform that revolutionizes productivity through voice recognition and AI integration. Built with Next.js and Express.js, it delivers a hands-free, intuitive experience supporting 20+ languages, real-time collaboration, and advanced analytics.

### 🎯 Why NeuroDesk?

- **🎤 Voice-First Design**: Manage tasks naturally with voice commands
- **🤖 AI-Powered Intelligence**: Smart suggestions and context-aware assistance  
- **🌐 Global Ready**: Multi-language support with real-time translation
- **⚡ Real-Time Collaboration**: Instant team communication and updates
- **📊 Data-Driven Insights**: Advanced analytics and customizable reports

---

## ✨ Key Features

<table>
<tr>
<td width="50%">

### 🎤 Voice-Controlled Task Management
- Create tasks hands-free with natural language
- Smart parsing (e.g., "tomorrow", "$50")
- Multi-language voice recognition (20+ languages)
- Assign tasks to team members via voice

### 👥 Advanced Team Management
- Role-based access control (Admin, Team Leader, Employee)
- Smart email invitations via SMTP2GO
- Skill-based task assignments
- Performance tracking and analytics

### 💬 Communication Hub
- Voice-activated messaging system
- Team and direct messaging
- Company-wide announcements
- Real-time notifications

</td>
<td width="50%">

### 📊 Analytics & Reporting
- Interactive dashboards with Chart.js
- Task productivity metrics
- Payment analytics
- Export reports (PDF/Excel)
- Custom date range filtering

### 💰 Integrated Payment System
- Automatic payments on task completion
- Stripe/PayPal integration
- Multi-currency support
- Financial analytics and reporting

### 🤖 AI Assistant
- Context-aware guidance
- Productivity optimization suggestions
- Machine learning adaptation
- Smart task recommendations

</td>
</tr>
</table>

---

## 🛠️ Tech Stack

<div align="center">

| Category | Technologies |
|----------|-------------|
| **Frontend** | ![Next.js](https://img.shields.io/badge/Next.js-14.x-000000?logo=next.js&logoColor=white) ![React](https://img.shields.io/badge/React-18+-61DAFB?logo=react&logoColor=black) ![Tailwind](https://img.shields.io/badge/Tailwind-3.x-38B2AC?logo=tailwind-css&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=black) |
| **Backend** | ![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white) ![Express.js](https://img.shields.io/badge/Express.js-4.x-000000?logo=express&logoColor=white) ![MySQL](https://img.shields.io/badge/MySQL-8.0+-4479A1?logo=mysql&logoColor=white) |
| **Visualization** | ![Chart.js](https://img.shields.io/badge/Chart.js-4.x-FF6384?logo=chart.js&logoColor=white) ![D3.js](https://img.shields.io/badge/D3.js-7.x-F9A03C?logo=d3.js&logoColor=white) |
| **Integrations** | ![SMTP2GO](https://img.shields.io/badge/SMTP2GO-0052CC?logoColor=white) ![Stripe](https://img.shields.io/badge/Stripe-008CDD?logo=stripe&logoColor=white) ![AWS S3](https://img.shields.io/badge/AWS_S3-232F3E?logo=amazon-aws&logoColor=white) |
| **Tools** | ![npm](https://img.shields.io/badge/npm-CB3837?logo=npm&logoColor=white) ![Webpack](https://img.shields.io/badge/Webpack-8DD6F9?logo=webpack&logoColor=black) ![ESLint](https://img.shields.io/badge/ESLint-4B32C3?logo=eslint&logoColor=white) ![Jest](https://img.shields.io/badge/Jest-C21325?logo=jest&logoColor=white) |

</div>

---

## 📋 Quick Start

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** >= 18.0 (with npm or yarn)
- **MySQL** >= 8.0 or **MariaDB** >= 10.3
- **Git** (latest version)
- **Modern browser** (Chrome, Firefox, Safari, Edge)

### Installation

1. **Clone the Repository**
   \`\`\`bash
   git clone https://github.com/neurodesk/neurodesk-platform.git
   cd neurodesk-platform
   \`\`\`

2. **Install Dependencies**
   \`\`\`bash
   # Install all dependencies
   npm install
   
   # Or using yarn
   yarn install
   \`\`\`

3. **Environment Setup**
   \`\`\`bash
   # Copy environment files
   cp .env.example .env.local
   cp server/.env.example server/.env
   \`\`\`

4. **Database Configuration**
   \`\`\`env
   # Frontend (.env.local)
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   
   # Backend (server/.env)
   NODE_ENV=development
   PORT=5000
   
   # Database
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_NAME=neurodesk
   DB_USER=your_mysql_user
   DB_PASSWORD=your_mysql_password
   
   # JWT
   JWT_SECRET=your_super_secret_jwt_key
   JWT_EXPIRE=7d
   \`\`\`

5. **Email Configuration (SMTP2GO)**
   \`\`\`env
   # Add to server/.env
   SMTP_HOST=smtp2go.com
   SMTP_PORT=587
   SMTP_USER=your_smtp2go_username
   SMTP_PASS=your_smtp2go_password
   FROM_EMAIL=noreply@yourcompany.com
   FROM_NAME=NeuroDesk
   \`\`\`

6. **Payment Configuration (Stripe)**
   \`\`\`env
   # Add to server/.env
   STRIPE_PUBLIC_KEY=pk_test_your_stripe_public_key
   STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
   STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
   \`\`\`

7. **Database Setup**
   \`\`\`bash
   # Navigate to server directory
   cd server
   
   # Run database migrations and seeds
   npm run db:migrate
   npm run db:seed
   \`\`\`

8. **Start Development Servers**
   \`\`\`bash
   # Start backend server (from server directory)
   cd server
   npm run dev
   
   # Start frontend server (from root directory, new terminal)
   npm run dev
   \`\`\`

9. **Access Your Application**
   - **Frontend**: http://localhost:3000
   - **Backend API**: http://localhost:5000
   - **API Documentation**: http://localhost:5000/api/docs

---

## 🎤 Voice Commands

<details>
<summary><strong>📝 Task Management</strong></summary>

| Command | Action |
|---------|--------|
| `"Create a new task"` | Opens task creation dialog |
| `"Assign task to [name]"` | Assigns task to team member |
| `"Mark task as complete"` | Completes selected task |
| `"Set deadline for tomorrow"` | Sets task deadline |
| `"Add priority high"` | Sets task priority |

</details>

<details>
<summary><strong>💬 Communication</strong></summary>

| Command | Action |
|---------|--------|
| `"Send message to team [message]"` | Sends team message |
| `"Send announcement [message]"` | Broadcasts announcement |
| `"Call team meeting"` | Schedules team meeting |

</details>

<details>
<summary><strong>🧭 Navigation</strong></summary>

| Command | Action |
|---------|--------|
| `"Go to dashboard"` | Navigates to dashboard |
| `"Go to tasks"` | Navigates to task page |
| `"Show analytics"` | Opens analytics panel |

</details>

<details>
<summary><strong>👥 Team Management</strong></summary>

| Command | Action |
|---------|--------|
| `"Invite [email]"` | Sends team member invitation |
| `"Show team performance"` | Displays team metrics |

</details>

---

## 💰 Subscription Plans

<div align="center">

| Plan | Price | Team Members | Features |
|------|-------|--------------|----------|
| **Free** | $0/month | 5 members | Basic task management, Limited voice commands |
| **Premium** | $9.99/month | 25 members | Advanced analytics, Full voice commands, Priority support |
| **Enterprise** | $29.99/month | Unlimited | Custom branding, API access, Dedicated support |

[🔗 View Detailed Pricing](https://neurodesk.com/pricing)

</div>

---

## 🔧 Configuration

### Voice Recognition Setup

1. **Grant microphone permissions** in your browser
2. **Use Chrome or Edge** for best compatibility
3. **Set your preferred language** in settings
4. **Test voice recognition** in the settings panel

### Email Configuration

1. **Sign up for SMTP2GO** account
2. **Configure environment variables** in `server/.env`
3. **Test email functionality**:
   \`\`\`bash
   cd server
   npm run test:email your-email@example.com
   \`\`\`

### Payment Integration

1. **Set up Stripe account**
2. **Configure products and webhooks**
3. **Test in sandbox mode** before going live

---

## 🚀 Deployment

### Production Deployment

**Requirements**: Node.js 18+, MySQL 8.0+, Nginx/Apache, SSL Certificate

#### Frontend (Next.js)

\`\`\`bash
# Build the application
npm run build

# Start production server
npm start

# Or deploy to Vercel
npx vercel --prod
\`\`\`

#### Backend (Express.js)

\`\`\`bash
# Navigate to server directory
cd server

# Install production dependencies
npm ci --only=production

# Build the application
npm run build

# Start production server with PM2
npm install -g pm2
pm2 start ecosystem.config.js
\`\`\`

**PM2 Configuration (ecosystem.config.js)**:
\`\`\`javascript
module.exports = {
  apps: [{
    name: 'neurodesk-api',
    script: './dist/server.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 5000
    }
  }]
}
\`\`\`

### Docker Deployment

#### Frontend Dockerfile
\`\`\`dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
\`\`\`

#### Backend Dockerfile
\`\`\`dockerfile
FROM node:18-alpine

WORKDIR /app

COPY server/package*.json ./
RUN npm ci --only=production

COPY server/ .
RUN npm run build

EXPOSE 5000

CMD ["npm", "start"]
\`\`\`

#### Docker Compose
\`\`\`yaml
version: '3.8'

services:
  frontend:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_API_URL=http://backend:5000/api
    depends_on:
      - backend

  backend:
    build:
      context: .
      dockerfile: server/Dockerfile
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=production
      - DB_HOST=database
    depends_on:
      - database

  database:
    image: mysql:8.0
    environment:
      - MYSQL_DATABASE=neurodesk
      - MYSQL_ROOT_PASSWORD=rootpassword
    volumes:
      - mysql_data:/var/lib/mysql
    ports:
      - "3306:3306"

volumes:
  mysql_data:
\`\`\`

---

## 🧪 Testing

### Running Tests

\`\`\`bash
# Run all tests
npm test

# Run frontend tests
npm run test:frontend

# Run backend tests
cd server && npm test

# Run tests with coverage
npm run test:coverage

# Run end-to-end tests
npm run test:e2e
\`\`\`

### Test Types

- **Unit Tests**: Jest for component and function testing
- **Integration Tests**: API endpoint testing with Supertest
- **E2E Tests**: Playwright for full user journey testing
- **Component Tests**: React Testing Library for UI components

---

## 🐛 Troubleshooting

<details>
<summary><strong>Common Issues & Solutions</strong></summary>

| Issue | Solution |
|-------|----------|
| **Database Connection** | Check MySQL service and credentials in `.env` |
| **Voice Recognition** | Check permissions, use Chrome/Edge, ensure HTTPS |
| **Email Not Working** | Test SMTP2GO credentials and connection |
| **Build Failures** | Clear `node_modules` and reinstall dependencies |
| **Port Conflicts** | Check if ports 3000/5000 are available |

**Debug Commands**:
\`\`\`bash
# Check Node.js version
node --version

# Check database connection
cd server && npm run db:test

# View application logs
npm run logs

# Clear cache and rebuild
npm run clean && npm install
\`\`\`

</details>

---

## 📁 Project Structure

\`\`\`
neurodesk-platform/
├── 📁 components/          # Reusable React components
├── 📁 pages/              # Next.js pages and API routes
├── 📁 public/             # Static assets
├── 📁 styles/             # Global styles and Tailwind config
├── 📁 utils/              # Utility functions
├── 📁 hooks/              # Custom React hooks
├── 📁 lib/                # Third-party integrations
├── 📁 server/             # Express.js backend
│   ├── 📁 controllers/    # Route controllers
│   ├── 📁 models/         # Database models
│   ├── 📁 routes/         # API routes
│   ├── 📁 middleware/     # Custom middleware
│   ├── 📁 utils/          # Backend utilities
│   └── 📁 tests/          # Backend tests
├── 📁 tests/              # Frontend tests
├── 📄 package.json        # Frontend dependencies
├── 📄 next.config.js      # Next.js configuration
└── 📄 tailwind.config.js  # Tailwind CSS configuration
\`\`\`

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Make** your changes and write tests
4. **Run** tests: `npm test`
5. **Commit** your changes: `git commit -m 'Add amazing feature'`
6. **Push** to the branch: `git push origin feature/amazing-feature`
7. **Create** a Pull Request

### Coding Standards

- Follow **ESLint** and **Prettier** configurations
- Use **meaningful variable and function names**
- Write **comprehensive tests**
- Add **JSDoc documentation**
- Follow **React and Node.js best practices**

---

## 📚 API Documentation

### Authentication

\`\`\`javascript
// Login
POST /api/auth/login
{
  "email": "user@example.com",
  "password": "password123"
}

// Register
POST /api/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
\`\`\`

### Tasks

\`\`\`javascript
// Get all tasks
GET /api/tasks

// Create task
POST /api/tasks
{
  "title": "New Task",
  "description": "Task description",
  "priority": "high",
  "dueDate": "2024-12-31"
}

// Update task
PUT /api/tasks/:id
{
  "status": "completed"
}
\`\`\`

### Team Management

\`\`\`javascript
// Invite team member
POST /api/team/invite
{
  "email": "member@example.com",
  "role": "employee"
}

// Get team analytics
GET /api/team/analytics?period=30d
\`\`\`

---

## 🔒 Security

Security is our top priority. NeuroDesk includes:

- **JWT Authentication** with secure token management
- **Role-based Access Control** (RBAC)
- **SQL Injection Protection** via parameterized queries
- **XSS Protection** with input sanitization
- **CSRF Protection** on all forms
- **Rate Limiting** to prevent abuse
- **HTTPS Enforcement** in production

**Report Security Vulnerabilities**: [security@neurodesk.com](mailto:security@neurodesk.com)

---

## 👨‍💻 Team

<div align="center">

| ![Deepak Mishra](https://github.com/ddevguru.png?size=100) | ![Vrushali Nanavati](https://github.com/vrxshxli.png?size=100) |
|:---:|:---:|
| **Deepak Mishra**<br/>*Lead Developer*<br/>[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/ddevguru) | **Vrushali Nanavati**<br/>*UI/UX & Frontend*<br/>[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/vrxshxli) |

</div>

---

## 🙏 Acknowledgments

Special thanks to the amazing open-source community:

- [Next.js Team](https://nextjs.org) for the incredible React framework
- [Express.js Community](https://expressjs.com) for the fast web framework
- [Chart.js](https://chartjs.org) for beautiful data visualizations
- [Tailwind CSS](https://tailwindcss.com) for utility-first styling
- [SMTP2GO](https://smtp2go.com) for reliable email delivery
- [Stripe](https://stripe.com) for payment processing

---



## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Made with ❤️ by the NeuroDesk Team**

[![GitHub stars](https://img.shields.io/github/stars/neurodesk/neurodesk-platform?style=social)](https://github.com/neurodesk/neurodesk-platform/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/neurodesk/neurodesk-platform?style=social)](https://github.com/neurodesk/neurodesk-platform/network/members)
[![GitHub issues](https://img.shields.io/github/issues/neurodesk/neurodesk-platform)](https://github.com/neurodesk/neurodesk-platform/issues)

*⭐ Star us on GitHub if you find NeuroDesk helpful!*

</div>
