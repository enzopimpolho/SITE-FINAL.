// Arquivo gerado por scripts/build-api.mjs a partir de server/api. Não edite à mão.

// server/prospect.ts
var FIELD_MASK = [
  "places.id",
  "places.displayName",
  "places.formattedAddress",
  "places.nationalPhoneNumber",
  "places.rating",
  "places.userRatingCount",
  "places.websiteUri",
  "places.types",
  "places.location"
].join(",");
function health(apiKey) {
  return { status: 200, body: { status: "ok", placesConfigured: Boolean(apiKey) } };
}

// server/api/health.ts
function GET() {
  const result = health(process.env.GOOGLE_MAPS_API_KEY);
  return Response.json(result.body, { status: result.status });
}
export {
  GET
};
