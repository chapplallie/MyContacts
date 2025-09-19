const Button = ({ onClick, children }: { onClick: () => void; children: React.ReactNode }) => {
    return (
        <button onClick={onClick} style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
            {children}
        </button>
    );
};

export default Button;
