export default function Receipt(){
    return(
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
            <div className="border-2 border-blue-600 rounded-xl p-8 w-[400px] min-h-[500px] flex flex-col bg-white shadow-lg ">
                <div className="text-3xl font-bold text-gray-700 mb-4 text-center">
                Cart
                </div>
                <div className="flex-1 flex flex-col gap-2 overflow-y-auto">
                <div className="flex justify-between">
                    <p className="text-xl">RowdyHacks Tshirt</p>
                    <p className="font-semibold">$29.99</p>
                </div>
                <div className="flex justify-between">
                    <p className="text-xl">ACM Projects Hat</p>
                    <p className="font-semibold">$19.99</p>
                </div> 
                
                </div>
            
                <div className=" flex border-t-2 border-black justify-between pt-2 mt-3 pb-4">
                        <p className="font-bold text-xl">Total</p>
                        <p className="font-semibold text-xl">$600.00</p>
                    </div>
                <button className="text-3xl rounded-xl bg-blue-600 hover:bg-blue-700 text-white p-2 font-semibold transition cursor-pointer">
                Checkout
                </button>
            </div>
        </div>
    );

}