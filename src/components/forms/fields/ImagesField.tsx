'use client';

import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/cards';
import { Upload, Image as ImageIcon, Trash2, Eye } from 'lucide-react';
import { ImagesFieldConfig, ImageObject } from '@/lib/forms/formTypes';

interface ImagesFieldProps {
  config: ImagesFieldConfig;
  value: ImageObject[];
  onChange: (value: ImageObject[]) => void;
  error?: string;
  disabled?: boolean;
}

export function ImagesField({
  config,
  value = [],
  onChange,
  error,
  disabled = false,
}: ImagesFieldProps) {
  const [uploading, setUploading] = useState(false);

  const maxFiles = config.maxFiles || 5;
  const maxFileSize = config.maxFileSize || 5 * 1024 * 1024; // 5MB default
  const allowedTypes = config.allowedTypes || ['image/jpeg', 'image/png', 'image/webp'];

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (disabled || uploading) return;

    setUploading(true);
    const newImages: ImageObject[] = [];

    for (const file of acceptedFiles) {
      // Validate file size
      if (file.size > maxFileSize) {
        console.error(`File ${file.name} is too large`);
        continue;
      }

      // Validate file type
      if (!allowedTypes.includes(file.type)) {
        console.error(`File ${file.name} has invalid type`);
        continue;
      }

      try {
        // Create temporary URL for preview
        const url = URL.createObjectURL(file);

        const imageObject: ImageObject = {
          url,
          alt: file.name,
          caption: '',
          filename: file.name,
          size: file.size,
          type: file.type,
        };

        newImages.push(imageObject);
      } catch (error) {
        console.error(`Error processing file ${file.name}:`, error);
      }
    }

    // Update value with new images
    const updatedImages = [...value, ...newImages].slice(0, maxFiles);
    onChange(updatedImages);
    setUploading(false);
  }, [value, onChange, maxFiles, maxFileSize, allowedTypes, disabled, uploading]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': allowedTypes.map(type => type.split('/')[1]).map(ext => `.${ext}`)
    },
    maxFiles: maxFiles - value.length,
    disabled: disabled || uploading || value.length >= maxFiles,
  });

  const removeImage = (index: number) => {
    const imageToRemove = value[index];
    // Revoke object URL to prevent memory leaks
    if (imageToRemove.url.startsWith('blob:')) {
      URL.revokeObjectURL(imageToRemove.url);
    }

    const updatedImages = value.filter((_, i) => i !== index);
    onChange(updatedImages);
  };

  const updateCaption = (index: number, caption: string) => {
    const updatedImages = value.map((img, i) =>
      i === index ? { ...img, caption } : img
    );
    onChange(updatedImages);
  };

  const updateAlt = (index: number, alt: string) => {
    const updatedImages = value.map((img, i) =>
      i === index ? { ...img, alt } : img
    );
    onChange(updatedImages);
  };

  const canAddMore = value.length < maxFiles;

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor={config.key}>
          {config.label}
          {config.required && <span className="text-destructive ml-1">*</span>}
        </Label>
        {config.description && (
          <p className="text-sm text-muted-foreground mt-1">
            {config.description}
          </p>
        )}
      </div>

      {/* Image Grid */}
      {value.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {value.map((image, index) => (
            <Card key={index} className="relative overflow-hidden">
              <CardContent className="p-0">
                {/* Image Preview */}
                <div className="relative aspect-video bg-muted">
                  <img
                    src={image.url}
                    alt={image.alt || `Image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 flex gap-1">
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      onClick={() => window.open(image.url, '_blank')}
                      className="h-8 w-8 p-0"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => removeImage(index)}
                      disabled={disabled}
                      className="h-8 w-8 p-0"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Image Details */}
                <div className="p-3 space-y-2">
                  <div>
                    <Label className="text-xs">Alt Text</Label>
                    <Input
                      value={image.alt || ''}
                      onChange={(e) => updateAlt(index, e.target.value)}
                      disabled={disabled}
                      placeholder="Describe the image"
                      className="mt-1 h-8"
                    />
                  </div>

                  {config.allowCaptions !== false && (
                    <div>
                      <Label className="text-xs">Caption (Optional)</Label>
                      <Input
                        value={image.caption || ''}
                        onChange={(e) => updateCaption(index, e.target.value)}
                        disabled={disabled}
                        placeholder="Image caption"
                        className="mt-1 h-8"
                      />
                    </div>
                  )}

                  <div className="text-xs text-muted-foreground">
                    {image.filename} ({(image.size || 0 / 1024).toFixed(1)} KB)
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Upload Area */}
      {canAddMore && (
        <div
          {...getRootProps()}
          className={`
            border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
            ${isDragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'}
            ${disabled || uploading ? 'opacity-50 cursor-not-allowed' : 'hover:border-primary'}
          `}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center gap-2">
            <Upload className="h-10 w-10 text-muted-foreground" />
            <div>
              <p className="font-medium">
                {isDragActive ? 'Drop images here' : 'Drag & drop images here'}
              </p>
              <p className="text-sm text-muted-foreground">
                or click to browse files
              </p>
            </div>
            <div className="text-xs text-muted-foreground">
              Max {maxFiles} files, {Math.round(maxFileSize / 1024 / 1024)}MB each
            </div>
            <div className="text-xs text-muted-foreground">
              Supports: {allowedTypes.map(type => type.split('/')[1].toUpperCase()).join(', ')}
            </div>
          </div>
        </div>
      )}

      {!canAddMore && (
        <p className="text-sm text-muted-foreground text-center">
          Maximum {maxFiles} images reached
        </p>
      )}

      {uploading && (
        <p className="text-sm text-muted-foreground text-center">
          Uploading images...
        </p>
      )}

      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
    </div>
  );
}