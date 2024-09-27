"use client"

import * as zod from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

const FormSchema = z.object ({

});

const UserForm = () => {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            age: "",
            gender: "",
            history: "",
            device: "",
        }
        
    });
    
    const handleSubmit = () => {
        
    }
}

export default UserForm;