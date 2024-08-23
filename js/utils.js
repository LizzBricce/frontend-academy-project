const getData = async (endpoint, method, body = null) => {
    const defaultOptions = {
        method: method,
        body: body ? JSON.stringify(body) : null,
        headers: new Headers({ 'Content-Type': 'application/json' }),
    };

    try {
        const res = await fetch(`http://localhost:8080${endpoint}`, defaultOptions);
        if (!res.ok) {
            throw new Error(`Erro HTTP! status: ${res.status}`);
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.error(`Falha ao buscar dados: ${error.message}`);
        return {}; 
    }
};

export { getData };
