import { describe, expect, test } from 'bun:test';
import { generateSkillVariations } from './skillVariations';

describe('generateSkillVariations', () => {
  test('expands known aliases and de-duplicates', () => {
    const variations = generateSkillVariations('React, react, TypeScript');

    expect(variations).toContain('React.js');
    expect(variations).toContain('TS');
    expect(new Set(variations).size).toBe(variations.length);
  });

  test('extracts the language name from "X language"', () => {
    expect(generateSkillVariations('Swedish language')).toContain('swedish');
  });

  test('ignores empty entries', () => {
    expect(generateSkillVariations(' , ,')).toEqual([]);
  });
});
