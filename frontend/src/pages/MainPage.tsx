import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import axios from 'axios';
import React from "react";
import { ROUTE_NAME } from "@/lib/routename";
import { z } from "zod"
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { useSnackbar } from "notistack";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
    user_id: z.string().min(1).max(50),
})

function MainPage() {
    const [response, setResponse] = React.useState<any>(null);

    const [interests, setInterests] = React.useState([{ id: Date.now(), value: "" }]);
    const { enqueueSnackbar } = useSnackbar();

    // Add a new input field
    const addInterest = () => {
        setInterests([...interests, { id: Date.now(), value: "" }]);
    };

    // Remove an input field
    const removeInterest = (id: number) => {
        setInterests(interests.filter((input) => input.id !== id));
    };

    const handleInputChange = (id: number, value: string) => {
        setInterests(
            interests.map((input) => (input.id === id ? { ...input, value } : input))
        );
    };

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          user_id: "",

        },
      })

    // const form = useForm();

    const onSubmit = async (data: any) => {
        const formData = {
            user_id: data.user_id,
            preferences: interests.map((interest) => interest.value),
        };

        try {

            const response = await axios.post(ROUTE_NAME.postRecommendations, formData);
            enqueueSnackbar(response.data.message || "Recommendations created", { variant: "success" });
            setInterests([{ id: Date.now(), value: "" }]);

        } catch (err) {
            console.log(err);
            if (axios.isAxiosError(err)) {
                enqueueSnackbar( err.response?.data?.error || "Error getting recommendations", { variant: "error" });
            }
        }
    };
    return (
        <div className="w-full flex flex-col gap-y-5 p-5">
            <h1>Create Interests</h1>
            <Form  {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                    <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:gap-1">
                        <Label className="w-2/5">User ID: </Label>
                        <FormField

                            control={form.control}
                            name="user_id"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormControl>
                                        <Input    {...field} placeholder="...." type="number" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                    </div>
                    <div className="flex flex-col sm:flex-row gap-y-5">
                        <Label className="w-2/5">Interests: </Label>
                        <div className="flex flex-col gap-y-3 w-full    ">
                            {interests.map((interest, index) => (
                                <div key={interest.id} className="flex flex-row gap-x-1 items-center">
                                    {<FaMinus onClick={() => removeInterest(interest.id)}  className={`${index === 0 ? 'invisible' : ''}`}/>}
                                    <FormField
                                        control={form.control}
                                        name={`body-${interest.id}`}
                                        render={({ field }) => (
                                            <FormItem className="w-full">
                                                <FormControl>
                                                    <Input    {...field} placeholder="" value={interest.value}
                                                        onChange={(e) =>
                                                            handleInputChange(interest.id, e.target.value)
                                                        } />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                </div>
                            ))}



                            <div className="flex flex-row gap-1 text-center items-center">
                                <FaPlus onClick={addInterest} />
                            </div>
                        </div>
                    </div>

                
                        <Button className="w-full" type="submit">Submit</Button>
                 
                </form>
            </Form>

        </div>
    );
}

export default MainPage;