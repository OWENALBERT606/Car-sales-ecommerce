
import { getCategoryById } from '@/actions/categories';
import { getAllProducts, getProductById } from '@/actions/products';
import CategoryDetail from '@/components/frontend/other/category-details';
import ProductDetail from '@/components/frontend/shoppage/product-details';
import { authOptions } from '@/config/auth';
import { getServerSession } from 'next-auth';



export default async function Page({params}: {params: Promise<{ id: string }>}):Promise<any> {
  

  const {id}=await params;
  try {
    const category= await getCategoryById(id);
    if (!category) {
      return <div className="p-4 text-center">Category not found</div>;
    }
    return (
      <div className='mt-6 container px-4 md:px-12 lg:px-24 mx-auto'>
       <CategoryDetail
       category={category}
       
       />
      </div>
    );
  } catch (error) {
    console.error('Error loading category:', error);

    
    return (
      <div className="p-4 text-center text-red-600">
        Error loading category. Please try again later.
      </div>
    );
  }
}

