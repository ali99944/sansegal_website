"use client"
import { useParams } from "next/navigation"
import DOMPurify from "isomorphic-dompurify"
import { Card } from "@/components/ui/card"
import { usePolicy } from "@/src/hooks/use-policy"



export default function PolicyPage() {
  const params = useParams()
  const key = params.key as string

    const { data: policy, isFetching: is_loading_policy } = usePolicy(key)

  if (is_loading_policy) {
    return (
      <div className="min-h-screen bg-neutral-light">
        <div className="container-luxury section-padding">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse">
              <div className="h-12 bg-neutral-mid/20 rounded-lg mb-8"></div>
              <div className="space-y-4">
                <div className="h-4 bg-neutral-mid/20 rounded w-3/4"></div>
                <div className="h-4 bg-neutral-mid/20 rounded w-full"></div>
                <div className="h-4 bg-neutral-mid/20 rounded w-5/6"></div>
                <div className="h-4 bg-neutral-mid/20 rounded w-2/3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!policy && is_loading_policy == false) {
    return (
      <div className="min-h-screen bg-neutral-light">
        <div className="container-luxury section-padding">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-serif text-4xl font-bold text-primary mb-6">Policy Not Found</h1>
            <p className="text-neutral-mid text-lg mb-8">
              The policy you&apos;re looking for doesn&apos;t exist or has been moved.
            </p>
            {/* <a
              href="/"
              className="inline-flex items-center px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors"
            >
              Return Home
            </a> */}
          </div>
        </div>
      </div>
    )
  }

  // Sanitize HTML content
  const sanitizedContent = DOMPurify.sanitize(policy?.content as string)

  return (
    <div className="min-h-screen bg-neutral-light">
      <div className="container-luxury section-padding">
        <div className="max-w-4xl mx-auto p-4 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-4">{policy?.title}</h1>
            <p className="text-neutral-mid">
              Last updated:{" "}
              {new Date(policy?.updated_at as string).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>

          {/* Content */}
          <Card>
            <div
              className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-primary prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-strong:text-primary prose-ul:text-neutral-mid prose-ol:text-neutral-mid prose-p:text-neutral-mid prose-p:leading-relaxed"
              dangerouslySetInnerHTML={{ __html: sanitizedContent }}
            />
          </Card>
        </div>
      </div>
    </div>
  )
}
