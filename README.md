<div align="center">

# 🧠 NeuroDesk

### AI-Powered Task & Team Management Platform

*A voice-controlled, AI-powered platform for seamless task and team management*

[![Laravel](https://img.shields.io/badge/Laravel-10.x-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)](https://laravel.com)
[![PHP](https://img.shields.io/badge/PHP-8.1+-777BB4?style=for-the-badge&logo=php&logoColor=white)](https://php.net)
[![MySQL](https://img.shields.io/badge/MySQL-8.0+-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://mysql.com)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

[🚀 Live Demo](https://neurodesk.com) • [📖 Documentation](https://docs.neurodesk.com) • [🐛 Report Bug](https://github.com/neurodesk/neurodesk-laravel/issues) • [✨ Request Feature](https://github.com/neurodesk/neurodesk-laravel/issues)

</div>

---

## 🚀 Overview

**NeuroDesk** is a cutting-edge task and team management platform that revolutionizes productivity through voice recognition and AI integration. Built with Laravel 10.x, it delivers a hands-free, intuitive experience supporting 20+ languages, real-time collaboration, and advanced analytics.

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
- RevenueCat subscription management
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
| **Backend** | ![Laravel](https://img.shields.io/badge/Laravel-10.x-FF2D20?logo=laravel&logoColor=white) ![PHP](https://img.shields.io/badge/PHP-8.1+-777BB4?logo=php&logoColor=white) ![MySQL](https://img.shields.io/badge/MySQL-8.0+-4479A1?logo=mysql&logoColor=white) ![Redis](https://img.shields.io/badge/Redis-DC382D?logo=redis&logoColor=white) |
| **Frontend** | ![Blade](https://img.shields.io/badge/Blade-FF2D20?logo=laravel&logoColor=white) ![Tailwind](https://img.shields.io/badge/Tailwind-38B2AC?logo=tailwind-css&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black) ![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?logo=chart.js&logoColor=white) |
| **Integrations** | ![SMTP2GO](https://img.shields.io/badge/SMTP2GO-0052CC?logoColor=white) ![RevenueCat](https://img.shields.io/badge/RevenueCat-FF6B35?logoColor=white) ![AWS S3](https://img.shields.io/badge/AWS_S3-232F3E?logo=amazon-aws&logoColor=white) |
| **Tools** | ![Composer](https://img.shields.io/badge/Composer-885630?logo=composer&logoColor=white) ![npm](https://img.shields.io/badge/npm-CB3837?logo=npm&logoColor=white) ![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white) ![PHPUnit](https://img.shields.io/badge/PHPUnit-3776AB?logoColor=white) |

</div>

---

## 📋 Quick Start

### Prerequisites

Before you begin, ensure you have the following installed:

- **PHP** >= 8.1 (with PDO, OpenSSL, Mbstring extensions)
- **Composer** (latest version)
- **MySQL** >= 8.0 or **MariaDB** >= 10.3
- **Node.js** >= 16.x with npm
- **Apache/Nginx** (for production)

### Installation

1. **Clone the Repository**
   \`\`\`bash
   git clone https://github.com/neurodesk/neurodesk-laravel.git
   cd neurodesk-laravel
   \`\`\`

2. **Install Dependencies**
   \`\`\`bash
   # Install PHP dependencies
   composer install --optimize-autoloader
   
   # Install Node.js dependencies
   npm install
   \`\`\`

3. **Environment Setup**
   \`\`\`bash
   # Copy environment file
   cp .env.example .env
   
   # Generate application key
   php artisan key:generate
   \`\`\`

4. **Database Configuration**
   \`\`\`env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=neurodesk
   DB_USERNAME=your_mysql_user
   DB_PASSWORD=your_mysql_password
   \`\`\`

5. **Email Configuration (SMTP2GO)**
   \`\`\`env
   MAIL_MAILER=smtp
   MAIL_HOST=smtp2go.com
   MAIL_PORT=587
   MAIL_USERNAME=your_smtp2go_username
   MAIL_PASSWORD=your_smtp2go_password
   MAIL_FROM_ADDRESS=noreply@yourcompany.com
   MAIL_FROM_NAME=NeuroDesk
   \`\`\`

6. **Payment Configuration (RevenueCat)**
   \`\`\`env
   REVENUECAT_API_KEY=your_revenuecat_api_key
   REVENUECAT_WEBHOOK_SECRET=your_webhook_secret
   \`\`\`

7. **Database Migration**
   \`\`\`bash
   php artisan migrate --seed
   \`\`\`

8. **Compile Assets**
   \`\`\`bash
   npm run build
   \`\`\`

9. **Start Development Server**
   \`\`\`bash
   php artisan serve
   \`\`\`

10. **Access Your Application**
    - **Web Interface**: http://localhost:8000
    - **API Documentation**: http://localhost:8000/api/documentation

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

[🔗 View Detailed Pricing](https://x.ai/grok)

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
2. **Configure environment variables** in `.env`
3. **Test email functionality**:
   \`\`\`bash
   php artisan mail:test your-email@example.com
   \`\`\`

### Payment Integration

1. **Set up RevenueCat account**
2. **Configure products and webhooks**
3. **Test in sandbox mode** before going live

---

## 🚀 Deployment

### Production Deployment

**Requirements**: PHP 8.1+, MySQL 8.0+, Apache/Nginx, SSL Certificate

\`\`\`bash
# Optimize for production
composer install --optimize-autoloader --no-dev
npm run production

# Cache configuration
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Run migrations
php artisan migrate --force

# Start queue workers
php artisan queue:work --daemon
\`\`\`

**Cron Job Setup**:
\`\`\`bash
* * * * * cd /path/to/neurodesk && php artisan schedule:run >> /dev/null 2>&1
\`\`\`

### Docker Deployment

\`\`\`dockerfile
FROM php:8.1-fpm

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential libpng-dev libjpeg62-turbo-dev \
    libfreetype6-dev locales zip jpegoptim optipng \
    pngquant gifsicle vim unzip git curl libonig-dev \
    libxml2-dev libzip-dev

# Install PHP extensions
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd zip

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www

# Copy application files
COPY . /var/www

# Install dependencies
RUN composer install --optimize-autoloader --no-dev

# Set permissions
RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache

EXPOSE 9000
CMD ["php-fpm"]
\`\`\`

---

## 🧪 Testing

### Running Tests

\`\`\`bash
# Run all tests
php artisan test

# Run specific test suite
php artisan test --testsuite=Feature

# Run with coverage
php artisan test --coverage
\`\`\`

### Test Types

- **Unit Tests**: Core logic and business rules
- **Feature Tests**: End-to-end functionality
- **Browser Tests**: Laravel Dusk for UI testing
- **API Tests**: REST endpoint validation

---

## 🐛 Troubleshooting

<details>
<summary><strong>Common Issues & Solutions</strong></summary>

| Issue | Solution |
|-------|----------|
| **Database Connection** | Run `php artisan tinker; DB::connection()->getPdo();` |
| **Voice Recognition** | Check permissions, use Chrome/Edge, ensure HTTPS |
| **Email Not Working** | Test with `php artisan mail:test your-email@example.com` |
| **Payment Issues** | Verify RevenueCat key, webhooks, SSL, sandbox mode |

**Debug Commands**:
\`\`\`bash
# View logs
tail -f storage/logs/laravel.log

# Enable debug mode
# Set APP_DEBUG=true in .env
\`\`\`

</details>

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Make** your changes and write tests
4. **Run** tests: `php artisan test`
5. **Commit** your changes: `git commit -m 'Add amazing feature'`
6. **Push** to the branch: `git push origin feature/amazing-feature`
7. **Create** a Pull Request

### Coding Standards

- Follow **PSR-12** coding style
- Use **meaningful variable and function names**
- Write **comprehensive tests**
- Add **PHPDoc documentation**
- Follow **Laravel best practices**


---

## 🔒 Security

Security is our top priority. NeuroDesk includes:

- **JWT Authentication** with secure token management
- **Role-based Access Control** (RBAC)
- **SQL Injection Protection** via Eloquent ORM
- **XSS Protection** with input sanitization
- **CSRF Protection** on all forms
- **Rate Limiting** to prevent abuse

**Report Security Vulnerabilities**: [security@neurodesk.com](mailto:security@neurodesk.com)

---

## 👨‍💻 Team

<div align="center">

| ![Deepak Mishra](https://github.com/deepakmishra.png?size=100) | ![Vrushali Nanavati](https://github.com/vrushalinanavati.png?size=100) |
|:---:|:---:|
| **Deepak Mishra**<br/>*Lead Developer*<br/>[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/ddevguru) | **Vrushali Nanavati**<br/>*UI/UX & Frontend*<br/>[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/vrxshxli) |

</div>

---

## 🙏 Acknowledgments

Special thanks to the amazing open-source community:

- [Laravel Community](https://laravel.com) for the incredible framework
- [Chart.js](https://chartjs.org) for beautiful data visualizations
- [Tailwind CSS](https://tailwindcss.com) for utility-first styling
- [SMTP2GO](https://smtp2go.com) for reliable email delivery
- [RevenueCat](https://revenuecat.com) for subscription management

---


---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Made with ❤️ by the NeuroDesk Team**

[![GitHub stars](https://img.shields.io/github/stars/neurodesk/neurodesk-laravel?style=social)](https://github.com/neurodesk/neurodesk-laravel/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/neurodesk/neurodesk-laravel?style=social)](https://github.com/neurodesk/neurodesk-laravel/network/members)
[![GitHub issues](https://img.shields.io/github/issues/neurodesk/neurodesk-laravel)](https://github.com/neurodesk/neurodesk-laravel/issues)

*⭐ Star us on GitHub if you find NeuroDesk helpful!*

</div>
