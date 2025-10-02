import FormLogin from "@/components/FormLogin/FormLogin";
export default function Page() {

    return (

        <div className="min-h-screen flex items-center justify-center">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-10 max-w-5xl w-full px-4">

                <div className="flex-1">

                    <h1 className="text-5xl font-bold font-sans socialApp">
                        Social app
                    </h1>
                    

                </div>

                <FormLogin />
            </div>
        </div>
    );
};

