"use client";

import { X } from "lucide-react";
import { useEffect, useRef } from "react";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  label: string;
  closeLabel: string;
  children: React.ReactNode;
  className?: string;
};

/**
 * Modale basée sur <dialog> natif : piège du focus, touche Échap et
 * retour du focus à l'élément d'origine gérés par le navigateur.
 */
export function Modal({ open, onClose, label, closeLabel, children, className = "" }: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      document.body.style.overflow = "hidden";
    } else if (!open && dialog.open) {
      dialog.close();
    }
    if (!open && !document.querySelector("dialog[open]")) document.body.style.overflow = "";
    return () => {
      if (!document.querySelector("dialog[open]")) document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-label={label}
      onClose={onClose}
      onClick={(e) => {
        // clic sur le fond (en dehors du contenu) : fermeture
        if (e.target === ref.current) onClose();
      }}
      className={`m-auto max-h-[92dvh] w-[calc(100%-1.5rem)] overflow-hidden rounded-3xl border border-border-strong bg-bg-soft p-0 text-fg shadow-2xl backdrop:bg-black/70 backdrop:backdrop-blur-sm open:animate-[modal-in_0.25s_ease-out] ${className}`}
    >
      {open && (
        <div className="relative max-h-[92dvh] overflow-y-auto">
          {/* conteneur de hauteur nulle : le bouton reste visible au scroll sans décaler le contenu */}
          <div className="sticky top-0 z-10 flex h-0 justify-end">
            <button
              type="button"
              onClick={onClose}
              aria-label={closeLabel}
              className="mt-3 mr-3 grid size-10 shrink-0 place-items-center rounded-full border border-border bg-bg/80 text-fg backdrop-blur transition-colors hover:border-violet/60"
            >
              <X className="size-5" aria-hidden />
            </button>
          </div>
          {children}
        </div>
      )}
    </dialog>
  );
}
