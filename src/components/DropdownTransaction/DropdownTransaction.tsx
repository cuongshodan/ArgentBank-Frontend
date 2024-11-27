type DropdownTransactionProps = {
    date: string;
    description: string;
    amount: number;
    balance: number;
}

const DropdownTransaction = ({ date, description, amount, balance }: DropdownTransactionProps) => {
    return (
        <div className="flex justify-between gap-3 p-2 text-white bg-green-400">
            <div className="w-2/6 text-start">{date}</div>
            <div className="w-1/2 text-start">{description}</div>
            <div className="w-1/6">{amount}</div>
            <div className="w-1/6">{balance}</div>
            <div className="w-1/6 flex justify-end">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                    />
                </svg>
            </div>

        </div>
    )
}

export default DropdownTransaction