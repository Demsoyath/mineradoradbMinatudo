document.addEventListener('DOMContentLoaded', () => {
    const mineradorForm = document.getElementById('mineradorForm');
    const minerioForm = document.getElementById('minerioForm');

    mineradorForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(mineradorForm);
        const data = {};
        formData.forEach((value, key) => { data[key] = value });

        try {
            const response = await fetch('http://localhost:3000/cadastrar_minerador', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nome: data.nome,
                    telefone: data.telefone,
                    cpf: data.cpf,
                    horas_trabalhadas: data.horas_trabalhadas
                })
            });
            if (response.ok) {
                alert('Minerador cadastrado com sucesso!');
            } else {
                alert('Erro ao cadastrar minerador.');
            }
        } catch (error) {
            console.error('Erro:', error);
        }
    });

    minerioForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(minerioForm);
        const data = {};
        formData.forEach((value, key) => { data[key] = value });

        try {
            const response = await fetch('http://localhost:3000/cadastrar_minerio', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if (response.ok) {
                alert('Minério cadastrado com sucesso!');
            } else {
                alert('Erro ao cadastrar minério.');
            }
        } catch (error) {
            console.error('Erro:', error);
        }
    });
});
