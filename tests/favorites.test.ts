import { renderHook, act } from "@testing-library/react";
import useFavorites from "../lib/tmdb/favorites/favorites";
import { describe, it, expect, beforeEach } from 'vitest'

const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    clear: () => {
      store = {};
    },
  };
})();
Object.defineProperty(window, "localStorage", { value: localStorageMock });

describe("useFavorites", () => {
  beforeEach(() => localStorage.clear());

  it("starts empty", () => {
    const { result } = renderHook(() => useFavorites());
    expect(result.current[0]).toEqual([]);
  });

  it("toggles a favorite on", () => {
    const { result } = renderHook(() => useFavorites());
    act(() => result.current[2](123));
    expect(result.current[0]).toEqual([123]);
  });

  it("toggles a favorite off", () => {
    const { result } = renderHook(() => useFavorites());
    act(() => result.current[2](123));
    act(() => result.current[2](123));
    expect(result.current[0]).toEqual([]);
  });

  it("persists to localStorage", () => {
    const { result } = renderHook(() => useFavorites());
    act(() => result.current[2](456));
    expect(JSON.parse(localStorage.getItem("favorites")!)).toEqual([456]);
  });

  it("loads from localStorage", () => {
    localStorage.setItem("favorites", JSON.stringify([1, 2, 3]));
    const { result } = renderHook(() => useFavorites());
    expect(result.current[0]).toEqual([1, 2, 3]);
  });
});
