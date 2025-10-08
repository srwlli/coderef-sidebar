'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { IconPicker } from './IconPicker';
import { CustomCard } from '@/stores/use-app-store';

const cardFormSchema = z.object({
  title: z.string().min(1, 'Title is required').max(50, 'Title too long'),
  href: z.string().refine(
    (val) => {
      // Allow internal paths starting with /
      if (val.startsWith('/')) return true;
      // For external URLs, validate http/https only
      try {
        const url = new URL(val);
        return ['http:', 'https:'].includes(url.protocol);
      } catch {
        return false;
      }
    },
    {
      message: 'Must be valid http/https URL or path starting with /',
    }
  ),
  iconName: z.string().min(1, 'Icon is required'),
});

type CardFormData = z.infer<typeof cardFormSchema>;

interface CardFormModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: CardFormData) => void;
  initialData?: CustomCard | null;
}

export function CardFormModal({
  open,
  onClose,
  onSubmit,
  initialData,
}: CardFormModalProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CardFormData>({
    resolver: zodResolver(cardFormSchema),
    defaultValues: {
      title: initialData?.title || '',
      href: initialData?.href || '',
      iconName: initialData?.iconName || 'Link',
    },
  });

  // Reset form when modal opens/closes or initialData changes
  useEffect(() => {
    if (open) {
      reset({
        title: initialData?.title || '',
        href: initialData?.href || '',
        iconName: initialData?.iconName || 'Link',
      });
    }
  }, [open, initialData, reset]);

  const iconName = watch('iconName');

  const handleFormSubmit = async (data: CardFormData) => {
    onSubmit(data);
    reset();
    onClose();
  };

  const handleCancel = () => {
    reset();
    onClose();
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="bottom" className="sm:mx-auto sm:max-w-[500px]">
        <SheetHeader>
          <SheetTitle>
            {initialData ? 'Edit Card' : 'Add Custom Card'}
          </SheetTitle>
          <SheetDescription>
            {initialData
              ? 'Update your custom dashboard card'
              : 'Create a new custom card for your dashboard'}
          </SheetDescription>
        </SheetHeader>

        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="space-y-6 py-4"
        >
          {/* Title Field */}
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="My Custom Card"
              {...register('title')}
              aria-invalid={errors.title ? 'true' : 'false'}
              aria-describedby={errors.title ? 'title-error' : undefined}
            />
            {errors.title && (
              <p id="title-error" className="text-sm text-red-500">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* URL Field */}
          <div className="space-y-2">
            <Label htmlFor="href">URL or Path</Label>
            <Input
              id="href"
              placeholder="https://example.com or /internal-path"
              {...register('href')}
              aria-invalid={errors.href ? 'true' : 'false'}
              aria-describedby={errors.href ? 'href-error' : undefined}
            />
            {errors.href && (
              <p id="href-error" className="text-sm text-red-500">
                {errors.href.message}
              </p>
            )}
          </div>

          {/* Icon Picker */}
          <div className="space-y-2">
            <Label htmlFor="icon-picker">Icon</Label>
            <IconPicker
              value={iconName}
              onChange={(newIconName) => setValue('iconName', newIconName)}
            />
            {errors.iconName && (
              <p className="text-sm text-red-500">{errors.iconName.message}</p>
            )}
          </div>

          {/* Action Buttons */}
          <SheetFooter className="flex flex-row gap-2 sm:justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : initialData ? 'Update' : 'Add Card'}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
