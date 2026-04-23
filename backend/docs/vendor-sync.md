# Vendor Sync (Tamil Nadu Wedding Businesses)

This module builds location-wise search plans across Tamil Nadu and syncs Google Places results into the `vendors` collection.

## 1) Environment variables

Add this key in `backend/.env`:

```env
GOOGLE_PLACES_API_KEY=your_google_places_api_key

# Optional automatic online sync (cron)
ENABLE_VENDOR_SYNC_CRON=false
VENDOR_SYNC_CRON_SCHEDULE=30 2 * * *
VENDOR_SYNC_TIMEZONE=Asia/Kolkata
VENDOR_SYNC_FOCUS_KEYS=wedding-photography,wedding-cards
VENDOR_SYNC_DISTRICTS=
VENDOR_SYNC_INCLUDE_BROAD=false
VENDOR_SYNC_MAX_QUERIES=250
VENDOR_SYNC_MAX_RESULTS_PER_QUERY=8
```

## 2) Focus categories

Default focus groups:
- `wedding-photography`
- `wedding-cards`

Optional broader sync group:
- `wedding-core-services`

You can also include broad wedding keywords via `includeBroadKeywords=true`.

## 3) API endpoints

### Get sync catalog

`GET /api/vendors/sync/catalog`

Returns available districts, focus groups, defaults, and broad keywords.

### Build search plan

`GET /api/vendors/sync/search-plan`

Query parameters:
- `focusKeys` (comma-separated)
- `districts` (comma-separated)
- `includeBroadKeywords` (`true/false`)
- `maxQueries` (number)

Example:

```http
GET /api/vendors/sync/search-plan?focusKeys=wedding-photography,wedding-cards&maxQueries=200
```

### Sync from Google Places (admin only)

`POST /api/vendors/sync/google`

Payload fields:
- `focusKeys`: string[]
- `districts`: string[] (optional; empty = all Tamil Nadu districts)
- `includeBroadKeywords`: boolean
- `dryRun`: boolean
- `maxQueries`: number
- `maxResultsPerQuery`: number

Example dry run:

```json
{
  "focusKeys": ["wedding-photography", "wedding-cards"],
  "dryRun": true,
  "maxQueries": 250,
  "maxResultsPerQuery": 8
}
```

For live sync set `dryRun` to `false`.

## 4) Notes

- Data is upserted by source key: `source.type=google_places` + `source.externalId=place_id`.
- Synced vendors are marked `verified=true` and tagged with district, locality, and search metadata.
- Manual vendors continue to work as before.
- If cron is enabled, sync runs automatically using the configured schedule and timezone.
