// src/lib/email.ts
//
// ⚠️  DEPRECATED (April 2026)
// Email dispatch has been migrated to the LaventeCare AuthSystem backend.
// The contact form now calls /api/v1/public/contact on the Go backend,
// which handles dual-email dispatch (admin + user confirmation) via
// tenant-specific SMTP (Mijndomein.nl) with branded HTML templates.
//
// This file is kept temporarily for reference. Safe to delete.
// See: src/pages/api/contact.ts for the new flow.
//
// Previous dependency: Resend API (RESEND_API_KEY env var)
// New dependency: LaventeCare AuthSystem (PUBLIC_API_URL + PUBLIC_TENANT_ID)

export {};
