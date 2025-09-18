'use client';

import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Upload, Image as ImageIcon, Trash2 } from 'lucide-react';
import { ImagesFieldConfig, ImageObject } from '../../lib/types';

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
  const [newImageUrl, setNewImageUrl] = useState('');

  const maxFiles = config.maxFiles || 5;
  const canAddMore = value.length < maxFiles;

  const addImage = () => {
    if (!newImageUrl.trim()) return;

    const newImage: ImageObject = {
      url: newImageUrl,
      alt: '',
      caption: '',
    };

    onChange([...value, newImage]);
    setNewImageUrl('');
  };

  const removeImage = (index: number) => {
    const updatedImages = value.filter((_, i) => i !== index);
    onChange(updatedImages);
  };

  const updateImageCaption = (index: number, caption: string) => {
    const updatedImages = value.map((img, i) =>
      i === index ? { ...img, caption } : img
    );
    onChange(updatedImages);
  };

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

      {/* Existing Images */}
      {value.length > 0 && (
        <div className="space-y-3">
          {value.map((image, index) => (
            <div key={index} className="border rounded-lg p-3 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ImageIcon className="h-4 w-4" />
                  <span className="font-medium text-sm">Image {index + 1}</span>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeImage(index)}
                  disabled={disabled}
                  className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              {/* Image URL Display */}
              <div>
                <Input
                  type="url"
                  value={image.url}
                  disabled
                  placeholder="Image URL"
                />
              </div>

              {/* Caption */}
              {config.allowCaptions && (
                <div>
                  <Label className="text-xs">Caption (Optional)</Label>
                  <Input
                    value={image.caption || ''}
                    onChange={(e) => updateImageCaption(index, e.target.value)}
                    disabled={disabled}
                    placeholder="Image caption"
                    className="mt-1"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Add New Image */}
      {canAddMore && (
        <div className="border border-dashed rounded-lg p-4">
          <div className="flex flex-col items-center justify-center text-center space-y-3">
            <Upload className="h-8 w-8 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Add Image URL</p>
              <p className="text-xs text-muted-foreground">
                Note: File upload coming soon. For now, add image URLs.
              </p>
            </div>
            <div className="flex gap-2 w-full max-w-md">
              <Input
                type="url"
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                disabled={disabled}
                placeholder="https://example.com/image.jpg"
                className="flex-1"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addImage}
                disabled={disabled || !newImageUrl.trim()}
              >
                Add
              </Button>
            </div>
          </div>
        </div>
      )}

      {!canAddMore && (
        <p className="text-sm text-muted-foreground">
          Maximum {maxFiles} images allowed
        </p>
      )}

      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
    </div>
  );
}