"use client";

import LoginForm from "@/components/CustomForms/LoginForm";
import { Dialog, DialogContent } from "@/components/ui/dialog";

export default function JoinModal({ isOpen, onClose, currentRoute }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="mx-auto w-full sm:max-w-[440px]">
        <LoginForm currentRoute={currentRoute} />
      </DialogContent>
    </Dialog>
  );
}
