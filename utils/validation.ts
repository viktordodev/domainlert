const EMAIL_PATTERN = /^\S+@\S+\.\S+$/;
export const DOMAIN_PATTERN = /^(?=.{1,253}$)(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}$/i;
export const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function isEmail(value: string): boolean {
  return value.length <= 254 && EMAIL_PATTERN.test(value);
}

export type ThresholdValidation = { thresholds: number[] | null; error: string | null };

/**
 * Parses a comma-separated list of day thresholds (1-365).
 * `allowEmpty: true` lets a blank input mean "use the default" (returns thresholds: null).
 */
export function validateThresholds(raw: string, { maxCount, allowEmpty }: { maxCount: number; allowEmpty: boolean }): ThresholdValidation {
  const blankHint = allowEmpty ? ", or leave blank to use your default" : "";

  if (raw.length === 0) {
    if (allowEmpty) return { thresholds: null, error: null };
    return { thresholds: null, error: "Enter at least one valid day threshold (1-365), separated by commas." };
  }

  const parts = raw.split(",").map((part) => part.trim());
  const invalid = parts.some((part) => part.length === 0 || !/^\d{1,3}$/.test(part) || Number(part) < 1 || Number(part) > 365);

  if (invalid) {
    return { thresholds: null, error: `Use whole-number thresholds from 1 to 365, separated by commas${blankHint}.` };
  }

  const thresholds = [...new Set(parts.map(Number))].sort((a, b) => b - a);

  if (thresholds.length > maxCount) {
    return { thresholds: null, error: `Use ${maxCount} or fewer thresholds${blankHint}.` };
  }

  return { thresholds, error: null };
}

export function parseRecipients(raw: string): string[] {
  return [...new Set(raw.split(/[\s,;]+/).map((email) => email.trim().toLowerCase()).filter(Boolean))];
}
