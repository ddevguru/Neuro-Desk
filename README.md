🧠 NeuroDesk - AI-Powered Task & Team Management System




A revolutionary voice-controlled, AI-powered platform for seamless task and team management.
Live Demo | Documentation | Report Bug | Request Feature



🚀 Overview
NeuroDesk is a cutting-edge task and team management platform that leverages voice recognition and AI to streamline collaboration. Built with Laravel and modern web technologies, it offers an intuitive, hands-free experience with support for over 20 languages.
🎯 Key Highlights

🎤 Voice-First Interface: Manage tasks using natural voice commands.
🌐 Multi-Language Support: Supports 20+ languages with real-time translation.
🤖 AI-Powered Assistant: Context-aware help and task suggestions.
💬 Real-Time Collaboration: Team messaging and live updates.
📊 Advanced Analytics: Interactive charts and detailed reports.
💰 Flexible Payments: Integrated payment tracking and subscriptions.


✨ Features
🎤 Voice-Controlled Task Management

Hands-Free Task Creation: Create tasks via voice commands.
Natural Language Processing: Understands inputs like "tomorrow" or "$50."
Voice Task Assignment: Assign tasks to team members using voice.
Multi-Language Support: Commands in 20+ languages.
Continuous Listening: Seamless voice interaction.

👥 Advanced Team Management

Role-Based Access: Admin, Team Leader, and Employee roles.
Smart Invitations: Professional email invites via SMTP2GO.
Skill-Based Assignments: Auto-assign tasks based on skills.
Team Statistics: Monitor performance and productivity.
Activity Tracking: Track task completion and engagement.

💬 Communication Hub

Voice Messaging: Send team or direct messages via voice.
Announcements: Broadcast company-wide updates.
Direct Messaging: Private team member chats.
Email Integration: Professional notifications.
Real-Time Updates: Instant task and message notifications.

📊 Analytics & Reporting

Interactive Dashboards: Real-time task, productivity, and payment insights.
Advanced Filtering: Analyze by 7, 30, 90 days, or yearly.
Export Options: Download reports in PDF/Excel.
Chart.js Integration: Beautiful, interactive charts.
Custom Reports: Tailored reporting for specific needs.

💰 Payment System

Automatic Payments: Triggered on task completion.
Payment History: Full transaction audit trail.
Subscription Management: RevenueCat for Premium/Enterprise plans.
Payment Analytics: Financial reporting and forecasting.
Multi-Currency: Supports various currencies.

🤖 AI Assistant

Context-Aware Help: Intelligent, context-based assistance.
Voice Guidance: Help with commands and features.
Productivity Suggestions: AI-driven task optimization.
Learning Capabilities: Adapts to user patterns.

📱 Responsive Design

Mobile-First: Optimized for all devices.
Progressive Web App: App-like mobile experience.
Smooth Animations: Polished UX with CSS.
Accessibility: WCAG 2.1 compliant.
Dark/Light Mode: User-selectable themes.


🛠️ Technology Stack
Backend

Framework: Laravel 10.x
Language: PHP 8.1+
Database: MySQL 8.0+
Authentication: Laravel Breeze with JWT
Queue System: Redis

Frontend

Template Engine: Blade
CSS Framework: Tailwind CSS 3.x
JavaScript: Vanilla JS (ES6+)
Charts: Chart.js
Voice Recognition: Web Speech API

Integrations

Email: SMTP2GO
Payments: RevenueCat
Voice Processing: Web Speech API
File Storage: Laravel File Storage (S3)

Tools

Package Manager: Composer, npm
Build Tools: Laravel Mix / Vite
Testing: PHPUnit, Laravel Dusk
Code Quality: PHP CS Fixer, ESLint


📋 Installation
Prerequisites

PHP >= 8.1 (with PDO, OpenSSL, Mbstring, etc.)
Composer
MySQL >= 8.0 or MariaDB >= 10.3
Node.js >= 16.x with npm
Apache/Nginx (production)

Steps

Clone Repository
git clone https://github.com/neurodesk/neurodesk-laravel.git
cd neurodesk-laravel


Install PHP Dependencies
composer install --optimize-autoloader


Install Node.js Dependencies
npm install


Environment Setup
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


Run Migrations
php artisan migrate --seed


Compile Assets
npm run build


Start Server
php artisan serve


Access Application

Web: http://localhost:8000
API Docs: http://localhost:8000/api/documentation




🎤 Voice Commands
Task Management

"Create a new task" - Start task creation
"Assign task to [name]" - Assign task
"Mark task as complete" - Complete task
"Show my tasks" - View tasks
"Filter tasks by priority" - Filter tasks

Communication

"Send message to team [message]" - Team message
"Send message to [name] [message]" - Direct message
"Send announcement [message]" - Broadcast
"Show recent messages" - View messages

Navigation

"Go to dashboard" - Main dashboard
"Go to tasks" - Task page
"Go to reports" - Analytics page
"Go to team" - Team management
"Go to settings" - User settings

Team Management

"Invite [email]" - Send invite
"Show team statistics" - Team metrics
"Create new team" - Create team


📊 Subscription Plans

Free Plan:

5 team members
Basic tasks
Limited voice commands
Email support


Premium Plan ($9.99/month):

25 team members
Advanced analytics
Full voice commands
Priority support
Custom integrations


Enterprise Plan ($29.99/month):

Unlimited members
Advanced reporting
Custom branding
Dedicated support
API access



For pricing details, visit x.ai/grok.

🔧 Configuration
Voice Recognition

Grant microphone permissions
Use Chrome/Edge
Set language in settings
Test in settings panel

Email

Sign up for SMTP2GO
Configure .env MAIL_* variables
Test: php artisan mail:test

Payments

Create RevenueCat account
Set up products
Configure webhooks
Test in sandbox mode


🚀 Deployment
Production

Requirements: PHP 8.1+, MySQL 8.0+, Apache/Nginx, SSL
Setup:composer install --optimize-autoloader --no-dev
npm run production
php artisan config:cache
php artisan route:cache
php artisan view:cache


Migrate:php artisan migrate --force


Queue Workers:php artisan queue:work --daemon


Scheduling:* * * * * cd /path/to/neurodesk && php artisan schedule:run >> /dev/null 2>&1



Docker
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
Commands
php artisan test
php artisan test --testsuite=Feature
php artisan test --coverage

Test Types

Unit Tests: Core logic
Feature Tests: End-to-end
Browser Tests: Laravel Dusk
API Tests: REST endpoints


🐛 Troubleshooting
Database Issues
php artisan tinker
DB::connection()->getPdo();

Voice Recognition

Check microphone permissions
Use Chrome/Edge
Ensure HTTPS
Verify hardware

Email Issues
php artisan mail:test your-email@example.com

Payment Issues

Verify RevenueCat API key
Check webhook setup
Ensure valid SSL
Test in sandbox

Debug
APP_DEBUG=true
APP_ENV=local

Logs
tail -f storage/logs/laravel.log


🤝 Contributing

Fork the repository
Create branch: git checkout -b feature/amazing-feature
Make changes and write tests
Run tests: php artisan test
Commit: git commit -m 'Add feature'
Push: git push origin feature/amazing-feature
Create Pull Request

Standards

PSR-12
Meaningful names
Comprehensive tests
PHPDoc documentation
Laravel best practices

Pull Requests

Clear descriptions
Include tests
Update docs
Pass CI
Request review


📚 Documentation

User Guide
API Docs
Voice Commands
Deployment
Contributing


🔒 Security
Report Vulnerabilities
Email: security@neurodesk.com
Features

JWT authentication
Role-based access
SQL/XSS/CSRF protection
Rate limiting
Input validation


📄 License
MIT License

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
Contributors & Testers


📞 Support

Email: deepakm7778@gmail.com

Issues: GitHub




Made with ❤️ by the NeuroDesk Team

