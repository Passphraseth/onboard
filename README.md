# Onboard 🛫

No bullsh*t websites for service businesses. Updates by text message.

## Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Set up Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Go to SQL Editor and run the contents of `supabase/schema.sql`
3. Get your API keys from Settings → API

### 3. Set up Stripe

1. Go to [dashboard.stripe.com](https://dashboard.stripe.com)
2. Create 3 products with monthly prices:
   - **Starter** - $29/mo
   - **Growth** - $49/mo
   - **Pro** - $79/mo
3. Copy the Price IDs (start with `price_`)
4. Set up a webhook endpoint: `https://your-domain.com/api/webhooks/stripe`
   - Events to listen for:
     - `checkout.session.completed`
     - `invoice.paid`
     - `invoice.payment_failed`
     - `customer.subscription.updated`
     - `customer.subscription.deleted`

### 4. Configure environment

Copy `.env.example` to `.env.local` and fill in:

```bash
cp .env.example .env.local
```

Required variables:
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anon key
- `SUPABASE_SERVICE_ROLE_KEY` - Your Supabase service role key
- `STRIPE_SECRET_KEY` - Your Stripe secret key (sk_test_...)
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Your Stripe publishable key (pk_test_...)
- `STRIPE_WEBHOOK_SECRET` - Your Stripe webhook signing secret (whsec_...)
- `STRIPE_PRICE_STARTER` - Price ID for Starter plan
- `STRIPE_PRICE_GROWTH` - Price ID for Growth plan
- `STRIPE_PRICE_PRO` - Price ID for Pro plan
- `NEXT_PUBLIC_APP_URL` - Your app URL (http://localhost:3000 for dev)

### 5. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
onboard-app/
├── app/
│   ├── page.tsx              # Homepage
│   ├── pricing/page.tsx      # Pricing page
│   ├── checkout/page.tsx     # Checkout flow
│   ├── welcome/page.tsx      # Post-payment success
│   ├── claim/[slug]/page.tsx # Claim preview site
│   ├── (dashboard)/
│   │   └── dashboard/page.tsx # Customer dashboard
│   └── api/
│       ├── checkout/route.ts      # Create Stripe checkout
│       ├── preview/route.ts       # Create preview
│       ├── preview/[slug]/route.ts # Get preview
│       └── webhooks/stripe/route.ts # Stripe webhooks
├── lib/
│   ├── stripe/client.ts      # Stripe config & plans
│   ├── supabase/client.ts    # Browser Supabase client
│   ├── supabase/server.ts    # Server Supabase client
│   ├── supabase/types.ts     # Database types
│   └── utils.ts              # Utility functions
├── supabase/
│   └── schema.sql            # Database schema
└── .env.example              # Environment template
```

## Key Flows

### Preview → Checkout → Customer

1. User enters business name on homepage
2. System creates a lead + preview site
3. User redirected to `/claim/[slug]` to see preview
4. User selects plan → Stripe Checkout
5. Webhook creates customer record
6. User redirected to `/welcome`
7. User can access `/dashboard`

### Update Request Flow

1. Customer texts/emails/uses dashboard
2. Request logged in `update_requests` table
3. AI parses intent (TODO)
4. Preview generated and sent to customer
5. Customer approves → published to live site

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import to Vercel
3. Add environment variables
4. Deploy

### Stripe Webhook

After deploying, update your Stripe webhook URL to:
```
https://your-domain.vercel.app/api/webhooks/stripe
```

## Next Steps

- [ ] Add authentication (magic links)
- [ ] Build site template renderer
- [ ] Add AI update parsing (Claude API)
- [ ] SMS integration (Twilio)
- [ ] Email integration (Resend)
- [ ] Admin dashboard
- [ ] Lead scraping automation

## Support

Questions? Email hello@onboard.com.au
