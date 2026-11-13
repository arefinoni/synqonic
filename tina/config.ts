import { defineConfig } from "tinacms";

const singleDocumentUi = {
  allowedActions: { create: false, delete: false },
  filename: { readonly: true },
};

const text = (name: string, label: string, description: string, required = true) => ({
  type: "string" as const,
  name,
  label,
  description,
  required,
});

const longText = (name: string, label: string, description: string) => ({
  ...text(name, label, description),
  ui: { component: "textarea" },
});

const image = (name: string, label: string, description: string) => ({
  type: "image" as const,
  name,
  label,
  description,
});

export default defineConfig({
  branch: process.env.NEXT_PUBLIC_TINA_BRANCH || process.env.TINA_BRANCH || "main",
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || null,
  token: process.env.TINA_TOKEN || null,
  build: { outputFolder: "admin", publicFolder: "public" },
  media: { tina: { mediaRoot: "uploads", publicFolder: "public" } },
  telemetry: "disabled",
  schema: {
    collections: [
      {
        name: "homepage",
        label: "Homepage",
        path: "content/site",
        format: "json",
        match: { include: "homepage" },
        ui: singleDocumentUi,
        fields: [
          text("heroTitle", "Hero title", "Primary homepage headline."),
          text("heroSubtitle", "Hero subtitle", "Supporting homepage headline."),
          longText("intro", "Introduction", "Homepage introduction copy."),
          text("academyCtaLabel", "Academy CTA label", "Text shown on the Academy section button."),
          text("academyCtaHref", "Academy CTA destination", "Internal destination for the Academy button."),
          text("resourcesCtaLabel", "Resources CTA label", "Text shown on the Resources section button."),
          text("resourcesCtaHref", "Resources CTA destination", "Internal destination for the Resources button."),
          text("communityCtaLabel", "Community CTA label", "Text shown on the Community section button."),
          text("communityCtaHref", "Community CTA destination", "Internal destination for the Community button."),
          image("heroImage", "Hero image", "Optional homepage editorial image."),
        ],
      },
      {
        name: "academy",
        label: "Academy",
        path: "content/site",
        format: "json",
        match: { include: "academy" },
        ui: singleDocumentUi,
        fields: [
          text("title", "Page title", "Academy page title."),
          longText("description", "Page description", "Academy page introduction."),
          {
            type: "object" as const,
            name: "learningPaths",
            label: "Learning paths",
            list: true,
            fields: [
              text("title", "Title", "Learning path title."),
              text("level", "Level", "Learning path level."),
              longText("description", "Description", "Learning path description."),
              text("topics", "Topics", "Comma-separated topics.", false),
            ],
          },
          image("featuredImage", "Featured image", "Optional Academy image."),
        ],
      },
      {
        name: "resources",
        label: "Resources",
        path: "content/site",
        format: "json",
        match: { include: "resources" },
        ui: singleDocumentUi,
        fields: [
          text("title", "Page title", "Resources page title."),
          longText("description", "Page description", "Resources page introduction."),
          {
            type: "object" as const,
            name: "items",
            label: "Resources",
            list: true,
            fields: [
              text("name", "Name", "Resource name."),
              text("category", "Category", "Resource category."),
              longText("description", "Description", "Resource description."),
              text("href", "URL", "Verified resource URL."),
              text("source", "Source", "Resource publisher or source."),
            ],
          },
        ],
      },
      {
        name: "media",
        label: "Media",
        path: "content/site",
        format: "json",
        match: { include: "media" },
        ui: singleDocumentUi,
        fields: [
          text("title", "Page title", "Media page title."),
          longText("description", "Page description", "Media page introduction."),
          text("youtubeUrl", "YouTube URL", "Official YouTube channel URL."),
          text("mediumUrl", "Medium URL", "Official Medium publication URL."),
          image("featuredImage", "Featured image", "Optional media image."),
        ],
      },
      {
        name: "community",
        label: "Community",
        path: "content/site",
        format: "json",
        match: { include: "community" },
        ui: singleDocumentUi,
        fields: [
          text("title", "Page title", "Community page title."),
          longText("description", "Page description", "Community page introduction."),
          text("discordLabel", "Discord label", "Discord CTA label."),
          text("discordUrl", "Discord URL", "Official Discord invite URL."),
          image("featuredImage", "Featured image", "Optional community image."),
        ],
      },
      {
        name: "about",
        label: "About",
        path: "content/site",
        format: "json",
        match: { include: "about" },
        ui: singleDocumentUi,
        fields: [
          text("title", "Page title", "About page title."),
          longText("description", "Page description", "About page introduction."),
          longText("mission", "Mission", "Mission statement."),
          image("featuredImage", "Featured image", "Optional About image."),
        ],
      },
      {
        name: "socialLinks",
        label: "Social Links",
        path: "content/site",
        format: "json",
        match: { include: "social-links" },
        ui: singleDocumentUi,
        fields: [
          {
            type: "object" as const,
            name: "links",
            label: "Social links",
            list: true,
            fields: [
              text("label", "Label", "Visible platform label."),
              text("platform", "Platform", "Configured platform identifier."),
              text("href", "URL", "Official platform URL."),
              text("category", "Category", "Optional grouping label.", false),
            ],
          },
        ],
      },
      {
        name: "seo",
        label: "SEO",
        path: "content/site",
        format: "json",
        match: { include: "seo" },
        ui: singleDocumentUi,
        fields: [
          text("siteTitle", "Site title", "Default document title."),
          longText("siteDescription", "Site description", "Default search and social description."),
          text("siteUrl", "Canonical site URL", "Canonical public site URL."),
          image("defaultSocialImage", "Default social image", "Default Open Graph image."),
        ],
      },
    ],
  },
});
