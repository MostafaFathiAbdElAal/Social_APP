import CardLog from "@/components/CardLog/CardLog";
import FormLogin from "@/components/FormLogin/FormLogin";
export default function Page() {

    return (

        <div className="min-h-screen flex items-center justify-center">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-10 max-w-5xl w-full px-4">

                <div className="flex-1">

                    <h1 className="text-5xl font-bold font-sans socialApp">
                        Social app
                    </h1>
                    <h2 className="mt-4 mb-1 text-4xl font-semibold text-black">
                        Recent logins
                    </h2>
                    <p className="text-gray-600">Click your picture or add an account.</p>
                    <div className="flex mt-6 rounded-sm">
                        <CardLog />
                    </div>

                </div>

                <FormLogin />
            </div>
        </div>
    );
};

