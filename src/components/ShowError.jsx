const ShowError = ({error, handleError}) => {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
                <div className="text-red-500 text-xl mb-4">Error: {error}</div>
                <button
                    onClick={handleError}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                    Retry
                </button>
            </div>
        </div>
    )
}

export default ShowError;