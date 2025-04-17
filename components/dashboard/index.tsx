'use client';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';

const AdminDashboard: React.FC = () => {
    const tiles = [
        { id: 1, title: 'Taichung', page: 'taichung' },
        { id: 2, title: 'Yunlin', page: 'yunlin' },
    ];

    return (
        <div className="grid grid-cols-1 gap-4 p-4 w-full sm:grid-cols-2 lg:grid-cols-3">
            {tiles.map(tile => (
                <div
                typeof='card'
                    key={tile.id}
                    className="p-4 rounded-lg shadow-md border border-gray-200 justify-center text-center"
                >
                    <Link href={`/dashboard/${tile.page}`}>
                    <h3 className="text-lg font-semibold mb-2">{tile.title}</h3>
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default AdminDashboard;