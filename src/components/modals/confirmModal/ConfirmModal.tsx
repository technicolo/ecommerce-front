// components/modals/ConfirmModal.tsx
"use client";

import styles from "./confirmModal.module.css";

type Props = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export default function ConfirmModal({ open, onClose, onConfirm }: Props) {
  if (!open) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <p>¿Estás seguro de que querés continuar?</p>
        <div className={styles.buttons}>
          <button className={styles.confirmBtn} onClick={onConfirm}>
            Sí, confirmar
          </button>
          <button className={styles.cancelBtn} onClick={onClose}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
