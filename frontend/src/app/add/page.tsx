import React from "react";
import AddCard from "../components/card/AddCard"; // Adjust the import path as necessary

const AddCardPage: React.FC = () => {
    return (
        <div>
            <AddCard setCards={() => { }} />
        </div>
    );
};

export default AddCardPage;