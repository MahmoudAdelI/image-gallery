"use client";
import { useCallback, useRef, useEffect, MouseEventHandler } from "react";
import { useRouter } from "next/navigation";

export default function Modal({ children}: { children: React.ReactNode }) {
  const overlay = useRef(null);
  const wrapper = useRef(null);
  const router = useRouter();

  const onDismiss = useCallback(() => {
    router.back();
  }, [router]);

  const onClick: MouseEventHandler = useCallback(
    (e) => {
      if (e.target === overlay.current || e.target === wrapper.current) {
        if (onDismiss) onDismiss();
      }
    },
    [onDismiss, overlay, wrapper]
  );

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onDismiss();
    },
    [onDismiss]
  );

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  return (

    <div
      ref={overlay}
      className="fixed z-40 left-0 right-0 top-0 bottom-0 mx-auto bg-black/90 "
      onClick={onClick}
    >
      
      <div
        ref={wrapper}
        className="fixed bottom-0 left-0 md:left-1/2 md:-translate-x-1/2 top-7 w-full h-full lg:w-[80vw] animate-move-up md:animate-none"
      >
        {children}
      </div>
    </div>
  );
}