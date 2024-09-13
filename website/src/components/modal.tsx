"use client";

import { useUIStore } from "@/components/providers/storesProvider";
import { Dialog, DialogContent } from "@/components/ui/dialog";

export function Modal() {
  const { activeModal, closeModal } = useUIStore((state) => ({
    activeModal: state.activeModal,
    closeModal: state.closeModal,
  }));

  if (!activeModal) return null;

  const ModalComponent = activeModal.component as React.ElementType;

  return (
    <Dialog open={!!activeModal} onOpenChange={closeModal}>
      <DialogContent>
        {ModalComponent && <ModalComponent {...activeModal.props} />}
      </DialogContent>
    </Dialog>
  );
}
