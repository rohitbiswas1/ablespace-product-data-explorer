"use client";

import { useQuery } from '@tanstack/react-query';
import { fetchCategories, fetchProducts } from '@/lib/api';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function CategoryPage({ params }: { params: { slug: string } }) {
    const searchParams = useSearchParams();
    const navId = searchParams.get('navId');
    const catIdParam = searchParams.get('catId');

    // If we have navId, fetch subcategories (or products if leaf)
    // For simplicity, we just fetch products if we are deep, or categories if top.
    // Actually, let's just show products for now if catId is present.

    const { data: products, isLoading } = useQuery({
        queryKey: ['products', catIdParam],
        queryFn: () => fetchProducts(catIdParam ? parseInt(catIdParam) : undefined),
        enabled: !!catIdParam || true, // Fetch all if nothing specific
    });

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Category: {params.slug}</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products?.map((p: any) => (
                    <Link key={p.id} href={`/product/${p.id}`} className="block border rounded p-4 hover:shadow">
                        <div className="h-48 bg-gray-200 mb-2 flex items-center justify-center">
                            {p.imageUrl ? <img src={p.imageUrl} className="h-full object-contain" /> : 'No Image'}
                        </div>
                        <h3 className="font-semibold">{p.title}</h3>
                        <p className="text-blue-600 font-bold">{p.price} {p.currency}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}
