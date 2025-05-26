import { useNavigate } from 'react-router-dom';

interface Props {
    title: string;
    description: string;
    route: string;
    button: string;
    onClose?: () => void;
}

export const ModalSuccess = ({ title, description, route, button, onClose }: Props) => {
    const navigate = useNavigate();

    function handleAccept() {
        if (onClose) {
            onClose();
        }
        navigate(`${route}`);
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-8 shadow-lg w-96 h-auto flex flex-col items-center justify-center">
                <h1 className="text-2xl font-semibold text-slate-600 mb-4 text-center">{title}</h1>
                <div className="text-gray-700 mb-4 text-center">
                    {description.split('\n').map((line, index) => (
                        <div key={index}>
                            {line}
                        </div>
                    ))}
                </div>
                <div className='flex justify-center'>
                    <button
                        onClick={handleAccept}
                        className="px-4 py-2 bg-slate-500 text-white rounded-md hover:bg-slate-600 focus:outline-none focus:bg-slate-600"
                    >
                        {button}
                    </button>
                </div>
            </div>
        </div>
    );
}