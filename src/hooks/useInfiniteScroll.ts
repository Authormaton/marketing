import { useEffect, useRef, useCallback, useState } from "react";
import { useIntersectionObserver } from "./useIntersectionObserver";

interface InfiniteScrollOptions {
  onLoadMore: () => void;
  hasMore: boolean;
  loading: boolean;
  threshold?: number;
  rootMargin?: string;
}

export const useInfiniteScroll = ({
  onLoadMore,
  hasMore,
  loading,
  threshold = 0.1,
  rootMargin = "0px",
}: InfiniteScrollOptions) => {
  const { ref: loaderRef, isVisible } = useIntersectionObserver({
    threshold,
    rootMargin,
  });

  useEffect(() => {
    if (isVisible && hasMore && !loading) {
      onLoadMore();
    }
  }, [isVisible, hasMore, loading, onLoadMore]);

  return { loaderRef };
};

/*
 * Usage Example for a Blog or Content Feed:
 *
 * // In your BlogFeed.tsx or similar component:
 *
 * import React, { useState, useEffect, useCallback } from 'react';
 * import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
 *
 * interface Post {
 *   id: string;
 *   title: string;
 *   content: string;
 * }
 *
 * const fetchPosts = async (page: number): Promise<Post[]> => {
 *   // Simulate API call
 *   return new Promise((resolve) => {
 *     setTimeout(() => {
 *       const newPosts: Post[] = [];
 *       for (let i = 0; i < 5; i++) {
 *         newPosts.push({
 *           id: `post-${page * 5 + i}`,
 *           title: `Post Title ${page * 5 + i}`,
 *           content: `This is the content for post ${page * 5 + i}.`,
 *         });
 *       }
 *       resolve(newPosts);
 *     }, 1000);
 *   });
 * };
 *
 * const BlogFeed: React.FC = () => {
 *   const [posts, setPosts] = useState<Post[]>([]);
 *   const [page, setPage] = useState(0);
 *   const [hasMore, setHasMore] = useState(true);
 *   const [loading, setLoading] = useState(false);
 *
 *   const onLoadMore = useCallback(async () => {
 *     if (loading || !hasMore) return;
 *
 *     setLoading(true);
 *     const newPosts = await fetchPosts(page);
 *     setPosts((prevPosts) => [...prevPosts, ...newPosts]);
 *     setPage((prevPage) => prevPage + 1);
 *     setHasMore(newPosts.length > 0); // Assuming no more data if fetch returns empty array
 *     setLoading(false);
 *   }, [page, loading, hasMore]);
 *
 *   const { loaderRef } = useInfiniteScroll({
 *     onLoadMore,
 *     hasMore,
 *     loading,
 *     threshold: 0.5, // Load more when 50% of the loader is visible
 *   });
 *
 *   useEffect(() => {
 *     // Initial load
 *     onLoadMore();
 *   }, []); // eslint-disable-line react-hooks/exhaustive-deps
 *
 *   return (
 *     <div>
 *       <h1>My Awesome Blog</h1>
 *       {
 *         posts.map((post) => (
 *           <div key={post.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
 *             <h2>{post.title}</h2>
 *             <p>{post.content}</p>
 *           </div>
 *         ))}
 *
 *       {hasMore && (
 *         <div ref={loaderRef} style={{ textAlign: 'center', padding: '20px' }}>
 *           {loading ? <p>Loading more posts...</p> : <p>Scroll down to load more</p>}
 *         </div>
 *       )}
 *
 *       {!hasMore && !loading && (
 *         <p style={{ textAlign: 'center', padding: '20px' }}>You've reached the end!</p>
 *       )}
 *     </div>
 *   );
 * };
 *
 * export default BlogFeed;
 */