# SmartPartner AI Website - Project Setup

## Tech Stack
- **Framework**: Next.js 15+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Font**: Geist Sans & Geist Mono

## Color Scheme

### Tailwind Classes
- `bg-primary` / `text-primary` - Primary Blue (#1e40af)
- `bg-accent` / `text-accent` - Orange Accent (#ea580c)
- `bg-dark` / `text-dark` - Dark Blue (#1e293b)

### Usage Examples
```tsx
// Primary CTA Button
<button className="bg-primary text-white px-6 py-3 rounded-lg">
  Get Started
</button>

// Accent/Highlight Button
<button className="bg-accent text-white px-6 py-3 rounded-lg">
  Limited Offer
</button>

// Dark Section Background
<section className="bg-dark text-white py-16">
  <h2>Dark Section</h2>
</section>
```

## Project Structure

```
smartpartner-website/
├── app/
│   ├── globals.css       # Tailwind config & global styles
│   ├── layout.tsx        # Root layout with metadata
│   └── page.tsx          # Homepage
├── components/           # Reusable React components
├── lib/                  # Utility functions & helpers
├── types/                # TypeScript type definitions
└── public/               # Static assets (images, fonts)
```

## Development

### Run Development Server
```bash
npm run dev
```

Visit: http://localhost:3000

### Build for Production
```bash
npm run build
npm start
```

## Next Steps

1. Build out individual sections (Hero, Services, About, etc.)
2. Create reusable components in `/components`
3. Add responsive design breakpoints
4. Integrate contact forms and CTAs
5. Add animations and interactions
6. Optimize images and performance

## Design Guidelines

- Use consistent spacing (multiples of 4: 4, 8, 16, 24, 32)
- Maintain visual hierarchy with font sizes
- Ensure sufficient color contrast for accessibility
- Keep components modular and reusable
- Mobile-first responsive design
