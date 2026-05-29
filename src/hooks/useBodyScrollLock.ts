"use client";

import { useEffect } from "react";

/**
 * Locks body scroll while preserving scroll position (iOS-safe).
 * Restores position instantly on unlock (no smooth-scroll jump).
 */
export function useBodyScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;

    const scrollY = window.scrollY;
    const { style } = document.body;
    const html = document.documentElement;

    style.position = "fixed";
    style.top = `-${scrollY}px`;
    style.left = "0";
    style.right = "0";
    style.width = "100%";
    style.overflow = "hidden";

    return () => {
      style.position = "";
      style.top = "";
      style.left = "";
      style.right = "";
      style.width = "";
      style.overflow = "";

      // html has scroll-behavior: smooth — disable briefly so restore is instant
      const previousScrollBehavior = html.style.scrollBehavior;
      html.style.scrollBehavior = "auto";

      window.scrollTo({
        top: scrollY,
        left: 0,
        behavior: "instant",
      });

      requestAnimationFrame(() => {
        html.style.scrollBehavior = previousScrollBehavior;
      });
    };
  }, [locked]);
}
