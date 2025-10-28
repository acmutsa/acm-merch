interface productPageProps{
    params:{
        productID:string,
    }
}
export default function Page({ params } : productPageProps){
    return (
        <div>
            productID:{params.productID}
        </div>
    )
}