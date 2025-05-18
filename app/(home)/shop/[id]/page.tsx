
import { getAllProducts, getProductById } from '@/actions/products';
import ProductDetail from '@/components/frontend/shoppage/product-details';

export default async function Page({params}: {params: Promise<{ id: string }>}):Promise<any> {

  const {id}=await params;

  try {
    const product= await getProductById(id);
    if (!product) {
      return <div className="p-4 text-center">Product not found</div>;
    }
    return (
      <div className='mt-24 container px-4 md:px-12 lg:px-24 mx-auto'>
        <ProductDetail
        product={product}
        />
      </div>
    );
  } catch (error) {
    console.error('Error loading question:', error);

    
    return (
      <div className="p-4 text-center text-red-600">
        Error loading product. Please try again later.
      </div>
    );
  }
}

