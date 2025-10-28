interface orderPageProps{
    params:{
        orderID:string,
    }
}

export default function Page({ params }: orderPageProps){
    return (
        <div>
            orderID:{params.orderID}
        </div>
    )
}