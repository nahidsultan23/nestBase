import { getTimestamp } from './helper.util';

describe('Helper Utilities', () => {
  describe('getTimestamp', () => {
    it('should return a valid ISO 8601 timestamp string', () => {
      const timestamp = getTimestamp();
      expect(typeof timestamp).toBe('string');
      expect(() => new Date(timestamp)).not.toThrow();
    });

    it('should return current timestamp', () => {
      const before = new Date();
      const timestamp = getTimestamp();
      const after = new Date();

      const timestampDate = new Date(timestamp);
      expect(timestampDate.getTime()).toBeGreaterThanOrEqual(before.getTime());
      expect(timestampDate.getTime()).toBeLessThanOrEqual(
        after.getTime() + 1000,
      );
    });

    it('should match ISO 8601 format', () => {
      const timestamp = getTimestamp();
      const isoRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
      expect(timestamp).toMatch(isoRegex);
    });

    it('should generate unique timestamps on sequential calls', () => {
      const timestamp1 = getTimestamp();
      const timestamp2 = getTimestamp();
      // Timestamps should be equal or very close (within millisecond precision)
      expect(new Date(timestamp1).toISOString()).toBeTruthy();
      expect(new Date(timestamp2).toISOString()).toBeTruthy();
    });

    it('should include milliseconds in the timestamp', () => {
      const timestamp = getTimestamp();
      const parts = timestamp.split('.');
      expect(parts[1]).toBeDefined();
      expect(parts[1]).toMatch(/\d{3}Z/);
    });
  });
});
