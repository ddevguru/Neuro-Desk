🧠 NeuroDesk - AI-Powered Task & Team Management

  



  
  
  
  



  A voice-controlled, AI-powered platform for seamless task and team management.



  Live Demo •
  Documentation •
  Report Bug •
  Request Feature



🚀 Overview
NeuroDesk is a modern task and team management platform powered by voice recognition and AI. Built with Laravel 10.x, it offers a hands-free, intuitive experience with support for 20+ languages, real-time collaboration, and advanced analytics.
🎯 Key Features

🎤 Voice-Controlled Tasks: Create and manage tasks using natural voice commands.
🌐 Multi-Language Support: Supports 20+ languages with real-time translation.
🤖 AI Assistant: Context-aware help and task optimization suggestions.
💬 Real-Time Collaboration: Team messaging and live updates.
📊 Advanced Analytics: Interactive charts and customizable reports.
💰 Payment Integration: Automated payments and subscription management.


✨ Features
🎤 Voice-Controlled Task Management

Create tasks hands-free with natural language (e.g., "tomorrow" or "$50").
Assign tasks to team members via voice.
Supports 20+ languages with continuous listening.

👥 Team Management

Role-based access (Admin, Team Leader, Employee).
Smart email invitations via SMTP2GO.
Skill-based task assignments and performance tracking.

💬 Communication Hub

Voice-activated team and direct messaging.
Company-wide announcements.
Real-time notifications and email integration.

📊 Analytics & Reporting

Interactive dashboards for tasks, productivity, and payments.
Filter by 7, 30, 90 days, or yearly.
Export reports in PDF/Excel with Chart.js visuals.

💰 Payment System

Automatic payments on task completion.
RevenueCat for Premium/Enterprise subscriptions.
Multi-currency support and financial analytics.

🤖 AI Assistant

Context-aware guidance and productivity suggestions.
Adapts to user preferences via machine learning.

📱 Responsive Design

Mobile-first, WCAG 2.1 compliant.
Progressive Web App with dark/light mode.
Smooth CSS animations.


🛠️ Tech Stack



Category
Technologies



Backend
Laravel 10.x, PHP 8.1+, MySQL 8.0+, Redis


Frontend
Blade, Tailwind CSS 3.x, Vanilla JS, Chart.js


Integrations
SMTP2GO, RevenueCat, Web Speech API, S3


Tools
Composer, npm, Laravel Mix/Vite, PHPUnit, Dusk



📋 Installation
Prerequisites

PHP >= 8.1 (with PDO, OpenSSL, Mbstring, etc.)
Composer
MySQL >= 8.0 or MariaDB >= 10.3
Node.js >= 16.x with npm
Apache/Nginx (for production)

Steps

Clone Repository
git clone https://github.com/neurodesk/neurodesk-laravel.git
cd neurodesk-laravel


Install Dependencies
composer install --optimize-autoloader
npm install


Set Up Environment
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


Access

Web: http://localhost:8000
API Docs: http://localhost:8000/api/documentation




🎤 Voice Commands



Category
Command
Action



Tasks
"Create a new task"
Opens task creation dialog



"Assign task to [name]"
Assigns task to team member



"Mark task as complete"
Completes selected task


Communication
"Send message to team [message]"
Sends team message



"Send announcement [message]"
Broadcasts announcement


Navigation
"Go to dashboard"
Navigates to dashboard



"Go to tasks"
Navigates to task page


Team
"Invite [email]"
Sends team member invitation



📊 Subscription Plans

Free Plan:
5 team members
Basic task management
Limited voice commands


Premium Plan ($9.99/month):
25 team members
Advanced analytics
Full voice commands


Enterprise Plan ($29.99/month):
Unlimited members
Custom branding
API access



Visit x.ai/grok for pricing details.

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

Set up RevenueCat account
Configure products and webhooks
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

Unit: Core logic
Feature: End-to-end
Browser: Laravel Dusk
API: REST endpoints


🐛 Troubleshooting



Issue
Solution



Database
php artisan tinker; DB::connection()->getPdo();


Voice Recognition
Check permissions, use Chrome/Edge, ensure HTTPS


Email
php artisan mail:test your-email@example.com


Payments
Verify RevenueCat key, webhooks, SSL, sandbox mode


Logs: tail -f storage/logs/laravel.log
Debug: Set APP_DEBUG=true in .env

🤝 Contributing

Fork the repository
Create branch: git checkout -b feature/amazing-feature
Make changes, write tests
Run: php artisan test
Commit: git commit -m 'Add feature'
Push: git push origin feature/amazing-feature
Create Pull Request

Standards

PSR-12 coding style
Meaningful names
Comprehensive tests
PHPDoc documentation
Laravel best practices


📚 Documentation

User Guide
API Docs
Voice Commands
Deployment
Contributing


🔒 Security
Report Vulnerabilities: security@neurodesk.com
Features:

JWT authentication
Role-based access
SQL/XSS/CSRF protection
Rate limiting


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





  Made with ❤️ by the NeuroDesk Team
  
  
  
  
