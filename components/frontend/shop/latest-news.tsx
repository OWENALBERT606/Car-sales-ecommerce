import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function LatestNews() {
  const newsArticles = [
    {
      id: 1,
      category: "Farming Tips",
      image: "/placeholder.svg?height=200&width=300",
      date: "13 Oct 2023",
      title: "ORGANIC PEST CONTROL METHODS THAT ACTUALLY WORK",
      excerpt:
        "Discover natural solutions to protect your crops without harmful chemicals. These proven methods help maintain soil health.",
      author: "Maria Johnson",
      comments: 3,
    },
    {
      id: 2,
      category: "Sustainable Farming",
      image: "/placeholder.svg?height=200&width=300",
      date: "13 Oct 2023",
      title: "HOW CROP ROTATION CAN INCREASE YOUR FARM'S PRODUCTIVITY",
      excerpt:
        "Learn how strategic crop rotation can improve soil fertility, reduce pest pressure, and increase overall yields.",
      author: "James Wilson",
      comments: 3,
    },
    {
      id: 3,
      category: "Farm Equipment",
      image: "/placeholder.svg?height=200&width=300",
      date: "13 Oct 2023",
      title: "SIGNS YOUR IRRIGATION SYSTEM NEEDS MAINTENANCE",
      excerpt:
        "Don't wait for a breakdown. These early warning signs can help you prevent costly repairs and crop losses.",
      author: "Robert Chen",
      comments: 3,
    },
    {
      id: 4,
      category: "Market Trends",
      image: "/placeholder.svg?height=200&width=300",
      date: "13 Oct 2023",
      title: "HOW TO FIND PREMIUM BUYERS FOR YOUR ORGANIC PRODUCE",
      excerpt:
        "Strategies for connecting with buyers who value quality and are willing to pay premium prices for organic crops.",
      author: "Sarah Miller",
      comments: 3,
    },
  ]

  return (
    <section className="w-full">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Our Latest News</h2>
          <p className="text-sm text-gray-500">Don&apos;t miss out on this week&apos;s farming insights</p>
        </div>
        <Link href="/news" className="flex items-center text-sm font-medium text-green-600 hover:underline">
          View All <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {newsArticles.map((article) => (
          <div key={article.id} className="group overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
              <div className="absolute left-3 top-3 z-10 rounded-full bg-white px-3 py-1 text-xs font-medium shadow-sm">
                {article.category}
              </div>
              <Image
                src={article.image || "/placeholder.svg"}
                alt={article.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            {/* Content */}
            <div className="p-4">
              <div className="mb-2 text-xs text-gray-500">{article.date}</div>
              <h3 className="mb-2 text-base font-bold leading-tight">
                <Link href={`/news/${article.id}`} className="hover:text-green-600">
                  {article.title}
                </Link>
              </h3>
              <p className="mb-4 text-sm text-gray-600 line-clamp-2">{article.excerpt}</p>

              {/* Footer */}
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center">
                  <span>by</span>
                  <Link href={`/author/${article.author}`} className="ml-1 font-medium hover:text-green-600">
                    {article.author}
                  </Link>
                </div>
                <Link href={`/news/${article.id}#comments`} className="hover:text-green-600">
                  {article.comments} comments
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
