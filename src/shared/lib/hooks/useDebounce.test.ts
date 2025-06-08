import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useDebounce } from './useDebounce';

describe('useDebounce', () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it('should return initial value immediately', () => {
		const { result } = renderHook(() => useDebounce('initial', 300));
		expect(result.current).toBe('initial');
	});

	it('should debounce value changes', () => {
		const { result, rerender } = renderHook(
			({ value, delay }) => useDebounce(value, delay),
			{
				initialProps: { value: 'initial', delay: 300 },
			}
		);

		expect(result.current).toBe('initial');

		// Change value
		rerender({ value: 'updated', delay: 300 });
		expect(result.current).toBe('initial'); // Should still be initial

		// Fast forward time
		act(() => {
			vi.advanceTimersByTime(300);
		});

		expect(result.current).toBe('updated');
	});

	it('should reset timer on rapid changes', () => {
		const { result, rerender } = renderHook(
			({ value, delay }) => useDebounce(value, delay),
			{
				initialProps: { value: 'initial', delay: 300 },
			}
		);

		rerender({ value: 'change1', delay: 300 });
		act(() => {
			vi.advanceTimersByTime(150);
		});

		rerender({ value: 'change2', delay: 300 });
		act(() => {
			vi.advanceTimersByTime(150);
		});

		expect(result.current).toBe('initial');

		act(() => {
			vi.advanceTimersByTime(150);
		});

		expect(result.current).toBe('change2');
	});
});
