"use client";

import { useMemo, useState } from "react";
import { ContentCard } from "@/components/ui/content-card";

export type DirectoryResource = {
  name: string;
  category: string;
  description: string;
  href: string;
  source: string;
};

export function ResourceDirectory({ resources }: { resources: DirectoryResource[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const categories = ["All", ...new Set(resources.map((resource) => resource.category))];
  const filteredResources = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return resources.filter((resource) => {
      const matchesCategory = category === "All" || resource.category === category;
      const searchableText = `${resource.name} ${resource.description} ${resource.source}`.toLowerCase();
      return matchesCategory && (!normalizedQuery || searchableText.includes(normalizedQuery));
    });
  }, [category, query, resources]);

  return (
    <div className="mt-12 sm:mt-16">
      <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto]">
        <label className="sr-only" htmlFor="resource-search">Search resources</label>
        <input
          id="resource-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search tools, guides, repositories..."
          className="min-h-11 rounded-md border border-border bg-surface px-3 text-sm text-foreground outline-none placeholder:text-subtle focus:border-accent"
        />
        <label className="sr-only" htmlFor="resource-category">Filter by category</label>
        <select
          id="resource-category"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          className="min-h-11 rounded-md border border-border bg-surface px-3 text-sm text-foreground outline-none focus:border-accent"
        >
          {categories.map((option) => <option key={option}>{option}</option>)}
        </select>
      </div>
      <p className="mt-4 text-sm text-subtle" aria-live="polite">{filteredResources.length} {filteredResources.length === 1 ? "resource" : "resources"} found.</p>
      {filteredResources.length ? (
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredResources.map((resource) => (
            <ContentCard key={resource.name} className="flex h-full flex-col">
              <p className="text-technical-label text-accent">{resource.category}</p>
              <h2 className="mt-4 text-lg font-medium"><a href={resource.href} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-accent">{resource.name}<span aria-hidden="true"> ↗</span><span className="sr-only"> (opens in a new tab)</span></a></h2>
              <p className="mt-2 flex-1 text-sm leading-7 text-muted">{resource.description}</p>
              <p className="mt-5 text-xs text-subtle">{resource.source}</p>
            </ContentCard>
          ))}
        </div>
      ) : (
        <p className="mt-5 rounded-md border border-border p-6 text-sm text-muted">No resources match that search.</p>
      )}
    </div>
  );
}
