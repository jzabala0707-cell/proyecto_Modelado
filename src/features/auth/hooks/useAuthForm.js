import { useState, useCallback } from "react";
export function useLoading() {
    const [loading, setLoading] = useState(false);
    const runWithLoading = useCallback(async (fn) => {
        try {
            setLoading(true);
            return await fn();
        }
        finally {
            setLoading(false);
        }
    }, []);
    return { loading, setLoading, runWithLoading };
}
export function usePasswordVisibility(initial = false) {
    const [visible, setVisible] = useState(initial);
    const toggle = useCallback(() => setVisible((v) => !v), []);
    return { visible, toggle, setVisible };
}
export function useFormState(initialState) {
    const [values, setValues] = useState(initialState);
    const setField = useCallback((field, value) => {
        setValues((prev) => ({ ...prev, [field]: value }));
    }, []);
    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setValues((prev) => ({ ...prev, [name]: value }));
    }, []);
    const reset = useCallback(() => setValues(initialState), [initialState]);
    return { values, setField, handleChange, reset, setValues };
}
