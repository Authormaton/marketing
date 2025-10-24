import { classNames, formatYear } from './utils';

describe('classNames', () => {
  it('should join class names correctly', () => {
    expect(classNames('a', 'b', 'c')).toBe('a b c');
  });

  it('should handle conditional class names', () => {
    expect(classNames('a', true && 'b', false && 'c', 'd')).toBe('a b d');
  });

  it('should handle arrays of class names', () => {
    expect(classNames('a', ['b', 'c'], 'd')).toBe('a b c d');
  });

  it('should filter out falsy values', () => {
    expect(classNames('a', null, undefined, '', 0, 'b')).toBe('a b');
  });
});

describe('formatYear', () => {
  it('should return the current year', () => {
    const currentYear = new Date().getFullYear();
    expect(formatYear()).toBe(currentYear);
  });
});
