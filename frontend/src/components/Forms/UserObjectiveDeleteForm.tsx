import React, { useState } from 'react';
import { UserObjectiveEntry } from '../ItemsList/UserObjectivesList';

interface Props {
    open: boolean;
    onClose: () => void;
    user_id: number | null;
    userObjective: UserObjectiveEntry;
    onUserObjectiveDeleted: () => void;
}

export const UserObjectiveDeleteForm: React.FC<Props> = ({ 
    open, 
    onClose, 
    user_id,
    userObjective,
    onUserObjectiveDeleted 
}) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleDelete = async () => {
        if (!userObjective?.id) return;
        
        setIsDeleting(true);
        setError(null);
        
        try {
            const response = await fetch(`http://localhost:8000/api/user-objectives/${user_id}/${userObjective.id}`, {
                method: 'DELETE',
            });
            
            if (!response.ok) {
                throw new Error('Error al eliminar el objetivo');
            }
            
            onUserObjectiveDeleted();
            onClose();
        } catch (err) {
            console.error('Error deleting objective:', err);
            setError('Error al eliminar el objetivo. Por favor, inténtalo de nuevo.');
        } finally {
            setIsDeleting(false);
        }
    };

    if (!open) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 50
        }}>
            <div style={{
                backgroundColor: 'white',
                padding: '1.5rem',
                borderRadius: '0.5rem',
                width: '100%',
                maxWidth: '28rem',
                margin: '1rem'
            }}>
                <h3 style={{
                    fontSize: '1.125rem',
                    fontWeight: 500,
                    marginBottom: '0.5rem',
                    color: '#111827'
                }}>
                    Eliminar objetivo
                </h3>
                <div style={{ marginTop: '0.5rem' }}>
                    <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                        ¿Estás seguro de que deseas eliminar el objetivo?
                    </p>
                    {error && (
                        <p style={{ color: '#dc2626', marginTop: '0.5rem', fontSize: '0.875rem' }}>
                            {error}
                        </p>
                    )}
                </div>

                <div style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gap: '0.75rem',
                    marginTop: '1rem'
                }}>
                    <button
                        type="button"
                        style={{
                            padding: '0.5rem 1rem',
                            borderRadius: '0.375rem',
                            border: '1px solid #d1d5db',
                            backgroundColor: 'white',
                            color: '#374151',
                            fontSize: '0.875rem',
                            fontWeight: 500
                        }}
                        onClick={onClose}
                    >
                        Cancelar
                    </button>
                    <button
                        type="button"
                        style={{
                            padding: '0.5rem 1rem',
                            borderRadius: '0.375rem',
                            backgroundColor: isDeleting ? '#9ca3af' : '#dc2626',
                            color: 'white',
                            border: 'none',
                            fontSize: '0.875rem',
                            fontWeight: 500,
                            cursor: isDeleting ? 'not-allowed' : 'pointer',
                            opacity: isDeleting ? 0.7 : 1
                        }}
                        onClick={handleDelete}
                        disabled={isDeleting}
                    >
                        {isDeleting ? 'Eliminando...' : 'Eliminar'}
                    </button>
                </div>
            </div>
        </div>
    );
};
