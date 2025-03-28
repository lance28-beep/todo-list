# Modern Todo App

A sleek and modern Todo application built with Next.js, TypeScript, Tailwind CSS, and Firebase. Features a beautiful dark/light mode UI, real-time updates, and secure authentication.

## Features

- 🎨 Modern and responsive UI with dark/light mode support
- 🔒 Secure authentication with multiple options:
  - Email/Password login and registration
  - Google Sign-in
- ✨ Real-time todo updates using Firebase
- 📱 Fully responsive design for all devices
- 🎯 Clean and intuitive user interface
- ⚡ Fast and optimized performance

## Tech Stack

- **Frontend**:
  - [Next.js 14](https://nextjs.org/) - React framework
  - [TypeScript](https://www.typescriptlang.org/) - Type safety
  - [Tailwind CSS](https://tailwindcss.com/) - Styling
  
- **Backend/Database**:
  - [Firebase](https://firebase.google.com/)
    - Authentication
    - Firestore (Real-time database)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Firebase account

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/todo-app.git
cd todo-app
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a Firebase project and get your configuration:
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project
   - Enable Authentication (Email/Password and Google)
   - Create a Firestore database
   - Get your Firebase configuration

4. Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

5. Run the development server:
```bash
npm run dev
# or
yarn dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
todo-app/
├── src/
│   ├── app/                 # Next.js app directory
│   ├── components/          # React components
│   │   ├── auth/           # Authentication components
│   │   └── todo/           # Todo-related components
│   ├── contexts/           # React contexts
│   ├── lib/                # Utility functions and Firebase setup
│   └── types/              # TypeScript type definitions
├── public/                 # Static files
└── ...config files
```

## Features in Detail

### Authentication
- Secure email/password authentication
- Google sign-in integration
- Protected routes and data
- Persistent login state

### Todo Management
- Create, read, update, and delete todos
- Real-time updates using Firestore
- Mark todos as complete/incomplete
- Clean and intuitive interface

### UI/UX
- Responsive design for all screen sizes
- Dark/light mode support
- Loading states and animations
- Error handling and user feedback
- Modern and minimalist design

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Developed by [Lance Valle](https://lance28-beep.github.io/portfolio-website/)
- Built with modern web technologies
- Inspired by clean and minimalist design principles

## Contact

Lance Valle - [Portfolio](https://lance28-beep.github.io/portfolio-website/)
