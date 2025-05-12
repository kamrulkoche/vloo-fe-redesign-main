"use client";

import AllBlogComponent from "@/components/CustomComponents/Blog/AllBlogComponent";

const dummyData = [
  {
    id: 1,
    title: "Maximize Your Business Potential",
    category: "FOR HYBRID WORKERS",
    highlights: "yes",
    img: "/assets/images/blogs/blog-1.jpg",
  },
  {
    id: 2,
    title: "Maximize Your Business Potential",
    category: "What's New",
    highlights: "no",
    img: "/assets/images/blogs/blog-2.jpg",
  },
  {
    id: 3,
    title: "Maximize Your Business Potential",
    category: "FOR HYBRID WORKERS",
    highlights: "yes",
    img: "/assets/images/blogs/blog-1.jpg",
  },
  {
    id: 4,
    title: "Maximize Your Business Potential",
    category: "What's New",
    highlights: "yes",
    img: "/assets/images/blogs/blog-2.jpg",
  },
  {
    id: 5,
    title: "Maximize Your Business Potential",
    category: "FOR HYBRID WORKERS",
    highlights: "no",
    img: "/assets/images/blogs/blog-1.jpg",
  },
  {
    id: 6,
    title: "Maximize Your Business Potential",
    category: "FOR HYBRID WORKERS",
    highlights: "no",
    img: "/assets/images/blogs/blog-1.jpg",
  },
  {
    id: 7,
    title: "Maximize Your Business Potential",
    category: "FOR HYBRID WORKERS",
    highlights: "no",
    img: "/assets/images/blogs/blog-1.jpg",
  },
  {
    id: 8,
    title: "Maximize Your Business Potential",
    category: "FOR HYBRID WORKERS",
    highlights: "no",
    img: "/assets/images/blogs/blog-1.jpg",
  },
  {
    id: 9,
    title: "Maximize Your Business Potential",
    category: "FOR HYBRID WORKERS",
    highlights: "no",
    img: "/assets/images/blogs/blog-1.jpg",
  },
  {
    id: 10,
    title: "Maximize Your Business Potential",
    category: "FOR HYBRID WORKERS",
    highlights: "no",
    img: "/assets/images/blogs/blog-1.jpg",
  },
  {
    id: 11,
    title: "Maximize Your Business Potential",
    category: "FOR HYBRID WORKERS",
    highlights: "no",
    img: "/assets/images/blogs/blog-1.jpg",
  },
  {
    id: 12,
    title: "Maximize Your Business Potential",
    category: "FOR HYBRID WORKERS",
    highlights: "no",
    img: "/assets/images/blogs/blog-1.jpg",
  },
];

export default function AllBlogsPageComponent() {
  return (
    <div>
      <AllBlogComponent data={dummyData} />
    </div>
  );
}
