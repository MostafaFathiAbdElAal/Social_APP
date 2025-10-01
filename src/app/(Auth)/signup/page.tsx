import FormSignup from "@/components/FormSignup/FormSignup";

export default function page() {
    return <section className="max-w-md mx-auto">
        <h1
            className="text-5xl font-bold text-center font-sans 
             socialApp"
        >
            Social app
        </h1>

        <FormSignup />
    </section>
};

