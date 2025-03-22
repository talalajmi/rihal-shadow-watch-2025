# Shadow Watch 2025

A real-time crime reporting and visualization platform built with Next.js and Google Maps for Rihal's CodeStacker 2025 Challenge.

## Overview

Shadow Watch 2025 provides an interactive interface for citizens to report crimes and visualize crime data on a map, helping communities stay informed about safety concerns in their area. The application features a modern UI built with Next.js and Tailwind CSS, integrating Google Maps for seamless location-based reporting and visualization.

## Features

### Interactive Crime Map

- Real-time visualization of reported crimes on Google Maps
- Responsive map interface that works across devices

### Crime Reporting System

- User-friendly form for submitting crime reports
- Location selection directly on the map
- Support for various crime categories (Assault, Robbery, Homicide, Kidnapping)
- National ID verification for report authentication

### Search & Filter Capabilities

- Search functionality to find specific crime reports
- Category-based filtering with visual indicators
- Toggle filters for improved user experience

### Responsive Design

- Optimized UI for both desktop and mobile users
- Touch-friendly interactions for mobile users
- Clean, scrollbar-free interface

## Tech Stack

- **Frontend:** [Next.js 15.2.2](https://nextjs.org/) with TypeScript
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) with custom theme
- **Mapping:** [Google Maps API](https://mapsplatform.google.com/) via [`@vis.gl/react-google-maps`](https://www.npmjs.com/package/@vis.gl/react-google-maps)
- **Backend:** Next.js API routes
- **Database:** File-based JSON storage
- **Form Validation:** [Zod schema validation](https://zod.dev/)
- **UI Components:** Custom [shadcn/ui](https://ui.shadcn.com/)-derived components
- **Icons:** [Flaticon](https://www.flaticon.com/)

## Prerequisites

Before you begin, ensure you have:

- Node.js 18.x or later
- npm, yarn, or pnpm package manager
- Google Maps API key (with Maps JavaScript API enabled)
- Google Maps Map ID (for custom styling)

## Installation

### Clone the repository:

```sh
git clone https://github.com/yourusername/rihal-shadow-watch-2025.git
cd rihal-shadow-watch-2025
```

### Install dependencies:

```sh
npm install
# or
yarn install
# or
pnpm install
```

### Set up environment variables:

Create a `.env.local` file in the root directory with:

```
NODE_ENV=development
NEXT_PUBLIC_API_DEV_URL=http://localhost:3000/api
NEXT_PUBLIC_API_PROD_URL=https://rihal-shadow-watch-2025.vercel.app/api
GOOGLE_MAPS_API_KEY=your_api_key_here
GOOGLE_MAPS_MAP_ID=your_map_id_here
```

## Development

Run the development server:

```sh
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Building for Production

### Build the application:

```sh
npm run build
# or
yarn build
# or
pnpm build
```

### Start the production server:

```sh
npm start
# or
yarn start
# or
pnpm start
```

## Performance Considerations

- Client-side form validation to reduce server load
- Optimized map marker rendering
- Next.js image optimization
- API routes designed for quick response times

## Contact

**Talal Al Ajmi** - [talalajmi98@gmail.com](mailto:talalajmi98@gmail.com)

### Project Link

[Shadow Watch 2025](https://rihal-shadow-watch-2025.vercel.app/)
