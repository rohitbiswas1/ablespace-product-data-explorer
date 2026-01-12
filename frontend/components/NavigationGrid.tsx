import Link from 'next/link';
import { FC } from 'react';

interface NavigationItem {
    id: number;
    title: string;
    slug: string;
}

interface Props {
    data: NavigationItem[];
}

const NavigationGrid: FC<Props> = ({ data }) => {
    if (!data?.length) return <div className="p-4 text-center">No navigation items found. Try triggering a scrape!</div>;

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 p-4">
            {data.map((item) => (
                <Link
                    key={item.id}
                    href={`/category/${item.slug}?navId=${item.id}`}
                    className="block p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow border border-gray-200 text-center"
                >
                    <h3 className="font-semibold text-gray-800">{item.title}</h3>
                </Link>
            ))}
        </div>
    );
};

export default NavigationGrid;
