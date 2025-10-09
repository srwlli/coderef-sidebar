'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { useState, useEffect } from 'react';
import { LucideIcon } from 'lucide-react';
import { ActionButton } from '@/components/ui/action-button';

export interface CardAction {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  disabled?: boolean;
  destructive?: boolean;
}

export interface ActionModalProps {
  visible: boolean;
  onClose: () => void;
  cardTitle: string;
  cardIcon: LucideIcon;
  actions: CardAction[];
}

/**
 * Bottom sheet action modal for dashboard cards
 * Slides up from bottom with contextual quick actions
 */
export function ActionModal({
  visible,
  onClose,
  cardTitle,
  cardIcon: CardIcon,
  actions,
}: ActionModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (visible) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = 'auto';
      };
    }
  }, [visible]);

  // Handle Escape key to close
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (visible) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [visible, onClose]);

  // Separate Edit and Delete actions from other actions
  const editAction = actions.find((a) => a.label === 'Edit');
  const deleteAction = actions.find((a) => a.label === 'Delete');
  const otherActions = actions.filter(
    (a) => a.label !== 'Edit' && a.label !== 'Delete'
  );

  // Split other actions into rows (max 4 per row)
  const actionRows: CardAction[][] = [];
  for (let i = 0; i < otherActions.length; i += 4) {
    actionRows.push(otherActions.slice(i, i + 4));
  }

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {visible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            aria-label="Close modal"
          />

          {/* Bottom Sheet */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{
              duration: 0.3,
              ease: [0.4, 0.0, 0.2, 1],
            }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="action-modal-title"
            className="bg-card fixed right-0 bottom-0 left-0 z-50 max-h-[80vh] overflow-y-auto rounded-t-xl pb-8 shadow-2xl"
          >
            {/* Drag Handle */}
            <div className="flex justify-center pt-3 pb-2">
              <div
                className="bg-muted-foreground/30 h-1 w-10 rounded-full"
                aria-hidden="true"
              />
            </div>

            {/* Header with Card Icon and Title */}
            <div className="border-border border-b px-4 py-3">
              <div className="flex items-center gap-3">
                <CardIcon className="text-foreground h-6 w-6 flex-shrink-0" />
                <h2
                  id="action-modal-title"
                  className="text-foreground text-xl font-semibold"
                >
                  {cardTitle}
                </h2>
              </div>
            </div>

            {/* Other Action Rows */}
            {actionRows.length > 0 && (
              <div className="space-y-3 px-4 pt-4">
                {actionRows.map((row, rowIndex) => (
                  <div key={rowIndex} className="flex gap-3">
                    {row.map((action, actionIndex) => (
                      <ActionButton
                        key={`${rowIndex}-${actionIndex}`}
                        icon={action.icon}
                        label={action.label}
                        onClick={() => {
                          action.onClick();
                          onClose();
                        }}
                        disabled={action.disabled}
                        destructive={action.destructive}
                      />
                    ))}
                  </div>
                ))}
              </div>
            )}

            {/* Edit and Delete Actions - Fixed 2x1 Grid at Bottom */}
            {(editAction || deleteAction) && (
              <div className="grid grid-cols-2 gap-3 px-4 pt-4 pb-4">
                {editAction && (
                  <ActionButton
                    icon={editAction.icon}
                    label={editAction.label}
                    onClick={() => {
                      editAction.onClick();
                      onClose();
                    }}
                    disabled={editAction.disabled}
                    destructive={editAction.destructive}
                  />
                )}
                {deleteAction && (
                  <ActionButton
                    icon={deleteAction.icon}
                    label={deleteAction.label}
                    onClick={() => {
                      deleteAction.onClick();
                      onClose();
                    }}
                    disabled={deleteAction.disabled}
                    destructive={deleteAction.destructive}
                  />
                )}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
