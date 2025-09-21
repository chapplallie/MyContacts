import React, { useState } from 'react';

interface FormData {
    email: string;
    password: string;
}

interface FormProps {
    onSubmit?: (data: FormData) => void;
}

const Form: React.FC<FormProps> = ({ onSubmit }) => {

    const [formData, setFormData] = useState<FormData>({ email: '', password: '' });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (onSubmit) {
            onSubmit(formData);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
             
                    required
                />
            </div>
            <div>
                <label htmlFor="password">Mot de passe:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    required
                />
            </div>
            <button type="submit">Envoyer</button>
        </form>
    );
};

export default Form;