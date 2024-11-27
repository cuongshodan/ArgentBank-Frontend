const BankStatusCard = () => {
    return (
        <div className="flex bg-slate-700 text-white w-full max-w-[730px] rounded-md p-2 m-2 justify-between">
            <div className="text-start p-2">
                <div>Argent Bank Checking (x3448)</div>
                <div className="text-3xl">$48,098.43</div>
                <div>Available balance</div>
            </div>

            <div className="flex items-center">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-12 h-12"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
            </div>
        </div >
    )
}

export default BankStatusCard