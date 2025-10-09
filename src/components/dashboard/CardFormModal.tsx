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
  links: z
    .array(customLinkSchema)
    .min(1, 'At least 1 link required')
    .max(5, 'Maximum 5 links allowed'),
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
      links: initialData?.links || [{ id: uuidv4(), label: '', href: '' }],
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
        links: initialData?.links || [{ id: uuidv4(), label: '', href: '' }],
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

          {/* Links Section - replaces single href field */}
          <div className="space-y-4">
            <Label>Quick Actions (1-5 links)</Label>
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
                {fields.length > 1 && (
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
                )}
              </div>
            ))}
            {errors.links && typeof errors.links.message === 'string' && (
              <p className="text-sm text-red-500">{errors.links.message}</p>
            )}
            {fields.length < 5 && (
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
