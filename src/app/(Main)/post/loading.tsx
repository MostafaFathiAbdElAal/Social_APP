export default function loading() {
    return <section className="space-y-5 mt-10">
        <div className="w-full mx-auto shadow-xl rounded-xl border border-gray-100 bg-white min-h-96 p-4">


        <div className="flex items-center gap-2">
            <div className="animate-pulse bg-gray-300 w-12 h-12 rounded-full"></div>
            <div className="space-y-1">
                <div className="animate-pulse bg-gray-300 w-24 h-3 rounded-full"></div>
                <div className="animate-pulse bg-gray-300 w-12 h-3 rounded-full"></div>

            </div>

            <div className="animate-pulse flex flex-col gap-1 items-center justify-center ms-auto *:rounded-full *:w-1 *:h-1 *:bg-gray-600 pe-5">
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
        <div className="mt-5 space-y-1">
            <div className="animate-pulse bg-gray-300 w-full h-3 rounded-full"></div>
            <div className="animate-pulse bg-gray-300 w-full h-3 rounded-full"></div>
            <div className="animate-pulse bg-gray-300 w-1/3 h-3 rounded-full"></div>

        </div>

        <div className="animate-pulse bg-gray-300 h-72 mt-3"></div>
    </div>
    </section >
};

