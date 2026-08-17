# NovaFix — AI-Powered Digital Support Platform

NovaFix is a modern digital support platform designed to help users manage support requests, communicate with support staff, and receive automated assistance through an AI-powered chat experience.

The project was built as a portfolio project to demonstrate front-end development, UI/UX design, role-based interfaces, customer support workflows, multilingual support, dark/light themes, and AI API integration.

---

## 🚀 Project Overview

NovaFix provides a clean and professional support experience for customers who need help with digital account-related issues.

The platform includes:

- Customer registration and login
- Customer support messaging
- Support tickets
- Role-based access
- Owner and employee dashboards
- Multilingual interface
- Dark and Light mode
- AI-powered customer support
- OpenAI API integration
- Vercel deployment
- GitHub version control

The project currently works mainly as a portfolio/demo application.

---

## ✨ Features

### 👤 User Accounts

Users can create an account using:

- Email address
- Mobile number

After signing in, customers can access their personal dashboard.

The current demo stores account data locally in the browser using `localStorage`.

---

### 🎫 Support Tickets

Customers can create support tickets and describe the issue they are experiencing.

A ticket can contain:

- Platform name
- Problem type
- Problem description
- Current ticket status
- Payment status

The interface also includes a simulated `$5` service payment system for demonstration purposes.

---

### 💬 Customer Support Chat

Customers can communicate directly with the support system from their account.

The support interface includes:

- Customer messages
- Support replies
- Conversation history
- AI-generated responses
- Human support intervention

The Owner and Employee roles can access the customer support inbox and communicate with customers.

---

## 🤖 Nova AI

NovaFix includes an AI support assistant called **Nova AI**.

Nova AI is designed to behave like a natural customer support assistant rather than a simple keyword-based chatbot.

It can:

- Understand conversational messages
- Understand greetings such as:
  - `السلام عليكم`
  - `Hello`
  - `Hola`
  - `你好`
- Handle short follow-up messages
- Use recent conversation context
- Understand common Arabic and casual Saudi/Gulf expressions
- Ask useful follow-up questions
- Provide step-by-step troubleshooting
- Reply in the user's selected language

The AI is also instructed to avoid requesting sensitive information such as:

- Passwords
- OTP codes
- SMS verification codes
- Backup codes
- Authentication tokens
- Session cookies

Nova AI is intended to assist only with legitimate recovery and security procedures for accounts owned by the customer or accounts they are authorized to manage.

---

## 🧠 OpenAI Integration

The project includes a server-side API endpoint:

```text
/api/support-ai
