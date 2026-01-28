// Database types - these will be auto-generated later with `npm run db:generate`
// For now, defining manually

export interface Lead {
  id: string
  business_name: string
  slug: string
  category: string | null
  suburb: string | null
  state: string
  phone: string | null
  email: string | null
  google_place_id: string | null
  google_data: Record<string, any> | null
  status: 'new' | 'contacted' | 'responded' | 'converted' | 'rejected'
  source: 'organic' | 'outreach' | 'referral'
  preview_site_id: string | null
  created_at: string
  updated_at: string
}

export interface Customer {
  id: string
  lead_id: string | null
  stripe_customer_id: string | null
  email: string
  phone: string | null
  first_name: string | null
  last_name: string | null
  business_name: string
  plan: 'starter' | 'growth' | 'pro'
  status: 'active' | 'paused' | 'cancelled'
  updates_this_month: number
  billing_cycle_start: string | null
  created_at: string
  updated_at: string
}

export interface ClientSite {
  id: string
  customer_id: string | null
  slug: string
  custom_domain: string | null
  domain_verified: boolean
  status: 'preview' | 'live' | 'paused' | 'deleted'
  template: string
  content: Record<string, any>
  settings: Record<string, any>
  published_at: string | null
  created_at: string
  updated_at: string
}

export interface UpdateRequest {
  id: string
  customer_id: string
  site_id: string
  channel: 'sms' | 'email' | 'dashboard'
  raw_message: string
  parsed_intent: Record<string, any> | null
  status: 'pending' | 'processing' | 'preview_sent' | 'approved' | 'published' | 'rejected'
  preview_url: string | null
  processed_by: 'ai' | 'manual' | null
  completed_at: string | null
  created_at: string
}

export interface Subscription {
  id: string
  customer_id: string
  stripe_subscription_id: string
  stripe_price_id: string
  plan: 'starter' | 'growth' | 'pro'
  status: 'active' | 'past_due' | 'cancelled' | 'paused'
  current_period_start: string
  current_period_end: string
  cancel_at_period_end: boolean
  created_at: string
  updated_at: string
}

// Database type for Supabase client
export interface Database {
  public: {
    Tables: {
      leads: {
        Row: Lead
        Insert: Omit<Lead, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Lead, 'id' | 'created_at' | 'updated_at'>>
      }
      customers: {
        Row: Customer
        Insert: Omit<Customer, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Customer, 'id' | 'created_at' | 'updated_at'>>
      }
      client_sites: {
        Row: ClientSite
        Insert: Omit<ClientSite, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<ClientSite, 'id' | 'created_at' | 'updated_at'>>
      }
      update_requests: {
        Row: UpdateRequest
        Insert: Omit<UpdateRequest, 'id' | 'created_at'>
        Update: Partial<Omit<UpdateRequest, 'id' | 'created_at'>>
      }
      subscriptions: {
        Row: Subscription
        Insert: Omit<Subscription, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Subscription, 'id' | 'created_at' | 'updated_at'>>
      }
    }
  }
}
