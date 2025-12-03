# Services

## OpenSAT API Integration

This directory contains services for integrating with external APIs.

### opensat-api.ts

Fetches SAT practice questions from the [OpenSAT API](https://api.jsonsilo.com/public/942c3c3b-3a0c-4be3-81c2-12029def19f5).

**Features:**
- Fetches questions from the public OpenSAT JSON database
- Transforms API response format to match our internal Question type
- Maps OpenSAT domain names to our domain IDs
- Caches questions to avoid repeated API calls
- Falls back gracefully if API is unavailable

**Usage:**
```typescript
import { getOpenSATQuestions } from "@/services/opensat-api";

const questions = await getOpenSATQuestions();
```

Questions are automatically initialized when the dashboard loads and cached for the session.

