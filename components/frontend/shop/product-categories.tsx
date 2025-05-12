import { Leaf, Carrot, Apple, Wheat, Milk } from "lucide-react"

export default function ProductCategories() {
  const categories = [
    {
      id: "vegetables",
      name: "Vegetables",
      description: "Fresh farm vegetables",
      icon: <Carrot className="h-6 w-6" />,
      count: 124,
    },
    {
      id: "fruits",
      name: "Fruits",
      description: "Seasonal & exotic fruits",
      icon: <Apple className="h-6 w-6" />,
      count: 86,
    },
    {
      id: "grains",
      name: "Grains & Cereals",
      description: "Organic grains & cereals",
      icon: <Wheat className="h-6 w-6" />,
      count: 52,
    },
    {
      id: "dairy",
      name: "Dairy Products",
      description: "Fresh milk & dairy",
      icon: <Milk className="h-6 w-6" />,
      count: 38,
    },
    {
      id: "organic",
      name: "Organic Products",
      description: "Certified organic produce",
      icon: <Leaf className="h-6 w-6" />,
      count: 95,
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
      {categories.map((category) => (
        <div
          key={category.id}
          className="flex flex-col items-center rounded-lg border border-gray-200 bg-white p-6 text-center shadow-sm transition-all hover:border-green-200 hover:shadow-md"
        >
          <div className="mb-4 rounded-full bg-green-50 p-3 text-green-600">{category.icon}</div>
          <h3 className="mb-1 font-medium">{category.name}</h3>
          <p className="mb-2 text-xs text-gray-500">{category.description}</p>
          <span className="text-xs font-medium text-green-600">{category.count} products</span>
        </div>
      ))}
    </div>
  )
}
