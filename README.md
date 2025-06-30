🧠 NeuroDesk - AI-Powered Task & Team Management System
<div align="center">
Show Image

Show Image
Show Image
Show Image
Show Image

A revolutionary voice-controlled, AI-powered task and team management platform that transforms how teams collaborate and manage projects.

Live Demo • Documentation • Report Bug • Request Feature

</div>
🚀 Overview
NeuroDesk is a cutting-edge task and team management platform that leverages the power of voice recognition and artificial intelligence to streamline team collaboration. Built with Laravel and modern web technologies, it offers an intuitive, hands-free approach to project management with support for 20+ languages.

🎯 Key Highlights
Voice-First Interface: Complete task management through natural voice commands
Multi-Language Support: Supports 20+ languages with real-time translation
AI-Powered Assistant: Context-aware help and intelligent task suggestions
Real-Time Collaboration: Team messaging, announcements, and live updates
Advanced Analytics: Comprehensive reporting with interactive charts
Flexible Payment System: Integrated payment tracking and subscription management
✨ Features
🎤 Voice-Controlled Task Management
Hands-Free Task Creation: Create complete tasks using voice commands through an intelligent dialog system
Natural Language Processing: Understands natural language inputs like "tomorrow", "next week", "fifty dollars"
Voice Task Assignment: Assign tasks to team members using voice commands
Multi-Language Voice Support: Accepts voice commands in 20+ languages
Continuous Voice Listening: Always-on voice recognition for seamless interaction
👥 Advanced Team Management
Role-Based Access Control: Admin, Team Leader, and Employee roles with customized permissions
Smart Member Invitations: Professional email invitations with SMTP2GO integration
Skill-Based Task Assignment: Automatic task assignment based on team member skills
Team Statistics: Comprehensive team performance and productivity metrics
Member Activity Tracking: Monitor team member engagement and task completion rates
💬 Integrated Communication Hub
Voice-Activated Messaging: Send team messages using voice commands
Broadcast Announcements: Company-wide announcements with voice activation
Direct Messaging: Private conversations between team members
Email Integration: Professional email notifications and invitations
Real-Time Notifications: Instant updates on task changes and messages
📊 Comprehensive Analytics & Reporting
Interactive Dashboards: Real-time task status, productivity, and payment analytics
Advanced Filtering: Analyze data by 7 days, 30 days, 90 days, or yearly periods
Export Capabilities: Download reports in PDF and Excel formats
Chart.js Integration: Beautiful, interactive charts and graphs
Custom Report Generation: Create tailored reports for specific needs
💰 Integrated Payment System
Automatic Payment Processing: Payments triggered upon task completion
Payment History Tracking: Complete audit trail of all transactions
Subscription Management: RevenueCat integration for Premium and Enterprise plans
Payment Analytics: Detailed financial reporting and forecasting
Multi-Currency Support: Handle payments in various currencies
🤖 AI Assistant
Context-Aware Help: Intelligent assistance based on current user context
Voice Command Guidance: Comprehensive help with voice commands and features
Productivity Suggestions: AI-powered recommendations for task optimization
Learning Capabilities: Adapts to user preferences and usage patterns
📱 Responsive Design
Mobile-First Approach: Fully responsive design optimized for all devices
Progressive Web App: App-like experience on mobile devices
Smooth Animations: Polished user experience with CSS animations
Accessibility Features: WCAG 2.1 compliant design
Dark/Light Mode: User-selectable theme preferences
🛠️ Technology Stack
Backend
Framework: Laravel 10.x
Language: PHP 8.1+
Database: MySQL 8.0+
Authentication: Laravel Breeze with JWT tokens
Queue System: Redis for background job processing
Frontend
Template Engine: Blade templating
CSS Framework: Tailwind CSS 3.x
JavaScript: Vanilla JS with ES6+
Charts: Chart.js for data visualization
Voice Recognition: Web Speech API
Third-Party Integrations
Email Service: SMTP2GO for reliable email delivery
Payment Processing: RevenueCat for subscription management
Voice Processing: Web Speech API with fallback support
File Storage: Laravel File Storage with S3 compatibility
Development Tools
Package Manager: Composer (PHP), npm (JavaScript)
Build Tools: Laravel Mix / Vite
Testing: PHPUnit, Laravel Dusk
Code Quality: PHP CS Fixer, ESLint
📋 Installation & Setup
Prerequisites
Ensure you have the following installed on your system:

PHP: >= 8.1 with required extensions (PDO, OpenSSL, Mbstring, Tokenizer, XML, Ctype, JSON, BCMath)
Composer: Latest version
MySQL: >= 8.0 or MariaDB >= 10.3
Node.js: >= 16.x with npm
Web Server: Apache/Nginx (for production)
Quick Start
Clone the Repository
bash
git clone https://github.com/neurodesk/neurodesk-laravel.git
cd neurodesk-laravel
Install PHP Dependencies
bash
composer install --optimize-autoloader
Install Node.js Dependencies
bash
npm install
Environment Configuration
bash
cp .env.example .env
php artisan key:generate
Configure Database
env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=neurodesk
DB_USERNAME=your_mysql_user
DB_PASSWORD=your_mysql_password
Configure Email Service (SMTP2GO)
env
MAIL_MAILER=smtp
MAIL_HOST=smtp2go.com
MAIL_PORT=587
MAIL_USERNAME=your_smtp2go_username
MAIL_PASSWORD=your_smtp2go_password
MAIL_FROM_ADDRESS=noreply@yourcompany.com
MAIL_FROM_NAME=NeuroDesk
Configure Payment Service (RevenueCat)
env
REVENUECAT_API_KEY=your_revenuecat_api_key
REVENUECAT_WEBHOOK_SECRET=your_webhook_secret
Run Migrations and Seeders
bash
php artisan migrate --seed
Compile Assets
bash
npm run build
Start the Development Server
bash
php artisan serve
Access the Application
Web Interface: http://localhost:8000
API Documentation: http://localhost:8000/api/documentation
🎤 Voice Commands Reference
Task Management
"Create a new task" - Opens voice-guided task creation dialog
"Assign task to [name]" - Assigns selected task to team member
"Mark task as complete" - Completes the currently selected task
"Show my tasks" - Displays user's assigned tasks
"Filter tasks by priority" - Filters tasks by priority level
Communication
"Send message to team [message]" - Sends message to entire team
"Send message to [name] [message]" - Sends direct message
"Send announcement [message]" - Broadcasts announcement
"Show recent messages" - Displays recent team communications
Navigation
"Go to dashboard" - Navigate to main dashboard
"Go to tasks" - Navigate to task management page
"Go to reports" - Navigate to analytics page
"Go to team" - Navigate to team management page
"Go to settings" - Navigate to user settings
Team Management
"Invite [email]" - Sends invitation to new team member
"Show team statistics" - Displays team performance metrics
"Create new team" - Initiates team creation process
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
Custom integrations
🔧 Configuration
Voice Recognition Setup
Ensure microphone permissions are granted
Use Chrome or Edge for best compatibility
Configure language preferences in settings
Test voice recognition in the settings panel
Email Configuration
Sign up for SMTP2GO account
Obtain SMTP credentials
Configure MAIL_* variables in .env
Test email functionality with php artisan mail:test
Payment Configuration
Create RevenueCat account
Set up subscription products
Configure webhooks for payment notifications
Test payment flow in sandbox mode
🚀 Deployment
Production Deployment
Server Requirements
PHP 8.1+ with required extensions
MySQL 8.0+ or MariaDB 10.3+
Web server (Apache/Nginx)
SSL certificate for HTTPS
Environment Setup
bash
composer install --optimize-autoloader --no-dev
npm run production
php artisan config:cache
php artisan route:cache
php artisan view:cache
Database Migration
bash
php artisan migrate --force
Queue Workers
bash
php artisan queue:work --daemon
Task Scheduling Add to crontab:
bash
* * * * * cd /path/to/neurodesk && php artisan schedule:run >> /dev/null 2>&1
Docker Deployment
dockerfile
# Use official PHP image
FROM php:8.1-fpm

# Install dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    libpng-dev \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    locales \
    zip \
    jpegoptim optipng pngquant gifsicle \
    vim \
    unzip \
    git \
    curl \
    libonig-dev \
    libxml2-dev \
    libzip-dev

# Install PHP extensions
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd zip

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www

# Copy application code
COPY . /var/www

# Install dependencies
RUN composer install --optimize-autoloader --no-dev

# Set permissions
RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache

EXPOSE 9000
CMD ["php-fpm"]
🧪 Testing
Running Tests
bash
# Run all tests
php artisan test

# Run specific test suite
php artisan test --testsuite=Feature

# Run tests with coverage
php artisan test --coverage
Test Categories
Unit Tests: Core functionality and business logic
Feature Tests: End-to-end application features
Browser Tests: Automated browser testing with Laravel Dusk
API Tests: REST API endpoint testing
🐛 Troubleshooting
Common Issues
Database Connection Errors
bash
# Check database connection
php artisan tinker
DB::connection()->getPdo();
Voice Recognition Not Working
Ensure microphone permissions are granted
Use Chrome or Edge browser
Check HTTPS connection (required for microphone access)
Verify microphone hardware functionality
Email Delivery Issues
bash
# Test email configuration
php artisan mail:test your-email@example.com
Payment Processing Problems
Verify RevenueCat API key
Check webhook URL configuration
Ensure SSL certificate is valid
Test in sandbox mode first
Debug Mode
Enable debug mode for development:

env
APP_DEBUG=true
APP_ENV=local
Logs
Monitor application logs:

bash
tail -f storage/logs/laravel.log
🤝 Contributing
We welcome contributions from the community! Here's how you can help:

Development Setup
Fork the repository
Create a feature branch
bash
git checkout -b feature/amazing-feature
Make your changes
Write tests for new functionality
Run the test suite
bash
php artisan test
Commit your changes
bash
git commit -m 'Add amazing feature'
Push to your branch
bash
git push origin feature/amazing-feature
Create a Pull Request
Coding Standards
Follow PSR-12 coding standards
Use meaningful variable and function names
Write comprehensive tests
Document your code with PHPDoc
Use Laravel best practices
Pull Request Guidelines
Provide clear description of changes
Include relevant tests
Update documentation if needed
Ensure CI passes
Request review from maintainers
📚 Documentation
User Guide: docs/user-guide.md
API Documentation: docs/api.md
Voice Commands: docs/voice-commands.md
Deployment Guide: docs/deployment.md
Contributing Guide: CONTRIBUTING.md
🔒 Security
Reporting Security Vulnerabilities
If you discover a security vulnerability, please send an email to security@neurodesk.com. All security vulnerabilities will be promptly addressed.

Security Features
JWT token authentication
Role-based access control
SQL injection prevention
XSS protection
CSRF protection
Rate limiting
Input validation and sanitization
📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

👨‍💻 Team
Core Developers
<div align="center">
Show Image
Show Image
Deepak Mishra	Vrushali Nanavati
Lead Developer	UI/UX Designer & Frontend Developer
GitHub	GitHub
</div>
🙏 Acknowledgments
Laravel community for the amazing framework
Chart.js for beautiful data visualizations
Tailwind CSS for the utility-first CSS framework
SMTP2GO for reliable email delivery
RevenueCat for subscription management
All contributors and beta testers
📞 Support
Email: support@neurodesk.com
Documentation: docs.neurodesk.com
Community: Discord Server
Issues: GitHub Issues
<div align="center">
Made with ❤️ by the NeuroDesk Team


</div>
