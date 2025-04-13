// src/modules/news/components/NewsWidget.tsx
import React from "react";
import { NewsArticle, NewsWidgetConfig } from "@/modules/news/types";
import { useNewsData } from "@/modules/news/hooks/useNewsData";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Newspaper } from "lucide-react";
import FallbackSkeleton from "@/components/FallbackSkeleton";
import { formatDate } from "@/lib/formatters";
import ErrorDisplay from "@/components/ErrorDisplay";

interface NewsWidgetProps {
  config: NewsWidgetConfig;
}

const NewsWidget: React.FC<NewsWidgetProps> = ({ config }) => {
  const { data, isLoading, isError, error, isFetching } = useNewsData(config);

  if (
    !(
      (config.sourceType === "category" && config.category) ||
      (config.sourceType === "keywords" && config.keywords)
    )
  ) {
    return (
      <div className="text-center text-muted-foreground p-2 text-xs">
        <Newspaper className="mx-auto h-5 w-5 mb-1" />
        Please configure news source (category or keywords) in settings.
      </div>
    );
  }

  // 2. Handle Loading State
  if (isLoading) {
    return <FallbackSkeleton className="w-full h-[130px] p-2" />;
  }

  // 3. Handle Error State
  if (isError) {
    return <ErrorDisplay error={error} title="News Error" />;
  }

  // 4. Handle Success State
  const articles: NewsArticle[] = data?.articles || [];

  return (
    <div className="relative h-full text-xs">
      {isFetching && (
        <span className="text-xs text-muted-foreground absolute top-0.5 right-0.5 px-1 z-10">
          ...
        </span>
      )}
      <ScrollArea className="h-full pr-3">
        {" "}
        {/* Added pr for scrollbar */}
        {articles.length === 0 && !isLoading && (
          <p className="text-muted-foreground text-center py-4">
            No news articles found.
          </p>
        )}
        <ul className="space-y-2.5">
          {articles.map((article, index) => (
            <li key={article.url || index}>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:bg-muted/50 p-1 rounded transition-colors"
              >
                <p className="font-medium text-foreground leading-snug mb-0.5">
                  {article.title}
                </p>
                <p className="text-muted-foreground text-xs">
                  {article.source?.name} - {formatDate(article.publishedAt)}
                </p>
              </a>
            </li>
          ))}
        </ul>
      </ScrollArea>
    </div>
  );
};

export default NewsWidget;
