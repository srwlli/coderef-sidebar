'use client';

import {
  Package,
  Layers,
  Table,
  FileText,
  Navigation,
  Badge as BadgeIcon,
  Eye,
  Copy,
  ChevronDown,
  Settings,
  CreditCard,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface ComponentCardProps {
  name: string;
  description: string;
  icon: React.ReactNode;
  props: Array<{ name: string; type: string; required: boolean }>;
  preview: React.ReactNode;
  status?: 'ready' | 'in-development' | 'planned';
}

function ComponentCard({
  name,
  description,
  icon,
  props,
  preview,
  status = 'ready',
}: ComponentCardProps) {
  const [showDetails, setShowDetails] = useState(false);

  const statusColors = {
    ready: 'bg-green-100 text-green-800',
    'in-development': 'bg-yellow-100 text-yellow-800',
    planned: 'bg-gray-100 text-gray-800',
  };

  return (
    <div className="flex h-full flex-col rounded-lg border p-6 transition-shadow hover:shadow-md">
      {/* Header */}
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-center gap-3">
          {icon}
          <div>
            <h3 className="text-lg font-semibold">{name}</h3>
            <p className="text-muted-foreground text-sm">{description}</p>
          </div>
        </div>
        <span
          className={`rounded-full px-2 py-1 text-xs font-medium ${statusColors[status]}`}
        >
          {status.replace('-', ' ')}
        </span>
      </div>

      {/* Props Summary */}
      <div className="mb-4">
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-muted-foreground hover:text-foreground flex items-center gap-2 text-sm"
        >
          <ChevronDown
            className={`h-4 w-4 transition-transform ${showDetails ? 'rotate-180' : ''}`}
          />
          Props ({props.length})
        </button>
        {showDetails && (
          <div className="mt-2 text-xs">
            <table className="w-full">
              <thead>
                <tr className="text-muted-foreground text-left">
                  <th className="pb-1">Prop</th>
                  <th className="pb-1">Type</th>
                  <th className="pb-1">Required</th>
                </tr>
              </thead>
              <tbody>
                {props.map((prop, index) => (
                  <tr key={index} className="border-border border-t">
                    <td className="py-1 font-mono">{prop.name}</td>
                    <td className="text-muted-foreground py-1">{prop.type}</td>
                    <td className="py-1">{prop.required ? '✓' : '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Preview */}
      <div className="bg-muted mb-4 flex-1 rounded-lg border p-4">
        <div className="text-muted-foreground mb-3 text-xs">Preview</div>
        {preview}
      </div>

      {/* Actions */}
      <div className="mt-auto flex gap-2">
        <Button variant="outline" size="sm" className="flex-1">
          <Eye className="mr-1 h-4 w-4" />
          View Details
        </Button>
        <Button variant="outline" size="sm" className="flex-1">
          <Copy className="mr-1 h-4 w-4" />
          Copy Code
        </Button>
      </div>
    </div>
  );
}

// Mock CollapsibleContainer Preview
function CollapsiblePreview() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="rounded border border-gray-200">
      <div
        className="flex cursor-pointer items-center justify-between p-3 hover:bg-gray-50"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2">
          <ChevronDown
            className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          />
          <Settings className="h-4 w-4" />
          <span className="text-sm font-medium">Sample Container</span>
        </div>
        <Badge variant="outline" className="text-xs">
          sm
        </Badge>
      </div>
      {isExpanded && (
        <div className="border-t bg-gray-50 p-3">
          <p className="text-xs text-gray-600">
            Container content appears here when expanded.
          </p>
        </div>
      )}
    </div>
  );
}

export default function ComponentLibraryPreview() {
  const components: ComponentCardProps[] = [
    {
      name: 'Card',
      description:
        'Flexible container component with header, content, and footer sections',
      icon: <CreditCard className="h-5 w-5" />,
      props: [
        { name: 'className', type: 'string', required: false },
        { name: 'children', type: 'React.ReactNode', required: true },
      ],
      preview: (
        <div className="rounded-lg border bg-white p-3 shadow-sm">
          <div className="mb-1 text-sm font-medium">Card Header</div>
          <div className="mb-2 text-xs text-gray-600">
            Card content goes here with description text.
          </div>
          <div className="text-xs text-blue-600">Card Footer</div>
        </div>
      ),
      status: 'ready',
    },
    {
      name: 'CollapsibleContainer',
      description:
        'Unified collapsible component with size variants and flexible content',
      icon: <Layers className="h-5 w-5" />,
      props: [
        { name: 'title', type: 'string', required: true },
        { name: 'size', type: "'sm' | 'md' | 'lg'", required: false },
        { name: 'icon', type: 'React.ReactNode', required: false },
        { name: 'children', type: 'React.ReactNode', required: true },
      ],
      preview: <CollapsiblePreview />,
      status: 'in-development',
    },
    {
      name: 'DataTable',
      description:
        'Responsive data table with sorting, filtering, and pagination',
      icon: <Table className="h-5 w-5" />,
      props: [
        { name: 'data', type: 'Array<Record>', required: true },
        { name: 'columns', type: 'ColumnDef[]', required: true },
        { name: 'pagination', type: 'boolean', required: false },
      ],
      preview: (
        <div className="text-xs">
          <div className="rounded border">
            <div className="border-b bg-gray-50 p-2 font-medium">
              Name | Email | Status
            </div>
            <div className="p-2">John Doe | john@example.com | Active</div>
            <div className="bg-gray-25 p-2">
              Jane Smith | jane@example.com | Pending
            </div>
          </div>
        </div>
      ),
      status: 'planned',
    },
    {
      name: 'FormBuilder',
      description: 'Dynamic form generator with validation and schema support',
      icon: <FileText className="h-5 w-5" />,
      props: [
        { name: 'schema', type: 'FormSchema', required: true },
        { name: 'onSubmit', type: 'Function', required: true },
        { name: 'validation', type: 'ValidationRules', required: false },
      ],
      preview: (
        <div className="space-y-2 text-xs">
          <div className="rounded border p-2">
            <label className="block text-gray-600">Name</label>
            <div className="rounded border bg-white px-2 py-1">John Doe</div>
          </div>
          <div className="rounded bg-blue-500 py-1 text-center text-xs text-white">
            Submit
          </div>
        </div>
      ),
      status: 'planned',
    },
    {
      name: 'NavigationMenu',
      description: 'Hierarchical navigation with breadcrumbs and active states',
      icon: <Navigation className="h-5 w-5" />,
      props: [
        { name: 'items', type: 'NavItem[]', required: true },
        {
          name: 'orientation',
          type: "'horizontal' | 'vertical'",
          required: false,
        },
        { name: 'activeItem', type: 'string', required: false },
      ],
      preview: (
        <div className="text-xs">
          <div className="flex gap-2 rounded border p-2">
            <span className="rounded bg-blue-100 px-2 py-1">Home</span>
            <span className="px-2 py-1">Products</span>
            <span className="px-2 py-1">About</span>
          </div>
        </div>
      ),
      status: 'planned',
    },
    {
      name: 'StatusBadge',
      description:
        'Configurable status indicators with color variants and icons',
      icon: <BadgeIcon className="h-5 w-5" />,
      props: [
        {
          name: 'status',
          type: "'success' | 'warning' | 'error'",
          required: true,
        },
        { name: 'text', type: 'string', required: true },
        { name: 'icon', type: 'React.ReactNode', required: false },
      ],
      preview: (
        <div className="flex gap-2 text-xs">
          <span className="rounded bg-green-100 px-2 py-1 text-green-800">
            Success
          </span>
          <span className="rounded bg-yellow-100 px-2 py-1 text-yellow-800">
            Warning
          </span>
          <span className="rounded bg-red-100 px-2 py-1 text-red-800">
            Error
          </span>
        </div>
      ),
      status: 'planned',
    },
  ];

  return (
    <div className="flex-1 overflow-y-auto p-8">
      <main className="mx-auto max-w-7xl">
        <div className="mb-6">
          <p className="text-muted-foreground">
            Professional component library with interactive documentation and
            live examples.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {components.map((component, index) => (
            <ComponentCard key={index} {...component} />
          ))}
        </div>
      </main>
    </div>
  );
}
