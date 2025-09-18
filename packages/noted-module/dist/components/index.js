"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/components/index.ts
var components_exports = {};
__export(components_exports, {
  BaseField: () => BaseField,
  FormGenerator: () => FormGenerator,
  ImagesField: () => ImagesField,
  LinksField: () => LinksField,
  NotedForm: () => NotedForm,
  ProjectSelectField: () => ProjectSelectField,
  TagField: () => TagField,
  TextAreaField: () => TextAreaField,
  TextField: () => TextField
});
module.exports = __toCommonJS(components_exports);

// src/components/FormGenerator.tsx
var import_react8 = __toESM(require("react"));
var import_react_hook_form = require("react-hook-form");
var import_zod2 = require("@hookform/resolvers/zod");

// src/components/ui/button.tsx
var React = __toESM(require("react"));
var import_react_slot = require("@radix-ui/react-slot");
var import_class_variance_authority = require("class-variance-authority");

// src/lib/utils.ts
var import_clsx = require("clsx");
var import_tailwind_merge = require("tailwind-merge");
function cn(...inputs) {
  return (0, import_tailwind_merge.twMerge)((0, import_clsx.clsx)(inputs));
}

// src/components/ui/button.tsx
var buttonVariants = (0, import_class_variance_authority.cva)(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive: "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function Button(_a) {
  var _b = _a, {
    className,
    variant,
    size,
    asChild = false
  } = _b, props = __objRest(_b, [
    "className",
    "variant",
    "size",
    "asChild"
  ]);
  const Comp = asChild ? import_react_slot.Slot : "button";
  return /* @__PURE__ */ React.createElement(
    Comp,
    __spreadValues({
      "data-slot": "button",
      className: cn(buttonVariants({ variant, size, className }))
    }, props)
  );
}

// src/lib/forms/validation.ts
var import_zod = require("zod");
function generateZodSchema(fields) {
  const schemaFields = {};
  fields.forEach((field) => {
    let fieldSchema;
    switch (field.type) {
      case "text":
      case "email":
      case "url":
        fieldSchema = import_zod.z.string();
        if ("maxLength" in field && field.maxLength) {
          fieldSchema = fieldSchema.max(
            field.maxLength,
            `Maximum ${field.maxLength} characters`
          );
        }
        if ("minLength" in field && field.minLength) {
          fieldSchema = fieldSchema.min(
            field.minLength,
            `Minimum ${field.minLength} characters`
          );
        }
        if ("pattern" in field && field.pattern) {
          fieldSchema = fieldSchema.regex(
            new RegExp(field.pattern),
            "Invalid format"
          );
        }
        if (field.type === "email") {
          fieldSchema = fieldSchema.email(
            "Please enter a valid email address"
          );
        } else if (field.type === "url") {
          fieldSchema = fieldSchema.url("Please enter a valid URL").or(import_zod.z.literal(""));
        }
        break;
      case "textarea":
        fieldSchema = import_zod.z.string();
        if ("maxLength" in field && field.maxLength) {
          fieldSchema = fieldSchema.max(
            field.maxLength,
            `Maximum ${field.maxLength} characters`
          );
        }
        if ("minLength" in field && field.minLength) {
          fieldSchema = fieldSchema.min(
            field.minLength,
            `Minimum ${field.minLength} characters`
          );
        }
        break;
      case "number":
        fieldSchema = import_zod.z.number();
        if ("min" in field && field.min !== void 0) {
          fieldSchema = fieldSchema.min(
            field.min,
            `Minimum value is ${field.min}`
          );
        }
        if ("max" in field && field.max !== void 0) {
          fieldSchema = fieldSchema.max(
            field.max,
            `Maximum value is ${field.max}`
          );
        }
        break;
      case "tags":
        fieldSchema = import_zod.z.array(import_zod.z.string()).default([]);
        if ("maxTags" in field && field.maxTags) {
          fieldSchema = fieldSchema.refine(
            (tags) => Array.isArray(tags) && tags.length <= field.maxTags,
            { message: `Maximum ${field.maxTags} tags allowed` }
          );
        }
        break;
      case "links":
        fieldSchema = import_zod.z.array(import_zod.z.object({
          url: import_zod.z.string().url("Please enter a valid URL"),
          title: import_zod.z.string().optional(),
          description: import_zod.z.string().optional()
        })).default([]);
        if ("maxLinks" in field && field.maxLinks) {
          fieldSchema = fieldSchema.refine(
            (links) => Array.isArray(links) && links.length <= field.maxLinks,
            { message: `Maximum ${field.maxLinks} links allowed` }
          );
        }
        break;
      case "images":
        fieldSchema = import_zod.z.array(import_zod.z.object({
          url: import_zod.z.string().url("Please enter a valid URL"),
          alt: import_zod.z.string().optional(),
          caption: import_zod.z.string().optional(),
          filename: import_zod.z.string().optional(),
          size: import_zod.z.number().optional(),
          type: import_zod.z.string().optional()
        })).default([]);
        if ("maxFiles" in field && field.maxFiles) {
          fieldSchema = fieldSchema.refine(
            (files) => Array.isArray(files) && files.length <= field.maxFiles,
            { message: `Maximum ${field.maxFiles} files allowed` }
          );
        }
        break;
      case "project-select":
        fieldSchema = import_zod.z.string();
        break;
      case "select":
        if ("multiple" in field && field.multiple) {
          fieldSchema = import_zod.z.array(import_zod.z.string()).default([]);
        } else {
          fieldSchema = import_zod.z.string();
        }
        break;
      case "checkbox":
        fieldSchema = import_zod.z.boolean().default(false);
        break;
      case "date":
        fieldSchema = import_zod.z.string().or(import_zod.z.date());
        break;
      default:
        fieldSchema = import_zod.z.string();
    }
    if (!field.required) {
      if (field.type === "tags" || field.type === "links" || field.type === "images" || field.type === "select" && "multiple" in field && field.multiple) {
        fieldSchema = fieldSchema.optional().default([]);
      } else if (field.type === "checkbox") {
        fieldSchema = fieldSchema.optional().default(false);
      } else {
        fieldSchema = fieldSchema.optional().or(import_zod.z.literal(""));
      }
    } else {
      if (field.type === "tags" || field.type === "links" || field.type === "images") {
        fieldSchema = fieldSchema.refine(
          (items) => Array.isArray(items) && items.length > 0,
          { message: `${field.label} is required` }
        );
      } else if (field.type === "select" && "multiple" in field && field.multiple) {
        fieldSchema = fieldSchema.min(
          1,
          `${field.label} is required`
        );
      } else if (field.type !== "checkbox") {
        fieldSchema = fieldSchema.min(
          1,
          `${field.label} is required`
        );
      }
    }
    schemaFields[field.key] = fieldSchema;
  });
  return import_zod.z.object(schemaFields);
}
function prepareSupabaseData(formData, schema) {
  var _a, _b, _c;
  const supabaseData = __spreadValues({}, formData);
  if ((_a = schema.autoFields) == null ? void 0 : _a.user_id) {
    delete supabaseData.user_id;
  }
  if ((_b = schema.autoFields) == null ? void 0 : _b.created_at) {
    delete supabaseData.created_at;
  }
  if ((_c = schema.autoFields) == null ? void 0 : _c.updated_at) {
    delete supabaseData.updated_at;
  }
  Object.keys(supabaseData).forEach((key) => {
    if (supabaseData[key] === "") {
      supabaseData[key] = null;
    }
  });
  return supabaseData;
}
function getDefaultValues(fields) {
  const defaults = {};
  fields.forEach((field) => {
    switch (field.type) {
      case "tags":
      case "links":
      case "images":
        defaults[field.key] = [];
        break;
      case "checkbox":
        defaults[field.key] = false;
        break;
      case "select":
        if ("multiple" in field && field.multiple) {
          defaults[field.key] = [];
        } else {
          defaults[field.key] = "";
        }
        break;
      case "number":
        defaults[field.key] = void 0;
        break;
      default:
        defaults[field.key] = "";
    }
  });
  return defaults;
}

// src/components/fields/TextField.tsx
var import_react2 = __toESM(require("react"));

// src/components/ui/input.tsx
var React2 = __toESM(require("react"));
function Input(_a) {
  var _b = _a, { className, type } = _b, props = __objRest(_b, ["className", "type"]);
  return /* @__PURE__ */ React2.createElement(
    "input",
    __spreadValues({
      type,
      "data-slot": "input",
      className: cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )
    }, props)
  );
}

// src/components/fields/BaseField.tsx
var import_react = __toESM(require("react"));
function BaseField({
  config,
  error,
  children,
  className
}) {
  const { label, description, required } = config;
  return /* @__PURE__ */ import_react.default.createElement("div", { className: cn("space-y-2", className) }, label && /* @__PURE__ */ import_react.default.createElement(
    "label",
    {
      htmlFor: config.key,
      className: "text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
    },
    label,
    required && /* @__PURE__ */ import_react.default.createElement("span", { className: "text-destructive ml-1" }, "*")
  ), description && /* @__PURE__ */ import_react.default.createElement("p", { className: "text-muted-foreground text-sm" }, description), /* @__PURE__ */ import_react.default.createElement("div", { className: "space-y-1" }, children, error && /* @__PURE__ */ import_react.default.createElement("p", { className: "text-destructive text-sm font-medium", role: "alert" }, error)));
}

// src/components/fields/TextField.tsx
function TextField({
  config,
  value,
  onChange,
  error,
  disabled,
  className
}) {
  const {
    key,
    type,
    placeholder,
    maxLength,
    minLength,
    pattern,
    autoFocus
  } = config;
  return /* @__PURE__ */ import_react2.default.createElement(BaseField, { config, error, className }, /* @__PURE__ */ import_react2.default.createElement(
    Input,
    {
      id: key,
      name: key,
      type,
      value: value || "",
      onChange: (e) => onChange(e.target.value),
      placeholder,
      maxLength,
      minLength,
      pattern,
      autoFocus,
      disabled,
      className: cn(error && "border-destructive focus-visible:ring-destructive"),
      "aria-invalid": error ? "true" : "false",
      "aria-describedby": error ? `${key}-error` : void 0
    }
  ), maxLength && /* @__PURE__ */ import_react2.default.createElement("div", { className: "flex justify-end" }, /* @__PURE__ */ import_react2.default.createElement("span", { className: "text-muted-foreground text-xs" }, (value || "").length, " / ", maxLength)));
}

// src/components/fields/TextAreaField.tsx
var import_react3 = __toESM(require("react"));

// src/components/ui/textarea.tsx
var React5 = __toESM(require("react"));
function Textarea(_a) {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ React5.createElement(
    "textarea",
    __spreadValues({
      "data-slot": "textarea",
      className: cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )
    }, props)
  );
}

// src/components/fields/TextAreaField.tsx
function TextAreaField({
  config,
  value,
  onChange,
  error,
  disabled,
  className
}) {
  const { key, placeholder, maxLength, rows = 3, autoFocus } = config;
  return /* @__PURE__ */ import_react3.default.createElement(BaseField, { config, error, className }, /* @__PURE__ */ import_react3.default.createElement(
    Textarea,
    {
      id: key,
      name: key,
      value: value || "",
      onChange: (e) => onChange(e.target.value),
      placeholder,
      maxLength,
      rows,
      autoFocus,
      disabled,
      className: cn(
        "resize-vertical min-h-[400px] text-base leading-relaxed",
        error && "border-destructive focus-visible:ring-destructive"
      ),
      "aria-invalid": error ? "true" : "false",
      "aria-describedby": error ? `${key}-error` : void 0
    }
  ), maxLength && /* @__PURE__ */ import_react3.default.createElement("div", { className: "flex justify-end" }, /* @__PURE__ */ import_react3.default.createElement("span", { className: "text-muted-foreground text-xs" }, (value || "").length, " / ", maxLength)));
}

// src/components/fields/TagField.tsx
var import_react4 = __toESM(require("react"));

// src/components/ui/badge.tsx
var React7 = __toESM(require("react"));
var import_react_slot2 = require("@radix-ui/react-slot");
var import_class_variance_authority2 = require("class-variance-authority");
var badgeVariants = (0, import_class_variance_authority2.cva)(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary: "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive: "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge(_a) {
  var _b = _a, {
    className,
    variant,
    asChild = false
  } = _b, props = __objRest(_b, [
    "className",
    "variant",
    "asChild"
  ]);
  const Comp = asChild ? import_react_slot2.Slot : "span";
  return /* @__PURE__ */ React7.createElement(
    Comp,
    __spreadValues({
      "data-slot": "badge",
      className: cn(badgeVariants({ variant }), className)
    }, props)
  );
}

// src/components/fields/TagField.tsx
var import_lucide_react = require("lucide-react");
function TagField({
  config,
  value = [],
  onChange,
  error,
  disabled,
  className
}) {
  const [inputValue, setInputValue] = (0, import_react4.useState)("");
  const [showSuggestions, setShowSuggestions] = (0, import_react4.useState)(false);
  const {
    key,
    placeholder,
    maxTags,
    allowCustomTags = true,
    suggestions = []
  } = config;
  const availableSuggestions = suggestions.filter(
    (suggestion) => !value.includes(suggestion) && suggestion.toLowerCase().includes(inputValue.toLowerCase())
  );
  const addTag = (tag) => {
    const trimmedTag = tag.trim();
    if (!trimmedTag) return;
    if (value.includes(trimmedTag)) return;
    if (maxTags && value.length >= maxTags) return;
    onChange([...value, trimmedTag]);
    setInputValue("");
    setShowSuggestions(false);
  };
  const removeTag = (tagToRemove) => {
    onChange(value.filter((tag) => tag !== tagToRemove));
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (allowCustomTags) {
        addTag(inputValue);
      }
    } else if (e.key === "Backspace" && !inputValue && value.length > 0) {
      removeTag(value[value.length - 1]);
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
      setInputValue("");
    }
  };
  const handleInputChange = (newValue) => {
    setInputValue(newValue);
    setShowSuggestions(newValue.length > 0 && availableSuggestions.length > 0);
  };
  return /* @__PURE__ */ import_react4.default.createElement(BaseField, { config, error, className }, /* @__PURE__ */ import_react4.default.createElement("div", { className: "space-y-2" }, value.length > 0 && /* @__PURE__ */ import_react4.default.createElement("div", { className: "flex flex-wrap gap-2" }, value.map((tag, index) => /* @__PURE__ */ import_react4.default.createElement(
    Badge,
    {
      key: `${tag}-${index}`,
      variant: "secondary",
      className: "flex items-center gap-1 px-2 py-1 text-sm"
    },
    /* @__PURE__ */ import_react4.default.createElement("span", null, tag),
    !disabled && /* @__PURE__ */ import_react4.default.createElement(
      "button",
      {
        type: "button",
        onClick: () => removeTag(tag),
        className: "hover:bg-muted-foreground/20 ml-1 flex h-3 w-3 items-center justify-center rounded-full",
        "aria-label": `Remove ${tag} tag`
      },
      /* @__PURE__ */ import_react4.default.createElement(import_lucide_react.X, { className: "h-2 w-2" })
    )
  ))), /* @__PURE__ */ import_react4.default.createElement("div", { className: "relative" }, /* @__PURE__ */ import_react4.default.createElement(
    Input,
    {
      id: key,
      name: key,
      value: inputValue,
      onChange: (e) => handleInputChange(e.target.value),
      onKeyDown: handleKeyDown,
      onFocus: () => setShowSuggestions(
        inputValue.length > 0 && availableSuggestions.length > 0
      ),
      onBlur: () => setTimeout(() => setShowSuggestions(false), 200),
      placeholder: maxTags && value.length >= maxTags ? `Maximum ${maxTags} tags reached` : placeholder || "Type and press Enter to add tags",
      disabled: disabled || (maxTags ? value.length >= maxTags : false),
      className: cn(
        error && "border-destructive focus-visible:ring-destructive"
      ),
      "aria-invalid": error ? "true" : "false",
      "aria-describedby": error ? `${key}-error` : void 0
    }
  ), showSuggestions && availableSuggestions.length > 0 && /* @__PURE__ */ import_react4.default.createElement("div", { className: "bg-popover border-border absolute z-10 mt-1 max-h-48 w-full overflow-auto rounded-md border shadow-md" }, availableSuggestions.slice(0, 8).map((suggestion) => /* @__PURE__ */ import_react4.default.createElement(
    "button",
    {
      key: suggestion,
      type: "button",
      className: "hover:bg-accent hover:text-accent-foreground w-full px-3 py-2 text-left text-sm",
      onClick: () => addTag(suggestion)
    },
    suggestion
  )))), maxTags && /* @__PURE__ */ import_react4.default.createElement("div", { className: "flex justify-end" }, /* @__PURE__ */ import_react4.default.createElement("span", { className: "text-muted-foreground text-xs" }, value.length, " / ", maxTags, " tags"))));
}

// src/components/fields/LinksField.tsx
var import_react5 = __toESM(require("react"));

// src/components/ui/label.tsx
var React9 = __toESM(require("react"));
var LabelPrimitive = __toESM(require("@radix-ui/react-label"));
function Label(_a) {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ React9.createElement(
    LabelPrimitive.Root,
    __spreadValues({
      "data-slot": "label",
      className: cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      )
    }, props)
  );
}

// src/components/fields/LinksField.tsx
var import_lucide_react2 = require("lucide-react");
function LinksField({
  config,
  value = [],
  onChange,
  error,
  disabled = false
}) {
  const [newUrl, setNewUrl] = (0, import_react5.useState)("");
  const addLink = () => {
    if (!newUrl.trim()) return;
    const updatedLinks = [...value, { url: newUrl, title: "", description: "" }];
    onChange(updatedLinks);
    setNewUrl("");
  };
  const removeLink = (index) => {
    const updatedLinks = value.filter((_, i) => i !== index);
    onChange(updatedLinks);
  };
  const updateLink = (index, field, newValue) => {
    const updatedLinks = value.map(
      (link, i) => i === index ? __spreadProps(__spreadValues({}, link), { [field]: newValue }) : link
    );
    onChange(updatedLinks);
  };
  const maxLinks = config.maxLinks || 10;
  const canAddMore = value.length < maxLinks;
  return /* @__PURE__ */ import_react5.default.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ import_react5.default.createElement("div", null, /* @__PURE__ */ import_react5.default.createElement(Label, { htmlFor: config.key }, config.label, config.required && /* @__PURE__ */ import_react5.default.createElement("span", { className: "text-destructive ml-1" }, "*")), config.description && /* @__PURE__ */ import_react5.default.createElement("p", { className: "text-sm text-muted-foreground mt-1" }, config.description)), value.length > 0 && /* @__PURE__ */ import_react5.default.createElement("div", { className: "space-y-3" }, value.map((link, index) => /* @__PURE__ */ import_react5.default.createElement("div", { key: index, className: "border rounded-lg p-3 space-y-3" }, /* @__PURE__ */ import_react5.default.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ import_react5.default.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ import_react5.default.createElement(import_lucide_react2.ExternalLink, { className: "h-4 w-4" }), /* @__PURE__ */ import_react5.default.createElement("span", { className: "font-medium text-sm" }, "Link ", index + 1)), /* @__PURE__ */ import_react5.default.createElement(
    Button,
    {
      type: "button",
      variant: "ghost",
      size: "sm",
      onClick: () => removeLink(index),
      disabled,
      className: "h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
    },
    /* @__PURE__ */ import_react5.default.createElement(import_lucide_react2.Trash2, { className: "h-4 w-4" })
  )), /* @__PURE__ */ import_react5.default.createElement("div", null, /* @__PURE__ */ import_react5.default.createElement(
    Input,
    {
      type: "url",
      value: link.url,
      onChange: (e) => updateLink(index, "url", e.target.value),
      disabled,
      placeholder: "https://example.com"
    }
  ))))), canAddMore && /* @__PURE__ */ import_react5.default.createElement("div", { className: "border border-dashed rounded-lg p-3 space-y-3" }, /* @__PURE__ */ import_react5.default.createElement("div", { className: "flex gap-2" }, /* @__PURE__ */ import_react5.default.createElement(
    Input,
    {
      type: "url",
      value: newUrl,
      onChange: (e) => setNewUrl(e.target.value),
      disabled,
      placeholder: "https://example.com",
      className: "flex-1"
    }
  ), /* @__PURE__ */ import_react5.default.createElement(
    Button,
    {
      type: "button",
      variant: "outline",
      size: "sm",
      onClick: addLink,
      disabled: disabled || !newUrl.trim()
    },
    /* @__PURE__ */ import_react5.default.createElement(import_lucide_react2.Plus, { className: "h-4 w-4" })
  ))), !canAddMore && /* @__PURE__ */ import_react5.default.createElement("p", { className: "text-sm text-muted-foreground" }, "Maximum ", maxLinks, " links allowed"), error && /* @__PURE__ */ import_react5.default.createElement("p", { className: "text-sm text-destructive" }, error));
}

// src/components/fields/ImagesField.tsx
var import_react6 = __toESM(require("react"));
var import_lucide_react3 = require("lucide-react");
function ImagesField({
  config,
  value = [],
  onChange,
  error,
  disabled = false
}) {
  const [newImageUrl, setNewImageUrl] = (0, import_react6.useState)("");
  const maxFiles = config.maxFiles || 5;
  const canAddMore = value.length < maxFiles;
  const addImage = () => {
    if (!newImageUrl.trim()) return;
    const newImage = {
      url: newImageUrl,
      alt: "",
      caption: ""
    };
    onChange([...value, newImage]);
    setNewImageUrl("");
  };
  const removeImage = (index) => {
    const updatedImages = value.filter((_, i) => i !== index);
    onChange(updatedImages);
  };
  const updateImageCaption = (index, caption) => {
    const updatedImages = value.map(
      (img, i) => i === index ? __spreadProps(__spreadValues({}, img), { caption }) : img
    );
    onChange(updatedImages);
  };
  return /* @__PURE__ */ import_react6.default.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ import_react6.default.createElement("div", null, /* @__PURE__ */ import_react6.default.createElement(Label, { htmlFor: config.key }, config.label, config.required && /* @__PURE__ */ import_react6.default.createElement("span", { className: "text-destructive ml-1" }, "*")), config.description && /* @__PURE__ */ import_react6.default.createElement("p", { className: "text-sm text-muted-foreground mt-1" }, config.description)), value.length > 0 && /* @__PURE__ */ import_react6.default.createElement("div", { className: "space-y-3" }, value.map((image, index) => /* @__PURE__ */ import_react6.default.createElement("div", { key: index, className: "border rounded-lg p-3 space-y-3" }, /* @__PURE__ */ import_react6.default.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ import_react6.default.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ import_react6.default.createElement(import_lucide_react3.Image, { className: "h-4 w-4" }), /* @__PURE__ */ import_react6.default.createElement("span", { className: "font-medium text-sm" }, "Image ", index + 1)), /* @__PURE__ */ import_react6.default.createElement(
    Button,
    {
      type: "button",
      variant: "ghost",
      size: "sm",
      onClick: () => removeImage(index),
      disabled,
      className: "h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
    },
    /* @__PURE__ */ import_react6.default.createElement(import_lucide_react3.Trash2, { className: "h-4 w-4" })
  )), /* @__PURE__ */ import_react6.default.createElement("div", null, /* @__PURE__ */ import_react6.default.createElement(
    Input,
    {
      type: "url",
      value: image.url,
      disabled: true,
      placeholder: "Image URL"
    }
  )), config.allowCaptions && /* @__PURE__ */ import_react6.default.createElement("div", null, /* @__PURE__ */ import_react6.default.createElement(Label, { className: "text-xs" }, "Caption (Optional)"), /* @__PURE__ */ import_react6.default.createElement(
    Input,
    {
      value: image.caption || "",
      onChange: (e) => updateImageCaption(index, e.target.value),
      disabled,
      placeholder: "Image caption",
      className: "mt-1"
    }
  ))))), canAddMore && /* @__PURE__ */ import_react6.default.createElement("div", { className: "border border-dashed rounded-lg p-4" }, /* @__PURE__ */ import_react6.default.createElement("div", { className: "flex flex-col items-center justify-center text-center space-y-3" }, /* @__PURE__ */ import_react6.default.createElement(import_lucide_react3.Upload, { className: "h-8 w-8 text-muted-foreground" }), /* @__PURE__ */ import_react6.default.createElement("div", null, /* @__PURE__ */ import_react6.default.createElement("p", { className: "text-sm font-medium" }, "Add Image URL"), /* @__PURE__ */ import_react6.default.createElement("p", { className: "text-xs text-muted-foreground" }, "Note: File upload coming soon. For now, add image URLs.")), /* @__PURE__ */ import_react6.default.createElement("div", { className: "flex gap-2 w-full max-w-md" }, /* @__PURE__ */ import_react6.default.createElement(
    Input,
    {
      type: "url",
      value: newImageUrl,
      onChange: (e) => setNewImageUrl(e.target.value),
      disabled,
      placeholder: "https://example.com/image.jpg",
      className: "flex-1"
    }
  ), /* @__PURE__ */ import_react6.default.createElement(
    Button,
    {
      type: "button",
      variant: "outline",
      size: "sm",
      onClick: addImage,
      disabled: disabled || !newImageUrl.trim()
    },
    "Add"
  )))), !canAddMore && /* @__PURE__ */ import_react6.default.createElement("p", { className: "text-sm text-muted-foreground" }, "Maximum ", maxFiles, " images allowed"), error && /* @__PURE__ */ import_react6.default.createElement("p", { className: "text-sm text-destructive" }, error));
}

// src/components/fields/ProjectSelectField.tsx
var import_react7 = __toESM(require("react"));
var import_lucide_react4 = require("lucide-react");
function ProjectSelectField({
  config,
  value,
  onChange,
  error,
  disabled = false,
  supabaseClient,
  user
}) {
  const [projects, setProjects] = (0, import_react7.useState)([]);
  const [isOpen, setIsOpen] = (0, import_react7.useState)(false);
  const [loading, setLoading] = (0, import_react7.useState)(false);
  const [customValue, setCustomValue] = (0, import_react7.useState)("");
  const [showCustomInput, setShowCustomInput] = (0, import_react7.useState)(false);
  (0, import_react7.useEffect)(() => {
    if (supabaseClient && user) {
      loadProjects();
    }
  }, [user, supabaseClient]);
  const loadProjects = async () => {
    if (!supabaseClient || !user) return;
    setLoading(true);
    try {
      const { data, error: error2 } = await supabaseClient.from("projects").select("id, project_name, description").eq("user_id", user.id).order("project_name");
      if (error2) throw error2;
      setProjects(data || []);
    } catch (error2) {
      console.error("Error loading projects:", error2);
    } finally {
      setLoading(false);
    }
  };
  const selectProject = (projectName) => {
    onChange(projectName);
    setIsOpen(false);
    setShowCustomInput(false);
  };
  const handleCustomSubmit = () => {
    if (customValue.trim()) {
      onChange(customValue.trim());
      setCustomValue("");
      setShowCustomInput(false);
      setIsOpen(false);
    }
  };
  const selectedProject = projects.find((p) => p.project_name === value);
  const allowCustom = config.allowCustom !== false;
  return /* @__PURE__ */ import_react7.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react7.default.createElement("div", null, /* @__PURE__ */ import_react7.default.createElement(Label, { htmlFor: config.key }, config.label, config.required && /* @__PURE__ */ import_react7.default.createElement("span", { className: "text-destructive ml-1" }, "*")), config.description && /* @__PURE__ */ import_react7.default.createElement("p", { className: "text-sm text-muted-foreground mt-1" }, config.description)), /* @__PURE__ */ import_react7.default.createElement("div", { className: "relative" }, /* @__PURE__ */ import_react7.default.createElement(
    Button,
    {
      type: "button",
      variant: "outline",
      onClick: () => setIsOpen(!isOpen),
      disabled: disabled || loading,
      className: "w-full justify-between h-10 px-3"
    },
    /* @__PURE__ */ import_react7.default.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ import_react7.default.createElement(import_lucide_react4.FolderOpen, { className: "h-4 w-4" }), /* @__PURE__ */ import_react7.default.createElement("span", { className: value ? "text-foreground" : "text-muted-foreground" }, value || config.placeholder || "Select a project")),
    /* @__PURE__ */ import_react7.default.createElement(import_lucide_react4.ChevronDown, { className: `h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}` })
  ), isOpen && /* @__PURE__ */ import_react7.default.createElement("div", { className: "absolute top-full left-0 right-0 z-50 mt-1 max-h-60 overflow-auto bg-popover border rounded-md shadow-md" }, /* @__PURE__ */ import_react7.default.createElement("div", { className: "p-0" }, loading ? /* @__PURE__ */ import_react7.default.createElement("div", { className: "p-3 text-center text-sm text-muted-foreground" }, "Loading projects...") : /* @__PURE__ */ import_react7.default.createElement(import_react7.default.Fragment, null, value && /* @__PURE__ */ import_react7.default.createElement(
    "button",
    {
      type: "button",
      onClick: () => selectProject(""),
      className: "w-full px-3 py-2 text-left text-sm hover:bg-accent transition-colors border-b"
    },
    /* @__PURE__ */ import_react7.default.createElement("span", { className: "text-muted-foreground" }, "Clear selection")
  ), projects.length > 0 ? projects.map((project) => /* @__PURE__ */ import_react7.default.createElement(
    "button",
    {
      key: project.id,
      type: "button",
      onClick: () => selectProject(project.project_name),
      className: "w-full px-3 py-2 text-left hover:bg-accent transition-colors flex items-center justify-between"
    },
    /* @__PURE__ */ import_react7.default.createElement("div", null, /* @__PURE__ */ import_react7.default.createElement("div", { className: "font-medium text-sm" }, project.project_name), project.description && /* @__PURE__ */ import_react7.default.createElement("div", { className: "text-xs text-muted-foreground truncate" }, project.description)),
    value === project.project_name && /* @__PURE__ */ import_react7.default.createElement(import_lucide_react4.Check, { className: "h-4 w-4 text-primary" })
  )) : /* @__PURE__ */ import_react7.default.createElement("div", { className: "p-3 text-center text-sm text-muted-foreground" }, "No projects found"), allowCustom && /* @__PURE__ */ import_react7.default.createElement(import_react7.default.Fragment, null, /* @__PURE__ */ import_react7.default.createElement("div", { className: "border-t" }, showCustomInput ? /* @__PURE__ */ import_react7.default.createElement("div", { className: "p-3 space-y-2" }, /* @__PURE__ */ import_react7.default.createElement(
    Input,
    {
      value: customValue,
      onChange: (e) => setCustomValue(e.target.value),
      placeholder: "Enter project name",
      onKeyPress: (e) => e.key === "Enter" && handleCustomSubmit(),
      autoFocus: true
    }
  ), /* @__PURE__ */ import_react7.default.createElement("div", { className: "flex gap-2" }, /* @__PURE__ */ import_react7.default.createElement(
    Button,
    {
      type: "button",
      size: "sm",
      onClick: handleCustomSubmit,
      disabled: !customValue.trim()
    },
    "Add"
  ), /* @__PURE__ */ import_react7.default.createElement(
    Button,
    {
      type: "button",
      variant: "outline",
      size: "sm",
      onClick: () => {
        setShowCustomInput(false);
        setCustomValue("");
      }
    },
    "Cancel"
  ))) : /* @__PURE__ */ import_react7.default.createElement(
    "button",
    {
      type: "button",
      onClick: () => setShowCustomInput(true),
      className: "w-full px-3 py-2 text-left text-sm hover:bg-accent transition-colors flex items-center gap-2"
    },
    /* @__PURE__ */ import_react7.default.createElement(import_lucide_react4.Plus, { className: "h-4 w-4" }),
    /* @__PURE__ */ import_react7.default.createElement("span", null, "Add custom project")
  ))))))), selectedProject && /* @__PURE__ */ import_react7.default.createElement("div", { className: "text-xs text-muted-foreground" }, selectedProject.description && /* @__PURE__ */ import_react7.default.createElement("span", null, "\u{1F4DD} ", selectedProject.description)), error && /* @__PURE__ */ import_react7.default.createElement("p", { className: "text-sm text-destructive" }, error), isOpen && /* @__PURE__ */ import_react7.default.createElement(
    "div",
    {
      className: "fixed inset-0 z-40",
      onClick: () => setIsOpen(false)
    }
  ));
}

// src/components/FormGenerator.tsx
var import_lucide_react6 = require("lucide-react");

// src/components/ui/dropdown-menu.tsx
var React13 = __toESM(require("react"));
var DropdownMenuPrimitive = __toESM(require("@radix-ui/react-dropdown-menu"));
var import_lucide_react5 = require("lucide-react");
function DropdownMenu(_a) {
  var props = __objRest(_a, []);
  return /* @__PURE__ */ React13.createElement(DropdownMenuPrimitive.Root, __spreadValues({ "data-slot": "dropdown-menu" }, props));
}
function DropdownMenuTrigger(_a) {
  var props = __objRest(_a, []);
  return /* @__PURE__ */ React13.createElement(
    DropdownMenuPrimitive.Trigger,
    __spreadValues({
      "data-slot": "dropdown-menu-trigger"
    }, props)
  );
}
function DropdownMenuContent(_a) {
  var _b = _a, {
    className,
    sideOffset = 4
  } = _b, props = __objRest(_b, [
    "className",
    "sideOffset"
  ]);
  return /* @__PURE__ */ React13.createElement(DropdownMenuPrimitive.Portal, null, /* @__PURE__ */ React13.createElement(
    DropdownMenuPrimitive.Content,
    __spreadValues({
      "data-slot": "dropdown-menu-content",
      sideOffset,
      className: cn(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border p-1 shadow-md",
        className
      )
    }, props)
  ));
}

// src/components/FormGenerator.tsx
function FormGenerator({
  schema,
  onSubmit,
  onReset,
  className,
  disabled = false,
  initialData,
  supabaseClient,
  user
}) {
  const zodSchema = generateZodSchema(schema.fields);
  const defaultValues = initialData || getDefaultValues(schema.fields);
  const {
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting }
  } = (0, import_react_hook_form.useForm)({
    resolver: (0, import_zod2.zodResolver)(zodSchema),
    defaultValues
  });
  const watchedValues = watch();
  const renderInlineField = (field) => {
    const value = watchedValues[field.key];
    const getIcon = () => {
      switch (field.key) {
        case "project_name":
          return /* @__PURE__ */ import_react8.default.createElement(import_lucide_react6.FolderOpen, { className: "h-4 w-4" });
        case "tags":
          return /* @__PURE__ */ import_react8.default.createElement(import_lucide_react6.Tag, { className: "h-4 w-4" });
        case "links":
          return /* @__PURE__ */ import_react8.default.createElement(import_lucide_react6.Link, { className: "h-4 w-4" });
        case "images":
          return /* @__PURE__ */ import_react8.default.createElement(import_lucide_react6.Image, { className: "h-4 w-4" });
        case "screenshots":
          return /* @__PURE__ */ import_react8.default.createElement(import_lucide_react6.Camera, { className: "h-4 w-4" });
        default:
          return /* @__PURE__ */ import_react8.default.createElement(import_lucide_react6.Plus, { className: "h-4 w-4" });
      }
    };
    const getDisplayText = () => {
      switch (field.key) {
        case "project_name":
          return value ? `Project: ${value}` : "Add Project";
        case "tags":
          return Array.isArray(value) && value.length > 0 ? `Tags (${value.length})` : "Add Tags";
        case "links":
          return Array.isArray(value) && value.length > 0 ? `Links (${value.length})` : "Add Links";
        case "images":
          return Array.isArray(value) && value.length > 0 ? `Images (${value.length})` : "Add Images";
        case "screenshots":
          return Array.isArray(value) && value.length > 0 ? `Screenshots (${value.length})` : "Add Screenshots";
        default:
          return field.label;
      }
    };
    return /* @__PURE__ */ import_react8.default.createElement(DropdownMenu, { key: field.key }, /* @__PURE__ */ import_react8.default.createElement(DropdownMenuTrigger, { asChild: true }, /* @__PURE__ */ import_react8.default.createElement(
      Button,
      {
        type: "button",
        variant: "ghost",
        size: "sm",
        className: "h-8 gap-2 text-muted-foreground hover:text-foreground"
      },
      getIcon(),
      /* @__PURE__ */ import_react8.default.createElement("span", { className: "text-xs" }, getDisplayText())
    )), /* @__PURE__ */ import_react8.default.createElement(DropdownMenuContent, { className: "w-80 p-4", align: "start" }, /* @__PURE__ */ import_react8.default.createElement("div", { className: "space-y-2" }, renderField(field))));
  };
  const renderField = (field) => {
    var _a;
    const value = watchedValues[field.key];
    const error = (_a = errors[field.key]) == null ? void 0 : _a.message;
    const commonProps = {
      error,
      disabled: disabled || isSubmitting
    };
    switch (field.type) {
      case "text":
      case "email":
      case "url":
        return /* @__PURE__ */ import_react8.default.createElement(
          TextField,
          __spreadProps(__spreadValues({}, commonProps), {
            config: field,
            value: typeof value === "string" ? value : "",
            onChange: (newValue) => setValue(field.key, newValue)
          })
        );
      case "textarea":
        return /* @__PURE__ */ import_react8.default.createElement(
          TextAreaField,
          __spreadProps(__spreadValues({}, commonProps), {
            config: field,
            value: typeof value === "string" ? value : "",
            onChange: (newValue) => setValue(field.key, newValue)
          })
        );
      case "tags":
        return /* @__PURE__ */ import_react8.default.createElement(
          TagField,
          __spreadProps(__spreadValues({}, commonProps), {
            config: field,
            value: Array.isArray(value) ? value : [],
            onChange: (newValue) => setValue(field.key, newValue)
          })
        );
      case "links":
        return /* @__PURE__ */ import_react8.default.createElement(
          LinksField,
          __spreadProps(__spreadValues({}, commonProps), {
            config: field,
            value: Array.isArray(value) ? value : [],
            onChange: (newValue) => setValue(field.key, newValue)
          })
        );
      case "images":
        return /* @__PURE__ */ import_react8.default.createElement(
          ImagesField,
          __spreadProps(__spreadValues({}, commonProps), {
            config: field,
            value: Array.isArray(value) ? value : [],
            onChange: (newValue) => setValue(field.key, newValue)
          })
        );
      case "project-select":
        return /* @__PURE__ */ import_react8.default.createElement(
          ProjectSelectField,
          __spreadProps(__spreadValues({}, commonProps), {
            config: field,
            value: typeof value === "string" ? value : "",
            onChange: (newValue) => setValue(field.key, newValue),
            supabaseClient,
            user
          })
        );
      default:
        console.warn(`Unsupported field type: ${field.type}`);
        return null;
    }
  };
  const handleFormSubmit = async (data) => {
    try {
      const supabaseData = prepareSupabaseData(data, schema);
      await onSubmit(supabaseData);
    } catch (error) {
      console.error("Form submission error:", error);
      throw error;
    }
  };
  const handleReset = () => {
    reset(defaultValues);
    onReset == null ? void 0 : onReset();
  };
  return /* @__PURE__ */ import_react8.default.createElement("div", { className: cn("space-y-6", className) }, /* @__PURE__ */ import_react8.default.createElement("div", { className: "space-y-3" }, (schema.title || schema.description) && /* @__PURE__ */ import_react8.default.createElement("div", { className: "space-y-2" }, schema.title && /* @__PURE__ */ import_react8.default.createElement("h2", { className: "text-2xl font-semibold" }, schema.title), schema.description && /* @__PURE__ */ import_react8.default.createElement("p", { className: "text-muted-foreground" }, schema.description)), /* @__PURE__ */ import_react8.default.createElement("div", { className: "flex items-center gap-2 p-3 bg-muted/30 rounded-lg border" }, schema.fields.filter((field) => ["project_name", "tags", "links", "images", "screenshots"].includes(field.key)).map((field) => renderInlineField(field)))), /* @__PURE__ */ import_react8.default.createElement("form", { onSubmit: handleSubmit(handleFormSubmit), className: "space-y-6" }, /* @__PURE__ */ import_react8.default.createElement("div", { className: "space-y-4" }, schema.fields.filter((field) => !["project_name", "tags", "links", "images", "screenshots"].includes(field.key)).map((field) => /* @__PURE__ */ import_react8.default.createElement("div", { key: field.key }, renderField(field)))), /* @__PURE__ */ import_react8.default.createElement("div", { className: "flex justify-end items-center gap-1 pt-4" }, schema.resetText && /* @__PURE__ */ import_react8.default.createElement(import_react8.default.Fragment, null, /* @__PURE__ */ import_react8.default.createElement(
    Button,
    {
      type: "button",
      variant: "ghost",
      size: "sm",
      onClick: handleReset,
      disabled: disabled || isSubmitting,
      className: "text-muted-foreground hover:text-foreground"
    },
    schema.resetText
  ), /* @__PURE__ */ import_react8.default.createElement("span", { className: "text-muted-foreground" }, "|")), /* @__PURE__ */ import_react8.default.createElement(
    Button,
    {
      type: "submit",
      variant: "ghost",
      size: "sm",
      disabled: disabled || isSubmitting,
      className: "text-muted-foreground hover:text-foreground"
    },
    isSubmitting && /* @__PURE__ */ import_react8.default.createElement(import_lucide_react6.Loader2, { className: "mr-2 h-4 w-4 animate-spin" }),
    isSubmitting ? "Submitting..." : schema.submitText || "Submit"
  ))));
}

// src/components/NotedForm.tsx
var import_react9 = __toESM(require("react"));

// src/lib/forms/notedSchema.ts
var notedFormSchema = {
  title: "",
  description: "",
  table: "noted",
  submitText: "Noted",
  resetText: "Clear Note",
  successMessage: "Note saved successfully!",
  autoFields: {
    user_id: true,
    created_at: true,
    updated_at: true
  },
  fields: [
    {
      key: "title",
      label: "",
      type: "text",
      required: true,
      placeholder: "consider it...",
      maxLength: 255,
      autoFocus: true
    },
    {
      key: "description",
      label: "",
      type: "textarea",
      required: true,
      placeholder: "noted...",
      rows: 15,
      maxLength: 1e4
    },
    {
      key: "project_name",
      label: "Project",
      type: "project-select",
      required: false,
      placeholder: "Select or enter a project name",
      allowCustom: true
    },
    {
      key: "tags",
      label: "Tags",
      type: "tags",
      required: false,
      placeholder: "Add tags (press Enter to add)",
      maxTags: 10,
      allowCustomTags: true,
      suggestions: [
        "bug",
        "feature",
        "research",
        "todo",
        "meeting",
        "idea",
        "important",
        "urgent",
        "documentation",
        "testing",
        "deployment",
        "security",
        "performance",
        "ui",
        "ux",
        "api",
        "database",
        "frontend",
        "backend",
        "mobile",
        "web",
        "design",
        "review",
        "feedback",
        "question"
      ]
    },
    {
      key: "links",
      label: "Links",
      type: "links",
      required: false,
      maxLinks: 10,
      allowTitleEdit: true,
      allowDescriptionEdit: true
    },
    {
      key: "images",
      label: "Images",
      type: "images",
      required: false,
      maxFiles: 5,
      maxFileSize: 5 * 1024 * 1024,
      // 5MB
      allowedTypes: ["image/jpeg", "image/png", "image/webp"],
      allowCaptions: true
    },
    {
      key: "screenshots",
      label: "Screenshots",
      type: "images",
      // Reuse images field type
      required: false,
      maxFiles: 5,
      maxFileSize: 5 * 1024 * 1024,
      // 5MB
      allowedTypes: ["image/jpeg", "image/png", "image/webp"],
      allowCaptions: true
    }
  ]
};

// src/components/NotedForm.tsx
function NotedForm({
  onSuccess,
  onCancel,
  className,
  initialData,
  mode = "create",
  supabaseClient,
  user,
  toast
}) {
  const [isSubmitting, setIsSubmitting] = (0, import_react9.useState)(false);
  const handleSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      if (!supabaseClient) {
        throw new Error("Supabase client is not provided");
      }
      if (!user) {
        throw new Error("You must be logged in to save a note");
      }
      if (mode === "edit" && initialData) {
        const { data: updateData, error } = await supabaseClient.from("noted").update({
          title: data.title,
          description: data.description,
          project_name: data.project_name || null,
          tags: data.tags || [],
          links: data.links || [],
          images: data.images || [],
          screenshots: data.screenshots || []
        }).eq("id", initialData.id).eq("user_id", user.id).select().single();
        if (error) {
          throw error;
        }
        toast({
          title: "Success",
          description: "Note updated successfully!",
          type: "success"
        });
        onSuccess == null ? void 0 : onSuccess(updateData);
      } else {
        const userMetadata = user && "user_metadata" in user ? user.user_metadata : void 0;
        const noteWithUser = __spreadProps(__spreadValues({}, data), {
          user_id: user.id,
          tags: data.tags || [],
          links: data.links || [],
          images: data.images || [],
          screenshots: data.screenshots || []
        });
        const { data: insertedData, error } = await supabaseClient.from("noted").insert([noteWithUser]).select().single();
        if (error) {
          throw error;
        }
        toast({
          title: "Success",
          description: notedFormSchema.successMessage || "Note saved successfully!",
          type: "success"
        });
        onSuccess == null ? void 0 : onSuccess(insertedData);
      }
    } catch (error) {
      console.error(`Note ${mode} error:`, error);
      toast({
        title: "Error",
        description: (error == null ? void 0 : error.message) || `Failed to ${mode} note. Please try again.`,
        type: "error"
      });
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleReset = () => {
    if (mode === "edit") {
      onCancel == null ? void 0 : onCancel();
    } else {
      toast({
        title: "Form Reset",
        description: "Form has been cleared.",
        type: "info"
      });
    }
  };
  const formInitialData = initialData ? {
    title: initialData.title,
    description: initialData.description,
    project_name: initialData.project_name || "",
    tags: initialData.tags || [],
    links: initialData.links || [],
    images: initialData.images || [],
    screenshots: initialData.screenshots || []
  } : void 0;
  return /* @__PURE__ */ import_react9.default.createElement(
    FormGenerator,
    {
      schema: notedFormSchema,
      onSubmit: handleSubmit,
      onReset: handleReset,
      disabled: isSubmitting,
      className,
      initialData: formInitialData,
      supabaseClient,
      user
    }
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BaseField,
  FormGenerator,
  ImagesField,
  LinksField,
  NotedForm,
  ProjectSelectField,
  TagField,
  TextAreaField,
  TextField
});
//# sourceMappingURL=index.js.map