import React, { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { SearchIcon, Loader2, XIcon } from "lucide-react";
import { FarcasterChannel } from "@/types/channel";
import { searchChannels } from "@/services/channelAnalytics";
import { debounce } from "lodash";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function ChannelSearch() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<FarcasterChannel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const debouncedSearch = useCallback(
    debounce(async (searchQuery: string) => {
      if (searchQuery.length < 2) {
        setSuggestions([]);
        return;
      }
      setIsLoading(true);
      try {
        const channels = await searchChannels(searchQuery);
        setSuggestions(channels);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    }, 300),
    []
  );

  useEffect(() => {
    debouncedSearch(query);
    return () => {
      debouncedSearch.cancel();
    };
  }, [query, debouncedSearch]);

  const handleSuggestionClick = (channelId: string) => {
    router.push(`/analytics/channels/${channelId}`);
    setSuggestions([]);
    setQuery("");
  };

  const handleClearSearch = () => {
    setQuery("");
    setSuggestions([]);
    inputRef.current?.focus();
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative flex items-center">
        <Input
          ref={inputRef}
          type="text"
          placeholder="Search Farcaster channels..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          className="w-full py-3 px-4 pr-12 bg-background border-2 border-primary rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 ease-in-out"
        />
        {query && (
          <Button
            type="button"
            variant="ghost"
            className="absolute right-12 top-1/2 transform -translate-y-1/2 h-8 w-8 rounded-full p-0"
            onClick={handleClearSearch}
          >
            <XIcon className="h-5 w-5" />
          </Button>
        )}
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
          {isLoading ? (
            <Loader2 className="h-5 w-5 text-primary animate-spin" />
          ) : (
            <SearchIcon className="h-5 w-5 text-primary" />
          )}
        </div>
      </div>
      {isFocused && (query.length >= 2 || isLoading) && (
        <ul className="absolute z-10 w-full bg-background border border-border mt-2 rounded-lg shadow-lg max-h-80 overflow-auto">
          {isLoading ? (
            <li className="px-4 py-3 text-center">
              <Loader2 className="h-5 w-5 text-primary animate-spin mx-auto" />
            </li>
          ) : suggestions.length > 0 ? (
            suggestions.map((channel) => (
              <li
                key={channel.id}
                onClick={() => handleSuggestionClick(channel.channelId)}
                className="px-4 py-3 hover:bg-accent cursor-pointer transition-colors duration-150 ease-in-out flex items-center"
              >
                <div className="w-10 h-10 relative mr-3 flex-shrink-0">
                  <Image
                    unoptimized
                    src={channel.imageUrl}
                    alt={channel.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-full"
                  />
                </div>
                <div className="flex-grow min-w-0">
                  <h3 className="font-semibold text-foreground truncate">
                    {channel.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {channel.followerCount.toLocaleString()} followers
                  </p>
                </div>
              </li>
            ))
          ) : (
            <li className="px-4 py-3 text-muted-foreground">
              No channels found
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
