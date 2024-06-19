import React from 'react';

function PaginaError() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
            <h1 className="text-6xl font-bold text-red-600 mb-4">404 Error</h1>
            <p className="text-xl text-gray-200">La URL no pertenece a ninguna página disponible.</p>
        </div>
    );
}

export default PaginaError;
