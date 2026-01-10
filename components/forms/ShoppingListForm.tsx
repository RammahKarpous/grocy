"use client";

import { useState } from "react";
import shoppingListService from "@/lib/shoppingListService";
import Input from "../form-fields/Input";
import Button from "../form-fields/Button";
import FormWrapper from "./FormWrapper";

export default function ShoppingListForm() {
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const createShoppingList = async (e: React.FormEvent) => {
        try {
            const response = await shoppingListService.create({ name });
            console.log("Shopping list created: ", response.data);
    
            setSuccess(true);
            setName('');
    
            setTimeout(() => setSuccess(false), 3000)
        } catch (error: any) {
            console.log("There has been an error creating shopping list: ", error);

            if (error.response?.data?.errors) {
                // Laravel validation errors
                const errors = error.response.data.errors;
                setError(Object.values(errors).flat().join(', '));
              } else if (error.response?.data?.message) {
                setError(error.response.data.message);
              } else {
                setError('Failed to create shopping list. Please try again.');
              }
        } finally {
            setLoading(false);
        }
    }

    return (
        <FormWrapper onSubmit={createShoppingList} className="py-5 px-7 mt-10 bg-neutral-900 rounded-2xl border border-neutral-800" title="Create shopping list" width="small">

            {error && (
                <p className="text-red-400">{error}</p>
            )}

            {success && (
                <p className="text-green-400">{success}</p>
            )}

            <Input
                id="name"
                label="Name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <Button loading={loading} text="Create shopping list" />
        </FormWrapper>
    )
}
