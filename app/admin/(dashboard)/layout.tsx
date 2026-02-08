import Sidebar from './_components/Sidebar';
import Header from './_components/Header';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-gray-50/50">
            <Sidebar />
            <div className="md:ml-64 transition-all duration-300">
                <Header />
                <main className="p-6">
                    <div className="animate-in fade-in slide-in-from-bottom-5 duration-500">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
