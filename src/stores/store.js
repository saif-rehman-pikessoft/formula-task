import create from 'zustand';

export const useStore = create(set => ({
    formula: '',
    displayFormula: '',
    finalResult: '',
    newOption: { label: '', value: '' },
    options: [
        {
            value: '10',
            label: 'salary',
        },
        {
            value: '20',
            label: 'increments',
        },
        {
            value: '30',
            label: 'lunch',
        },
    ],
    setFormula: (formula) => set(state => ({ formula })),
    setDisplayFormula: (displayFormula) => set(state => ({ displayFormula })),
    setFinalResult: (finalResult) => set(state => ({ finalResult })),
    setNewOption: (newOption) => set(state => ({ newOption })),
    setOptions: (options) => set(state => ({ options })),
}));