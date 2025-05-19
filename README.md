# MediFlow HMS

MediFlow HMS is a comprehensive Hospital Management System built to streamline hospital operations, improve patient care, and enhance administrative efficiency. This centralised platform offers modules for appointment scheduling, bed management, electronic medical records, medicine inventory, staff management, and educational content.

## Features

- **Appointment Scheduling**: Easily schedule and manage patient appointments with doctors.
- **Bed Management**: Real-time view of bed availability and assignments.
- **Electronic Medical Records (EMR)**: Secure access to patient history and medical data.
- **Medicine Inventory**: Track stock levels and manage medicine supplies.
- **Staff Management**: Efficiently manage staff schedules and shifts.
- **Educational Content**: Access training materials and patient wellness guides.

## Technologies Used

### Frontend
- **Next.js** (React framework): For server-side rendering and dynamic web pages.
- **React**: UI components, hooks, and state management.
- **TypeScript**: Type safety and robust code.
- **Lucide-React**: Icon library for modern UI.
- **Custom UI Components**: For dialogs, calendars, navigation, and more.
- **Tailwind CSS / Utility Classes**: For responsive and modern design.

### Backend
- **Next.js API Routes**: Backend logic for handling API requests.
- **Prisma ORM**: Database management with type-safe queries.
- **TypeScript**: Ensures backend reliability and maintainability.
- **RESTful API Structure**: For operations like patient, bed, and staff management.

### Deployment
- **Vercel**: Cloud platform optimized for Next.js for seamless CI/CD, serverless deployment, and global CDN.

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm / yarn / pnpm / bun

### Installation

Clone the repository:

```bash
git clone https://github.com/sallyk0127/mediflow-hms.git
cd mediflow-hms
```

Install dependencies:

```bash
npm install
# or
yarn
# or
pnpm install
# or
bun install
```

### Running the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

### Database Setup

- This project uses **Prisma** as ORM. Make sure to set up your database and configure the connection string in `.env`.
- To apply migrations:
  ```bash
  npx prisma migrate dev
  ```

- To seed demo data:
  ```bash
  node prisma/seedStaff.js
  ```

## Deployment

Deploy easily on **Vercel** for production. Push your code to GitHub and import the repository into [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

More details: [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying)

## Folder Structure

- `/app` - Main application pages and API routes
- `/components` - Reusable UI components
- `/prisma` - Prisma schema and seed scripts
- `/public` - Static files

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

MIT

## Creators

Victoria University Sydney Campus IT Capstone Project 2 students
- Reynaldo Chen
- Minjung (Sally) Kim
- Frandika Tandela

---
