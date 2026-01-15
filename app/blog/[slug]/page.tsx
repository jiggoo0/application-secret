import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Calendar, User, Tag } from "lucide-react";

import { getPostBySlug } from "@/lib/mdx";
import { JsonLd } from "@/components/seo/JsonLd";
import { formatDateThai } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

interface PageProps {
  params: Promise<{ slug: string }>;
}

/* -------------------------------------------------------------------------- */
/*                               Metadata (SEO)                               */
/* -------------------------------------------------------------------------- */

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params; // ✅ FIX
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found | JP-VISOUL.DOCS",
    };
  }

  return {
    title: `${post.title} | JP-VISOUL.DOCS`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image || "/og-image.jpg"],
      type: "article",
      publishedTime: post.date,
      authors: [post.author || "JP-VISOUL Team"],
    },
  };
}

/* -------------------------------------------------------------------------- */
/*                                   Page                                     */
/* -------------------------------------------------------------------------- */

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params; // ✅ FIX
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  /* ------------------------------ JSON-LD Data ----------------------------- */
  const jsonLdData = {
    headline: post.title,
    image: post.image,
    datePublished: post.date,
    author: post.author || "JP-VISOUL Team",
    description: post.excerpt,
    slug,
  };

  return (
    <main className="container max-w-4xl py-12">
      {/* ✅ Structured Data */}
      <JsonLd type="BlogPosting" data={jsonLdData} />

      <article>
        {/* Header */}
        <header className="mb-10 space-y-5">
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5 font-medium text-primary">
              <Tag size={16} />
              {post.category || "สาระน่ารู้"}
            </span>

            <span className="inline-flex items-center gap-1.5">
              <Calendar size={16} />
              {formatDateThai(post.date)}
            </span>

            <span className="inline-flex items-center gap-1.5">
              <User size={16} />
              {post.author || "JP-VISOUL Team"}
            </span>
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
            {post.title}
          </h1>

          <p className="text-xl text-muted-foreground leading-relaxed">
            {post.excerpt}
          </p>
        </header>

        {/* Cover Image */}
        {post.image && (
          <div className="relative mb-12 aspect-video overflow-hidden rounded-xl border bg-muted">
            <Image
              src={post.image}
              alt={post.title}
              fill
              priority
              className="object-cover"
            />
          </div>
        )}

        {/* Content */}
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
      </article>
    </main>
  );
}
