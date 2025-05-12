import BlogDetailPageComponent from "@/components/MainPages/BlogPageComponents/BlogDetailPageComponent";
import React from "react";

export default function BlogDetailPage({ params }) {
  const slug = params?.slug;

  return (
    <div>
      <BlogDetailPageComponent slug={slug} />
    </div>
  );
}
