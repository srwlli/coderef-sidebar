'use client';

import React, { useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';
import { Trash, Plus } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetFooter,
} from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { IconPicker } from './IconPicker';
import { CustomCard } from '@/stores/use-app-store';
import { getIconComponent } from '@/lib/icon-utils';

const customLinkSchema = z.object({
  id: z.string(),
  label: z.string().min(1, 'Label required').max(30, 'Max 30 characters'),
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
});

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
  links: z
    .array(customLinkSchema)
    .min(0, 'Links are optional')
    .max(16, 'Maximum 16 links allowed'),
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
    control,
    formState: { errors, isSubmitting },
  } = useForm<CardFormData>({
    resolver: zodResolver(cardFormSchema),
    defaultValues: {
      title: initialData?.title || '',
      href: initialData?.href || '',
      links: initialData?.links || [],
      iconName: initialData?.iconName || 'Link',
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'links',
  });

  // Reset form when modal opens/closes or initialData changes
  useEffect(() => {
    if (open) {
      reset({
        title: initialData?.title || '',
        href: initialData?.href || '',
        links: initialData?.links || [],
        iconName: initialData?.iconName || 'Link',
      });
    }
  }, [open, initialData, reset]);

  const iconName = watch('iconName');
  const IconComponent = getIconComponent(iconName);

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
        {/* Drag Handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div
            className="bg-muted-foreground/30 h-1 w-10 rounded-full"
            aria-hidden="true"
          />
        </div>

        {/* Header with Icon and Title */}
        <div className="border-border border-b px-4 py-3">
          <div className="flex items-center gap-3">
            <IconComponent className="text-foreground h-6 w-6 flex-shrink-0" />
            <SheetTitle className="text-foreground text-xl font-semibold">
              {initialData ? 'Edit Card' : 'Add Custom Card'}
            </SheetTitle>
          </div>
        </div>

        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="space-y-6 px-4 pt-4 pb-4"
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

          {/* Main URL Field */}
          <div className="space-y-2">
            <Label htmlFor="href">Main URL</Label>
            <Input
              id="href"
              placeholder="https://example.com or /path"
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

          {/* Links Section - optional quick actions */}
          <div className="space-y-4">
            <Label>Quick Actions (0-16 links, optional)</Label>
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-start gap-2">
                <div className="flex-1 space-y-2">
                  <Input
                    placeholder="Label (e.g., Dashboard)"
                    {...register(`links.${index}.label`)}
                    aria-invalid={
                      errors.links?.[index]?.label ? 'true' : 'false'
                    }
                    aria-label={`Link ${index + 1} label`}
                  />
                  {errors.links?.[index]?.label && (
                    <p className="text-sm text-red-500">
                      {errors.links[index]?.label?.message}
                    </p>
                  )}
                  <Input
                    placeholder="https://example.com or /path"
                    {...register(`links.${index}.href`)}
                    aria-invalid={
                      errors.links?.[index]?.href ? 'true' : 'false'
                    }
                    aria-label={`Link ${index + 1} URL`}
                  />
                  {errors.links?.[index]?.href && (
                    <p className="text-sm text-red-500">
                      {errors.links[index]?.href?.message}
                    </p>
                  )}
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => remove(index)}
                  className="mt-1"
                  aria-label={`Remove link ${index + 1}`}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            ))}
            {errors.links && typeof errors.links.message === 'string' && (
              <p className="text-sm text-red-500">{errors.links.message}</p>
            )}
            {fields.length < 16 && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => append({ id: uuidv4(), label: '', href: '' })}
                aria-label="Add another link"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Link
              </Button>
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
