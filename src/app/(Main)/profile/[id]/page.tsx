interface PageProps {
    params:{
        id: string
    }
}
export default function page({ params }: PageProps) {
    console.log(params.id);

    return <>
        <div>
            page
        </div>
    </>
};

