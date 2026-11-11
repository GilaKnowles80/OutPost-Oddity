# Outpost Oddity

**Outpost Oddity** is a gaming exploration index and digital mapping tracking utility designed for open-world exploration games. It is used to systematically map, locate, and track hidden regional outposts, bosses, and environmental "oddity" points of interest across the game map.

Whether you're hunting down secret outposts, documenting boss locations, or cataloging environmental anomalies, Outpost Oddity gives you the structure to organize your exploration data in one place.

---

## Features

- **Regional Outpost Mapping** — Record and track hidden outposts across game regions.
- **Boss Tracking** — Log boss locations, respawn timers, and encounter details.
- **Environmental Oddities** — Catalog unique points of interest and environmental anomalies.
- **Cross-Platform Access** — Playable via web, downloadable PWA, and native mobile apps.
- **Premium Tiers** — Free with ads, Premium subscription ($8/month or $95/year), and Admin staff access.
- **MIT License** — Open source and freely modifiable.

---

## Project Structure

```
outpost-oddity/
├── src/
│   ├── app/            # Next.js app router (pages, API routes)
│   ├── components/     # React components (auth, game, admin, ads)
│   ├── data/           # Game data (episodes, stories, dialogue)
│   ├── lib/            # Database client and schema (Neon PostgreSQL)
│   ├── middleware.ts   # Rate limiting and security headers
│   └── types/          # TypeScript type definitions
├── public/             # Static assets (logo, icons, manifest, service worker)
├── capacitor.config.ts # Capacitor config for Android/iOS native apps
├── next.config.js      # Next.js configuration
├── tailwind.config.ts  # Tailwind CSS configuration
├── package.json        # Dependencies and scripts
└── README.md           # This file
```

---

## Subscription Tiers

| Tier | Price | Features |
|------|-------|----------|
| **Free with Ads** | Free | Ad-supported access to all exploration content |
| **Premium** | $8/month or $95/year | Ad-free experience, full access to all regions |
| **Admin Staff** | Free (staff code required) | Exclusive admin dashboard and monitoring tools |

---

## Deployment

### Web (Vercel)

The app is deployed on Vercel and accessible via web browser and as an installable PWA.

### Native Mobile (Capacitor)

Android and iOS native apps can be built using Capacitor:

```bash
npx @capacitor/cli add android
npx @capacitor/cli add ios
npm run cap:build:android
npm run cap:build:ios
```

---

## License

This project is licensed under the **MIT License**. See the `LICENSE` file in the project root for full details.

---

## Contact

For support, bug reports, or feature requests: **gilaknowles80@gmail.com**

© 2026 Gila Cain Knowles Gul, Arda Tayfun Gul, Catherine Arayan Cain Knowles — MIT License
