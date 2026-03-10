function ErrorFallback() {
    const handleRefresh = () => {
        window.location.reload()
    }

    return (
        <div role="alert" className="errorFallback">
            <span>Something went wrong!</span>
            <button onClick={handleRefresh}>Reload the page</button>
        </div>
    )
}

export default ErrorFallback;
