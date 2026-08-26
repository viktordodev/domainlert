const EMAIL_PATTERN = /^\S+@\S+\.\S+$/;
export const DOMAIN_PATTERN = /^(?=.{1,253}$)(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}$/i;
export const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function isEmail(value: string): boolean {
  return value.length <= 254 && EMAIL_PATTERN.test(value);
}

export type ThresholdErrorCode = "atLeastOne" | "wholeNumbers" | "tooMany";
export type ThresholdError = { code: ThresholdErrorCode; max?: number };
export type ThresholdValidation = { thresholds: number[] | null; error: ThresholdError | null };

/**
 * Parses a comma-separated list of day thresholds (1-365).
 * `allowEmpty: true` lets a blank input mean "use the default" (returns thresholds: null).
 * Errors are returned as codes so the caller can localize the message.
 */
export function validateThresholds(raw: string, { maxCount, allowEmpty }: { maxCount: number; allowEmpty: boolean }): ThresholdValidation {
  if (raw.length === 0) {
    if (allowEmpty) return { thresholds: null, error: null };
    return { thresholds: null, error: { code: "atLeastOne" } };
  }

  const parts = raw.split(",").map((part) => part.trim());
  const invalid = parts.some((part) => part.length === 0 || !/^\d{1,3}$/.test(part) || Number(part) < 1 || Number(part) > 365);

  if (invalid) {
    return { thresholds: null, error: { code: "wholeNumbers" } };
  }

  const thresholds = [...new Set(parts.map(Number))].sort((a, b) => b - a);

  if (thresholds.length > maxCount) {
    return { thresholds: null, error: { code: "tooMany", max: maxCount } };
  }

  return { thresholds, error: null };
}

export function parseRecipients(raw: string): string[] {
  return [...new Set(raw.split(/[\s,;]+/).map((email) => email.trim().toLowerCase()).filter(Boolean))];
}
