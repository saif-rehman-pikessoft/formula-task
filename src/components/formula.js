import React from 'react';
import { Mentions, Input, Button, Form } from 'antd';
import { evaluate } from 'mathjs';
import { useStore } from '../stores/store';

const Formula = () => {
    const { formula, displayFormula, finalResult, newOption, options, setFormula, setDisplayFormula, setFinalResult, setNewOption, setOptions } = useStore();
    const labelToValueMap = options.reduce((map, option) => {
        map[option.label] = option.value;
        return map;
    }, {});

    const handleSelect = (option) => {
        const newFormula = formula + option.value;
        const newDisplayFormula = displayFormula + `${option.label}`;
        setFormula(newFormula);
        setDisplayFormula(newDisplayFormula);
    };

    const handleChange = (value) => {
        setDisplayFormula(value);
    };

    const handlePressEnter = () => {
        try {
            const formulaWithValues = displayFormula.replace(/@(\w+)/g, (_, label) => {
                return labelToValueMap[label] || `${label}`;
            });
            const result = evaluate(formulaWithValues);
            setFinalResult(result);
        } catch (error) {
            setFinalResult('Error');
        }
    };

    const handleAddOption = () => {
        const newOptions = [...options, newOption];
        setOptions(newOptions);
        setNewOption({ label: '', value: '' });
    };

    const handleNewOptionChange = (e) => {
        const { name, value } = e.target;
        setNewOption({ ...newOption, [name]: value });
    };


    const mentionData = options.map(option => {
        return option?.label?.charAt(0)?.toLowerCase();

    });

    return (
        <div className="app">
            <Mentions
                prefix={mentionData}
                className="mentions"
                placement="top"
                options={options}
                onSelect={handleSelect}
                onChange={handleChange}
                onPressEnter={handlePressEnter}
                allowClear='true'
                value={displayFormula}
                dropdownClassName="ant-mentions"

            />
            <Form className="form" onFinish={handleAddOption}>
                <Form.Item>
                    <Input placeholder="Option label" name="label" onChange={handleNewOptionChange} value={newOption.label} />
                </Form.Item>
                <Form.Item>
                    <Input type='number' placeholder="Option value" name="value" onChange={handleNewOptionChange} value={newOption.value} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">Add new option</Button>
                </Form.Item>
            </Form>
            <div className="result">
                <h1>
                    Final Result is: {finalResult ? finalResult : ''}
                </h1>
            </div>
        </div>
    );
};

export default Formula;