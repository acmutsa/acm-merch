interface usersPageProps{
    params:{
        userID:string,
    }
}
export default function Page({ params }: usersPageProps){
    return (
        <>
            <div>userID: {params.userID}</div>
        </>
    )
}