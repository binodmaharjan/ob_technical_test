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


type RecommendationPostData= {
    user_id: string;
    preferences?: string[];
}

const formSchema = z.object({
    user_id: z.string().min(1).max(50),
})

const interestSchema = z.object({
    id: z.string(), // The `id` must be a string
    value: z.string().min(1).max(50), // The `value` must be a string
  });
  
const interestsSchema = z.array(interestSchema); 

function MainPage() {
    const [response, setResponse] = React.useState<any>(null);
    const [interests, setInterests] = React.useState([{ id: `${Date.now()}`, value: "" }]);
    const [errors, setErrors] = React.useState<{ [key: string]: string }>({}); // Errors per interest ID

    const { enqueueSnackbar } = useSnackbar();

    // Add a new input field
    const addInterest = () => {
        setInterests([...interests, { id: `${Date.now()}`, value: "" }]);
    };

    // Remove an input field
    const removeInterest = (id: string) => {
        setInterests(interests.filter((input) => input.id !== id));
    };

    const handleInputChange = (id: string, value: string) => {
        setInterests(
            interests.map((input) => (input.id === id ? { ...input, value } : input))
        );
        setErrors((prev) => ({ ...prev, [id]: "" })); // Clear error for the field

    };

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          user_id: "",

        },
      })

        // Validate all interests
  const validateInterests = () => {
    const result = interestsSchema.safeParse(interests);
    if (!result.success) {
      const fieldErrors = result.error.issues.reduce((acc, issue) => {
        const index = issue.path[0]; // Index of the interest
        const id = interests[index as number ].id;
        acc[id] = issue.message;
        return acc;
      }, {} as { [key: string]: string });
      setErrors(fieldErrors);
      return false; // Validation failed
    }
    return true; // Validation passed
  };


    // const form = useForm();

    const onSubmit = async (data: RecommendationPostData) => {

        if(!validateInterests())
            return;
        const formData:RecommendationPostData = {
            user_id: data.user_id,
            preferences: interests.map((interest) => interest.value),
        };

        try {

            const response = await axios.post(ROUTE_NAME.postRecommendations, formData);
            enqueueSnackbar(response.data.message || "Recommendations created", { variant: "success" });
            setInterests([{ id: `${Date.now()}`, value: "" }]);

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
                                        <Input    {...field} placeholder="" type="number" />
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
                                   
                                    <FormField
                                        control={form.control}
                                        name={`body-${interest.id}`}
                                        render={({ field }) => (
                                            <FormItem className="w-full">
                                                <div className="flex flex-row gap-1 items-center">
                                                 {<FaMinus onClick={() => removeInterest(interest.id)}  className={`${index === 0 ? 'invisible' : ''}`}/>}
                                                    <FormControl>
                                                        <Input    {...field} placeholder="" value={interest.value}
                                                            onChange={(e) =>
                                                                handleInputChange(interest.id, e.target.value)
                                                            } />
                                                    </FormControl>
                                                </div>
                                                
                                                {errors[interest.id] && (
                                                    <FormMessage className="ml-10">{errors[interest.id]}</FormMessage>
                                                )}
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