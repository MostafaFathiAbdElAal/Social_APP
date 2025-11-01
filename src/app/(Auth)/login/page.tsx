import FormLogin from "@/components/FormLogin/FormLogin";
export default function Page() {

    return (

        <div className="min-h-screen flex items-center justify-center">
            <div className="flex flex-col items-center gap-5 max-w-5xl w-full px-2">

                <div>

                    <h1 className="text-4xl sm:text-5xl font-bold font-sans socialApp">
                        Social app
                    </h1>
                    

                </div>

                <FormLogin />
            </div>
        </div>
    );
};

