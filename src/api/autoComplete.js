export const fetchSuggestions = async (searchTerm) => {
    const response = await fetch(`your-api-endpoint?q=${searchTerm}`);
    if (!response.ok) {
        throw new Error('Failed to fetch suggestions');
    }
    return response.json();
};
