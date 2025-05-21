interface Props {
    title: string;
    description: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export const ModalConfirm = ({ title, description, onConfirm, onCancel }: Props) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-8 shadow-lg w-96 h-auto flex flex-col items-center justify-center">
                <h1 className="text-3xl font-semibold text-slate-600 mb-4 text-center">{title}</h1>
                <div className="text-gray-700 mb-6 text-center">
                    {description.split('\n').map((line, index) => (
                            <div key={index}>
                                {line}
                            </div>
                        ))}
                </div>
                <div className='flex justify-center gap-4'>
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 bg-slate-400 text-white rounded-md hover:bg-slate-500 focus:outline-none focus:bg-slate-500"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
                    >
                        Confirmar
                    </button>
                </div>
            </div>
        </div>
    );
};
