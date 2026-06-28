// Verhoog dit bij een bewuste reset: lokale opslag (nieuwe storage-key) én
// cloud-snapshots met een oudere versie worden dan genegeerd, zodat iedereen
// opnieuw onboardt. Houd de storage-key in lib/store.ts hiermee in sync.
export const SCHEMA_VERSION = 2;
