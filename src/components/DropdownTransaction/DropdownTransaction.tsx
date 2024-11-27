import { useState } from 'react';

type DropdownTransactionProps = {
    date: string;
    description: string;
    amount: number;
    balance: number;
    transactionType: string;
    category: string;
    note: string;
}

const DropdownTransaction = ({ date, description, amount, balance, transactionType, category, note }: DropdownTransactionProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="flex flex-col gap-3 p-2 text-white bg-green-400">
            <div className="flex justify-between">
                <div className="w-2/6 text-start">{date}</div>
                <div className="w-1/2 text-start">{description}</div>
                <div className="w-1/6">{amount}</div>
                <div className="w-1/6">{balance}</div>
                <div className="w-1/6 flex justify-end">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 cursor-pointer"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        onClick={toggleDropdown}
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
            {isOpen && (
                <div className="mt-2 p-2 bg-green-500 rounded-md text-start">
                    <div>Transaction Type: {transactionType}</div>
                    <div>Category: {category} ✏️</div>
                    <div>Note: {note} ✏️</div>
                </div>
            )}
        </div>
    );
}

export default DropdownTransaction;