export default function loading() {
    return <section className="space-y-5">
        <div className="w-full mx-auto shadow-xl rounded-xl border border-gray-100 bg-white min-h-96">
            <div className="p-4">

                <div className="flex items-center gap-2">
                    <div className="animate-pulse bg-gray-300 w-12 h-12 rounded-full"></div>
                    <div className="space-y-1">
                        <div className="animate-pulse bg-gray-300 w-24 h-3 rounded-full"></div>
                        <div className="animate-pulse bg-gray-300 w-12 h-3 rounded-full"></div>
                    </div>
                </div>

                <div className="mt-5 space-y-1">
                    <div className="animate-pulse bg-gray-300 w-full h-3 rounded-full"></div>
                    <div className="animate-pulse bg-gray-300 w-1/3 h-3 rounded-full"></div>
                </div>

                <div className="animate-pulse bg-gray-300 h-68 mt-3"></div>
                <div className="animate-pulse bg-gray-300 h-2 w-20 rounded-full mt-2 ms-auto me-1 "></div>
            </div>

            <section className="grid grid-cols-12 gap-5 border-t border-b border-gray-100 py-3 px-5">
                <div className="col-span-6">
                <div className="animate-pulse bg-gray-300 h-9 rounded-lg"></div>
                </div>
                <div className="col-span-6">
                <div className="animate-pulse bg-gray-300 h-9 rounded-lg"></div>
                </div>
            </section>
            <div className="space-y-4 border border-gray-100 bg-white shadow-sm rounded-xl p-4">
                <div className="flex gap-3">
                    <div className="animate-pulse bg-gray-300 w-10 h-10 rounded-full"></div>
                    <div className="flex-1 space-y-2">
                        <div className="animate-pulse bg-gray-300 w-1/3 h-3 rounded-full"></div>
                        <div className="animate-pulse bg-gray-300 w-full h-3 rounded-full"></div>
                        <div className="animate-pulse bg-gray-300 w-2/3 h-3 rounded-full"></div>
                    </div>
                </div>
                <div className="flex gap-3">
                    <div className="animate-pulse bg-gray-300 w-10 h-10 rounded-full"></div>
                    <div className="flex-1 space-y-2">
                        <div className="animate-pulse bg-gray-300 w-1/4 h-3 rounded-full"></div>
                        <div className="animate-pulse bg-gray-300 w-full h-3 rounded-full"></div>
                        <div className="animate-pulse bg-gray-300 w-2/3 h-3 rounded-full"></div>
                    </div>
                </div>
            </div>
        </div>
    </section>
};

