// src/modules/news/components/NewsConfigForm.tsx
import React, { useState } from "react";
import { NewsWidgetConfig, NewsCategory } from "@/modules/news/types";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  NEWSAPI_DEFAULT_PAGE_SIZE,
  NEWSAPI_MAX_PAGE_SIZE_CONFIG,
} from "@/config/constants";

interface NewsConfigFormProps {
  currentConfig: NewsWidgetConfig;
  onSave: (newConfig: Partial<NewsWidgetConfig>) => void;
}

// Define categories for the dropdown
const newsCategories: NewsCategory[] = [
  "business",
  "entertainment",
  "general",
  "health",
  "science",
  "sports",
  "technology",
];

const NewsConfigForm: React.FC<NewsConfigFormProps> = ({
  currentConfig,
  onSave,
}) => {
  const [sourceType, setSourceType] = useState<"category" | "keywords">(
    currentConfig.sourceType || "category"
  );
  const [category, setCategory] = useState<NewsCategory | undefined>(
    currentConfig.category
  );
  const [keywords, setKeywords] = useState(currentConfig.keywords || "");
  const [pageSize, setPageSize] = useState<number>(currentConfig.pageSize || 5);
  const [refreshInterval, setRefreshInterval] = useState<number | undefined>(
    currentConfig.refreshInterval
  ); // In minutes

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const newConfig: Partial<NewsWidgetConfig> = {
      sourceType,
      category: sourceType === "category" ? category : undefined,
      keywords: sourceType === "keywords" ? keywords.trim() : undefined,
      pageSize:
        isNaN(pageSize) || pageSize < NEWSAPI_DEFAULT_PAGE_SIZE
          ? NEWSAPI_MAX_PAGE_SIZE_CONFIG
          : Math.min(pageSize, NEWSAPI_MAX_PAGE_SIZE_CONFIG), // API limit unknown
      refreshInterval:
        refreshInterval && !isNaN(refreshInterval) && refreshInterval > 0
          ? refreshInterval
          : undefined,
      title: currentConfig.title, // Preserve title if set
    };
    // Simple validation
    if (sourceType === "category" && !category) {
      alert("Please select a category.");
      return;
    }
    if (sourceType === "keywords" && !keywords.trim()) {
      alert("Please enter keywords.");
      return;
    }
    onSave(newConfig);
  };

  return (
    <form onSubmit={handleSave} className="space-y-4 p-1 text-sm">
      {/* Source Type Selection */}
      <div>
        <Label className="mb-2 block">News Source</Label>
        <RadioGroup
          value={sourceType}
          onValueChange={(value) =>
            setSourceType(value as "category" | "keywords")
          }
          className="flex space-x-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="category" id="news-cat" />
            <Label htmlFor="news-cat">Category</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="keywords" id="news-key" />
            <Label htmlFor="news-key">Keywords</Label>
          </div>
        </RadioGroup>
      </div>

      {/* Category Select */}
      {sourceType === "category" && (
        <div className="space-y-2">
          <Label htmlFor="news-category-select">Category</Label>
          <Select
            value={category}
            onValueChange={(value) => setCategory(value as NewsCategory)}
          >
            <SelectTrigger id="news-category-select">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {newsCategories.map((cat) => (
                <SelectItem key={cat} value={cat} className="capitalize">
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Keywords Input */}
      {sourceType === "keywords" && (
        <div className="space-y-2">
          <Label htmlFor="news-keywords">Keywords</Label>
          <Input
            id="news-keywords"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            placeholder="e.g., React, AI, Berlin"
          />
        </div>
      )}

      {/* Page Size & Refresh */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="news-pagesize">Articles (1-10)</Label>
          <Input
            id="news-pagesize"
            type="number"
            min="1"
            max="5" // API limit unknown
            value={pageSize}
            onChange={(e) => setPageSize(parseInt(e.target.value, 10))}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="news-refresh">Refresh (minutes, optional)</Label>
          <Input
            id="news-refresh"
            type="number"
            min="1"
            placeholder="e.g., 15"
            value={refreshInterval || ""}
            onChange={(e) =>
              setRefreshInterval(
                e.target.value ? parseInt(e.target.value, 10) : undefined
              )
            }
          />
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit" variant={"outline"}>
          Save Changes
        </Button>
      </div>
    </form>
  );
};

export default NewsConfigForm;
