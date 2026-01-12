"use client";

import { useQuery } from '@tanstack/react-query';
import { fetchProduct } from '@/lib/api';

export default function ProductPage({ params }: { params: { id: string } }) {
    const { data: product, isLoading } = useQuery({
        queryKey: ['product', params.id],
        queryFn: () => fetchProduct(parseInt(params.id)),
    });

    if (isLoading) return <div>Loading...</div>;
    if (!product) return <div>Product not found</div>;

    return (
        <div className="container mx-auto p-8">
            <div className="flex flex-col md:flex-row gap-8">
                <div className="w-full md:w-1/3">
                    {product.imageUrl && <img src={product.imageUrl} className="w-full rounded shadow" />}
                </div>
                <div className="w-full md:w-2/3">
                    <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
                    <p className="text-2xl text-blue-600 mb-4">{product.price} {product.currency}</p>

                    <div className="bg-gray-50 p-6 rounded shadow-sm">
                        <h3 className="font-semibold mb-2">Description</h3>
                        <p className="text-gray-700 whitespace-pre-wrap">{product.detail?.description || 'No description available.'}</p>
                    </div>

                    <div className="mt-4 text-sm text-gray-500">
                        Source: <a href={product.sourceUrl} target="_blank" className="underline">World of Books</a>
                    </div>
                </div>
            </div>
        </div>
    );
}
