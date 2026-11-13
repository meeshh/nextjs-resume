/** Job-offer length bounds, shared by the OfferInput form and the /api/openai route. */
export const MIN_OFFER_LENGTH = 150;
export const MAX_OFFER_LENGTH = 1500;

/** Skill-highlighting requests allowed per user per day (reset by the daily cron). */
export const DAILY_LIMIT = 3;
