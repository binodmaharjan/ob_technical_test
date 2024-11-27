import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { set, useForm } from "react-hook-form";
import axios from 'axios';
import React from "react";
import { ROUTE_NAME } from "@/lib/routename";
import { z } from "zod"
import { useSnackbar } from "notistack";




function InterestPage() {
    

    const [recommendations, setRecommendations] = React.useState<string[]>([]);

    

    const form = useForm();
    const { enqueueSnackbar } = useSnackbar();

    const onSubmit = async (data: any) => {

        setRecommendations([]);
        
        try {
            
            const response = await axios.get(ROUTE_NAME.getRecomended(data.user_id));
            console.log("reposne se from ", response.data);
            if(response.data.recommendations && response.data.recommendations.length > 0){
                setRecommendations(response.data.recommendations);
            }
            
        } catch (err) {

            console.log("error", err);
            if (axios.isAxiosError(err)) {
                enqueueSnackbar( err.response?.data?.error || "Error getting recommendations", { variant: "error" });
            }
        }
    };
    return (
        <div className="w-full flex flex-col gap-y-5 p-5">
            <h1>Get Interests</h1>
            <Form  {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:gap-1">
                        <Label className="whitespace-nowrap">User ID: </Label>
                        <FormField

                            control={form.control}
                            name="user_id"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormControl>
                                        <Input {...field} placeholder="" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button className="w-ful" type="submit">GET</Button>
                    </div>
                    

                   
                </form>
            </Form>

                {
                    recommendations.map((recommendation, index) => (
                        <Label className = " p-2 border text-center rounded-lg"key={index}>{recommendation}</Label>
                    ))
                }


        </div>
    );
}

export default InterestPage;