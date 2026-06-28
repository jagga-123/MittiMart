import { useParams, useNavigate } from 'react-router-dom';
import PageShell from '../components/PageShell';
import { products } from '../data/mockData';

const SellerEditProductPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const product = products.find((item) => item.slug === slug) || products[0];

  return (
    <PageShell
      eyebrow="Seller Tools"
      title={`Edit product: ${product?.name || 'Item'}`}
      description="Protected edit route for a seller or admin. The form is mock-only for the frontend build."
      actions={
        <button
          onClick={() => navigate('/seller/products')}
          className="px-5 py-2.5 rounded-full bg-brand-cream border border-brand-brown/15 text-brand-brown font-bold text-sm"
        >
          Back to Products
        </button>
      }
    >
      <div className="bg-white border border-brand-brown/10 rounded-2xl p-6 shadow-sm max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input className="px-4 py-3 rounded-full border border-brand-brown/15 outline-none" defaultValue={product?.name} />
          <input className="px-4 py-3 rounded-full border border-brand-brown/15 outline-none" defaultValue={product?.price} />
          <input className="px-4 py-3 rounded-full border border-brand-brown/15 outline-none" defaultValue={product?.craft} />
          <input className="px-4 py-3 rounded-full border border-brand-brown/15 outline-none" defaultValue={product?.state} />
          <textarea className="md:col-span-2 px-4 py-3 rounded-2xl border border-brand-brown/15 outline-none min-h-32" defaultValue={product?.description} />
        </div>
        <button className="mt-6 px-5 py-3 rounded-full bg-gradient-to-r from-brand-brown to-brand-orange text-white font-bold shadow-md">
          Update Product
        </button>
      </div>
    </PageShell>
  );
};

export default SellerEditProductPage;