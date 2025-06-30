🧠 NeuroDesk - AI-Powered Task & Team Management System

        
  A revolutionary voice-controlled, AI-powered platform for task and team management, transforming how teams collaborate and manage projects.
  Live Demo | Documentation | Report Bug | Request Feature



🚀 Overview
NeuroDesk is an innovative task and team management platform powered by voice recognition and artificial intelligence. Built with Laravel and modern web technologies, it offers a seamless, hands-free approach to project management with support for over 20 languages.
🎯 Key Highlights

Voice-First Interface: Manage tasks effortlessly using natural voice commands.
Multi-Language Support: Supports 20+ languages with real-time translation.
AI-Powered Assistant: Context-aware assistance and intelligent task suggestions.
Real-Time Collaboration: Team messaging, announcements, and live updates.
Advanced Analytics: Interactive charts and comprehensive reporting.
Flexible Payment System: Integrated payment tracking and subscription management.


✨ Features
🎤 Voice-Controlled Task Management

Hands-Free Task Creation: Create tasks using intuitive voice commands.
Natural Language Processing: Understands inputs like "tomorrow" or "fifty dollars."
Voice Task Assignment: Assign tasks to team members via voice.
Multi-Language Voice Support: Accepts commands in 20+ languages.
Continuous Voice Listening: Always-on recognition for seamless interaction.

👥 Advanced Team Management

Role-Based Access Control: Admin, Team Leader, and Employee roles.
Smart Member Invitations: Professional email invites with SMTP2GO.
Skill-Based Task Assignment: Auto-assign tasks based on skills.
Team Statistics: Track team performance and productivity.
Member Activity Tracking: Monitor engagement and task completion.

💬 Integrated Communication Hub

Voice-Activated Messaging: Send team messages using voice.
Broadcast Announcements: Share company-wide updates.
Direct Messaging: Private team member conversations.
Email Integration: Professional email notifications.
Real-Time Notifications: Instant task and message updates.

📊 Comprehensive Analytics & Reporting

Interactive Dashboards: Real-time task, productivity, and payment analytics.
Advanced Filtering: Analyze data by 7, 30, 90 days, or yearly.
Export Capabilities: Download reports in PDF and Excel.
Chart.js Integration: Beautiful, interactive charts.
Custom Reports: Tailored reporting for specific needs.

💰 Integrated Payment System

Automatic Payments: Triggered upon task completion.
Payment History: Full transaction audit trail.
Subscription Management: RevenueCat for Premium/Enterprise plans.
Payment Analytics: Detailed financial insights.
Multi-Currency Support: Handle various currencies.

🤖 AI Assistant

Context-Aware Help: Intelligent, context-based assistance.
Voice Command Guidance: Comprehensive help for commands.
Productivity Suggestions: AI-driven task optimization.
Learning Capabilities: Adapts to user preferences.

📱 Responsive Design

Mobile-First: Optimized for all devices.
Progressive Web App: App-like mobile experience.
Smooth Animations: Polished UX with CSS animations.
Accessibility: WCAG 2.1 compliant.
Dark/Light Mode: User-selectable themes.


🛠️ Technology Stack
Backend

Framework: Laravel 10.x
Language: PHP 8.1+
Database: MySQL 8.0+
Authentication: Laravel Breeze with JWT tokens
Queue System: Redis for background jobs

Frontend

Template Engine: Blade templating
CSS Framework: Tailwind CSS 3.x
JavaScript: Vanilla JS with ES6+
Charts: Chart.js for visualizations
Voice Recognition: Web Speech API

Third-Party Integrations

Email: SMTP2GO for reliable delivery
Payments: RevenueCat for subscriptions
Voice Processing: Web Speech API with fallback
File Storage: Laravel File Storage (S3 compatible)

Development Tools

Package Manager: Composer (PHP), npm (JS)
Build Tools: Laravel Mix / Vite
Testing: PHPUnit, Laravel Dusk
Code Quality: PHP CS Fixer, ESLint


📋 Installation & Setup
Prerequisites

PHP: >= 8.1 (with PDO, OpenSSL, Mbstring, etc.)
Composer: Latest version
MySQL: >= 8.0 or MariaDB >= 10.3
Node.js: >= 16.x with npm
Web Server: Apache/Nginx (production)

Quick Start

Clone the Repository
git clone https://github.com/neurodesk/neurodesk-laravel.git
cd neurodesk-laravel


Install PHP Dependencies
composer install --optimize-autoloader


Install Node.js Dependencies
npm install


Environment Configuration
cp .env.example .env
php artisan key:generate


Configure Database
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=neurodesk
DB_USERNAME=your_mysql_user
DB_PASSWORD=your_mysql_password


Configure Email (SMTP2GO)
MAIL_MAILER=smtp
MAIL_HOST=smtp2go.com
MAIL_PORT=587
MAIL_USERNAME=your_smtp2go_username
MAIL_PASSWORD=your_smtp2go_password
MAIL_FROM_ADDRESS=noreply@yourcompany.com
MAIL_FROM_NAME=NeuroDesk


Configure Payments (RevenueCat)
REVENUECAT_API_KEY=your_revenuecat_api_key
REVENUECAT_WEBHOOK_SECRET=your_webhook_secret


Run Migrations and Seeders
php artisan migrate --seed


Compile Assets
npm run build


Start Development Server
php artisan serve


Access the Application

Web Interface: http://localhost:8000
API Docs: http://localhost:8000/api/documentation




🎤 Voice Commands Reference
Task Management

"Create a new task" - Opens task creation dialog
"Assign task to [name]" - Assigns task to a team member
"Mark task as complete" - Completes selected task
"Show my tasks" - Displays user's tasks
"Filter tasks by priority" - Filters by priority

Communication

"Send message to team [message]" - Sends team message
"Send message to [name] [message]" - Sends direct message
"Send announcement [message]" - Broadcasts announcement
"Show recent messages" - Displays recent messages

Navigation

"Go to dashboard" - Navigates to dashboard
"Go to tasks" - Navigates to task page
"Go to reports" - Navigates to analytics
"Go to team" - Navigates to team management
"Go to settings" - Navigates to settings

Team Management

"Invite [email]" - Sends team member invitation
"Show team statistics" - Displays team metrics
"Create new team" - Initiates team creation


📊 Subscription Plans
Free Plan

Up to 5 team members
Basic task management
Limited voice commands
Email support

Premium Plan - $9.99/month

Up to 25 team members
Advanced analytics
Full voice command suite
Priority email support
Custom integrations

Enterprise Plan - $29.99/month

Unlimited team members
Advanced reporting
Custom branding
Dedicated support
API access

For pricing details, visit x.ai/grok.

🔧 Configuration
Voice Recognition

Grant microphone permissions
Use Chrome/Edge for compatibility
Set language preferences in settings
Test voice recognition in settings

Email

Sign up for SMTP2GO
Configure MAIL_* variables in .env
Test with php artisan mail:test

Payments

Create RevenueCat account
Set up subscription products
Configure webhooks
Test in sandbox mode


🚀 Deployment
Production Deployment

Server Requirements
PHP 8.1+, MySQL 8.0+, Apache/Nginx
SSL certificate for HTTPS


Environment Setupcomposer install --optimize-autoloader --no-dev
npm run production
php artisan config:cache
php artisan route:cache
php artisan view:cache


Database Migrationphp artisan migrate --force


Queue Workersphp artisan queue:work --daemon


Task SchedulingAdd to crontab:* * * * * cd /path/to/neurodesk && php artisan schedule:run >> /dev/null 2>&1



Docker Deployment
FROM php:8.1-fpm

RUN apt-get update && apt-get install -y \
    build-essential libpng-dev libjpeg62-turbo-dev \
    libfreetype6-dev locales zip jpegoptim optipng \
    pngquant gifsicle vim unzip git curl libonig-dev \
    libxml2-dev libzip-dev

RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd zip

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www
COPY . /var/www
RUN composer install --optimize-autoloader --no-dev
RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache

EXPOSE 9000
CMD ["php-fpm"]


🧪 Testing
Running Tests
php artisan test
php artisan test --testsuite=Feature
php artisan test --coverage

Test Categories

Unit Tests: Core logic
Feature Tests: End-to-end features
Browser Tests: Laravel Dusk
API Tests: REST endpoints


🐛 Troubleshooting
Common Issues
Database Connection
php artisan tinker
DB::connection()->getPdo();

Voice Recognition

Verify microphone permissions
Use Chrome/Edge
Ensure HTTPS
Test microphone hardware

Email Delivery
php artisan mail:test your-email@example.com

Payment Issues

Verify RevenueCat API key
Check webhook configuration
Ensure valid SSL
Test in sandbox mode

Debug Mode
APP_DEBUG=true
APP_ENV=local

Logs
tail -f storage/logs/laravel.log


🤝 Contributing
Development Setup

Fork the repository
Create a feature branch: git checkout -b feature/amazing-feature
Make changes and write tests
Run tests: php artisan test
Commit: git commit -m 'Add amazing feature'
Push: git push origin feature/amazing-feature
Create a Pull Request

Coding Standards

Follow PSR-12
Use meaningful names
Write comprehensive tests
Document with PHPDoc
Follow Laravel best practices

Pull Requests

Clear change descriptions
Include tests
Update documentation
Ensure CI passes
Request maintainer review


📚 Documentation

User Guide
API Documentation
Voice Commands
Deployment Guide
Contributing Guide


🔒 Security
Reporting Vulnerabilities
Email: security@neurodesk.com
Security Features

JWT authentication
Role-based access
SQL injection prevention
XSS/CSRF protection
Rate limiting
Input validation


📄 License
Licensed under the MIT License.

👨‍💻 Team

  
    
      
        
        Deepak MishraLead Developer
        GitHub
      
      
        
        Vrushali NanavatiUI/UX & Frontend
        GitHub
      
    
  



🙏 Acknowledgments

Laravel Community
Chart.js
Tailwind CSS
SMTP2GO
RevenueCat
Contributors and Beta Testers


📞 Support

Email: support@neurodesk.com
Documentation: docs.neurodesk.com
Community: Discord
Issues: GitHub Issues



  Made with ❤️ by the NeuroDesk Team
  
  
  
